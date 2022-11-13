<template>
  <div id="userAchievements">
    <div class="box">
      <div id="box-title">Rewards</div>
    </div>

    <div v-if="Object.keys(this.reward_dict).length == 0">
      <div class="noEvents">
        <h2>
          <br />
          <b> No Rewards Found 😔 </b>
        </h2>
      </div>
    </div>

    <div class="box rewardsDisplay">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane
          v-for="(value, key) in this.reward_dict"
          :key="key"
          :tab="'Tier ' + key"
        >
          <div class="rewardContent">
            <div
              class="rewardsCard"
              v-for="reward in this.reward_dict[key]"
              :key="reward"
            >
              <div class="rewardName">
                <h3>
                  <b>{{ reward[1] }}</b>
                </h3>
              </div>

              <div class="ant-button">
                <a-button
                  type="primary"
                  size="large"
                  class="orange"
                  @click="showCode(reward)"
                >
                  <span>Show Code</span>
                </a-button>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { notification } from "ant-design-vue";
import { SmileOutlined, RobotOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

export default {
  name: "UserRewards",
  data() {
    return {
      reward_dict: {},
      showCodeDisplay: false,
    };
  },
  setup() {
    const showCodeNotif = (reward) => {
      notification.open({
        message: reward[0] + " Reward",
        description: "Reward Code: " + reward[3],
        duration: 10,
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
      showCodeNotif,
      error,
    };
  },
  mounted() {
    this.getRewards();
  },
  methods: {
    async getRewards() {
      const user_rewards = this.$store.state.details["userRewards"];
      for (const rewardLevel of Object.keys(user_rewards)) {
        var reward_id = user_rewards[rewardLevel]["id"];
        var reward_code = user_rewards[rewardLevel]["redemptionCode"];
        if (reward_id != "") {
          const docRef = doc(db, "rewards", reward_id);
          const docSnap = await getDoc(docRef);
          const reward_details = docSnap.data();
          const reward_level = reward_details["tier"];

          if (reward_details != {}) {
            var reward_displayed = [
              reward_details["merchant"],
              reward_details["name"],
              reward_id,
              reward_code,
            ];
            if (!this.reward_dict[reward_level]) {
              this.reward_dict[reward_level] = [];
            }
            this.reward_dict[reward_level].push(reward_displayed);
          } else {
            this.error();
          }
        }
      }
    },

    showCode(reward) {
      this.showCodeDisplay = true;
      this.showCodeNotif(reward);
      this.showCodeDisplay = false;
    },
  },
};
</script>

<style scoped>
#userAchievements {
  margin-top: 36px;
  margin-right: 40px;
  background-color: #ffefe2;
  height: 30vh;
  border-radius: 5px;
  padding: 24px;
}

.box {
  text-align: left;
  padding-left: 15px;
}

#box-title {
  margin-top: 4px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}

.rewardContent {
  margin-bottom: 10px;
}

.rewardsCard {
  background-color: #fef8f3;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  padding: 21px 20px 15px;
  display: flex;
}

.rewardName {
  width: 80%;
}

.ant-button {
  width: 40%;
}

.ant-button .orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  height: auto;
  padding-left: 40px;
  padding-right: 40px;
  white-space: normal;
  margin: 0;
}

.ant-button .orange:hover {
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>