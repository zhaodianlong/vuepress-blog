module.exports = {
  title: '鱼丸蛋面',
  description: 'BUG 制造者',
  base: '/vuepress-blog/',
  themeConfig: {
    repo: 'zhaodianlong/vuepress-blog',
    repoLabel: 'GitHub',
    search: true,
    searchMaxSuggestions: 5,
    nav: [
      { text: '主页', link: '/' },
      {
        text: '博文',
        ariaLabel: '博文',
        items: [
          { text: '前端', link: '/blog/frontend/' },
          { text: 'Node', link: '/blog/node/' }
        ]
      },
      { text: '文档', link: '/document/' },
      { text: '杂记', link: '/notes/' },
      { text: '关于我', link: '/about/' }
    ],
    lastUpdated: '最后更新'
  }
}