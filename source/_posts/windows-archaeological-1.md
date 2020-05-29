---
title: Windows系统考古-Windows 3.1篇
date: 2020-05-29 17:54:48
tags: [Windows, 考古, 系统]
categories: [考古]
---

今天折腾了一天Docker和虚拟机，无意中看到了以前Windows 2000的镜像文件，突然心血来潮想从Windows 3.x开始体验一圈Windows，毕竟也算半个软粉来着（49年入国军买过一波Lumia 930来着）。

这是我第一次用这么古老的Windows，人生中第一次接触Windows是小时候玩过的Win95，发现这个Windows 3.1异常的难装（电脑是MacOS+虚拟机VirtualBox），折腾了俩小时终于弄通了。

<!-- more -->

##安装 

这里卡的时间最长，碰了很多壁，最后简化了一下步骤，大概思路是先装好MS-DOS做底（光驱镜像或者直接VHD文件），版本应该区别不大，我这次用的是6.2，然后插入软盘，输入`A:\`进入软盘目录，输入`setup`打开SETUP程序开始安装，一路下一步，期间不停更换软盘，安装成功之后重启，进入DOS输入`WIN`进入系统，就可以啦~

### 虚拟机准备

首先准备一个VirtualBox（vmware也可以的），新建一个虚拟机

<img src="/images/windows考古/win31_setup_1.png" style="max-height: 400px"/>

输入名称，选择系统版本，点击继续，选择内存大小，不要选太大，32MB就够用了

<img src="/images/windows考古/win31_setup_2.png" style="max-height: 400px"/>

选择虚拟硬盘文件，这里我直接用别人封装好的MS-DOS来启动，省的安装很麻烦，下载链接：[https://winworldpc.com/product/ms-dos/622](https://winworldpc.com/product/ms-dos/622)

<img src="/images/windows考古/win31_setup_4.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_5.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_3.png" style="max-height: 400px"/>