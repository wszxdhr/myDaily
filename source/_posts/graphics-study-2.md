---
title: 图形学学习笔记（二）：线性代数 - 矩阵
date: 2021-07-04 21:27:33
tags: [图形学,线性代数,矩阵]
categories: [图形学]
references:
  - title: 《GAMES101-现代计算机图形学入门 - 闫令琪》
    url: https://www.bilibili.com/video/BV1X7411F744
  - title: 《矩阵 - 维基百科》
    url: https://zh.wikipedia.org/wiki/%E7%9F%A9%E9%98%B5
  - title: 《矩阵乘法 - 百度百科》
    url: https://baike.baidu.com/item/%E7%9F%A9%E9%98%B5%E4%B9%98%E6%B3%95/5446029
  - title: 《线性代数的本质 - 03 - 矩阵与线性变换 - 3Blue1Brown》
    url: https://www.bilibili.com/video/BV1ns41167b9?from=search&seid=12106414102479361333&spm_id_from=333.337.0.0
  - title: 《线性变换 - 百度百科》
    url: https://baike.baidu.com/item/%E7%BA%BF%E6%80%A7%E5%8F%98%E6%8D%A2/5904192
  - title: 《仿射变换 - 维基百科》
    url: https://zh.wikipedia.org/wiki/%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2
  - title: 《逆矩阵 - 百度百科》
    url: https://baike.baidu.com/item/%E9%80%86%E7%9F%A9%E9%98%B5/10481136
---

这篇文章继续上一次的文章，上一回讲到线性代数中的向量，向量是一个表示方向，起点为原点，且具有模（长度）的一个“箭头”。

本篇文章主要简单描述一下**矩阵**。

## 矩阵（Matrix）

> 数学上，一个{% mathjax %} m\times n{% endmathjax %}的矩阵是一个由{% mathjax %} m{% endmathjax %}行（row）{% mathjax %} n{% endmathjax %}列（column）元素排列成的矩形阵列。矩阵里的元素可以是数字、符号或数学式。
>
> ——维基百科

从白话上讲，矩阵就是一个能排成矩形的数（一堆数），大概长这样：

{% mathjax %} 

\begin{bmatrix}
 1 & 2 & 3 & 4\\
 5 & 6 & 7 & 8\\
 9 & 10 & 11 & 12\\
 13 & 14 & 15 & 16
\end{bmatrix}

{% endmathjax %}

矩阵本身是没有意义的，我们可以赋予一个矩阵不同的意义，比如它可以作为一个坐标到另外一个坐标变换的“桥梁”，一个坐标（向量）应用一个矩阵，就可以变成另一个坐标（向量）

## 矩阵的乘法

现提出本章的最基础的问题：矩阵相乘会得出什么样的结果？

答案是：还是个矩阵

标准回答引用自百度百科：

> 设**A**为{% mathjax %} m\times p{% endmathjax %}的矩阵，**B**为{% mathjax %} p\times n{% endmathjax %}的矩阵，那么称{% mathjax %} m\times n{% endmathjax %}的矩阵**C**为矩阵**A**与**B**的乘积，记作{% mathjax %} C=AB{% endmathjax %}，其中矩阵**C**中的第{% mathjax %}i{% endmathjax %}行第{% mathjax %} j{% endmathjax %}列元素可以表示为：{% mathjax %} (AB)_{ij}=\sideset{}{}\Sigma_{k=1}^p  a_{ik} b_{kj} =a_{i1} b_{1j} +a_{i2} b_{2j} +\cdots+a_{ip} b_{pj}  {% endmathjax %}

### 乘法的结果

假设：

<p>{% mathjax %} 
A=\begin{bmatrix}
 a_{1,1}  & a_{1,2} & a_{1,3}\\
 a_{2,1} & a_{2,2} & a_{2,3}
\end{bmatrix}
{% endmathjax %}</p>

<p>{% mathjax %} 
B=\begin{bmatrix}
 b_{1,1}  & b_{1,2}\\
 b_{2,1} & b_{2,2}\\
 b_{3,1} & b_{3,2}
