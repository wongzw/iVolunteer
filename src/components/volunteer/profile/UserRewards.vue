<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">Rewards</div>
    </div>
    <div class="box rewardsDisplay">
      <div class="singleReward" v-if="rewardArray.length == 1"></div>
      <p>{{ this.rewardArray }}</p>
    </div>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { getDoc, doc } from "firebase/firestore";
export default {
  name: "UserRewards",
  data() {
    return {
      rewardArray: [],
    };
  },
  mounted() {
    this.getRewards();
  },
  methods: {
    async getRewards() {
      const userRewards = this.$store.state.details["userRewards"];
      console.log(userRewards);
      for (const rewardLevel of Object.keys(userRewards)) {
        var rewardId = userRewards[rewardLevel]["id"];
        console.log(rewardId);
        if (rewardId != "") {
          var rewardDetails = this.getRewardDetails(rewardId);
          console.log(rewardDetails.data());

          if (rewardDetails != {}) {
            var rewardDisplayed = [
              rewardDetails["merchant"],
              rewardDetails["name"],
              rewardId,
            ];
            this.rewardArray.push(rewardDisplayed);
            console.log(this.rewardArray);
          } else {
            console.log("No such Document");
          }
        }
      }
    },

    async getRewardDetails(rewardId) {
      const docRef = doc(db, "level", rewardId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    },
  },
};
</script>

<style>
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
  padding-left: 15px;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>