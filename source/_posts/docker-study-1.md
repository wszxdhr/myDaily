---
title: Docker介绍
date: 2024-06-23 11:29:26
tags: [Docker,命令行工具,部署]
categories: [学习和实践笔记]
references:
- title: 《什么是Docker？》
  url: https://www.redhat.com/zh/topics/containers/what-is-docker
- title: 《虚拟化技术 - Docker Vs. 虚拟机》
  url: https://pdai.tech/md/devops/docker/docker-01-docker-vm.html
- title: 《Docker原理最全详解(图文全面总结)》
  url: https://mp.weixin.qq.com/s/4Jn4QPJTzqGGQscBn-s8nw?poc_token=HG_hd2ajF6vuMa21ExxzL_wDyFQFlBzExUZPXKky
- title: 《浅谈Docker逃逸》
  url: https://xz.aliyun.com/t/12495?time__1311=mqmhD5AKYKBKDK0QD%2FzTy8j%2B2ZgDoD&alichlgref=https%3A%2F%2Fwww.google.com%2F
- title: 《花了三天时间终于搞懂 Docker 网络了》
  url: https://cloud.tencent.com/developer/article/1747307
- title: 《全网最详细的Docker网络教程详解》
  url: https://juejin.cn/post/7041923410649153543
- title: 《Docker 入门教程》
  url: https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
---

最近6月开始，docker所有国内源不是被叫停了就是被屏蔽了，借这个机会写篇docker文章

{% image /images/2b455e1db1a7f5cfeacb82a8f97fa231.png %}

<!-- more -->

# Docker介绍

什么是Docker？

RedHat首先给出了区分以达到共识：

{% noteblock quote %}
以下简要说明 Docker 以便区分：
- IT 软件"Docker"是支持创建和使用 Linux® 容器的容器化技术。
- 开源 Docker 社区致力于改进这类技术，并免费提供给所有用户，使之获益。
- Docker Inc. 公司凭借 Docker 社区产品起家，主要负责提升社区版本的安全性，并将技术进步与广大技术社区分享。此外，它还专门对这些技术产品进行完善和安全固化，以服务于企业客户。

{% endnoteblock %}

简要来说以下我们所说的Docker主要指IT 软件，即容器化技术

## Docker原理

利用Linux Namespace功能实现容器之间的隔离，利用Cgroup功能实现，通过Union FS合成文件系统，实现修改增量

这些功能都是Linux独有的，所以在Windows和MacOS中的Docker都是通过虚拟化（轻量虚拟机）实现的

### 和虚拟机对比

最开始Docker是基于LXC（轻量化虚拟）实现的，其实容器化与虚拟化有很多相同之处，比如都可以进行隔离、映射、硬件限制等

但是看起来虚拟化由于原理优势，可以实现更多功能，如各种硬件模拟、直接支持显示输出（通过虚拟显示器）、支持虚拟完整系统如Windows / MacOS等

Docker的突出优势在于轻量化，因为用了Linux的内核功能，它失去了虚拟硬件的功能，但是在资源占用上面优势很大

以下是一些对比：

|          | 虚拟机       | Docker     |
|----------|-----------|------------|
| CPU数量限制  | √         | √          |
| 内存限制     | √         | √          |
| 端口映射     | √         | √          |
| 路径映射     | √         | √          |
| 快照       | √         | 支持打包当前容器   |
| 硬件直通     | √         | √          |
| 使用单独网络ip | √（虚拟交换机）  | √（macvlan） |
| 使用多个ip接入 | √（虚拟多个网卡） | ×          |
| 容器间通信    | √         | √          |

{% image /images/87cd800c8a6485fbe41084d47fbeba79.jpg, alt=图源：《虚拟化技术 - Docker Vs. 虚拟机》 %}

Docker镜像对于底层系统，可以理解为一种“增量”，Docker需要使用系统底层的硬件驱动，比如文件系统，可以直接使用建立在宿主机已有的硬盘的目录中，Docker的进程是直接运行在宿主机上的

虚拟机的文件是“全量”的，所有虚拟机系统使用的文件，都在虚拟机的镜像中，虚拟机使用的**虚拟**硬盘（注意这里的描述排除直通的情况）一般是完整的虚拟了一块硬盘，虚拟机的进程是运行在虚拟出来的计算机上的，无法直接通过宿主机kill虚拟机内的进程

可见其实**从功能上讲**，Docker是虚拟机的子集，我们完全可以通过虚拟机实现容器化功能，而无法通过Docker模拟一些硬件

### 和直接安装应用对比

Docker优势：

1. 可以有效隔离多个应用
2. 可以让应用运行在不同的Linux系统环境（指不同的发布，比如：A应用依赖debian，B应用需要使用kali，那么在同一个宿主机内可以运行不同的底层容器来实现）
3. 试错成本低，可以轻松运行一次性程序而不污染宿主机环境，可以在出现重大错误（比如勿删系统文件）的情况下快速重置

# 安全问题

## 越权

在Docker启动时可以指定容器权限等级，有些需要管理整个Docker的容器，如Portainer，需要更大的权限来对宿主机系统的Docker进行操作

逃逸：[这里介绍的很详细，就不贴进来了](https://xz.aliyun.com/t/12495?time__1311=mqmhD5AKYKBKDK0QD%2FzTy8j%2B2ZgDoD&alichlgref=https%3A%2F%2Fwww.google.com%2F)

## 镜像本身投毒

镜像本身附带木马

镜像Dos宿主机

# Docker基本操作

## 基本命令

```bash

# 列出本机的所有 image 文件。
$ docker image ls

```

```bash
# 删除 image 文件
$ docker image rm [imageName]
```

```bash
# 拉去镜像
docker image pull [imageName]
```

```bash
# 创建容器
docker run [imageName]
```

```bash
# 停止容器
docker kill [containerID]
```

```bash
# 删除容器
docker rm [containerID]
```

## 网络

Docker的网络原理：[花了三天时间终于搞懂 Docker 网络了](https://cloud.tencent.com/developer/article/1747307)

{% noteblock quote %}

| Docker网络模式	     | 配置                        | 说明                                                                                                                    |
|-----------------|---------------------------|-----------------------------------------------------------------------------------------------------------------------|
| host模式          | –net=host                 | 容器和宿主机共享Network namespace。容器将不会虚拟出自己的网卡，配置自己的IP 等，而是使用宿主机的IP和端口。                                                      |
| container模式     | –net=container:NAME_or_ID | 容器和另外一个容器共享Network namespace。kubernetes中的pod就是多个容器共享一个Network namespace。创建的容器不会创建自己的网卡，配置自己的 IP， 而是和一个指定的容器共享IP、端口范围。 |
| none模式          | –net=none                 | 容器有独立的Network namespace，并没有对其进行任何网络设置，如分配veth pair和网桥连接，配置IP等。该模式关闭了容器的网络功能。                                          |
| bridge模式        | –net=bridge               | (默认模式)。此模式会为每一个容器分配、设置IP等，并将容器连接到一个docker0虚拟网桥，通过docker0网桥以及Iptable nat表配置与宿主机通信                                      |
| Macvlan network | 无                         | 容器具备Mac地址，使其显示为网络上的物理 设备                                                                                              |
| Overlay         | 无                         | (覆盖网络): 利用VXLAN实现的bridge模式                                                                                            |

{% endnoteblock %}

# Docker的实践
