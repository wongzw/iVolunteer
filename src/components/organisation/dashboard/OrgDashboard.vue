<template>
    <div class="box">
      <div class="header">
          <img src="@/assets/companyLogoTemp.png" alt="companyImg" /> 
          <h1 class="header-text">
              <b> Welcome, {{companyName}}! <br/>
              Here are your volunteering events :) </b>
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
          </h1>
      </div>

      <div class="content">
        <div class="blog-cards">
        <OrgEventCard :event="event" v-for="(event, index) in allCards" :key="index"/>
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
  components:{
    OrgEventCard,
  },
  data() {
    return {
      companyName: this.$store.state.details['orgName'],
      allCards: [],
    };
  },
  mounted() {
    this.queryEvents();
  },
  methods: {
    reroute_profile() {
      this.$router.push({path: '/organisation/profile'});
    },
    async queryEvents() {
      console.log("events are being queried...")
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
    }
  }
};
</script>
  
<style scoped>
.box {
  background-color: #FEF8F3;
}
.content {
  margin: 10vh;
  padding: 10vh;
  background-color:#FFE9D6;
  height: auto;
}

img{
  max-width: 25%;
  max-height: 25%;
  margin-right: 5%;
  margin-top: 5vh;
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
  width: 50%;
}
.blog-cards {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
}

</style>