\end{bmatrix}
{% endmathjax %} </p>

<p>{% mathjax %} C=AB=\begin{bmatrix}
 a_{1,1}b_{1,1}+a_{1,2}b_{2,1}+a_{1,3}b_{3,1} & a_{1,1}b_{1,2}+a_{1,2}b_{2,2}+a_{1,3}b_{3,2}\\
 a_{2,1}b_{1,1}+a_{2,2}b_{2,1}+a_{2,3}b_{3,1} & a_{2,1}b_{1,2}+a_{2,2}b_{2,2}+a_{2,3}b_{3,2}
\end{bmatrix}
{% endmathjax %}</p>
以上结果满足特性：

- 矩阵C的行数等于矩阵A的行数，C的列数等于B的列数。
- 乘积C的第m行第n列的元素等于矩阵A的第m行的元素与矩阵B的第n列对应元素乘积之和。

### 乘法的条件

不是随便两个矩阵都可以相乘的，矩阵相乘需要满足：

{% note 当矩阵A的列数（column）等于矩阵B的行数（row）时，A与B可以相乘。 %}

### 乘法的基本性质

1. 乘法结合律： {% mathjax %} (AB)C=A(BC){% endmathjax %}
2. 乘法左分配律：{% mathjax %} (A+B)C=AC+BC{% endmathjax %}
3. 乘法右分配律：{% mathjax %} C(A+B)=CA+CB{% endmathjax %}
4. 对数乘的结合性：{% mathjax %} k(AB)=(kA)B=A(kB){% endmathjax %}
5. 转置{% mathjax %} (AB)^{T}=B^{T}A^{T} {% endmathjax %}
6. 矩阵乘法在以下两种情况下满足交换律。
   1. A和伴随矩阵相乘满足交换律：{% mathjax %} AA^{\ast}  =A^{\ast}  A{% endmathjax %}。
   2. A和单位矩阵或数量矩阵满足交换律：{% mathjax %} AE=EA{% endmathjax %}。

## 矩阵的应用

矩阵在图形学中有特别多的应用，我们先以2D切入，然后再说3D的

### 缩放矩阵（Scale Matrix）

{% image /images/35095c5b16fe6b3887538d3da037831a.png, width=500px %}

缩放这个五角星到长宽均为原来的一半（0.5倍），那么缩放后的长（x）和宽（y）为：

<p>{% mathjax %} x'=sx {% endmathjax %}</p>

<p>{% mathjax %} y'=sy {% endmathjax %}</p>

那么写成矩阵形式：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}=
\begin{bmatrix}
 s & 0\\
 0 & s
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

 {% endmathjax %}

那么如果我保持高度不变，只改变宽度的大小呢：

{% image /images/df4b8a15c9dc7978faef46f9482fdf01.png, width=500px %}

缩放这个小人的宽度（x）为之前的一半（0.5倍），高度（y）保持相同，那么依然是：

<p>{% mathjax %} x'=sx {% endmathjax %}</p>

<p>{% mathjax %} y'=sy {% endmathjax %}</p>

写成矩阵形式：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}=
\begin{bmatrix}
 s_{x}  & 0\\
 0 & s_{x}
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

 {% endmathjax %}

所以缩放矩阵的{% mathjax %} s_{x} {% endmathjax %}和{% mathjax %} s_{y} {% endmathjax %}可以不相等，甚至也可以是负数。如都为-1的情况下图像就会出现在第三象限

### 旋转矩阵（绕某条线旋转）（Rotation Matrix）

{% image /images/d2a55575e78d9f08d7fcbbec5f9c0045.png, width=500px %}

这张图相当于绕y轴旋转180度，缩放后的x和y：

<p>{% mathjax %} x'=-x {% endmathjax %}</p>

<p>{% mathjax %} y'=y {% endmathjax %}</p>

写成矩阵形式：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}=
\begin{bmatrix}
 -1  & 0\\
 0 & 1
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

{% endmathjax %}

### 剪切矩阵（Shear Matrix）

{% image /images/596fa44510a8120245f2d40b1a3b4f2d.png, width=500px %}

