---
title: '记录用过的命令行工具和插件'
date: 2020-07-05 07:08:42
categories: [命令行]
tags: [命令行工具]
---

每次重装系统都要找相同的资料，而且最近重装次数出奇的多，本着程序员不做重复工作的思想，肯定是要记录下的

{% gallery stretch %}

  <img src="/images/record_terminal_plugins/banner.png" style="max-height: 300px"/>

{% endgallery %}

<!-- more -->

首先肯定是安装一个iTerm了：

[https://www.iterm2.com/](https://www.iterm2.com/)

接下来搞一个zsh（Oh-My-Zsh）

[https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

没有brew需要安装一个brew

[https://brew.sh/](https://brew.sh/)

安装会碰到SSL的问题，给命令行挂个梯子就好了

brew安装可能会碰到git最大长度限制或者时间限制问题

然后最好在安装brew的时候就换好源

[https://juejin.im/post/5c738bacf265da2deb6aaf97](https://juejin.im/post/5c738bacf265da2deb6aaf97)

## 安装ZSH及其插件

### 安装插件autojump  zsh-autosuggestions  zsh-syntax-highlighting

参考[https://juejin.im/post/5d773da76fb9a06aff5e9a99](https://juejin.im/post/5d773da76fb9a06aff5e9a99)



### 安装主题

[https://github.com/romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k)



### 去掉前面冗长的用户名

`~/.zshrc`中增加`DEFAULT_USER="用户名"`



## 其他插件

htop

screenfetch

nodejs最好用brew安装，pkg的话装`-g`的模块会有权限问题（猜是双击pkg的用户权限低，brew权限高点）

