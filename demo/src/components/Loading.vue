<template>
  <div class="Loading">
    <div class="row">
      <div class="col-md-12">
        <div class="img-box">
          <div class="img-wrap">
            <div class="img-item" v-for="(item,index) in hot" :key="index">
              <img :src="item.images[0]" alt="#">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="top-img-wrap" v-for="(item,index) in imgs" :key="index">
          <div class="thumbnail">
            <img :src="item.image" alt="#">
            <div class="caption">
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      hot: [],
      imgs: [],
      src:
        "http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl="
    };
  },
  mounted() {
    this.$axios
      .get("/apis/api/v1/last-stories")
      // .get("https://news-at.zhihu.com/api/4/news/latest")
      // .get("http://jsonplaceholder.typicode.com/users")
      // .get("http://jsonplaceholder.typicode.com/photos")
      .then(rsp => {
        console.log(rsp);
        this.hot = rsp.data.STORIES.stories;
        this.imgs = rsp.data.STORIES.top_stories;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<style scoped>
.img-box {
  background: #eeeeee;
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;
}
.img-wrap {
  width: 500%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: move 8s ease infinite;
}
.img-item {
  display: block;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  float: left;
  background: #f40;
  border: 1px solid #333;
}
.img-item img {
  width: 100%;
  height: 100%;
}
@keyframes move {
  0%,
  19%,
  100% {
    transform: translate(0, 0);
  }
  20%,
  39% {
    transform: translate(-20%, 0);
  }
  40%,
  59% {
    transform: translate(-40%, 0);
  }
  60%,
  79% {
    transform: translate(-60%, 0);
  }
  80%,
  99% {
    transform: translate(-80%, 0);
  }
}
.top-img-wrap {
  width: 100%;
  overflow: hidden;
}
.top-img-wrap img {
  width: 100%;
}
</style>
