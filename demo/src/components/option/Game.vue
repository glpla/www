<template>
  <div class="game">
    <div class="row mb-2">
      <div class="col">
        <div class="health-box">
          <div class="health" :style="{width:yourHealth+'%'}">you</div>
        </div>
      </div>
      <div class="col-1">vs</div>
      <div class="col">
        <div class="health-box">
          <div class="health" :style="{width:enemyHealth+'%'}">enemy</div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <div v-if="!gameBool">
          <button class="btn btn-info btn-sm" @click="play">play</button>
        </div>
        <div v-else class="btn-group">
          <button class="btn btn-secondary btn-sm" @click="attack">attck</button>
          <button class="btn btn-danger btn-sm" @click="specialAttack">special attck</button>
          <button class="btn btn-success btn-sm" @click="heal">heal</button>
          <button class="btn btn-secondary btn-sm" @click="giveUp">give up</button>
        </div>
      </div>
    </div>
    <div class="row mb-2" v-if="logs.length>0">
      <div class="col">
        <ul>
          <li v-for="(item,index) in logs" :key="index">{{item.txt}}</li>
        </ul>
      </div>
    </div>
    <div class="donot"></div>
    <div class="row">
      <div class="col d-flex">
        <div class="w-50 bg-info" @mouseover="overLeft" ref="left">
          <h1 class="text-uppercase">left</h1>
        </div>
        <div class="w-50 bg-warning" @mouseover="overRight" ref="right">
          <h1 class="text-uppercase">right</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  props: {},
  data() {
    return {
      gameBool: false,
      yourHealth: 100,
      enemyHealth: 100,
      logs: []
    };
  },
  methods: {
    play() {
      this.gameBool = true;
      this.yourHealth = 100;
      this.enemyHealth = 100;
      this.logs = [];
    },
    attack() {
      let damage = this.damage(3, 10);
      this.enemyHealth -= damage;
      this.logs.unshift({
        isplayer: false,
        txt: "you hit " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.enemyAttack();
    },
    specialAttack() {
      let damage = this.damage(10, 20);
      this.enemyHealth -= damage;
      this.logs.unshift({
        isplayer: false,
        txt: "you hit " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.enemyAttack();
    },
    heal() {
      // let heal = Math.floor(Math.random() * 10);
      let heal = 10;
      if (this.yourHealth < 100) {
        this.yourHealth += heal;
        this.yourHealth = Math.min(this.yourHealth, 100);
      }
      this.logs.unshift({
        isplayer: false,
        txt: "you heal " + heal
      });
      this.enemyAttack();
    },
    giveUp() {
      this.gameBool = false;
    },
    damage(min, max) {
      return Math.max(Math.floor(Math.random() * max + 1), min);
    },
    checkWin() {
      if (this.enemyHealth <= 0) {
        if (confirm("you won,new game?")) {
          this.play();
        } else {
          this.gameBool = false;
        }
        return true;
      } else if (this.yourHealth <= 0) {
        if (confirm("you lost,new game?")) {
          this.play();
        } else {
          this.gameBool = false;
        }
        return true;
      }
      return false;
    },
    enemyAttack() {
      let damage = this.damage(5, 12);
      this.yourHealth -= damage;
      this.logs.unshift({
        isplayer: true,
        txt: "enemy hit " + damage
      });
      this.checkWin();
    },
    overLeft() {
      this.$refs.left.className = "w-75 bg-info";
      this.$refs.left.style.transition = "all 1s";
      this.$refs.right.className = "w-25 bg-warning";
      this.$refs.right.style.transition = "all 1s";
    },
    overRight() {
      this.$refs.left.className = "w-25 bg-info";
      this.$refs.left.style.transition = "all 1s";
      this.$refs.right.className = "w-75 bg-warning";
      this.$refs.right.style.transition = "all 1s";
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang='stylus' scoped>
@keyframes donut-move {
  0% {
    transform: rotate(0deg);
    border-top-color: rgba(255, 0, 0, 1);
  }

  25% {
    transform: rotate(90deg);
    border-top-color: rgba(0, 255, 0, 1);
  }

  50% {
    transform: rotate(180deg);
    border-top-color: rgba(0, 0, 255, 1);
  }

  75% {
    transform: rotate(270deg);
    border-top-color: rgba(255, 255, 0, 1);
  }

  100% {
    transform: rotate(360deg);
    border-top-color: rgba(255, 0, 0, 1);
  }
}

.game {
  ul {
    list-style: none;
  }

  .w25 {
    width: 25%;
    transition: all 1s;
  }

  .w75 {
    width: 75%;
    transition: all 1s;
  }

  .donot {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 10px auto;
    border-radius: 50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: rgba(255, 0, 0, 1);
    animation: donut-move 1s linear infinite;
  }

  .health-box {
    width: 100%;
    height: 30px;
    border: 1px solid #666;

    .health {
      width: 100%;
      height: 100%;
      line-height: 30px;
      background: #666;
      // color: #fff;
      color: var(--main-color);
    }
  }
}
</style>


