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
        :disabled="this.rewardTier > key"
      >
        <div class="rewards" v-for="reward in this.rewards[key]" :key="reward">
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
                @click="claim_reward(reward)"
                :disabled="reward.availableQty == 0 || this.rewardTier > key"
              >
                <span v-if="this.rewardTier > key">Tier Reward Claimed</span>
                <span v-else-if="reward.availableQty == 0">Fully Redeemed</span>
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
      rewardTier: null,
    };
  },

  mounted() {
    this.queryDB();
    this.currentRewardTier();
  },

  methods: {
    claim_reward(reward) {
      console.log(reward);
    },

    async queryDB() {
      const rewardsRef = collection(db, "level");
      const rewardDocSnap = await getDocs(rewardsRef);

      rewardDocSnap.forEach((doc) => {
        const data = doc.data();
        const reward_id = data["rewardID"];
        const reward_level = data["level"];
        if (reward_level in Object.keys(this.rewards)) {
          var current_reward = this.rewards[reward_level];
          current_reward.push(data);
          this.rewards[reward_level] = current_reward;
        } else {
          this.rewards[reward_level] = [data];
        }
      });
      console.log("Document data:", this.rewards);
      console.log(this.$store.state.details);
    },

    currentRewardTier() {
      const userRewards = this.$store.state.details.userRewards;
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
}

body {
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