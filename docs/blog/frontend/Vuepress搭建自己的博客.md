---
title: Vuepress搭建自己的博客
description: VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求...
author: 鱼丸蛋面
category: 前端
sidebar: auto
tags:
  - vuepress
---

## 介绍
VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## 快速上手
::: warning 注意
请确保你的 Node.js 版本 >= 8。
:::

### 全局安装

``` bash
# 安装
npm install -g vuepress

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

### 现有项目
如果你想在一个现有项目中使用 VuePress，同时想要在该项目中管理文档，则应该将 VuePress 安装为本地依赖。作为本地依赖安装让你可以使用持续集成工具，或者一些其他服务（比如 Netlify）来帮助你在每次提交代码时自动部署。
``` bash
# 将 VuePress 作为一个本地依赖安装
npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

::: warning
如果你的现有项目依赖了 webpack 3.x，推荐使用 [Yarn](https://yarnpkg.com/en/) 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

接着，在 `package.json` 里加一些脚本:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

然后就可以开始写作了:

``` bash
npm run docs:dev
```

要生成静态的 HTML 文件，运行：

``` bash
npm run docs:build
```

## 目录结构
VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

``` markdown
├── docs
│   ├── .vuepress _(**可选的**)_
│   │   ├── components _(**可选的**)_
│   │   ├── theme _(**可选的**)_
│   │   │   └── Layout.vue
│   │   ├── public _(**可选的**)_
│   │   ├── styles _(**可选的**)_
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates _(**可选的, 谨慎配置**)_
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js _(**可选的**)_
│   │   └── enhanceApp.js _(**可选的**)_
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

::: warning 注意
请留意目录名的大写。
:::

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

## 基本配置
### 配置文件
``` javascript
/**
 * config.js
 * */ 
module.exports = {
  title: '鱼丸蛋面',
  description: 'BUG 制造者',
  themeConfig: {
    // GitHub配置
    repo: 'zhaodianlong',
    repoLabel: 'GitHub',
    // 搜索栏配置
    search: true,
    searchMaxSuggestions: 5,
    // 导航配置
    nav: [
      { text: '主页', link: '/' },
      {
        text: '博文',
        ariaLabel: '博文',
        items: [
          { text: '前端', link: '/blog/frontend/' },
          { text: 'Node', link: '/blog/node/' },
          { text: '面试宝典', link: '/blog/interview/' }
        ]
      },
      { text: '文档', link: '/document/' },
      { text: '杂记', link: '/notes/' },
      { text: '关于我', link: '/about/' }
    ],
    lastUpdated: '最后更新'
  }
}
```

### 主题配置
一个 VuePress 主题应该负责整个网站的布局和交互细节。在 VuePress 中，目前自带了一个默认的主题（正是你现在所看到的），它是为技术文档而设计的。同时，默认主题提供了一些选项，让你可以去自定义导航栏（navbar）、 侧边栏（sidebar）和 首页（homepage） 等，详情请参见 [默认主题](https://vuepress.vuejs.org/zh/theme/default-theme-config.html) 。


### 应用级别配置
``` javascript
/**
 * enhanceApp.js
 * 个性化开发主题，引入elementUI
 */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 
export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(Element)
}
 
```

## 首页配置

::: warning 注意
在docs文件夹下README.md文件中开启主页
:::

``` markdown
---
home: true
# heroImage: '/images/logo.png'
heroText: '鱼丸蛋面'
tagline: 欢迎来到我的博客
actionText: 了解我 →
actionLink: /about/
features:
- title: 学习文章
  details: 一个小前端的学习笔记。
- title: 文档介绍
  details: 平时编写的工具及有趣的插件的文档。
- title: 日常随笔
  details: 记录生活的点点滴滴。
footer: MIT Licensed | Copyright © 2019 Zhaodianlong
---
```

## 自定义主题

本博客继承了默认主题[@vuepress/theme-default](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/theme-default)，主要介绍 PageList.vue 分类列表，其他组件只在默认主题上稍加改动。

### 目录结构

``` markdown
│   .vuepress
│   ├── theme
│   │   └── layouts
|   |   |   └── Layout.vue
|   |   └── components
|   |   |   └── Page.vue
|   |   |   └── PageFooter.vue
|   |   |   └── PageList.vue
|   |   |   └── SidebarGroup.vue
|   |   └── styles
|   |   |   └── palette.styl
|   |   └── util
|   |   |   └── index.js
|   |   └── index.js
```

### 继承默认主题

``` javascript
/**
 * index.js
 * 继承默认主题theme-default
 * */ 
