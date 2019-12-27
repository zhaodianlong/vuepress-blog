<template>
  <div class="pagelist">
    <el-card class="box-card" shadow="hover" v-for="(item, index) in list" :key="index">
      <div slot="header" class="clearfix">
        <div class="title" @click="toPage(item)">{{item.frontmatter.title}}</div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toPage(item)">阅读全文</el-button>
      </div>
      {{item.frontmatter.description}}
      <div class="footer">
        <div class="author-box"><i class="el-icon-user-solid"></i>{{item.frontmatter.author}}</div>
        <div class="date-box">{{item.lastUpdated | dateFormat}}</div>
      </div>
    </el-card>
    <div class="pagination-box">
      <el-pagination
        background
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
      totalCount: ''
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
      console.log(this.$page, pages, categoryData)
      this.totalCount = categoryData.length;
      this.listString = JSON.stringify(categoryData);
      this.handlePageChange(this.pageNum);
    },
    async toPage (item) {
      console.log(item.regularPath)
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
    margin 6rem auto 0
    padding 2rem 2.5rem
    @media (max-width: $MQNarrow)
      padding 2rem
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem
  .box-card
    margin-bottom 30px
    .clearfix .title
      display inline-block
      cursor pointer
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