---
title: 记一次使用Webpack打包Nodejs项目
date: 2020-05-22 13:54:59
categories: [项目流程实践]
tags: [NodeJs,Webpack]
---

很久很久以前，一般打包一个NodeJs项目，一般使用Gulp或者直接Babel命令，但是会遇到很多问题，比如开发时--exec这种参数嵌套多层，以及Gulp的插件生态不如Webpack。

所以这次重构改造顺手就把整体打包和开发流程牵到Webpack中，看起来清新了不少。

项目包括Babel、Eslint，使用Webpack4

<!-- more -->

## 前言

之前使用`npm scripts`做编译和开发，其实也还说得过去，命令大概是这样的：`"dev:electron": "nodemon --watch electron --watch server --exec \"npm run lint:electron && mkdir -p dist && babel server --presets env --plugins babel-plugin-syntax-object-rest-spread --out-dir ./dist-server && babel electron --presets env --plugins babel-plugin-syntax-object-rest-spread --out-dir ./dist-dev && ./node_modules/.bin/electron .\""`

这个配置融合了nodemon监听文件变化，babel实时编译文件输出到dist-server文件夹，配上一些plugins和presets，以及eslint检查错误，还有最后electron命令运行，一起合成，但是实在过于冗长，很难读，就算拆开，其实中间的命令也很散乱，但是迫于时间一直没空改造，最近有空就进行了一次重构，全部使用Webpack来完成

## 创建文件

大致上目录结构是这样的：

```
┗ build
  ┣ webpack.conf.base.js
  ┣ webpack.conf.command.js
  ┣ webpack.conf.shell.js
```

`webpack.conf.base.js`用来存放基础配置，比如babel和eslint
`webpack.conf.command.js`用来存放命令行运行用的配置
`webpack.conf.shell.js`用来存放shell运行的配置，主要是用来支持Webpack的watch开启时，编译后直接执行脚本用的

## Webpack配置

### 基础配置

`webpack.conf.base.js`中一开始的配置是这样的：
```
  module.exports = {
    target: 'node'
  }
```

这里加了一个`target: 'node'`来指定运行的是NodeJs项目，从而Webpack会自动把fs、path等NodeJs专有的依赖变成externals，避免报错，其他例如代码压缩、Babel编译，Webpack都帮忙做好了，搞一波eslint就好了：

先安装eslint及一些插件：

```
npm install --save-dev eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

然后在上文中的配置中添加：
```
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }
    ]
  }
```

这样Webpack就可以进行代码审查了

添加`webpack-node-externals`这个模块是因为在开发中引用了一些依赖导致报错：
```
  WARNING in ./node_modules/_any-promise@1.3.0@any-promise/register.js 24:14-37
  Critical dependency: the request of a dependency is an expression
   @ ./node_modules/_any-promise@1.3.0@any-promise/index.js
   @ ./node_modules/_koa-compose@3.2.1@koa-compose/index.js
   @ ./node_modules/_koa-convert@1.2.0@koa-convert/index.js
   @ ./node_modules/_koa@2.12.0@koa/lib/application.js
   @ ./command/demo.js
```

在正常直接执行js脚本时是没有的

最后的配置是这样的：
```
  const nodeExternals = require('webpack-node-externals')

  module.exports = {
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre'
        }
      ]
    },
    externals: [
      nodeExternals() // 这个插件用来帮助打包时排除`node_modules`中的依赖
    ]
  }
```

### 编译后直接运行

下面就是`webpack.conf.shell.js`的配置：
```
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

module.exports = {
  plugins: [
    new RunNodeWebpackPlugin()
  ]
}
```

使用`RunNodeWebpackPlugin`插件用来在编译后立即执行编译的代码。

### 命令行运行配置

`webpack.conf.command.js`的配置如下：

```
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.conf.base')
const shellConfig = require('./webpack.conf.shell')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const process = require('process')
const isDev = process.env.mode === 'development' // 判断是否是dev

const webpackConfig = merge(baseConfig, shellConfig, {
  entry: {
    command: isDev ? path.join(__dirname, '../command/demo.js') : path.join(__dirname, '../command/index.js') // dev模式运行demo.js
  },
  output: {
    filename: '[name].js',
    path: isDev ? path.join(__dirname, '../dev-dist') : path.join(__dirname, '../dist') // dev模式输出到dev-dist文件夹
  },
  plugins: [
    new CleanWebpackPlugin() // 用来清除之前编译出的文件
  ],
  watch: isDev,
  mode: process.env.mode
})

module.exports = webpackConfig
```

## npm scripts

```
"dev:command": "cross-env mode=\"development\" webpack --config ./build/webpack.conf.command.js --mode development",
```
```
"build:command": "cross-env mode=\"production\" webpack --config ./build/webpack.conf.command.js --mode production"
```

至此我就可以用一个`npm run dev:command`命令来同时编译和运行，再用另一个命令来编译啦