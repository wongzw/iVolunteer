<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">
        Achievements
      </div>

      <div id="box details">
        <li v-for="item in userBadges.slice(0, 5)" v-bind:key="item">
          <img
            style="margin-right: 6px"
            src="@/assets/achievementIcon.svg"
            alt="tickIcon"
          />
          {{ item }}
        </li>  
        <div class="ant-button" v-if="userBadges.length > 5">
          <a-button
            type="primary"
            size="small"
            class="light-orange"
            :disabled="
            userBadges.length < 5"
            @click="showAll"
          >
            Show All
          </a-button>
        </div>   
        <br />
      </div>

      <div v-if="userBadges.length == 0"> 
        <div class="noAchievements">
          <h3>
          <b>
            No Badges yet 😔 <br />
            <a href="/volunteer/dashboard" style="color: #ff5b2e"> Volunteer </a> for an event! 
          </b>
        </h3>
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
            </li>
            <br />
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
  },
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
  height: 30vh;
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

.ant-button .orange {
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
  margin-top: 2vh;
}

.ant-button .light-orange {
  color:#020957;
  font-size:small;
  background-color: #ffefe2;
  border-color: #020957;
  border-radius: 5px;
  height: auto;
  margin-left: 75%;
  /* margin-top: 10vh; */
}

.noAchievements {
  justify-content: center;
  display: flex;
  text-align: center;
}

</style>