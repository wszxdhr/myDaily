---
title: 'WebAssembly反编译探索（一）'
date: 2020-07-05 08:25:32
tags: [WebAssembly,反编译]
categories: [奇怪的探索]
---

最近新入职公司，仿佛打开了新世界的大门，突然接触React+TS，还有WebAssembly，眼花缭乱中带着一丝慌乱，在做一个需求的时候第一次接触公司的API方面的一个需求时，发现有些数据是加密的，然后配合一个解密平台可以进行解密，所以当我打算用我可爱的摸鱼助手进行拦截，发现并行不通，然后就开始了奇怪的探索

<!-- more -->

## 介绍

WebAssembly（以下简称wasm）是一种字节码文件，实现同样的功能的情况下，相对于JS文件：文件更小，执行更快（可以理解为是JS的编译成字节码之后的文件，所以省略了JS到字节码这个步骤），因此是提高网页加载性能的一个很好的方案（如果项目接受这个兼容性的话）。

本文主要探索编译前后文件对比，还有不同语言编译成wasm的区别，以此来推算反编译的方法，以及探索反编译后如何提高代码可读性。

## 总体准备工作

### 准备wasm2c工具

首先，下载并编译wabt：详情参照[https://github.com/WebAssembly/wabt](https://github.com/WebAssembly/wabt)

```shell
git clone https://github.com/WebAssembly/wabt.git
cd wabt
mkdir build
cd build
cmake ..
cmake --build .
```

运行`cmake ..`时出现错误

```
Can't find third_party/gtest.  Run git submodule update --init, or disable
  with CMake -DBUILD_TESTS=OFF.
```

官方issues捞到解释：[https://github.com/WebAssembly/wabt/issues/716](https://github.com/WebAssembly/wabt/issues/716)

运行`git submodule update --init`解决然后继续

没有cmake的话需要安装一个：

去CMake官网下个dmg，打开之后菜单里面有How to install in command类似的字样，照着步骤做一下就好了，如果可以的话，也可以通过`brew install cmake`来安装，反正我用brew安装CMake会报404（brew是阿里云的源，系统10.15）

## 探索编译前使用的语言对wasm的作用

### C to wasm

步骤参照&全部详情：[https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm](https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm)

#### 准备工作：

准备Git、CMake、GCC和Python 2.7.x

Git和Py一般是自带的，GCC的话`code-select --install`一下就好了，cmake上文已介绍安装方法

#### 编译Emscripten

```shell
git clone https://github.com/juj/emsdk.git
cd emsdk

# 在 Linux 或者 Mac OS X 上
./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

# 注意：Windows 版本的 Visual Studio 2017 已经被支持，但需要在 emsdk install 需要追加 --vs2017 参数。
```

安装过程中`./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit`遇到了问题：

```shell
❯ ./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
Error: No tool or SDK found by name 'sdk-incoming-64bit'.
```

这里我换成了`./emsdk install latest`安装

然后我又遇到了问题：

```shell
❯ ./emsdk install latest
Installing SDK 'sdk-releases-upstream-1914a1543f08cd8e41f44c2bb05f7a90d1920275-64bit'..
Installing tool 'node-12.18.1-64bit'..
Error: Downloading URL 'https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/node-v12.18.1-darwin-x64.tar.gz': [Errno 60] Operation timed out
Installation failed!
```

是真滴难受老铁

然后给命令行加了梯子，瞬间成功

然后运行`./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit`，也出错了！

改为`./emsdk activate latest`成功

我猜是MDN的文档太老，emcc那边已经改脚本了

运行`source ./emsdk_env.sh`，挂载emcc命令，这一行可以改为绝对路径加入`~/.bashrc`或者`~/.zshrc`，下次启动命令行就可以直接运行emcc了

##### 写一个简单的代码

```c
#include <stdio.h>

int magicSum(int a, int b) {
  a -= 1;
  b += 1;
  return a + b;
}

int main(int argc, char ** argv) {
  int sum = magicSum(1, 2);
  printf("Hello World, Sum is %d\n", sum);
}
```

保存到某个文件夹下的`c2wasm.c`文件中

用GCC跑一下，输入如下：

```shell
❯ gcc c2wasm.c -o c2wasm.out && ./c2wasm.out
Hello World, Sum is 3
```

