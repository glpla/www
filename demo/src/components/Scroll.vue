<template>
  <div class="scroll">
    <div class="row pos">
      <div class="col pic-wrap" data-spy="scroll" data-target="#pic-nav" data-offset="0">
        <div v-for="(item,index) in list" :key="index">
          <h3 :id="'class'+index" class="bg-muted">{{item.group}}</h3>
          <div class="card" v-for="(src,index) in item.items" :key="index">
            <img class="card-img-top" :src="src" alt="Card image cap">
          </div>
        </div>
      </div>
      <nav class="nav nav-pills flex-column nav-wrap" id="pic-nav">
        <a class="nav-link text-dark">类</a>
        <a
          class="nav-link text-dark"
          v-for="(item,index) in list"
          :href="'#class'+index"
          :key="index"
        >{{item.group}}</a>
      </nav>
      <!-- <div class="col-1">
        <nav class="nav nav-pills flex-column" id="pic-nav">
          <a
            class="nav-link text-muted"
            v-for="(item,index) in list"
            :href="'#class'+index"
            :key="index"
          >{{item.group}}</a>
        </nav>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "scroll",
  data() {
    return {
      list: [
        {
          group: "a",
          items: [
            require("@/assets/rou0.jpg"),
            require("@/assets/rou1.jpg"),
            require("@/assets/rou2.jpg"),
            require("@/assets/rou3.jpg")
          ]
        },
        {
          group: "b",
          items: [
            require("@/assets/rou4.jpg"),
            require("@/assets/rou5.jpg"),
            require("@/assets/rou6.jpg"),
            require("@/assets/rou7.jpg")
          ]
        },
        {
          group: "c",
          items: [
            require("@/assets/rou0.jpg"),
            require("@/assets/rou1.jpg"),
            require("@/assets/rou2.jpg"),
            require("@/assets/rou3.jpg"),
            require("@/assets/rou4.jpg"),
            require("@/assets/rou5.jpg"),
            require("@/assets/rou6.jpg"),
            require("@/assets/rou7.jpg")
          ]
        },
        {
          group: "d",
          items: [
            require("@/assets/rou4.jpg"),
            require("@/assets/rou5.jpg"),
            require("@/assets/rou6.jpg"),
            require("@/assets/rou7.jpg"),
            require("@/assets/rou0.jpg"),
            require("@/assets/rou1.jpg"),
            require("@/assets/rou2.jpg"),
            require("@/assets/rou3.jpg"),
            require("@/assets/rou4.jpg"),
            require("@/assets/rou5.jpg"),
            require("@/assets/rou6.jpg"),
            require("@/assets/rou7.jpg")
          ]
        }
      ]
    };
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style scoped>
.pos {
  position: relative;
}
.pic-wrap {
  /* width: 100%; */
  height: 80vh;
  overflow: hidden;
  list-style: none;
  overflow-y: scroll;
}
.nav-wrap {
  height: 80vh;
  position: absolute;
  background: #fff;
  right: 0;
  top: 0;
}
.nav-link {
  padding: 0.2rem 0.5rem;
}
a[class~="active"] {
  color: #fff !important;
}
</style>


