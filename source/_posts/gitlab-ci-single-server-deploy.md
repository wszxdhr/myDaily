---
title: 记一次GitLab的CI脚本自动化单机部署
date: 2022-08-17 22:11:51
tags: [部署,GitLab,CI脚本,Docker,DevOps]
categories: [学习和实践笔记]
---


<!-- more -->

# Docker部署GitLab

## 部署容器

单说部署Docker比较简单，最重要的是要把volumes映射出来，方便改config，可以参照这个：

[https://docs.gitlab.com/ee/install/docker.html](https://docs.gitlab.com/ee/install/docker.html)

## GitLab的配置

注意：以下配置都是可以在`/etc/gitlab/gitlab.rb` 内容里面搜到的，不要改在别的地方，可能重启就没了的

1. `gitlab_rails['gitlab_shell_ssh_port'] = 2222`
   配置ssh的端口
2. `external_url 'https://你的Gitlab域名:8443'`
   配置外部连接用的url，也是clone时候显示的那个https的url
3. `gitlab_rails['ldap_enabled'] = true`
   打开LDAP
4. `gitlab_rails['prevent_ldap_sign_in'] = false`
   忘记干啥的了反正要false
5. 配置连接LDAP服务器，需要先打开LDAP服务器，这里配的是连接群晖的LDAP服务

    ```ruby
    gitlab_rails['ldap_servers'] = YAML.load <<-'EOS'                               
      main: # 'main' is the GitLab 'provider ID' of this LDAP server                
        label: 'LDAP'                                                               
        host: 'xxx.xxxx.com'                                                  
        port: 389                                                                   
    #     uid: 'sAMAccountName'                                                     
        uid: 'uid'                                                                  
        bind_dn: 'uid=root,cn=users,dc=xxx,dc=xxxx,dc=xxx'                    
        password: '你的LDAP服务器密码'                                                 
        encryption: 'start_tls' # "start_tls" or "simple_tls" or "plain"            
        verify_certificates: true                                                   
        smartcard_auth: false                                                       
        active_directory: true                                                      
        allow_username_or_email_login: true                                         
        lowercase_usernames: false                                                  
        block_auto_created_users: false                                             
        base: 'dc=xxx,dc=xxxx,dc=xxx'                                         
        user_filter: ''
    EOS
    ```


这里配完了有个坑，就是我懒得在Gitlab上配ssl，因为免费的证书3个月一换，我都是直接搞个通配符的证书放在群晖一起换的，所以我这里docker映射出去把A端口映射成B端口，再在群晖的反向代理把端口再映射回来，这样后面统一换证书更方便一些，毕竟端口大概率就不动了

然后ssh因为不能直接映射22，会和群晖的22冲突，所以就改了个别的端口

### 配置邮箱

还没配好，有机会再写

# Docker部署gitlab-runner

首先部署docker：

```bash
docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

其实那个config映射与否不重要（对于简单的单机配置来说），反正部署一个飞快

`sock` 这里一定要映射，不然用不了

部署好了之后进入容器的终端，先装一个vim：

```bash
apt update && apt install vim
```

## 注册runner

执行：

```bash
gitlab-runner register
```

按照步骤输入信息，参考：[https://docs.gitlab.com/runner/register/](https://docs.gitlab.com/runner/register/)

## 设置privilege

我现在的情况是如果不设置 `privilege=true`，就会报错：

```bash
ERROR: error during connect: Get http://docker:2375/v1.40/info: dial tcp: lookup docker on 8.8.8.8:53: no such host
```

因此编辑一下runner的config：

```bash
vim /etc/gitlab-runner/config.toml
```

把里面的 `privilege` 的值改为 `true`

> 注意：这样操作会让runner里面的容器的权限很大（我记得是root），会有容器逃逸的漏洞，生产环境慎用

# Dockerfile和nginx.conf

简单的前端Dockerfile：

```docker
# 设置基础镜像

FROM nginx:latest

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面

COPY dist/ /usr/share/nginx/html

# 用本地的 default.conf 配置来替换nginx镜像里的默认配置

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

简单的nginx.conf：

```
server {

    listen 80;

    server_name xxx.com;

    location / {

        root /usr/share/nginx/html;

        index index.html index.htm;

        try_files $uri $uri/ /index.html =404;

    }

    location /api/{

        proxy_set_header Host $http_host;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header REMOTE-HOST $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_pass http://localhost:80/;
    }

    error_page 500 502 503 504 /50x.html;

    location = /50x.html {

        root html;
    }
}
```

# 不同分支的部署

在上面使用runner注册时，会填一个 `tag`属性，这与CI配置中的 `tags`是对应的

所以我暂时的做法是在生产环境和测试环境分别部署一个runner，注册到同一个GitLab上

可以CI的 `only` 字段判断来控制部署dev环境还是prod环境

然后通过不同的环境，写上不同的tag，就可以部署到不同的机器上了

配置示例：

```yaml
image: node:14.20.0-slim

stages:
  - install
  - unit-test
  - build
  - deploy-dev
  - deploy-production

variables:
  DOCKER_NAME: "$CI_PROJECT_NAME"
  NGINX_PORT: "8080"

cache:
  paths:
    - node_modules/

install:
  tags:
    - black
  stage: install
  script:
    - yarn --no-optional --registry=https://registry.npm.taobao.org

unit-test:
  tags:
    - black
  stage: unit-test
  script:
    - yarn test

build:
  tags:
    - black
  stage: build
  script:
    - yarn build
  artifacts:
    paths:
      - dist/

deploy-dev:
  before_script:
    - docker info
  image: docker:20.10.16-dind
  services:
    - docker:20.10.16-dind
  tags:
    - black
  stage: deploy-dev
  dependencies:
    - build
  when: manual
  only:
    - dev
    - release/*
    - publish/*
  script:
    - docker build -t $DOCKER_NAME .
    - if [ $(docker ps -aq --filter name=$DOCKER_NAME) ]; then docker rm -f $DOCKER_NAME;fi
    - docker run -d -p $NGINX_PORT:80 --name $DOCKER_NAME $DOCKER_NAME

deploy-production:
  before_script:
    - docker info
  image: docker:20.10.16-dind
  services:
    - docker:20.10.16-dind
  tags:
    - production
  stage: deploy-production
  when: manual
  only:
    - main
    - release/*
    - publish/*
  dependencies:
    - build
  script:
    - docker build -t $DOCKER_NAME .
    - if [ $(docker ps -aq --filter name=$DOCKER_NAME) ]; then docker rm -f $DOCKER_NAME;fi
    - docker run -d -p $NGINX_PORT:80 --name $DOCKER_NAME $DOCKER_NAME
```

# 线上配置

测试环境因为是放在家里，80和443端口被封了，所以群晖写了个反向代理，用别的端口代理了一下，方便公网访问

ECS上面直接在后台新建一个网站，绑定域名，然后重定向到上面的 `$NGINX_PORT`端口就可以用域名+443访问了
