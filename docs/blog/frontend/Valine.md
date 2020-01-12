---
title: Vuepress博客集成评论及文章阅读量统计
description: 本博客继承Valine, 一款基于LeanCloud的快速、简洁且高效的无后端评论系统。理论上支持但不限于静态博客，目前已有Hexo、Jekyll、Typecho、Hugo、Ghost 等博客程序在使用Valine...
author: 鱼丸蛋面
category: 前端
sidebar: auto
tags:
  - vuepress
---

## 介绍

目前，[vuepress-plugin-comment](https://github.com/dongyuanxin/vuepress-plugin-comment) 支持在 Vuepress 中使用 [Valine](https://valine.js.org/)，自动管理 SPA路由 相关的工作。

## 安装 

如果使用 `npm`：

```sh
npm install --save vuepress-plugin-comment
```

如果使用 `yarn`:

```sh
yarn add vuepress-plugin-comment -D
```

## 评论功能

#### 获取APP ID 和 APP Key

请先[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)：

![](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`APP ID`和`APP Key`了：

![](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

#### Valine组件

在components中新建 `Valine.vue`

```js
<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
    // require window 
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }
    /**
     * @params appID    应用ID
     * @params appKey   应用密钥
     * @params notify   评论回复邮件提醒
     * @params verify   验证码服务
     * @params visitor  文章访问量统计
     * @params path     当前文章页路径，用于区分不同的文章页，以保证正确读取该文章页下的评论列表
     * @params avatar   头像
     * */ 
    new Valine({
      el: '#vcomments' ,
      appId: '************************',
      appKey: '************************',
      notify:false, 
      verify:false, 
      visitor: true,
      path: this.$route.path,
      avatar: 'wavatar', 
      placeholder: 'just go go',
    });
  },
}
</script>
```
在需要增加评论的地方，引入组件即可。

## 文章阅读量统计

Valine 从 `v1.2.0` 开始支持文章阅读量统计。

``` js
new Valine({
    el:'#vcomments',
    ...
    visitor: true // 阅读量统计
})
```

> 如果开启了`阅读量统计`，Valine 会`自动检测` leancloud 应用中是否存在`Counter`类，如果不存在`会自动创建`，**无需手动创建**~


Valine会自动查找页面中`class`值为`leancloud_visitors`的元素，获取其`id`为查询条件。并将得到的值填充到其`class`的值为`leancloud-visitors-count`的子元素里：

``` html
<!-- id 将作为查询条件 -->
<span id="<Your/Path/Name>" class="leancloud_visitors" data-flag-title="Your Article Title">
    <span class="post-meta-item-text">阅读量 </span>
    <span class="leancloud-visitors-count">1000000</span>
</span>
```