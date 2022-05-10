<template>
  <div>
    <nav-bar></nav-bar>
    <div style="background-color: #3B3B3B; height: 2000px">
        <div></div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue"
import TabBar from '../components/tabBar.vue'
export default {
  components: { navBar, TabBar },
  data() {
      return {
        //   navShow: 'navOn',
      }
  }
};
</script>

<style lang="scss" scoped></style>
