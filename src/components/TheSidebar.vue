<template>
  <div id="sidebar">
    <div class="container">
      <div class="antDP">
        <a-avatar :size="67">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <h1 id="sidebarName">{{ name }}</h1>
    </div>

    <expBar :name="name" :userExp="userExp" :userLevel="userLevel" />

    <div id="sidebarMenu">
      <div class="sidebarContainer">
        <div class="linkContainer">
          <a class="sidebarLink" @click="reroute_profile">
            <img
              style="margin-right: 6px"
              src="@/assets/faceIcon.svg"
              alt="faceIcon"
            />
            My Profile
          </a>
        </div>

        <div>
          <a class="sidebarLink" @click="reroute_leaderboard">
            <img
              style="margin-right: 8px"
              src="@/assets/leaderboardIcon.svg"
              alt="faceIcon"
            />
            Leaderboard
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import expBar from "@/components/expBar.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  name: "TheSidebar",
  data() {
    return {
      name: this.$store.state.details["fullName"],
      userExp: this.$store.state.details["userExp"],
      userLevel: this.$store.state.details["userLevel"],
    };
  },
  components: {
    UserOutlined,
    expBar,
  },
  methods: {
    reroute_profile() {
      this.$router.push({ path: "/volunteer/profile" });
    },
    reroute_leaderboard() {
      this.$router.push({ path: "/volunteer" });
    },
  },
};
</script>

<style scoped>
.sidebarLink {
  font-family: "Cabin";
  font-size: 18px;
  color: #020957;
}

#sidebarMenu {
  height: 20vh;
  margin-top: 16px;
  background-color: #ffefe2;
  border-radius: 5px;
}

#sidebar {
  margin-top: 36px;
  margin-left: 30px;
  margin-right: 30px;
  color: #020957;
  width: 250px;
  height: 80vh;
}

#sidebarName {
  font-family: "Mulish";
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 0;
  padding: 14px 0;
  color: #020957;
}

.sidebarContainer {
  text-align: left;
}

.linkContainer {
  margin-bottom: 16px;
}

.container {
  display: flex;
  margin-bottom: 20px;
}

.antDP {
  margin-right: 18px;
}
</style>

