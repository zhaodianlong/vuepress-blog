<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
    console.log(this.$route.path)
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
      appId: 'EVA53Pux3CDuNSxkslyymnC0-gzGzoHsz',
      appKey: 'KzvAha6nbq7ckpRf2Ovamfky',
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
<style lang="stylus" scoped>
#vcomments
  max-width 740px
  margin 0 auto
</style>