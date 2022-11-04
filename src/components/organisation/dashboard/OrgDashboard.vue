<template>
  <div class="box">
    <div class="header">
      <img src="@/assets/companyLogoTemp.png" alt="companyImg" />
      <div class="header-text">
        <h1>
          <b> Welcome, {{ companyName }}!</b>
        </h1>
        <h2><b> Check out all your active events below. </b></h2>

        <div class="ant-button">
          <a-button
            type="primary"
            size="large"
            class="orange"
            @click="reroute_profile"
          >
            View Profile
          </a-button>
        </div>
      </div>
    </div>

    <div id="orgEvents">
      <div class="orgEventHeader">
        <h1 id="box-title"><b>Current Events</b></h1>
      </div>
      <div class="blog-cards">
        <OrgEventCard
          :event="event"
          v-for="(event, index) in allCards"
          :key="index"
        />
      </div>

      <div v-if="this.allCards.length == 0">
        <div class="noEvents">
          <h2>
            <b>
              No Current Events Found 😔 <br />
              <a href="/volunteer/dashboard" style="color: #ff5b2e">
                Sign up
              </a>
              for one today!
            </b>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import OrgEventCard from "./OrgEventCard.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase.js";

export default {
  name: "OrgDashboard",
  components: {
    OrgEventCard,
  },
  data() {
    return {
      companyName: this.$store.state.details["orgName"],
      allCards: [],
    };
  },
  mounted() {
    this.queryEvents();
  },
  methods: {
    reroute_profile() {
      this.$router.push({ path: "/organisation/profile" });
    },

    async queryEvents() {
      console.log("events are being queried...");
      // org snapshot data
      const orgId = this.$store.state.id;
      const orgRef = doc(db, "organisation", orgId);
      const org = await getDoc(orgRef);
      let data = org.data();
      console.log("Document data:", data);
      const orgEvents = data.events;

      // event snapshot
      const eventSnapshot = await getDocs(collection(db, "events"));
      orgEvents.forEach((ev) => {
        eventSnapshot.forEach((doc) => {
          if (doc.id == ev) {
            console.log(doc.id, "=>", doc.data());
            this.allCards.push({ id: ev, data: doc.data() });
          }
        });
      });
    },
  },
};
</script>
  
<style scoped>
.box {
  text-align: left;
  margin-left: 10vw;
  height: auto;
  margin-bottom: 20px;
  width: 80%;
}

.header {
  align-items: left;
  display: flex;
}

img {
  max-width: 250px;
  max-height: 250px;
  margin-right: 5%;
  margin-top: 5vh;
}

#orgEvents {
  margin-top: 36px;
  margin-right: 36px;
  margin-bottom: 36px;
  background-color: #ffefe2;
  width: 100%;
  height: 60vh;
  border-radius: 5px;
  padding: 24px;
  overflow: auto;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 3vh;
  color: #ff734c;
}

.noEvents {
  justify-content: center;
  display: flex;
  text-align: center;
}

.header-text {
  color: #020957;
  text-align: left;
  margin-top: 5vh;
  display: inline-block;
}

.ant-button .orange {
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  margin-top: 5vh;
  height: auto;
  width: 100%;
}

.ant-button .orange:hover {
  /* color: black; */
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>