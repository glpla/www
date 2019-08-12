<template>
  <div class="about">
    <div class="row mb-5">
      <div class="col-6">
        <div class="list-group mb-5">
          <!-- <router-link class="nav-link" :to="{name:'contactLink'}">Contact</router-link> -->
          <router-link tag="li" class="nav-link" :to="{name:'ContactLink'}">
            <a class="list-group-item list-group-item-action">Contact</a>
          </router-link>
          <router-link tag="li" class="nav-link" :to="{name:'DeliveryLink'}">
            <a class="list-group-item list-group-item-action">Delivery</a>
          </router-link>
          <router-link tag="li" class="nav-link" :to="{name:'InfoLink'}">
            <a class="list-group-item list-group-item-action">Info</a>
          </router-link>
          <router-link tag="li" class="nav-link" :to="{name:'OrderLink'}">
            <a class="list-group-item list-group-item-action">Order</a>
          </router-link>
        </div>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      title: "about"
    };
  }
};
</script>

<style scoped>
</style>


