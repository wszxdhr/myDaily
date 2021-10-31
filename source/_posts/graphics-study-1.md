---
title: 图形学学习笔记（一）：线性代数 - 向量
date: 2021-06-20 20:20:01
tags: [图形学,线性代数]
categories: [图形学]
references:
  - title: 《GAMES101-现代计算机图形学入门-闫令琪》
    url: https://www.bilibili.com/video/BV1X7411F744
  - title: 《向量 - 维基百科》
    url: https://zh.wikipedia.org/wiki/%E5%90%91%E9%87%8F
  - title: 《右手定则》
    url: https://zh.wikipedia.org/wiki/%E5%8F%B3%E6%89%8B%E5%AE%9A%E5%89%87
---

这篇文章说明我开始学图形学啦~

因为工作中经常需要用到矩阵、向量、正交、透视、相机啥的概念，想想还是搞清楚比较好一点。

看了Games101的几节课，为了备忘，记一个学习笔记。

反正图形学的介绍啥的就不写了，懂的都懂。

第一篇先来说说线性代数

<!--more-->

# 图形学的根基：线性代数

说到线性代数，悔恨的眼泪就流了下来，大学时候没学好的课，现在就要含着泪补完。。。

{% image /images/006HJgYYgy1fxuorwt4tpg30aa0bldgu.gif, width=150px %}

# 向量（Vector）

向量，也可以叫矢量，它表示一个方向，从图形学角度来理解向量，就是表示：**起点为原点（0, 0），有方向，有长度**，通俗地讲，也可以理解为一个**起点为原点的有长度的箭头**。

{% image /images/image-20210620214528576.png, width=150px %}

