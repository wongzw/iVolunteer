<template>
  <div class="header">
    <h1><b>Rewards Redemption</b></h1>
    <h3>
      Redeem your rewards here! Every 5 levels unlocks a new tier of rewards for
      you.
      <br />
      You are only able to redeem one reward per tier.
    </h3>
  </div>

  <div class="rewardsTable">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        v-for="(value, key) in this.rewards"
        :key="key"
        :tab="'Tier ' + key"
      >
        <div class="rewardClaimed" v-if="this.rewardTier > key">
          <div class="rewardName">
            <h3>
              <b>Tier Reward Claimed</b>
            </h3>
          </div>
        </div>
        <div
          class="rewards"
          v-for="reward in this.rewards[key]"
          :key="reward"
          v-else
        >
          <div class="rewardContent">
            <div class="rewardName">
              <h3>
                <b>{{ reward.name }}</b>
              </h3>
            </div>

            <div class="ant-button">
              <a-button
                type="primary"
                size="large"
                class="orange"
                @click="claimReward(reward)"
                :disabled="reward.availableQty == 0 || this.rewardTier > key"
              >
                <span v-if="reward.availableQty == 0">Fully Redeemed</span>
                <span v-else>Redeem Reward</span>
              </a-button>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { ref } from "vue";

export default {
  name: "RedemptionModule",
  data() {
    return {
      rewards: {},
      rewardTier: 0,
    };
  },

  mounted() {
    this.queryDB();
    this.rewardLevel();
  },

  methods: {
    claimReward(reward) {
      // Pop Data from FS
      console.log(reward);
      var reward_level = reward["level"];

      // Assign to user
      if (this.$store.state.details["userRewards"][reward_level] == "") {
        var assigned_code = reward["redemptionCode"].pop();
        this.$store.commit("updateRewards", {
          reward_level: reward_level,
          assigned_code: assigned_code,
        });
        this.rewardLevel();
      } else {
        alert("Reward Tier Has Already Been Redeemed");
        this.rewardLevel();
      }

      console.log(this.$store.state.details["userRewards"]);
    },

    async queryDB() {
      const rewardsRef = collection(db, "level");
      const rewardDocSnap = await getDocs(rewardsRef);
      this.computeRewards(rewardDocSnap);
    },

    computeRewards(rewardDocSnap) {
      rewardDocSnap.forEach((doc) => {
        let data = doc.data();
        let reward_id = data["rewardID"];
        let reward_level = data["level"];
        if (!this.rewards[reward_level]) {
          this.rewards[reward_level] = [];
        }
        this.rewards[reward_level].push(data);
      });
    },

    rewardLevel() {
      const userRewards = this.$store.state.details["userRewards"];
      for (const userReward of Object.keys(userRewards)) {
        var rewardClaimed = userRewards[userReward];
        if (rewardClaimed == "") {
          this.rewardTier = userReward;
          break;
        }
      }
    },
  },
};
</script>

<style>
.header h1,
.header h3,
.rewardName h3 {
  color: #020957;
  text-align: left;
  margin-bottom: 10px;
}

.header h1 {
  padding-top: 30px;
}

.rewardContent {
  background-color: #fef8f3;
  min-height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  margin-bottom: 32px;
  padding: 21px 32px 24px;
}

.rewardsTable {
  background-color: #ffefe2;
  padding: 20px;
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.header,
.rewardsTable {
  width: 100%;
}

.ant-button .orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  width: 100%;
  height: auto;
  padding-left: 48px;
  padding-right: 48px;
  white-space: normal;
}

.ant-button .orange:hover {
  /* color: black; */
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>