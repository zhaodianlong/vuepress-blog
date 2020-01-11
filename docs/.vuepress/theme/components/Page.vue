<template>
  <main class="page">
    <slot name="top" />
    <Content class="theme-default-content" />
    <PageNav v-bind="{ sidebarItems }" />
    <PageFooter />
    <slot name="bottom" />
    <Valine />
  </main>
</template>

<script>
import PageNav from '@theme/components/PageNav.vue';
import PageFooter from '@theme/components/PageFooter.vue';
import Valine from '@theme/components/Valine.vue';
export default {
  components: { PageNav, PageFooter, Valine },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
$wrapper
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem
.page
  margin-top 3.6rem
  padding-left 16rem
  padding-bottom 2rem
  display block
  @media (max-width: $MQMobileNarrow)
    padding-left 0
.sidebar
  width 16rem
</style>