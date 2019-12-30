<template>
  <div class="page-footer">
    <div class="date-box">
      {{updateDate}}
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  data () {
    return {
      updateDate: ''
    }
  },
  mounted () {
    this.formatDate();
  },
  methods: {
    async formatDate () {
      const { lastUpdated } = this.$page;
      const date = await dayjs(lastUpdated).format('YYYY-MM-DD HH:mm:ss');
      this.updateDate = `最后更新时间：${date}`;
    }
  },
  watch: {
    $route() {
      this.formatDate();
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-footer
  max-width: 740px
  margin: 0 auto 50px
  padding: 0 2.5rem
  overflow hidden
  .date-box
    font-size 14px
    color #909399
    float right
</style>