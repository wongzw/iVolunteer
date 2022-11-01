<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">Rewards</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRewards",
};
</script>

<style scoped>
#userAchievements {
  margin-top: 36px;
  margin-right: 40px;
  background-color: #ffefe2;
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