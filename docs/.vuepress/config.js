module.exports = {
  title: '鱼丸蛋面',
  description: 'BUG 制造者',
  themeConfig: {
    // logo: '/images/logo.png',
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
    lastUpdated: 'Last Updated',
  },
  plugins: ['@vuepress/back-to-top']
}