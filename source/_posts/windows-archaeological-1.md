---
title: Windows系统考古-Windows 3.1篇
date: 2020-05-29 17:54:48
tags: [Windows, 考古, 系统]
categories: [考古]
---

今天折腾了一天Docker和虚拟机，无意中看到了以前Windows 2000的镜像文件，突然心血来潮想从Windows 3.x开始体验一圈Windows，毕竟也算半个软粉来着，算是为着情怀追溯一下。

这是我第一次安装这么古老的Windows，发现这个Windows 3.1异常的难装（电脑是MacOS+虚拟机VirtualBox），折腾了俩小时终于弄通了。

<!-- more -->

##安装 

这里卡的时间最长，碰了很多壁，最后简化了一下步骤，大概思路是先装好MS-DOS做底（光驱镜像或者直接VHD文件），版本应该区别不大，我这次用的是6.2，然后插入软盘，输入`A:\`进入软盘目录，输入`setup`打开SETUP程序开始安装，一路下一步，期间不停更换软盘，安装成功之后重启，进入DOS输入`WIN`进入系统，就可以啦~

MS-DOS是微软最开始的命令行操作系统，相当于基于DOS开发，DOS是微软最早为IBM开发的命令行系统，今天要安装的Windows 3.1是基于DOS内核，与其说3.1是一个系统，不如说它是一个子系统或者App，因为它是无法独立运行的。Windows NT 3.x开始基于WinNT内核，在启动方面也方便不少（之前要进入DOS，安装Win，重启后再输入win命令才能进入Windows系统）

### 虚拟机准备

首先准备一个VirtualBox（vmware也可以的），新建一个虚拟机

<img src="/images/windows考古/win31_setup_1.png" style="max-height: 400px"/>

输入名称，选择系统版本，点击继续，选择内存大小，不要选太大，32MB就够用了

<img src="/images/windows考古/win31_setup_2.png" style="max-height: 400px"/>

选择虚拟硬盘文件，这里我直接用别人封装好的MS-DOS来启动，省的安装很麻烦，下载链接：[https://winworldpc.com/product/ms-dos/622](https://winworldpc.com/product/ms-dos/622)

进入上面这个网页选这个：

<img src="/images/windows考古/win31_setup_5.png" style="max-height: 50px"/>

上图是代表虚拟机专用的VHD硬盘文件，相当于帮你装好DOS系统了，比较方便，点击链接进去选一个下载，如下图：

<img src="/images/windows考古/win31_setup_6.png" style="max-height: 400px"/>

下载好刚刚虚拟机创建这边选择下载好的VHD文件

<img src="/images/windows考古/win31_setup_3.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_4.png" style="max-height: 400px"/>

然后点击“创建”按钮，创建一个虚拟机，回到主界面，启动这个虚拟机

这时候需要先下载一个Windows 3.1的软盘文件：[https://winworldpc.com/product/windows-3/311](https://winworldpc.com/product/windows-3/311)，这个选择IBM OEM即可，大致下载步骤如上文

**注意**：这里安装软盘最好在虚拟机启动之后，如果没有按照这个顺序，BIOS会按照：软盘->硬盘这个顺序启动（除非你改了启动顺序），而软盘是没法直接启动的，必须依托于DOS系统，软盘中内容仅仅相当于一个App而已，这样会造成很多多余步骤

下载好之后装载软盘：

<img src="/images/windows考古/win31_setup_7.png" style="max-height: 400px"/>

点击如下按钮和选项：

<img src="/images/windows考古/win31_setup_8.png" style="max-height: 300px"/>

选择img文件：

<img src="/images/windows考古/win31_setup_9.png" style="max-height: 400px"/>

点击“打开”回到设置界面，点击确定

切换到虚拟机窗口，输入`A:\`+回车，进入A盘目录（DOS以及Windows都延续了这个传统，软盘一般都是A盘）

<img src="/images/windows考古/win31_setup_10.png" style="max-height: 400px"/>

进入目录后输入`setup`来启动SETUP程序

<img src="/images/windows考古/win31_setup_11.png" style="max-height: 400px"/>

然后一路回车

{% folding cyan, 中间步骤 %}

<img src="/images/windows考古/win31_setup_12.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_13.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_14.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_15.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_16.png" style="max-height: 400px"/>

{% endfolding %}

连着两次更换软盘，步骤参照上文介绍的选择，根据`#`后面的数字决定选用哪个img，更换完成回来点回车

<img src="/images/windows考古/win31_setup_17.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_18.png" style="max-height: 400px"/>

输入姓名和公司名，然后疯狂点击`Continue`继续

<img src="/images/windows考古/win31_setup_19.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_20.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_21.png" style="max-height: 400px"/>

<img src="/images/windows考古/win31_setup_22.png" style="max-height: 400px"/>

点击`Install`：

<img src="/images/windows考古/win31_setup_23.png" style="max-height: 400px"/>

点击OK

<img src="/images/windows考古/win31_setup_24.png" style="max-height: 400px"/>

自己选择运行向导或跳过：

<img src="/images/windows考古/win31_setup_25.png" style="max-height: 400px"/>

可以不用重启，点击`Return to MS-DOS`直接进入

<img src="/images/windows考古/win31_setup_26.png" style="max-height: 400px"/>

返回命令行，输入`win`进入Windows：

<img src="/images/windows考古/win31_setup_27.png" style="max-height: 400px"/>

可以看到Windows界面啦：

<img src="/images/windows考古/win31_setup_28.png" style="max-height: 400px"/>

操作演示：

{% video /images/windows考古/win31.mp4 %}

## 总结

考古第一站，感受颇多，再一次领略了一次过去的系统是有多难装，一张3.5寸软盘只有1.44MB，为了安装一个系统，需要7张软盘配合使用才能完成，在之后几个版本开始都使用光盘安装，但是出于CD容量限制，当时很多系统盘也是2个CD装的。

这个系统在现在的人看来基本是简陋的不行，没有丰富的颜色和图形，拖动图标为了不丢帧，只能把它处理成黑白的，在最大化和最小化的时候会有明显的从上到下刷新屏幕的感觉，应该是处理能力不够，毕竟正常移动鼠标光标和图标页面都是只刷新一部分来实现的。

虽然以前偶尔会目睹Windows 3.1的真容，但是自己操作一番，还是能再次感受到当年程序员的超凡能力，每一个小模块可能都需要付出巨大的努力，一个系统（DOS + Windows）可以只有十几M大小，体积这么少的代码就可以实现这么多的功能，内心油然而生大量的佩服。