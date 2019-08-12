<template>
  <div class="row" id="admin">
    <div class="col-md-6">
      <form action="#">
        <input type="text" class="form-control mb-2" placeholder="your name" v-model="user.name">
        <input type="text" class="form-control mb-2" placeholder="your email" v-model="user.email">
        
        <label class="checkbox-inline">
          <input type="checkbox" id="ck0" value="glboy" v-model="test"> glboy
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="ck1" value="glpla" v-model="test"> glpla
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="ck2" value="cnplaman" v-model="test"> cnplaman
        </label>
        <div>{{test}}</div>
        <div class="form-group">
          <button type="submit" class="btn btn-success mb-2" @click="addUser">submit</button>
        </div>
      </form>
    </div>
    <div class="col-md-6">
      <ul>
        <li v-for="(item,index) in users" :key="index">
          {{item.name}}-{{item.email}}
          <button class="btn btn-xs" @click="del(index)">del</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      title: "admin",
      test: [],
      user: {},
      users: [
        {
          name: "glpla",
          email: "1942194789@qq.com"
        },
        {
          name: "blboy",
          email: "258482435@qq.com"
        }
      ]
    };
  },
  methods: {
    addUser(e) {
      e.preventDefault();
      this.users.push({ name: this.user.name, email: this.user.email });
    },
    del(index) {
      this.users.splice(index, 1);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>


