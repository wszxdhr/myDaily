---
title: 图形学学习笔记（一）
date: 2021-06-20 20:20:01
tags: [图形学,线性代数]
categories: [图形学]
references:
  - title: 《GAMES101-现代计算机图形学入门-闫令琪》
    url: https://www.bilibili.com/video/BV1X7411F744?from=search&seid=14302378529290805252
  - title: 《向量 - 维基百科》
    url: https://zh.wikipedia.org/wiki/%E5%90%91%E9%87%8F
---

这篇文章说明我开始学图形学啦~

因为工作中经常需要用到矩阵、向量、正交、透视、相机啥的概念，想想还是搞清楚比较好一点。

看了Games101的几节课，为了备忘，记一个学习笔记。

反正图形学的介绍啥的就不写了，懂得都懂。

<!--more-->

# 一、图形学的计算根基：线性代数

讲到这里就流下了悔恨的眼泪，大学时候没学好的课，现在就要含着泪补完。。。

{% image /images/006HJgYYgy1fxuorwt4tpg30aa0bldgu.gif, width=150px %}

## 1 向量

向量，也可以叫矢量，它表示一个方向，从图形学角度来理解向量，就是表示：**起点为原点（0, 0），有方向，有长度**，通俗地讲，也可以理解为一个**起点为原点的有长度的箭头**。

{% image /images/image-20210620214528576.png, width=150px %}

可以参考[维基百科](https://zh.wikipedia.org/wiki/%E5%90%91%E9%87%8F)中对向量的解释

向量有起点和终点，终点和起点的距离为向量的长度，起点到终点的方向为向量的方向。

### 1.1 向量相加

比如我有这样两个向量，分别为{% mathjax %}\vec{a} {% endmathjax %}和{% mathjax %}\vec{b}{% endmathjax %}，我想计算它们相加的结果：{% mathjax %}\vec{c} {% endmathjax %} = {% mathjax %}\vec{a} + \vec{b}{% endmathjax %}

{% image /images/image-20210620220200706.png, width=250px %}

有两种计算方法，一种是三角形定则，一种是平行四边形定则

### 平行四边形定则

{% image /images/image-20210620220106763.png, width=250px %}

（复制并）平移{% mathjax %}\vec{b} {% endmathjax %}向量，使其起始点与{% mathjax %}\vec{a} {% endmathjax %}向量的末尾点重合，同样（复制并）平移{% mathjax %}\vec{a} {% endmathjax %}向量使其起始点与{% mathjax %}\vec{b} {% endmathjax %}向量的末尾点重合，平移后的两个向量的终点相同，作为{% mathjax %}\vec{c} {% endmathjax %}的终点，原点作为{% mathjax %}\vec{c} {% endmathjax %}的起点。

### 三角形定则

{% image /images/image-20210620215505221.png, width=250px %}

将{% mathjax %}\vec{a} {% endmathjax %}和{% mathjax %}\vec{b}{% endmathjax %}首尾相连：{% mathjax %}\vec{a} {% endmathjax %}向量的结束点作为{% mathjax %}\vec{b}{% endmathjax %}向量的起始点

然后再从{% mathjax %}\vec{a} {% endmathjax %}向量的起始点连接到{% mathjax %}\vec{b}{% endmathjax %}向量的结束点，得到的{% mathjax %}\vec{c} {% endmathjax %}即{% mathjax %}\vec{a} + \vec{b}{% endmathjax %}的结果

我个人更偏向三角形定则，因为三角形定则更好理解，且可以扩展为多个向量相加，比如我想求下图中{% mathjax %}\vec{a}+\vec{b}+\vec{c} {% endmathjax %}：

{% image /images/image-20210620223951728.png, width=250px %}

利用三角形定则的延伸，就可以把{% mathjax %}\vec{a}\vec{b}\vec{c} {% endmathjax %}三个向量按顺序首尾相连，得到下图：

{% image /images/image-20210620223624119.png, width=250px %}

上图中，只要将{% mathjax %}\vec{a} {% endmathjax %}、{% mathjax %}\vec{b} {% endmathjax %}、{% mathjax %}\vec{c} {% endmathjax %}分别按顺序首尾相连，结果向量{% mathjax %}\vec{d} {% endmathjax %}即为原点指向最后一个向量（{% mathjax %}\vec{c} {% endmathjax %}）的终点的向量

### 数学角度

{% mathjax %}\vec{a} {% endmathjax %} + {% mathjax %}\vec{b} {% endmathjax %} = {% mathjax %}\vec{c} {% endmathjax %}

可表示为：

{% mathjax %}

\begin{bmatrix}
 x_{a}\\
 y_{a}
\end{bmatrix}
+
\begin{bmatrix}
 x_{b}\\
 y_{b}
\end{bmatrix}
=
\begin{bmatrix}
 x_{c}\\
 y_{c}
\end{bmatrix}
=
\begin{bmatrix}
 x_{a} + x_{b}\\
 y_{a} + y_{b}
\end{bmatrix}

{% endmathjax %}

就是把{% mathjax %}\vec{a}{% endmathjax %}的x与{% mathjax %}\vec{b}{% endmathjax %}的x相加，{% mathjax %}\vec{a}{% endmathjax %}的y与{% mathjax %}\vec{b}{% endmathjax %}的y相加

### 其他规律

矩阵相加**满足结合律也满足交换律**

还是以以下三个向量相加为例：

{% image /images/image-20210620223951728.png, width=250px %}

#### 结合律：

向量相加是满足结合律的：

{% mathjax %}

\vec{a} + \vec{b} + \vec{c} = (\vec{a} + \vec{b}) + \vec{c} = \vec{a} + (\vec{b} + \vec{c})=\vec{d}

{% endmathjax %}

从可视化角度看：

{% mathjax %}\vec{a}+\vec{b}=\vec{e}{% endmathjax %}

{% image /images/image-20210620234010279.png, width=250px %}

{% mathjax %}\vec{e}+\vec{c}=\vec{d}{% endmathjax %}

{% image /images/image-20210620234305526.png, width=250px %}

#### 交换律：

从上面的**三角形定则**可以看出，向量相加可以表示为首尾相连，那么

{% mathjax %}

\vec{a} + \vec{b} = \vec{b} + \vec{a}

{% endmathjax %}

从可视化角度看：

{% mathjax %}\vec{a}+\vec{b}{% endmathjax %}：

{% image /images/image-20210620234445910.png, width=250px %}

{% mathjax %}\vec{b}+\vec{a}{% endmathjax %}：

{% image /images/image-20210620234630738.png, width=250px %}

他们的结果相同