可以参考[维基百科](https://zh.wikipedia.org/wiki/%E5%90%91%E9%87%8F)中对向量的解释

向量有起点和终点，终点和起点的距离为向量的长度，起点到终点的方向为向量的方向。

由于向量只表示一种方向和方向上的距离，所以平移向量是没有意义的，无论把向量平移到什么位置，向量都是不变的。

比如一个长度为5，方向在第一象限，终点的`x`为`3`，`y`为`4`的向量，在线性代数中可以被表示为：{% mathjax %} \begin{bmatrix}3\\4\end{bmatrix}{% endmathjax %}

向量的表示和矩阵很像（二维向量就是一个2行1列的矩阵），这个后面会提到

### 1 向量的模（Magnitude）

向量的模是指**向量的长度**，是一个数字，不带方向

二维a向量的模的数学表示方式：{% mathjax %} \left \| \vec{a} \right \|=\sqrt{x^{2}+y^{2} }  {% endmathjax %}

比如一个向量：{% mathjax %} \begin{bmatrix}3\\4\end{bmatrix}  {% endmathjax %}，它的模{% mathjax %} \left \| \vec{a} \right \|=\sqrt{3^{2}+4^{2} } =5  {% endmathjax %}

### 2 单位向量（Unit Vector）

单位向量是指**长度为1的向量**

单位向量数学上表示为：{% mathjax %}\hat{a}  {% endmathjax %}

所以有：{% mathjax %} x^{2}+y^{2}=1  {% endmathjax %}

很多人称之为“a帽”（a hat）

单位向量可以由**任意向量除以它的模**得到：

{% mathjax %}\hat{a}=\vec{a} /\left \| \vec{a} \right \|  {% endmathjax %}

### 3 向量相加

比如我有这样两个向量，分别为{% mathjax %}\vec{a} {% endmathjax %}和{% mathjax %}\vec{b}{% endmathjax %}，我想计算它们相加的结果：{% mathjax %}\vec{c} {% endmathjax %} = {% mathjax %}\vec{a} + \vec{b}{% endmathjax %}

{% image /images/image-20210620220200706.png, width=250px %}

有两种计算方法，一种是三角形定则，一种是平行四边形定则

#### 平行四边形定则

{% image /images/image-20210620220106763.png, width=250px %}

（复制并）平移{% mathjax %}\vec{b} {% endmathjax %}向量，使其起始点与{% mathjax %}\vec{a} {% endmathjax %}向量的末尾点重合，同样（复制并）平移{% mathjax %}\vec{a} {% endmathjax %}向量使其起始点与{% mathjax %}\vec{b} {% endmathjax %}向量的末尾点重合，平移后的两个向量的终点相同，作为{% mathjax %}\vec{c} {% endmathjax %}的终点，原点作为{% mathjax %}\vec{c} {% endmathjax %}的起点。

#### 三角形定则

{% image /images/image-20210620215505221.png, width=250px %}

将{% mathjax %}\vec{a} {% endmathjax %}和{% mathjax %}\vec{b}{% endmathjax %}首尾相连：{% mathjax %}\vec{a} {% endmathjax %}向量的结束点作为{% mathjax %}\vec{b}{% endmathjax %}向量的起始点

然后再从{% mathjax %}\vec{a} {% endmathjax %}向量的起始点连接到{% mathjax %}\vec{b}{% endmathjax %}向量的结束点，得到的{% mathjax %}\vec{c} {% endmathjax %}即{% mathjax %}\vec{a} + \vec{b}{% endmathjax %}的结果

我个人更偏向三角形定则，因为三角形定则更好理解，且可以扩展为多个向量相加，比如我想求下图中{% mathjax %}\vec{a}+\vec{b}+\vec{c} {% endmathjax %}：

{% image /images/image-20210620223951728.png, width=250px %}

利用三角形定则的延伸，就可以把{% mathjax %}\vec{a}\vec{b}\vec{c} {% endmathjax %}三个向量按顺序首尾相连，得到下图：

{% image /images/image-20210620223624119.png, width=250px %}

上图中，只要将{% mathjax %}\vec{a} {% endmathjax %}、{% mathjax %}\vec{b} {% endmathjax %}、{% mathjax %}\vec{c} {% endmathjax %}分别按顺序首尾相连，结果向量{% mathjax %}\vec{d} {% endmathjax %}即为原点指向最后一个向量（{% mathjax %}\vec{c} {% endmathjax %}）的终点的向量

#### 数学角度

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

#### 其他规律

矩阵相加**满足结合律也满足交换律**

还是以以下三个向量相加为例：

{% image /images/image-20210620223951728.png, width=250px %}

##### 结合律：

向量相加是满足结合律的：

{% mathjax %}

\vec{a} + \vec{b} + \vec{c} = (\vec{a} + \vec{b}) + \vec{c} = \vec{a} + (\vec{b} + \vec{c})=\vec{d}

{% endmathjax %}

从可视化角度看：

{% mathjax %}\vec{a}+\vec{b}=\vec{e}{% endmathjax %}

{% image /images/image-20210620234010279.png, width=250px %}

{% mathjax %}\vec{e}+\vec{c}=\vec{d}{% endmathjax %}

{% image /images/image-20210620234305526.png, width=250px %}

##### 交换律：

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

### 4 向量相乘

向量相乘主要有两个：**点乘**和**叉乘**

他们的计算结果非常不同：

点乘的结果是一个数字

叉乘的结果是一个向量

#### 4.1 点乘（Dot Product）

点乘的结果是**向量a的模✖️向量b的模✖️它们的夹角余弦**：

{% image /images/image-20210627231952782.png, width=250px %}

{% mathjax %}\vec{a} \cdot \vec{b} = \left \| \vec{a}  \right \| \left \| \vec{b}  \right \| \cos \theta {% endmathjax %}

是一个数字，由上述公式可得：

{% mathjax %}\vec{a} \cdot \vec{b} = \left \| \vec{a}  \right \| \left \| \vec{b}  \right \| \cos \theta {% endmathjax %}

如果{% mathjax %}\vec{a} {% endmathjax %}和{% mathjax %}\vec{b} {% endmathjax %}是单位向量，那么则有：

{% mathjax %} \cos \theta = \hat{a}\cdot \hat{b} {% endmathjax %}

##### 4.1.1 点乘的矩阵计算

2D:

{% mathjax %} \vec{a}\cdot\vec{b}=\begin{pmatrix}x_{a} \\ y_{a}\end{pmatrix}\cdot\begin{pmatrix}x_{b} \\ y_{b}\end{pmatrix}=x_{a}x_{b}+y_{a}y_{b} {% endmathjax %}

3D:

{% mathjax %} \vec{a}\cdot\vec{b}\cdot\vec{c}=\begin{pmatrix}x_{a} \\ y_{a}\\ z_{a}\end{pmatrix}\cdot\begin{pmatrix}x_{b} \\ y_{b} \\ z_{b}\end{pmatrix}=x_{a}x_{b}+y_{a}y_{b}+z_{a}z_{b} {% endmathjax %}

##### 4.1.2 交换律、结合律和分配率

点乘因为结果都是纯数字计算，因此可满足：

**交换律**

{% mathjax %} \vec{a}\cdot \vec{b}=\vec{b}\cdot \vec{a} {% endmathjax %}

**分配率**

{% mathjax %} \vec{a}\cdot( \vec{b}+\vec{c})=\vec{a}\cdot \vec{b}+\vec{a}\cdot \vec{c} {% endmathjax %}

 **结合律**

{% mathjax %} (k\vec{a}) \cdot\vec{b}=\vec{a}\cdot (k\vec{b})=k(\vec{a}\cdot\vec{b}) {% endmathjax %}

结合律由于两个向量点乘的结果不是向量，所以用常量{% mathjax %} k {% endmathjax %}代替

##### 4.1.3 投影长度

如果想知道一个向量在另一个向量上的投影长度，也可以用点乘来计算：

{% mathjax %} \vec{b} _{\bot } = k\hat{a}  {% endmathjax %}

其中{% mathjax %} \hat{a}  {% endmathjax %}是{% mathjax %} \vec{a}  {% endmathjax %}的单位向量，

{% mathjax %} k  {% endmathjax %}为投影长度

则有：

{% mathjax %} k=\left \| \vec{b} _{\bot }  \right \| =\left \| \vec{b} \right \| \cos \theta  {% endmathjax %}

{% image /images/image-20210701000539907.png, width=250px %}

##### 4.1.4 同向 or 不同向

{% image /images/image-20210704190724062.png, width=250px %}

由图可以看出

- {% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{b} {% endmathjax %}是同向的
- {% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{d} {% endmathjax %}是垂直的
- {% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{c} {% endmathjax %}是不同向的

也可以用点乘来判断两个向量是否是相同方向，同向即{% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{b} {% endmathjax %}夹角小于90°：

- {% mathjax %}\vec{a} \cdot \vec{b} > 0 {% endmathjax %}表示{% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{b} {% endmathjax %}同向
- {% mathjax %}\vec{a} \cdot \vec{d} = 0 {% endmathjax %}表示{% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{b} {% endmathjax %}垂直
- {% mathjax %}\vec{a} \cdot \vec{c} < 0 {% endmathjax %}表示{% mathjax %} \vec{a} {% endmathjax %}与{% mathjax %} \vec{b} {% endmathjax %}不同向

#### 4.2 叉乘（Cross Product）

叉乘的结果是一个垂直于源向量所在平面的**向量**

比如{% mathjax %} \vec{a} \times \vec{b}  {% endmathjax %}（{% mathjax %} \vec{a}  {% endmathjax %}叉乘{% mathjax %} \vec{b}  {% endmathjax %}），那么得到的结果向量是垂直于{% mathjax %} \vec{a}  {% endmathjax %}与{% mathjax %} \vec{b}  {% endmathjax %}所在平面的，与{% mathjax %} \vec{a}  {% endmathjax %}和{% mathjax %} \vec{b}  {% endmathjax %}都垂直。

{% image /images/image-20210704192554644.png, width=250px %}

***首先要讲的是，我们这里用右手坐标系来讲述后面的规则***

关于右手定则：[点这里了解](https://zh.wikipedia.org/wiki/%E5%8F%B3%E6%89%8B%E5%AE%9A%E5%89%87)

##### 4.2.1 结果的方向

使用右手定则：

先回忆一下物理中学的安培定则：

{% image /images/img-20210704-23423jj34j534j53.png, width=250px %}

上图中右手除了拇指以外的4个手指沿电流方向放置，拇指指向的是磁感线方向（N极）

再来看叉乘的方向：

{% image /images/image-20210704194705192.png, width=250px %}

首先把{% mathjax %} \vec{a}  {% endmathjax %}与{% mathjax %} \vec{b}  {% endmathjax %}首尾相连（和向量相加时的三角形定则一样），然后让食指、中指等手指贯穿{% mathjax %} \vec{a}  {% endmathjax %}与{% mathjax %} \vec{b}  {% endmathjax %}，这时拇指的方向就是叉乘结果（{% mathjax %} \vec{c}  {% endmathjax %}）的方向

##### 4.2.2 结果的长度

结果的长度是{% mathjax %} \vec{a}  {% endmathjax %}的模**乘以**{% mathjax %} \vec{b}  {% endmathjax %}的模**乘以**{% mathjax %} \sin \theta   {% endmathjax %}：

{% mathjax %} \left \| \vec{a} \times \vec{b}  \right \| =\left \| \vec{a}  \right \|\left \|  \vec{b}  \right \|\sin \theta  {% endmathjax %}

##### 4.2.3 一些规律

首先坐标轴是可以互相叉乘得到的（**仅限右手坐标系**）：

<p>{% mathjax %} \vec{x} \times \vec{y} = +\vec{z}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{y} \times \vec{x} = -\vec{z}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{y} \times \vec{z} = +\vec{x}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{z} \times \vec{y} = -\vec{x}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{z} \times \vec{x} = +\vec{y}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{x} \times \vec{z} = -\vec{y}  {% endmathjax %}</p>

还有其他的规律：

<p>{% mathjax %} \vec{a} \times \vec{b} = -\vec{b} \times \vec{a}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{a} \times \vec{a} = \vec{0}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{a} \times ( \vec{b}+\vec{c}) = \vec{a} \times \vec{b}+\vec{a} \times \vec{c}  {% endmathjax %}</p>

<p>{% mathjax %} \vec{a} \times (k\vec{b}) = k(\vec{a} \times \vec{b})  {% endmathjax %}</p>

##### 4.2.4 矩阵中的叉乘

{% mathjax %} \vec{a} \times \vec{b} = A*b = \begin{bmatrix} 0 & -z_{a} & y_{a} \\ z_{a} & 0 & -x_{a}\\ -y_{a} & x_{a} & 0\end{bmatrix}\begin{bmatrix}x_{b} \\y_{b} \\z_{b}\end{bmatrix}=\begin{bmatrix}y_{a}z_{b}-y_{b}z_{a} \\z_{a}x_{b}-x_{a}z_{b} \\x_{a}y_{b}-y_{a}x_{b}\end{bmatrix}  {% endmathjax %}

关于这个矩阵相乘，下一节【矩阵】会讲到

##### 4.2.5 叉乘的作用

向量叉乘的实际应用十分广泛，这里挑几个聊聊：

**判断一个向量在另一个向量的顺时针还是逆时针方向（180°内）**

{% image /images/image-20210704203039388.png, width=250px %}

如图所示{% mathjax %} \vec{b}  {% endmathjax %}在{% mathjax %} \vec{a}  {% endmathjax %}的逆时针方向，那么如何用数学方法来判断呢？

就是用{% mathjax %} \vec{a}  {% endmathjax %}叉乘{% mathjax %} \vec{b}  {% endmathjax %}：

{% mathjax %} \vec{a} \times \vec{b}  {% endmathjax %}的结果向量的{% mathjax %} z  {% endmathjax %}值如果为正，那么{% mathjax %} \vec{b}  {% endmathjax %}就在{% mathjax %} \vec{a}  {% endmathjax %}的逆时针方向，反之就是顺时针方向

**注意：**这里的顺时针、逆时针，仅限在180°内判断，超过180°时应以另外一边没超过180°的计算为准

**判断一个点是否在多边形内（凸多边形）**

{% image /images/image-20210704203123975.png, width=250px %}

判断一个点是否在凸多边形内，首先计算出逆时针的多边形，如上图，循环计算AB、BC、CA三条边，如计算CA时，先得到向量AP，然后进行叉乘{% mathjax %} \vec{CA} \times \vec{AP}  {% endmathjax %}，得到结果向量的{% mathjax %} z {% endmathjax %}值大于0，则证明P点在CA的左侧（内侧），以此类推，如果{% mathjax %} \vec{CA} \times \vec{AP}  {% endmathjax %}、{% mathjax %} \vec{AB} \times \vec{BP}  {% endmathjax %}、{% mathjax %} \vec{BC} \times \vec{CP}  {% endmathjax %}的结果的{% mathjax %} z {% endmathjax %}值都大于0，则可以证明P在三角形ABC内

### 5 向量与坐标系

假设存在三个向量{% mathjax %} \vec{u}\vec{v}\vec{w}  {% endmathjax %}，如果同时满足：

- {% mathjax %} \left \| \vec{u} \right \| =\left \| \vec{v} \right \| =\left \| \vec{w} \right \| =1  {% endmathjax %}

- {% mathjax %} \vec{u} \cdot \vec{v}=\vec{v} \cdot \vec{w}=\vec{u} \cdot \vec{w}=0   {% endmathjax %}
- {% mathjax %} \vec{w} =\vec{u} \cdot \vec{v}   {% endmathjax %}

则可以证明向量{% mathjax %} \vec{u}\vec{v}\vec{w}  {% endmathjax %}是一个**右手坐标系**。

且有：

当前坐标系下任意向量表示为：

{% mathjax %} \vec{p} =(\vec{p} \cdot  \vec{u} ) \vec{u}+(\vec{p}\cdot\vec{v})\vec{v}+(\vec{p}\cdot\vec{w})\vec{w}  {% endmathjax %}

相当于是将{% mathjax %} \vec{p}   {% endmathjax %}投影到三个坐标轴上，使用坐标轴表示它

### 下节预告

下节聊聊矩阵运算，其实向量也可以理解为一种矩阵