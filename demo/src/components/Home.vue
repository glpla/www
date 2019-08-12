<template>
  <div class="Home">
    <app-header></app-header>
    <app-swiper :rx="title">
      <div slot="top">{{title}}</div>
      <div slot="bottom">bt bt bt</div>
      <div>copyright@2018-2019</div>
      <p>glpla@126.com</p>
    </app-swiper>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppSwiper from "@/components/AppSwiper";
export default {
  name: "Home",
  data() {
    return {
      title: "welcom to my site."
    };
  },
  methods: {},
  mounted() {},
  computed: {},
  activated() {},
  deactivated() {},
  components: {
    AppHeader,
    AppSwiper
  }
};
</script>

<style scoped>
</style>
