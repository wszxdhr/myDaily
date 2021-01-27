---
title: HomeAssistant折腾实录（一）
date: 2021-01-14 09:44:08
tags: [HomeAssistant,电子设备]
categories: [电子设备折腾记]
---

上班半年多了好久没更新博客了。。期间折腾了好多软硬件，主要是HomeAssistant和树莓派，还有往群晖里面塞了林俊杰全集，周杰伦全集花了好多钱买数字专辑。。当然这都是后话了，今天来聊聊HomeAssistant。

<!-- more -->

注：文中黑群晖系统：6.1.7，机器为蜗牛星际C款双千兆

## 配置Docker

先拉一个镜像，镜像名homeassistant/home-assistant，命令就略了，这里我直接用群晖安装的，注册表搜索"homeassistant"，如下图：

<img src="/images/homeassistant/docker_register.jpg" style="max-height: 300px"/>

双击最上面官方1k star的镜像，pull到本地，点击“映像”，等待homeassistant下载完毕，docker-hub国内链接特别慢，镜像约1G大小，需要耐心等待，有条件可以换源或者科学上网，下载完如图：

<img src="/images/homeassistant/docker_image.jpg" style="max-height: 300px"/>

双击上图中最上面的“homeassistant/home-assistant:latest”，进入设置，进入后不要急着下一步，先进入高级设置：

<img src="/images/homeassistant/path_map.jpg" style="max-height: 400px"/>

上图中的路径映射最好做一个，/config是homeassistant放置配置文件的地方，后面多数时间是跟这个文件夹打交道，保存配置后重启homeassistant，映射到群晖的文件夹下，可以可视化编辑，甚至可以通过smb、afp等协议从本机编辑，想必你也不愿意对着vim锤键盘吧。

<img src="/images/homeassistant/network_setting.jpg" style="max-height: 400px"/>

上图是设置docker容器的网络模式，萌新可以勾选下面的“使用与Docker Host相同的网络”，这样下一步的端口是不用设置的，宿主机会将容器所有port都暴露出去；比较谨慎的可以选择bridge模式，再逐一暴露端口，但是由于hass需要扫描局域网其他设备，所以我不确定bridge模式会不会对后续操作有影响；这里我写的bridge-host是docker的macvlan模式，这个模式群晖本身的docker是没支持的，需要ssh登录到群晖手打代码开启这种模式，后面有机会详细讲，需要的可以谷歌一下，这个模式除了一个大坑（偶尔重启后网卡mac地址会变，本来可以通过命令行锁定mac地址，但是无奈群晖的docker没法搞），其他都挺好的，相当于一个独立网卡。

<img src="/images/homeassistant/port_setting.jpg" style="max-height: 400px"/>

设置端口映射，容器端口为8123，可以映射到主机的任意未开启的端口

<img src="/images/homeassistant/container.jpg" style="max-height: 300px"/>

点击“应用”后容器会自己启动，等待2min，即可用NAS的地址加上刚才设置的端口进入hass的webui

## 进入主界面

<img src="/images/homeassistant/hass_register.jpg" style="max-height: 400px"/>

输入用户名密码等，创建管理员账户

进入一些初始化设置，设置好点击下一步

<img src="/images/homeassistant/hass_homekit_init.jpg" style="max-height: 400px"/>

如果已有homekit智能配件，可以先配置好配件再点完成，进入首页，如下图：

<img src="/images/homeassistant/hass_homepage.jpg" style="max-height: 400px"/>

到此hass的初始化就完成了

## 添加一些设备

<img src="/images/homeassistant/hass_add_device_1.jpg" style="max-height: 400px"/>

如上图，从左侧栏进入“配置”，点击右下角进行设备添加，这里以添加一个yeelight灯为例

<img src="/images/homeassistant/hass_add_yeelight_demo.jpg" style="max-height: 400px"/>

在搜索框中搜索yeelight，点击yeelight进入下一步

<img src="/images/homeassistant/hass_add_yeelight_host.jpg" style="max-height: 200px"/>

输入yeelight所在的ip，找不到的需要下载一个yeelight官方app，找到你想要添加的灯，在设置里打开“局域网控制”，找到对应ip，如果加入过米家也可以在米家查看ip，但是“局域网控制”选项只有yeelight app中有。