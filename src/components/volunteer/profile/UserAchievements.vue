<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">Achievements</div>

      <div id="box details">
        <li v-for="item in userBadges.slice(0,5)" v-bind:key="item"> 
          <img
          style="margin-right: 6px"
          src="@/assets/achievementIcon.svg"
          alt="tickIcon"
          />
          {{ item }} 
        </li> <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAchievements",
  data() {
    return {
      userBadges: Object.keys(this.$store.state.details.userBadges),
    };
  },
  setup() {
  }
};
</script>

<style scoped>
#userAchievements {
  margin-top: 36px;
  margin-left: 40px;
  margin-right: 36px;
  background-color: #ffefe2;
  width: 400px;
  height: 217px;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
}

#box-title {
  margin-top: 0.5vh;
  margin-bottom: 0.8vh;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>