<!-- 4-11 7:56 -->

# vue-mu

> sic-app音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


> ### vue init webapck vue-music-app
> 
> cd vue-music-app
> 
> npm install
> 
> npm run dev
> 

----

[TOC]

***

# Vue-Music-App
> 一款基于vue的音乐播放App

## 课程说明
> *** 课程概要***
> 
> __做什么？__

> 开发一个媲美原生的移动端音乐App

> __哪些功能？__

> 歌手页面

> 歌手详情页
> 
> 播放器内核
> 
> 搜索页面
> 
> 歌曲列表页面等
> 
> __技术栈？__
> 
> Vue全家桶
> 

### 课程安排

> 第一章课程介绍
> 
> 第二---十二章全城实战开发
> 
> 第十三章项目优化及编译打包
> 
> 第十四章回顾总结
> 

### 学习前提

> 掌握前端基础知识如 html、css、js等
> 
> 有一定Vue.js基础和Vue.js的开发经验
> 
> 有node.js、npm和webopack的使用经验
> 
> 有es6基础
> 

### 讲述方式

> 按照App的功能依次开发页面组件
> 
> 对于可复用的组件抽象出基础组件
> 
> 手写每一行JS代码，CSS部分弱化
> 

### 课程收获

> 了解一个重度复杂规模的应用开发
> 
> 掌握Vue.js的高级应用
> 
> 学会组件化、模块化的开发方式
> 
> 了解原生App体验交互的实现原理
> 
## 项目初始化
> 安装stylus 支持__stylus__语法
> 
> npm install stylus --save
> 
> npm install stylus-loader --save
> 
> 
> 2-3
> 
> babel-runtime 转译es6语法
> 
> fastclick 解决移动端点击300ms延迟的问题
> 
> 在main.js
> 
```
import fastclick from 'fastclick'

fastclick.attach(document.body)

```


> 
> babel-polyfill 补丁，对es6一些api的转译
> 
> __安装jsonp__
> 
> 
> 
> 

__设置sublime__
`preferences-setting(user)`
`"draw_white_space": "all"`


### 安装插件

npm install axios --save
npm install express --save

__图片懒加载__

npm install vue-lazyload --save


[教程](https://www.cnblogs.com/xyyt/p/7650539.html)