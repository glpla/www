<template>
  <div class="register" @click="toLogin">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
import ebus from "../assets/eventBus.js";
export default {
  name: "register",
  data() {
    return {
      title: "register"
    };
  },
  methods: {
    toLogin() {
      ebus.$emit("fromReg", "hi,login");
    }
  },
  mounted() {
    ebus.$on("fromLogin", msg => {
      console.log(msg);
    });
  }
};
</script>

<style scoped>
</style>


