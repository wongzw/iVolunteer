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

      <div class="box more" v-if="userBadges.length > 5">
        <div class="showingAll">
          <a style="color: #5a4ff3" @click="showAll"> 
            Show All
          </a>
        </div>
      </div>

      <div class="a-modal">
            <a-modal
            v-model:visible="this.showMore"
            title="Badges earned:"
            @ok="handleOk"
            >

            <template #footer>
              <div class="ant-button">
                <a-button
                    class="orange"
                    key="Confirm"
                    type="primary"
                    :loading="loading"
                    @click="showNone"
                    style="width: 40%"
                    >Close</a-button
                >
              </div>
            </template>
            
            <div class="modalContent">
              <li v-for="item in userBadges" v-bind:key="item"> 
                <img
                style="margin-right: 6px"
                src="@/assets/achievementIcon.svg"
                alt="tickIcon"
                />
                {{ item }} 
              </li> <br />
            </div>
            </a-modal>
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
      showMore: false,
      seenAll: false,
    };
  },
  methods: {
    showAll() {
      this.showMore = true;
    },
    showNone() {
      this.seenAll = false; 
      this.showMore = false;
    },

  }
};
</script>

<style scoped>
#userAchievements {
  margin-top: 36px;
  margin-left: 40px;
  margin-right: 40px;
  background-color: #ffefe2;
  border-radius: 5px;
  padding: 24px;
  height: 23vh;
}
.box {
  text-align: left;
  margin-left: 15px;
  height: auto;
}

.box .more {
  text-align: right;
}

#box-title {
  margin-top: 0.5vh;
  margin-bottom: 0.8vh;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>