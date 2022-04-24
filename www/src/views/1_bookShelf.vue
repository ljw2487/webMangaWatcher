<template>
  <div>
    <nav-bar></nav-bar>
    <div style="background-color: #3B3B3B; height: 2000px">
        <div></div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
export default {
  components: { navBar },
  data() {
      return {
        //   navShow: 'navOn',
      }
  }
};
</script>

<style lang="scss" scoped></style>
