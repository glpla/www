<template>
  <div class="AppSwiper">
    <slot name="top">top</slot>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <img src="http://img2.imgtn.bdimg.com/it/u=2286176344,3505049792&fm=11&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img5.imgtn.bdimg.com/it/u=4002611539,678525530&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img3.imgtn.bdimg.com/it/u=3982894987,3745153908&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img0.imgtn.bdimg.com/it/u=1953213770,1199145964&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img0.imgtn.bdimg.com/it/u=2304820178,3689034032&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img4.imgtn.bdimg.com/it/u=3997621228,3346893598&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="http://img3.imgtn.bdimg.com/it/u=23967428,1439734843&fm=26&gp=0.jpg" alt>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
    <button type="button" class="btn btn-info" @click="isDis">dis</button>
    <slot name="bottom">bottom slot here.</slot>
    <slot :rx="rx">{{rx}}</slot>
    <transition>
      <div v-if="dis">title here</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppSwiper",
  props: {
    rx: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tmp: "for slot testing",
      dis: false,
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      }
    };
  },
  methods: {
    isDis() {
      this.dis = !this.dis;
    }
  },
  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // }
  },
  mounted() {}
};
</script>

<style scoped>
img {
  width: 100%;
}
.swiper-pagination {
  color: #fff;
}
.v-enter-active,
.v-leave-active {
  opacity: 1;
  transition: all 1s ease-in;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>