也就是说，当{% mathjax %} y = 1 {% endmathjax %}时，右上角的点变为{% mathjax %} x = a + 1 {% endmathjax %}，左上角的点变为{% mathjax %} x=a {% endmathjax %}，当{% mathjax %} y = 0 {% endmathjax %}时，左下角的点变为{% mathjax %} x=0 {% endmathjax %}，右下角的点变为{% mathjax %} x=1 {% endmathjax %}。

所以矩阵表示为：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}=
\begin{bmatrix}
 1  & a\\
 0 & 1
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

{% endmathjax %}

从上面的矩阵也可以得出：

{% mathjax %} x'=x+ay {% endmathjax %}

### 旋转矩阵（绕某个点旋转）（Rotation Matrix）

{% image /images/c0ab6657f44c157211d964112540de56.png, width=500px %}

**首先要定义一个事情，就是默认旋转都是绕原点（[0, 0]点）旋转，逆时针旋转为正。**

旋转矩阵长这样：

{% mathjax %} 

R_{\theta } =
\begin{bmatrix}
 \cos \theta & -\sin \theta\\
 \sin \theta & \cos \theta
\end{bmatrix} 

{% endmathjax %}

这个{% mathjax %} \theta {% endmathjax %}是表示图形旋转角度（逆时针为正），如图：

{% image /images/53ade7ae0af7d94da376f3cd7ac4d992.png, width=500px %}

下面我们来简单（取巧）地推导一下这个旋转矩阵公式（主要用于方便记忆）：

首先我们假设矩形的大小：长为1，宽为1，如图所示：

{% image /images/53ade7ae0af7d94da376f3cd7ac4d992.png, width=500px %}

那么在**旋转前**：

蓝色的点的坐标为：( 1, 0 )

红色的点的坐标为：( 0, 1 )

**旋转后**：

蓝色的点到原点的距离为原矩形的**高**（1），利用三角函数公式得到：

蓝色的点的坐标为：( {% mathjax %} -\sin \theta {% endmathjax %}, {% mathjax %} \cos \theta {% endmathjax %} )

红色的点到原点的距离为原矩形的**宽**（1），利用三角函数公式得到：

红色的点的坐标为：( {% mathjax %} \cos \theta {% endmathjax %}, {% mathjax %} \sin \theta {% endmathjax %} )

那么就有：

{% mathjax %}

(x,y)\Rightarrow (x',y')

{% endmathjax %}

矩阵形式表示：

{% mathjax %}

\begin{bmatrix}
x' \\ y'

\end{bmatrix}=\begin{bmatrix}
 {\Box }  & {\Box }\\
 {\Box } & {\Box }
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

{% endmathjax %}

中间的带方块的2x2矩阵就是我们要求的旋转矩阵

我们给矩阵填一个变量，记为：

{% mathjax %}

\begin{bmatrix}
x' \\ y'

\end{bmatrix}=\begin{bmatrix}
 A  & B\\
 C & D
\end{bmatrix}\begin{bmatrix}
x \\
y
\end{bmatrix}

{% endmathjax %}

那么代入上面红色的点{% mathjax %}(1,0)\Rightarrow (\cos \theta,\sin \theta){% endmathjax %}：

{% mathjax %}

\begin{bmatrix}
\cos \theta \\ \sin \theta

\end{bmatrix}=\begin{bmatrix}
 A  & B\\
 C & D
\end{bmatrix}\begin{bmatrix}
1 \\
0
\end{bmatrix}

{% endmathjax %}

利用矩阵相乘可得：

{% mathjax %}