module.exports = (site, Vue) => {
  return {
    extend: "@vuepress/theme-default",
  }
};
```

### 分类列表

> 在enhanceApp.js中已引入elementUI, elementUI组件可直接在Vue中使用

``` vue
/**
 * PageList.vue
 * */ 
<template>
  <div class="pagelist">
    <div v-for="(item, index) in list" :key="index" @click="toPage(item)">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <div class="title">{{item.frontmatter.title}}</div>
          <el-button style="float: right; padding: 3px 0" type="text">阅读全文</el-button>
        </div>
        {{item.frontmatter.description}}
        <div class="footer">
          <div class="author-box"><i class="el-icon-user-solid"></i>{{item.frontmatter.author}}</div>
          <div class="date-box">{{item.lastUpdated | dateFormat}}</div>
        </div>
      </el-card>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        class="pagination"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :page-sizes="[2, 3, 4, 10]"
        :total="totalCount"
        layout="prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  data () {
    return {
      listString: '',
      list: [],
      bSwitch: false,
      pageNum: 1,
      pageSize: 2,
      totalCount: 0
    }
  },
  mounted () {
    this.filerArticle ();
  },
  methods: {
    async filerArticle () {
      const pages = await this.$site.pages.filter(page => {
        if (page.frontmatter.title && page.frontmatter.description) {
          return page;
        }
      })
      const categoryData = await pages.filter(page => {
        if (page.frontmatter.category === this.$page.frontmatter.category) {
          return page;
        }
      })
      this.totalCount = categoryData.length;
      this.listString = JSON.stringify(categoryData);
      this.handlePageChange(this.pageNum);
    },
    async toPage (item) {
      await this.$router.push(item.regularPath)
    },
    async handleSizeChange (val) {
      this.pageSize = val;
      this.handlePageChange(this.pageNum);
    },
    async handlePageChange (val) {
      this.pageNum = val;
      const list  = JSON.parse(this.listString);
      const startIndex = 0 + (this.pageNum -1)*this.pageSize;
      const endIndex = this.pageSize + (this.pageNum -1)*this.pageSize;
      this.list = await list.slice(startIndex, endIndex);
      await this.scrollTop();
    },
    async scrollTop () {
      await window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  filters: {
    dateFormat (date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  watch: {
    $route() {
      this.filerArticle();
    }
  }
}
</script>
<style lang="stylus" scoped>
  .pagelist
    max-width $contentWidth
    margin 4rem auto 0
    padding 2rem 2.5rem
    @media (max-width: $MQNarrow)
      padding 2rem
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem
    .pagination-box
      overflow hidden
      .pagination
        float right
  .box-card
    margin-bottom 30px
    cursor pointer
    .clearfix .title
      display inline-block
    .footer
      margin-top 18px
      font-size 14px
      color #909399
      overflow hidden
      .author-box
        float left
      .date-box
        float right

</style>

```

在Layout.vue中引入PageList组件
``` vue
<template>
  '''
  <Home v-if="$page.frontmatter.home" />
  <Pagelist v-else-if="$page.frontmatter.type==='category'"></Pagelist>
  <Page v-else :sidebar-items="sidebarItems" >
    <template #top>
      <slot name="page-top" />
    </template>
    <template #bottom>
      <slot name="page-bottom" />
    </template>
  </Page>
  '''
</template>
<script>
import Pagelist from '@theme/components/PageList.vue'
export default(
  components: { PageList }
)
</script>
```

### 如何使用
> 在需展示分类列表的地方，新建README.md文件
``` markdown
<!-- README.md -->
---
type: 'category'
category: 前端
---
```

## 部署

下述的指南基于以下条件：

- 文档放置在项目的 `docs` 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 npm scripts:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

### GitHub Pages

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip
你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。
:::

### 自定义域名

- GitHub Pages

![GitHub Pages](http://q39sih9pm.bkt.clouddn.com/GithubPages%E4%B8%8E%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F%E5%90%8D.png)

- 域名解析（阿里云）
![域名解析](http://q39sih9pm.bkt.clouddn.com/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90.png)

