---
title: Windows系统考古-Windows 95篇（上）
date: 2021-03-10 09:01:09
tags: [Windows, 考古, 系统]
categories: [考古]
---

{% gallery stretch %}

  <img src="../../../../../../images/windows考古/win95_banner.jpeg" style="width: 350px;"/>

{% endgallery %}

自从上次搞过WINDOWS 3.1的考古，一发不可收拾，虚拟机折腾了DOS 7.1，感觉像是回到了上个世纪。

这次由于有了上次的经验，在系统安装上简直熟悉到不行。


<!-- more -->

## 安装

### 准备工作

{% folding cyan open, 点击展开 / 收缩 %}

这次还是用DOS 6.22做底，可以到这个网站找到相应的镜像：

https://winworldpc.com/product/ms-dos/622

喜欢自己折腾的小伙伴可以选择软盘镜像启动，因为我用的虚拟机，这里建议可以使用最底下的[Virtual PC VHD](https://winworldpc.com/download/3dc392c3-b845-18c3-9a11-c3a4e284a2ef)下载。

WIN 95镜像可以在这里下载：

https://winworldpc.com/product/windows-95/osr-3

我选择的是中文的[CD Windows 95 OSR2.1 \[Simpl. Chinese\] (OEM) (ISO)](https://winworldpc.com/download/3f5444c2-b718-c39a-11c3-a4e284a2c3a5)

喜欢英文系统的也可以用这个[Windows 95 OSR2 (OEM) (ISO)](https://winworldpc.com/download/48373a22-25c3-8911-c3a6-e280947e5254)

{% endfolding %}

### 创建虚拟机

{% folding cyan open, 点击展开 / 收缩 %}

下载完DOS622和WIN95系统，到虚拟机（这里使用VirtualBox）新建一个虚拟机

{% gallery stretch, 1 %}

  <img src="/images/image-20210310091932019.png" style="width: 700px;"/>

{% endgallery %}

进行上述配置之后点击创建，如果创建页面长得跟这个不一样，点击`专家模式`即可切换。

创建之后启动这个虚拟机，启动后返回VirtualBox主程序，选中刚才的虚拟机，点击`设置`，

{% gallery stretch, 1 %}

  <img src="/images/image-20210310092305013.png" style="width: 700px;"/>

{% endgallery %}

按照上图所示点击`选择虚拟盘`，找到解压后的WIN95文件夹，找到`.iso`文件并选择，点击右下角`OK`，再回到虚拟机界面，在命令行中输入`D:`并按下回车。D盘是光驱盘，也就是我们刚刚插入的`.iso`文件。

{% endfolding %}

### 安装Windows

{% gallery stretch, 1 %}

  <img src="/images/image-20210310092518143.png" style="width: 500px;"/>

{% endgallery %}

再输入`setup`命令并按下回车

{% gallery stretch, 1 %}

  <img src="/images/image-20210310092608888.png" style="width: 700px;"/>

  <img src="/images/image-20210310092653680.png" style="width: 700px;"/>

{% endgallery %}

看到提示`To continue, press ENTER. To quit Setup, press ESC.`，按下回车继续。然后就进入安装界面了，后面的安装步骤根据界面选择即可，如果有疑问或者想看详情可以展开查看：

{% folding cyan, 点击展开 / 收缩 %}

{% gallery stretch, 1 %}

<img src="/images/image-20210316094946777.png" style="width: 600px;" />

{% endgallery %}

点击`继续`，

{% gallery stretch, 1 %}

<img src="/images/image-20210316095022363.png" style="width: 600px;" />

{% endgallery %}

点击`是`同意协议，等待一小会，进入安装向导

{% gallery stretch, 1 %}

<img src="/images/image-20210316095121816.png" style="width: 600px;" />

{% endgallery %}

点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316095154432.png" style="width: 600px;" />

{% endgallery %}

再点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316095214263.png" style="width: 600px;" />

{% endgallery %}

根据自己的需求选择安装模式

这里我选择了典型安装，点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316095501868.png" style="width: 600px;" />

{% endgallery %}

这里需要输入序列号（SN），可以在之前的WIN95下载界面底下评论找到好心人的帮助。输入完`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316095545081.png" style="width: 600px;" />

{% endgallery %}

输入一些个人信息并下一步

{% gallery stretch, 1 %}

<img src="/images/image-20210316095608359.png" style="width: 600px;" />

{% endgallery %}

这两个看心情勾，不勾也不会影响啥，毕竟我都不确定虚拟机给的NAT在WIN95上能不能用。

{% gallery stretch, 1 %}

<img src="/images/image-20210316095621425.png" style="width: 600px;" />

{% endgallery %}

然后开始读条。。。

{% gallery stretch, 1 %}

<img src="/images/image-20210316234041464.png" style="width: 600px;" />

{% endgallery %}

这一步我选择了下面这个，毕竟是拿来体验的，那我就把所有功能都装上[滑稽]

{% gallery stretch, 1 %}

<img src="/images/image-20210316234114248.png" style="width: 600px;" />

{% endgallery %}

反复勾选左面的勾，把白底

{% gallery stretch, 1 %}

<img src="/images/image-20210316234128915.png" style="width: 600px;" />

{% endgallery %}

随意输入你的计算机名称等信息，`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316234144554.png" style="width: 600px;" />

{% endgallery %}

选择`不需要启动盘`，点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316234158730.png" style="width: 600px;" />

{% endgallery %}

直接`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210316234224665.png" style="width: 600px;" />

{% endgallery %}

等待读条

{% gallery stretch, 1 %}

<img src="/images/image-20210316234234949.png" style="width: 600px;" />

{% endgallery %}

这里比较有趣的是，以当年计算机的速度，微软看起来计划的是每隔一段进度就展示一个tip，结果现在虚拟机速度都比当时电脑快，导致我每次字都没读几个就跳下一个了😹

{% gallery stretch, 1 %}

<img src="/images/image-20210316234250904.png" style="width: 600px;" />

{% endgallery %}

点击`完成`

{% gallery stretch, 1 %}

<img src="/images/image-20210316234305672.png" style="width: 600px;" />

{% endgallery %}

点击`确定`重启计算机

{% gallery stretch, 1 %}

<img src="/images/image-20210316234341978.png" style="width: 600px;" />

{% endgallery %}

这是在设置中移除虚拟盘，在虚拟机显示界面的底部也有相应按钮

{% gallery stretch, 1 %}

<img src="/images/image-20210316234415626.png" style="width: 600px;" />

{% endgallery %}

等待Windows的第一次运行，`请坐和放宽`

{% endfolding %}

### 安装CPU补丁

如果安装之后启动出现了类似下图的报错，就需要打个CPU补丁了：

{% gallery stretch, 1 %}

<img src="/images/image-20210316234428515.png" style="width: 600px;" />

{% endgallery %}

可能是做底的`DOS 6.22`对中文支持有问题，这里乱码了。。

这里英文显示的应该是：

```text
When initializing device IOS:
Windows protection error. You need to restart your computer.
```

修复步骤：

{% folding cyan, 点击展开 / 收缩 %}

大概估计是因为CPU频率过高，当时电脑很多都只有0.xGHZ的频率，系统怎么也想不到会有十几倍频率的CPU过来砸场子，所以就怂了

{% gallery stretch, 1 %}

<img src="/images/image-20210316235216176.png" style="width: 400px;" />

{% endgallery %}

我的CPU是i7 8700，3.19GHZ，解决方法：

{% gallery stretch, 1 %}

<img src="/images/image-20210316235136965.png" style="width: 600px;" />

{% endgallery %}

先把上图的CPU运行峰值调低一些（实际使用就算是打上了FIX95CPU，也需要调低一些），不要选`启用嵌套VT-x/AMD-V`

{% gallery stretch, 1 %}

<img src="/images/image-20210316234605958.png" style="width: 600px;" />

{% endgallery %}

硬件加速中取消勾选`启用嵌套分页`，如果这个勾掉但是没有打FIX95CPU补丁时，上文中的`When initializing device IOS:`会变成`When initializing device:`，很神奇

这时候就需要隆重介绍FIX95CPU这个补丁了：http://lonecrusader.x10host.com/fix95cpu.html

安装这个补丁之后，Win95就不会报上面那个错了，到网站上下载补丁，解压后在虚拟机中加载其中的ISO文件

{% gallery stretch, 1 %}

<img src="/images/image-20210316234647219.png" style="width: 600px;" />

{% endgallery %}

启动后进入FIX95CPU

{% gallery stretch, 1 %}

<img src="/images/image-20210316234736247.png" style="width: 600px;" />

{% endgallery %}

按任意键继续

{% gallery stretch, 1 %}

<img src="/images/image-20210316234755602.png" style="width: 600px;" />

{% endgallery %}

询问是否阅读README文件，按`N`键不阅读

{% gallery stretch, 1 %}

<img src="/images/image-20210316234811751.png" style="width: 600px;" />

{% endgallery %}

如果像上图一样提示，说明修复成功，**推出ISO镜像**并重启

{% gallery stretch, 1 %}

<img src="/images/image-20210316234856879.png" style="width: 600px;" />

{% endgallery %}

选择`Normal`并按回车

{% endfolding %}

### 进入系统

{% folding cyan, 点击展开 / 收缩 %}

{% gallery stretch, 1 %}

<img src="/images/image-20210316235252718.png" style="width: 600px;" />

{% endgallery %}

这次就可以正常登陆了

{% gallery stretch, 1 %}

<img src="/images/image-20210316235313560.png" style="width: 600px;" />

{% endgallery %}

初始化用户名和密码

{% gallery stretch, 1 %}

<img src="/images/image-20210316235329676.png" style="width: 600px;" />

{% endgallery %}

重复确认密码

{% gallery stretch, 1 %}

<img src="/images/image-20210316235358706.png" style="width: 600px;" />

{% endgallery %}

这时提示插入Win95的CD光盘，按之前更换光盘的步骤，换上之前的Win95安装盘，在底部修改为正确的盘符，不然会提示找不到

{% gallery stretch, 1 %}

<img src="/images/image-20210316235436199.png" style="width: 600px;" />

{% endgallery %}

这里点击`是`

{% gallery stretch, 1 %}

<img src="/images/image-20210316235822539.png" style="width: 600px;" />

{% endgallery %}

可以漫游一下，或者直接点击`关闭`

{% gallery stretch, 1 %}

<img src="/images/image-20210321124735324.png" style="width: 600px;" />

{% endgallery %}

{% endfolding %}

### 配置网络

虽说现在IE3 / 4上网体验已经让人看不下去，但是也是可以简单体验一下的，配置步骤如下：

宿主机尽量使用网线接入，我的MBP用Wifi连接时并没有配置成功。

{% folding cyan, 点击展开 / 收缩 %}

下面我们来搞一下网络，首先按照上图中的操作打开网络设置

{% gallery stretch, 1 %}

<img src="/images/image-20210321124820650.png" style="width: 600px;" />

{% endgallery %}

再按照上面的设置配置好

{% gallery stretch, 1 %}

<img src="/images/image-20210321124925892.png" style="width: 600px;" />

{% endgallery %}

进入虚拟机，打开`我的电脑-控制面板-网络`

{% gallery stretch, 1 %}

<img src="/images/image-20210321125111926.png" style="width: 600px;" />

{% endgallery %}

点击`添加`

{% gallery stretch, 1 %}

<img src="/images/image-20210321125147105.png" style="width: 600px;" />

{% endgallery %}

选择`协议`，再点击`添加`

{% gallery stretch, 1 %}

<img src="/images/image-20210321125217202.png" style="width: 600px;" />

{% endgallery %}

选择`Microsoft`，右边再选择`TCP/IP`

{% gallery stretch, 1 %}

<img src="/images/image-20210321125322027.png" style="width: 600px;" />

{% endgallery %}

按照上图操作，打开属性

{% gallery stretch, 1 %}

<img src="/images/image-20210321125831847.png" style="width: 600px;" />

{% endgallery %}

第一步：填好IP和子网掩码，这个可以直接看宿主机的网络配置来决定，比如宿主机的IP是192.168.1.100，那给个如图的IP比较保险一点

{% gallery stretch, 1 %}

<img src="/images/image-20210321130128770.png" style="width: 600px;" />

{% endgallery %}

按照上图指示配置网关，别忘了最后点击`添加`

{% gallery stretch, 1 %}

<img src="/images/image-20210321130431032.png" style="width: 600px;" />

{% endgallery %}

配置DNS，别忘了点击`添加`，最后点击`确定`

{% gallery stretch, 1 %}

<img src="/images/image-20210321130452326.png" style="width: 600px;" />

{% endgallery %}

再一次点击`确定`完成配置

{% gallery stretch, 1 %}

<img src="/images/image-20210321130535552.png" style="width: 600px;" />

{% endgallery %}

虚拟机虚拟机底部的小光盘logo，选择之前的iso文件，如果已经勾了√就不用管

{% gallery stretch, 1 %}

<img src="/images/image-20210321130539730.png" style="width: 600px;" />

{% endgallery %}

这时候跟之前同样的情况，读条安装一些东西

{% gallery stretch, 1 %}

<img src="/images/image-20210321130555495.png" style="width: 600px;" />

{% endgallery %}

也是一样的，点击`是`

{% gallery stretch, 1 %}

<img src="/images/image-20210321130607198.png" style="width: 600px;" />

{% endgallery %}

点击`是`重启虚拟机

{% gallery stretch, 1 %}

<img src="/images/image-20210321130620043.png" style="width: 600px;" />

{% endgallery %}

经典的“正在关机”画面

{% gallery stretch, 1 %}

<img src="/images/image-20210321131520310.png" style="width: 600px;" />

{% endgallery %}

开机之后双击桌面`Internet`图标，点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131543431.png" style="width: 600px;" />

{% endgallery %}

选择`手动`，点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131555651.png" style="width: 600px;" />

{% endgallery %}

点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131614370.png" style="width: 600px;" />

{% endgallery %}

选择`通过局域网连接`，再点击`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131635137.png" style="width: 600px;" />

{% endgallery %}

点击`不想使用Microsoft Exchange`，并`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131647817.png" style="width: 600px;" />

{% endgallery %}

直接`下一步`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131657919.png" style="width: 600px;" />

{% endgallery %}

点击`完成`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131715660.png" style="width: 600px;" />

{% endgallery %}

这里因为之前配置过DNS，所以点击`否`

{% gallery stretch, 1 %}

<img src="/images/image-20210321131843061.png" style="width: 600px;" />

{% endgallery %}

然后输入百度网址，经过漫长的等待，就可以上网啦。。

不过并没有几个网站能上，大多数网站强制https，我猜是这玩意可能只支持TLS或者咋的，反正新的https都不支持

能上的也这个样了。。各种乱码

将就一下。。“又不是不能用”

~

{% endfolding %}

## 内置应用体验和一些小回忆

一些内置应用，让我回想起十几年前的时光

{% folding cyan, 点击展开 / 收缩 %}

{% gallery stretch, 1 %}

<img src="/images/image-20210321153611787.png" style="width: 600px;" />

{% endgallery %}

体验了一下四五岁刚接触电脑是会最爱玩的软件之一，16色的情况为了模拟浅色，用网格来蒙蔽自己，也是用心了我的MS。

这画图20几年了好像就没啥大更新。。。小时候玩的啥样，现在Win10好像也没太大变化，我知道的最大Feature还是后来2000还是98时候开始能保存jpg格式了

{% gallery stretch, 1 %}

<img src="/images/image-20210321154344328.png" style="width: 600px;" />

{% endgallery %}

老妈小时候最爱玩的游戏，幼儿园时候刚买电脑的时候还没联网，就靠这个消遣了

{% gallery stretch, 1 %}

<img src="/images/image-20210321154433556.png" style="width: 600px;" />

{% endgallery %}

小学时候有一阵特别迷空当接龙，后来总通关就索然无味了

{% gallery stretch, 1 %}

<img src="/images/image-20210321154512818.png" style="width: 600px;" />

{% endgallery %}

小时候小伙伴都被蒙蔽了，都以为左右键一起按就会自动标记，其实都是误操作

真实的秘籍：`[x][y][z][z][y][Enter][Shift长按2秒以上]`知道屏幕左上角出现白点，鼠标悬停在雷上白点变成黑色

{% gallery stretch, 1 %}

<img src="/images/image-20210321154557971.png" style="width: 600px;" />

{% endgallery %}

这玩意我是打开过但是没用过。。。应该是ASDL时期，一拨号电话就占线，所以可以用这个打电话吧。。。好想回到小时候家里还在拨号上网时候去试试。。

{% gallery stretch, 1 %}

<img src="/images/image-20210321154751320.png" style="width: 600px;" />

{% endgallery %}

这4个跟出声有关的软件我都瞎点过，但是奈何电脑里没有可以播放的音视频，就只看了个虚空

{% gallery stretch, 1 %}

<img src="/images/image-20210321154859308.png" style="width: 600px;" />

{% endgallery %}

小时候打开电脑没啥玩的，这种写字板基本都被我点了个遍，里面功能写写文档是够用的，基础功能很全。

经典的智（zhi）能（zhang）ABC，肥肠好（难）用

不过不得不吐槽一下，现在像搜狗输入法，会根据用词频率排序，这个功能是很好的，但是有一个feature，是我在输入之后删掉，又再输入相同词汇一次，它会把次要候选词放到第一位，然后就出现了这种场景：

```text
[fei'chang]
[1. 非常  2. 肥肠  3. 肥]
```

然后顺手按下空格，在光标旁边出现了“非常”，但是这时候你发现我想要的是肥肠，所以我删掉了“非常“，再打一次拼音`feichang`，就出现了下面的情况：

```text
[fei'chang]
[1. 肥肠  2. 非常  3. 肥]
```

我下意识知道按第一次输入时排序，[2]就是肥肠，所以我闭着眼直接按了个[2]，好的，”非常“又出现在光标旁，嘲讽着我的”机智“

这一点着实真不如智能ABC，在那个智能AI还没出现，也没有多少民用大数据统计的年代，人们为了提高打字的速度和选词命中率，基本都是靠背词组的，这应该也是当年五笔、郑码和区位等输入法会火的原因吧，键盘上按下固定的键，就会出现固定的字，肥肠可靠，但是学习成本奇高

{% gallery stretch, 1 %}

<img src="/images/image-20210321154923926.png" style="width: 600px;" />

{% endgallery %}

老爸最爱用的双拼输入法，每次我切到别的，他都会特意切回双拼，等我用的时候还要切回去，小时候因为这个怄气了好久哈哈

{% gallery stretch, 1 %}

<img src="/images/image-20210321155108214.png" style="width: 600px;" />

{% endgallery %}

”任务栏“设置，以前喜欢勾选”自动隐藏“，觉得是一个很高级的功能

{% gallery stretch, 1 %}

<img src="/images/image-20210321155123601.png" style="width: 600px;" />

{% endgallery %}

关机

{% endfolding %}

## 总结

Win95可谓微软的“成名作”，当年微软下重金宣传，还请到了滚石乐队。在发布之时，除非置身荒岛，不然很难不知道Win95，随着铺天盖地的广告而来的，就是像现在的手机一样需要排队购买的新闻了。

Win95相对于3.x版本可以说是在GUI和功能上的重大更新了，正是因为这次大力宣传和系统的革新，奠定了微软在全球系统占有率的霸主地位。

这时候的Win95还是一个基于MS-DOS的大”软件“，说是操作系统其实也只能叫”子系统“，因为没有MS-DOS它就无法启动了，但是这也是最后一个发行版基于DOS的Windows了，后续的Win98开始都是一个独立的操作系统了。

这是我印象里最早接触的Windows系统了，四五岁的时候在爸妈单位的机房接触的最多的就是Win95，那时候它确实是个非常Popular和Fashion的系统，拥有特别多的功能。在那个年代为充满好奇心的我打开了新世界的大门，也是我对计算机兴趣的起源，在Win95中遨游，就像在时间的海洋里回溯，让我可以瞥见当初那个坐在板凳睁大眼睛乱挥鼠标的自己。