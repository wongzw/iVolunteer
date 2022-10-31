<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">Achievements</div>

      <div id="box details">
        <img
          style="margin-right: 6px"
          src="@/assets/achievementIcon.svg"
          alt="tickIcon"
        />
        <label class="fontUser"> {{ userBadges }} </label> <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAchievements",
  data() {
    return {
      userBadges: this.$store.state.details["userBadges"],
    };
  },
};
</script>

<style scoped>
#userAchievements {
  margin-top: 36px;
  margin-left: 40px;
  margin-right: 36px;
  background-color: #ffefe2;
  /* width: 50vw; */
  height: 23vh;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>