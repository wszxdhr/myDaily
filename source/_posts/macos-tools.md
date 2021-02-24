---
title: MacOS开发工具的配置云端化体验
date: 2021-02-02 22:54:10
tags: [MacOS,效率,开发工具]
categories: [软件使用]
---

自从毕业，我的电脑越来越多，到目前为止，有三台正在服役的MacOS系统电脑（1×MBP+2×黑苹果），又由于我的命令行习惯多变，由云端管理和放置配置文件变成了一个必要需求。

主要包括：iTerm、ZSH、Alfred、Dash、iStatMenus、Snipaste

主要还因为懒，希望提高更多的效率来支撑我的懒

> 懒惰是科学的第一生产力

只要我足够懒，我的工作效率就足够高。

<!-- more -->

# 一、准备工作

想达成完美的体验，一个稳定的网络是必要的，主要用于开机 or 开启软件时联网读取配置。很多时候iCloud会丢失一些不经常访问的缓存，打开一次之后到下次启动前一般不再需要读取配置文件了。

# 二、iTerm

进入iTerm2，按`⌘+,`进入偏好设置，如图所示：

<img src="/images/macos_tools/iterm1.jpg" style="max-height: 300px"/>

点击`Browse`按钮选择iCloud中的某个文件夹即可。

# 三、Alfred

进入Alfred的偏好设置，如图所示：

<img src="/images/macos_tools/alfred1.jpg" style="max-height: 500px"/>

同样也是选择文件夹即可

# 四、Dash

进入Dash的偏好设置，如图所示：

<img src="/images/macos_tools/dash1.jpg" style="max-height: 400px"/>

点击`Set Up Syncing...`按钮

<img src="/images/macos_tools/dash2.jpg" style="max-height: 400px"/>

点击`Set Sync Folder...`按钮，选择iCloud文件夹即可同步配置和文档

# 五、ZSH

ZSH的配置比较麻烦，首先先安装Oh-My-ZSH

可以参照这篇文章：https://www.jianshu.com/p/53eb1075f627

安装插件：https://www.jianshu.com/p/59a3f1601cfc

然后我正在使用的不是原装的主题，使用了powerlevel10k，GitHub地址和教程：https://github.com/romkatv/powerlevel10k

这些都搞定了之后开始正题

ZSH的配置文件在`~/.zshrc`，powerlevel10k的配置文件在`~/.p10k.zsh`

这两个文件用finder是看不到的，需要用命令行的`la`命令，或者`ls -a`命令才能看到

然后打开finder，进入`iCloud云盘`，新建一个文件夹，将文件夹拖入命令行，就能看到iCloud文件夹的具体路径了

命令行回到home文件夹（`~路径`），用cp命令把`.zshrc`和`.p10k.zsh`复制到刚刚iCloud中新建的文件夹中

再在`~`目录下分别修改两个文件，把里面内容都删掉，加一行source命令，类似：

`source /User/xxx/iCloud/config/.zshrc`

这样每次zsh和powerlevel10k在读取他们的配置文件时，就相当于在读取iCloud中存储的配置文件了

# 七、Snipaste

经过上面的操作，这个简单了，看图吧

<img src="/images/macos_tools/snipaste.jpg" style="max-height: 400px"/>