\left\{\begin{matrix}
\cos \theta = A \cdot 1 + B \cdot 0 = A \\
\sin \theta = C \cdot 1 + D \cdot 0 = C
\end{matrix}\right.

{% endmathjax %}

也就是：

{% mathjax %}

\left\{\begin{matrix}
A=\cos \theta \\
C=\sin \theta
\end{matrix}\right.

{% endmathjax %}

同理从蓝色的点可得：

{% mathjax %}

\begin{bmatrix}
-\sin \theta \\ \cos \theta

\end{bmatrix}=\begin{bmatrix}
 A  & B\\
 C & D
\end{bmatrix}\begin{bmatrix}
0 \\
1
\end{bmatrix}

{% endmathjax %}

可得：

{% mathjax %}

\left\{\begin{matrix}
-\sin \theta = A \cdot 0 + B \cdot 1 = B \\
\cos \theta = C \cdot 0 + D \cdot 1 = D
\end{matrix}\right.

{% endmathjax %}

也就是：

{% mathjax %}

\left\{\begin{matrix}
B=-\sin \theta \\
D=\cos \theta
\end{matrix}\right.

{% endmathjax %}

把{% mathjax %}ABCD{% endmathjax %}同时代进矩阵：

{% mathjax %}

\begin{bmatrix}
A  & B\\
C  & D
\end{bmatrix}=\begin{bmatrix}
 \cos \theta & -\sin \theta\\
 \sin \theta & \cos \theta
\end{bmatrix}

{% endmathjax %}

也就是旋转矩阵了

### 线性变换（Linear Transforms）

首先简单解释下啥是线性变换：

来个百度百科版本：

> 线性映射（ linear mapping）是从一个[向量空间](https://baike.baidu.com/item/向量空间/5936597)V到另一个向量空间W的映射且保持[加法运算](https://baike.baidu.com/item/加法运算/18994540)和数量乘法运算，而线性变换（linear transformation）是线性空间V到其自身的线性映射。 

线性变换的特点：

线性空间{% mathjax %}V {% endmathjax %}上的一个变换{% mathjax %} A {% endmathjax %}称为线性变换，对于{% mathjax %} V {% endmathjax %}中任意的元素{% mathjax %} \alpha {% endmathjax %}，{% mathjax %} \beta {% endmathjax %}和数域{% mathjax %} P {% endmathjax %}中任意{% mathjax %} k {% endmathjax %}，都有

{% mathjax %} 

\begin{cases}
A(\alpha + \beta)=A(\alpha)+A(\beta) \\

A(k\alpha )=kA(\alpha)

\end{cases}

 {% endmathjax %}

上面讲的比较抽象，我刚开始看的也有点蒙，所以我就去著名学习网站（Bilibili）查询了视频（视频链接见参考资料），从**3Blue1Brown**老师的视频中得（剽）出（窃）：

线性变换的特点（形象版）：

1. 变换前后的原点相同
2. 任何直线在变换后都还是直线

另外那个**3Blue1Brown**老师讲的真的好，非常形象，非常推荐看看

那么进入正题，线性变换怎么用数学方法表示呢？

{% mathjax %} 

\begin{cases}
x'=ax+by \\

y'=cx+dy

\end{cases}

 {% endmathjax %}

矩阵表示：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
a  & b\\
c  & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}

 {% endmathjax %}

简写：

{% mathjax %} 

x'=Mx

 {% endmathjax %}

### 齐次坐标（Homogeneous Coordinates）

在提出齐次坐标之前，我们先弄清楚为什么需要齐次坐标

首先来看这个基础的平移操作：

{% image /images/7a34577d42caed839242f5450f4fe5e5.png, width=500px %}

用公式来表达这个平移：

{% mathjax %} 

\begin{cases}
x'=x+t_{x} \\

y'=y+t_{y}

\end{cases}

 {% endmathjax %}

那么，这种变换要怎么写成矩阵呢？

答案是：写不出来

**因为平移变换不是线性变换**

这种如果硬写成矩阵形式，那也只能写成：

{% mathjax %} 

\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
a  & b \\
c  & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
+
\begin{bmatrix}
t_{x} \\
t_{y}
\end{bmatrix}

 {% endmathjax %}

前面这个等式，右边的{% mathjax %} 
+
\begin{bmatrix}
t_{x} \\
t_{y}
\end{bmatrix}

 {% endmathjax %}是去不掉的，因为没有它的话，不论怎么算，都只能得到多少x+多少y的形式，

那咋整呢？

好在有聪明的前辈发明了

**齐次坐标**

棒

齐次坐标的做法是：把坐标升一个维度

那2D下的**点**就变为：

{% mathjax %}

(x,y,\mathbf{1})^{T}

{% endmathjax %}

2D下的**向量**变为：

{% mathjax %}

(x,y,\mathbf{0})^{T}

{% endmathjax %}

那么首先点和向量的齐次坐标区别就在最后一行的{% mathjax %}w{% endmathjax %}，点的是1，向量的是0，为啥呢？那么请看2D下**点**的**平移矩阵**：

{% mathjax %}

\begin{bmatrix}
x' \\
y' \\
w'
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & t_{x} \\
0 & 1 & t_{y} \\
0 & 0 & 1
\end{bmatrix}
\cdot 
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
=
\begin{bmatrix}
x + t_{x} \\
y + t_{y} \\
1
\end{bmatrix}

{% endmathjax %}

再看2D下的**向量**的**平移矩阵**：

{% mathjax %}

\begin{bmatrix}
x' \\
y' \\
w'
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & t_{x} \\
0 & 1 & t_{y} \\
0 & 0 & 1
\end{bmatrix}
\cdot 
\begin{bmatrix}
x \\
y \\
0
\end{bmatrix}
=
\begin{bmatrix}
x \\
y \\
0
\end{bmatrix}

{% endmathjax %}

这样你就会发现：

**点平移后有平移效果，向量无论怎么应用平移矩阵，都没有平移效果，因为向量的起点永远为原点，具有平移不变性**

那这不就巧了吗，实际上就是想要这个效果啊！

那么就有如下规律：

- vector + vector = vector ( 0 + 0 = 0 )
- point - point = vector ( 1 - 1 = 0 )
- point + vector = point ( 1 + 0 = 1 )
- point + point = ??

那两个点相加，1 + 1 = 2了，咋办？

业界有一个普遍的计算方法，就是如果w ≠ 0时，最终的x和y以及w本身（以及3D下的z），都要除以w，使最终w变回1

所以再回头看一眼，point + point，显然是指它们之间的中点了

### 仿射变换（Affine Transformations）

> 仿射变换（Affine transformation），又称仿射映射，是指在几何中，对一个向量空间进行一次线性变换并接上一个平移，变换为另一个向量空间。
> ——维基百科

公式表示（**2D下**）：

{% mathjax %}

\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\cdot 
\begin{bmatrix}
x \\
y
\end{bmatrix}
+
\begin{bmatrix}
t_{x} \\
t_{y}
\end{bmatrix}

{% endmathjax %}

用齐次方程表示：

{% mathjax %}

\begin{bmatrix}
x' \\
y' \\
1
\end{bmatrix}
=
\begin{bmatrix}
a & b & t_{x} \\
c & d & t_{y} \\
0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}

{% endmathjax %}

### 齐次坐标下的2D变换

#### 缩放（Scale）

{% mathjax %}

S(s_{x},s_{y})

=

\begin{bmatrix}

s_{x} & 0 & 0 \\

0 & s_{y} & 0 \\

0 & 0 & 1

\end{bmatrix}

{% endmathjax %}

#### 旋转（Rotation）

{% mathjax %}

R(\alpha)

=

\begin{bmatrix}

\cos\alpha & -\sin\alpha & 0 \\

\sin\alpha & \cos\alpha & 0 \\

0 & 0 & 1

\end{bmatrix}

{% endmathjax %}

#### 平移（Translation）

{% mathjax %}

T(t_{x}, t_{y})

=

\begin{bmatrix}

1 & 0 & t_{x} \\

0 & 1 & t_{y} \\

0 & 0 & 1

\end{bmatrix}

{% endmathjax %}

### 逆变换（Inverse Transform）和逆矩阵（Inverse Matrix）（{% mathjax %}M^{-1}{% endmathjax %}）

> 设A是一个n阶矩阵，若存在另一个n阶矩阵B，使得： AB=BA=E ，则称方阵A可逆，并称方阵B是A的逆矩阵
>
> ——百度百科

实际上就是把一个变换的操作反过来

{% image /images/3ad564faed0d50314bdf7760d06759e0.png, width=500px %}

{% image /images/e46119767381e3ad4a525fa20a8a14f4.png, width=500px %}

{% mathjax %}M^{-1}{% endmathjax %}是{% mathjax %}M{% endmathjax %}矩阵的逆矩阵

### 先旋转还是先平移？

假设我想做一个这样的变换：

{% image /images/c68de569e5452630de6ead8376b83baf.png, width=500px %}

如果我先平移再旋转：

{% image /images/010fca106c20ce65a28607e21dd4560.png, width=500px %}

如果先旋转再平移：

{% image /images/6332c7cdd02099f12db2f18a1beb2848.png, width=500px %}

可以看出，这两种旋转的结果不同。

因为矩阵相乘是不满足交换律的，{% mathjax %}R_{45}\cdot T_{(1,0)}\ne T_{(1,0)}\cdot R_{45}{% endmathjax %}

所以我们需要按顺序应用矩阵。不过，其实，不管先平移再旋转，还是先旋转再平移，都可以通过某种不同的系数得到相同的结果。

但是，我们现在讨论的矩阵运算，是由先旋转再平移得来的，如：

{% mathjax %}T_{(1,0)}\cdot R_{45}\begin{bmatrix}
x \\
y \\
1
\end{bmatrix} = \begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 0 \\
0 & 0 & 1 
\end{bmatrix}\begin{bmatrix}
\cos 45^{\circ } & -\sin 45^{\circ } & 0 \\
\sin 45^{\circ } & \cos 45^{\circ } & 0 \\
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x  \\
y  \\
1  \end{bmatrix}{% endmathjax %}

我们来看下这个运算式：

首先矩阵是从右往左相乘（左乘）的，所以第一步，先计算{% mathjax %}\begin{bmatrix}
\cos 45^{\circ } & -\sin 45^{\circ } & 0 \\
\sin 45^{\circ } & \cos 45^{\circ } & 0 \\
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x  \\
y  \\
1  \end{bmatrix}{% endmathjax %}

相当于对图像旋转45度（逆时针）

再用这个结果左乘向量{% mathjax %}\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 0 \\
0 & 0 & 1 
\end{bmatrix}{% endmathjax %}

这一步可以看到是应用了单位向量（没有缩放）的基础上添加了x方向偏移1的矩阵。

### 组合变换（Composing Transforms）

这里朋友们应该想起来了，矩阵乘法是满足结合律的，所以就有：

{% mathjax %}T_{(1,0)}\cdot R_{45}\begin{bmatrix}
x \\
y \\
1
\end{bmatrix} = (T_{(1,0)}\cdot R_{45})\begin{bmatrix}
x \\
y \\
1
\end{bmatrix} {% endmathjax %}

那么我们再抽象一下：

一个向量按顺序依次应用多个矩阵，可以将这些矩阵先相乘，再应用到向量：

{% mathjax %} A_{n}(...A_{2}(A_{1}(x))) = A_{n}\cdot\cdot\cdot A_{2}\cdot A_{1}\cdot \begin{bmatrix}
x \\
y \\
1
\end{bmatrix}=(A_{n}\cdot\cdot\cdot A_{2}\cdot A_{1})\cdot \begin{bmatrix}
x \\
y \\
1
\end{bmatrix}{% endmathjax %}

### 分解复杂的变换（Decomposing Complex Transforms）

我们如何才能围绕一个不是原点的点旋转一个图形呢？

首先我们默认一个图形的旋转矩阵，都是沿原点旋转的，那么当这个图形已经发生了平移，就不能直接套用这个旋转矩阵了，需要先平移图形的所有的点（包括旋转点），使旋转点与原点重合。

然后对图形进行旋转，最后再按照原来的平移的逆矩阵再把图形平移回去。

如图：

{% image /images/752f60f7c7163f46b5d89cc5728d219b.png, width=500px %}

{% mathjax %}\begin{align}
T(c)\cdot R(\alpha )\cdot T(-c)
\end{align}{% endmathjax %}



