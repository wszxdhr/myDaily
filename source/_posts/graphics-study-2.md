---
title: 图形学学习笔记（二）：线性代数 - 矩阵
date: 2021-07-04 21:27:33
tags: [图形学,线性代数,矩阵]
categories: [图形学]
references:
  - title: 《GAMES101-现代计算机图形学入门-闫令琪》
    url: https://www.bilibili.com/video/BV1X7411F744
  - title: 《矩阵 - 维基百科》
    url: https://zh.wikipedia.org/wiki/%E7%9F%A9%E9%98%B5
  - title: 《矩阵乘法 - 百度百科》
    url: https://baike.baidu.com/item/%E7%9F%A9%E9%98%B5%E4%B9%98%E6%B3%95/5446029
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

