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
        :disabled="this.userRewardTier < key"
      >
        <div class="rewardClaimed" v-if="this.claimedRewardTiers[key] == true">
          <div class="rewardClaimed">
            <h2>
              <b
                >Tier Reward Claimed ❤ Check your Rewards at
                <a href="/volunteer/profile" style="color: #ff5b2e">
                  your profile!
                </a>
              </b>
            </h2>
          </div>
        </div>
        <div
          class="rewardsCard"
          v-for="reward in this.rewards[key]"
          :key="reward"
          v-else
        >
          <div class="rewardContent">
            <div class="rewardName">
              <h3>
                <b>{{ reward.merchant }} - {{ reward.name }}</b>
              </h3>
            </div>

            <div class="ant-button">
              <a-button
                type="primary"
                size="large"
                class="orange"
                @click="claimConfirm(reward)"
                :disabled="
                  reward.availableQty == 0 ||
                  this.userRewardTier < key ||
                  this.rewardTier == 0
                "
              >
                <span v-if="reward.availableQty == 0">Fully Redeemed</span>
                <span v-else-if="this.userRewardTier < key">Ineligible</span>
                <span v-else
                  >Redeem Reward -
                  {{ reward.redemptionCode.length }} Remaining</span
                >
              </a-button>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>

  <div class="a-modal">
    <a-modal
      v-model:visible="this.rewardsConfirmModal"
      title="Are you sure you want to redeem?"
      @ok="handleOk"
    >
      <template #footer>
        <div class="ant-button">
          <a-button key="cancel" @click="claimConfirmCancel" style="width: 40%"
            >Cancel</a-button
          >

          <a-button
            class="orange"
            key="Confirm"
            type="primary"
            :loading="loading"
            @click="claimReward(this.rewardConfirm)"
            style="width: 40%"
            :disabled="this.rewardConfirmChecked == false"
            >Confirm</a-button
          >
        </div>
      </template>
      <div class="modalContent">
        <h2>Tier {{ this.rewardConfirm.tier }} Reward</h2>
        <h3>
          {{ this.rewardConfirm.name }} from {{ this.rewardConfirm.merchant }}
        </h3>
        <div class="termsnconbox">
          <a-checkbox
            class="a-checkbox"
            v-model:checked="this.rewardConfirmChecked"
            ><h4 style="text-align: center">
              I agree with the
              <span class="termsncon">Terms & Conditions </span>
            </h4></a-checkbox
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { notification } from "ant-design-vue";
import { SmileOutlined, RobotOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

export default {
  name: "RedemptionModule",
  data() {
    return {
      rewards: {},
      userRewardTier: 0,
      claimedRewardTiers: {},
      rewardsConfirmModal: false,
      rewardConfirm: {},
      rewardConfirmChecked: false,
    };
  },

  setup() {
    const cancelNotification = () => {
      notification.open({
        message: "Operation Cancelled",
        description: "Tier Rewards Claim Cancelled. Rewards not claimed",
        duration: 3,
      });
    };

    const tierClaimed = () => {
      notification.open({
        message: "Reward Tier Previously Claimed",
        description:
          "You have previously claimed a reward for this tier. Check existing rewards at your profile",
        duration: 3,
      });
    };

    const rewardGranted = (assigned_code, reward_tier) => {
      notification.open({
        message: "Tier " + reward_tier + " Reward Claimed!",
        description:
          "Your Reward Code is " +
          assigned_code +
          " and can also be found in your profile. Keep up the good work!",
        duration: 3,
        icon: () => h(SmileOutlined, { style: "color: #020957" }),
      });
    };

    const error = () => {
      notification.open({
        message: "Error",
        description: "An Error Occurred. Please try again. ",
        duration: 3,
        icon: () => h(RobotOutlined, { style: "color: #ff3700" }),
      });
    };

    return {
      cancelNotification,
      tierClaimed,
      rewardGranted,
      error,
    };
  },

  mounted() {
    this.queryDB();
    this.rewardLevel();
  },

  methods: {
    claimConfirm(reward) {
      this.rewardConfirm = reward;
      this.rewardsConfirmModal = true;
    },

    claimConfirmCancel() {
      this.rewardsConfirmModal = false;
      this.rewardConfirmChecked = false;
      this.cancelNotification();
      location.reload();
    },

    claimReward(reward) {
      // Pop Data from FS
      console.log(reward);
      var reward_level = reward["tier"];
      this.rewardsConfirmModal = false;
      this.rewardConfirmChecked = false;
      this.rewardConfirm = {};

      // Assign to user
      if (!this.$store.state.details["userRewards"][reward_level]) {
        var assigned_code = reward["redemptionCode"].pop();
        reward["availableQty"] -= 1;
        this.$store.commit("updateRewards", {
          reward_level: reward_level,
          assigned_code: assigned_code,
          reward_id: reward.id,
        });
        this.updateDb(this.$store.state.id, reward);
      } else {
        this.rewardLevel();
        this.tierClaimed(assigned_code, reward_level);
        location.reload();
      }

      console.log(this.$store.state.details["userRewards"]);
    },

    async updateDb(uid, award) {
      const volRef = doc(db, "users", uid);
      await updateDoc(volRef, this.$store.state.details);
      const levelRef = doc(db, "rewards", award.id);
      await updateDoc(levelRef, award);
      this.rewardGranted();
      this.rewardLevel();
    },

    async queryDB() {
      const rewardsRef = collection(db, "rewards");
      const rewardDocSnap = await getDocs(rewardsRef);
      this.computeRewards(rewardDocSnap);
    },

    computeRewards(rewardDocSnap) {
      rewardDocSnap.forEach((doc) => {
        let data = doc.data();
        let reward_id = data["rewardID"];
        let reward_level = data["tier"];
        if (!this.rewards[reward_level]) {
          this.rewards[reward_level] = [];
        }
        data["id"] = doc["id"];
        this.rewards[reward_level].push(data);
      });
    },
    rewardLevel() {
      const userExp = this.$store.state.details["userExp"];
      const userLevel = Math.floor(userExp / 5000);
      this.userRewardTier = userLevel;
      for (let i = 1; i <= userLevel; i++) {
        this.claimedRewardTiers[i] = false;
      }
      const userRewards = this.$store.state.details["userRewards"];
      for (const userRewardLevel of Object.keys(userRewards)) {
        var rewardClaimed = userRewards[userRewardLevel]["id"];
        if (rewardClaimed != "") {
          this.claimedRewardTiers[userRewardLevel] = true;
        }
      }
    },
  },
};
</script>

<style scoped>
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
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  margin-bottom: 32px;
  padding: 21px 32px 24px;
  display: flex;
}

.rewardsTable {
  background-color: #ffefe2;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 8px;
  height: auto;
  min-height: 60vh;
  overflow: auto;
}

.rewardClaimed {
  justify-content: center;
}

.header,
.rewardsTable {
  width: 100%;
}

.rewardName {
  justify-content: center;
  width: 50%;
}

.rewardContent .ant-button {
  width: 50%;
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
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}

.ant-button .orange:disabled {
  background-color: lightgray;
  border-color: lightgray;
  transition: 0.3s ease;
}

.rewardsTable .ant-tabs-tab-btn {
  font-size: 110%;
}

.a-modal {
  background-color: #ffefe2;
}

.termsncon {
  color: #ff3700;
}

.modalContent h3,
.modalContent h2,
.termsnconbox {
  color: #020957;
  text-align: center;
  padding: 10px;
}
</style>