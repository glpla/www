<template>
  <div class="Option">
    <router-link tag="div" to="{name:'/'}" class="text-light bg-info title">back</router-link>
    <button class="btn btn-info" @click="to200">scroll content to 200</button>

    <div class="wrap" ref="wrap">
      <div class="cont">
        <div v-for="item in 100" :key="item">{{item}}:content</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Option",
  data() {
    return {
      scroll: ""
    };
  },
  methods: {
    to200() {
      this.$refs.wrap.scrollTo(0, 200);
    },
    handScroll() {
      let tmp = this.$refs.wrap;
      this.scroll = tmp.scrollTop;
      console.log(this.scroll);
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.handScroll);
    this.scroll = new BScroll(this.$refs.wrap, {
      scrollY: true,
      mouseWheel: true
    });
    this.$refs.wrap.addEventListener("scroll", this.handScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handScroll);
  }
};
</script>

<style scoped>
.title {
  height: 30px;
  line-height: 30px;
  /* background: #f40; */
}
.wrap {
  height: 400px;
  background: #f40;
  overflow: hidden;
}
.cont {
  background: #fff;
  margin: 10px 10px;
}
</style>


