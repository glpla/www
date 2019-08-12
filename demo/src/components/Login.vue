<template>
  <div class="login" @click="toReg">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
import ebus from "../assets/eventBus.js";
export default {
  name: "login",
  data() {
    return {
      title: "login"
    };
  },
  methods: {
    toReg() {
      ebus.$emit("fromLogin", "hi,reg");
    }
  },
  mounted() {
    ebus.$on("fromReg", msg => {
      console.log(msg);
    });
  }
};
</script>

<style scoped>
</style>


