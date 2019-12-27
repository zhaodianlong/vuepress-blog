<template>
  <div class="pagelist">
    <el-card class="box-card" shadow="hover" v-for="(item, index) in list" :key="index">
      <div slot="header" class="clearfix">
        <span>{{item.frontmatter.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">阅读全文</el-button>
      </div>
      {{item.frontmatter.description}}
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      bSwitch: false
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
      console.log(this.$route)
      const categoryData = await pages.filter(page => {
        if (page.frontmatter.category === this.$page.frontmatter.category) {
          return page;
        }
      })
      console.log(this.$page, pages, categoryData)
      this.list = categoryData;
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
    margin 6rem auto 0
    padding 2rem 2.5rem
    @media (max-width: $MQNarrow)
      padding 2rem
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem
  .box-card
    margin-bottom 30px
</style>