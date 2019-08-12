<template>
  <div class="gallery">
    <div class="row">
      <div class="col">
        <div ref="bigImg">
          <div class="card">
            <img class="card-img-top" :src="src" alt="Card image cap">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="(item,index) in imgs" :key="index">
        <div class="card-wrap" :class="(src==item)?'mask':''">
          <div class="card">
            <img class="card-img-top" :src="item" alt="img" @click="newSrc(item)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gallery",
  data() {
    return {
      src: require("@/assets/rou0.jpg"),
      imgs: [
        require("@/assets/rou0.jpg"),
        require("@/assets/rou1.jpg"),
        require("@/assets/rou2.jpg"),
        require("@/assets/rou3.jpg"),
        require("@/assets/rou4.jpg"),
        require("@/assets/rou5.jpg"),
        require("@/assets/rou6.jpg"),
        require("@/assets/rou7.jpg")
      ]
    };
  },
  methods: {
    newSrc(index) {
      if (this.src != index) {
        this.$refs.bigImg.className = "";
        setTimeout(() => {
          this.src = index;
          this.$refs.bigImg.className = "img-wrap";
        }, 100);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.img-wrap {
  opacity: 0;
  animation: main-img 1s linear forwards;
}
@keyframes main-img {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes show-img {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
.card-wrap {
  /* transition: all 0.5s ease; */
  opacity: 1;
}
.card-wrap.mask {
  /* opacity: 0.6; */
  animation: show-img 0.2s linear forwards;
}
</style>


