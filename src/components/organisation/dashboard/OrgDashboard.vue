<template>
  <div class="box">
    <div class="header">
      <img :src="this.display" alt="companyImg" />
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
            @click="reroute_event('/organisation/profile')"
          >
            View Profile
          </a-button>
        </div>
      </div>
    </div>

    <div id="orgEvents">
      <div class="orgEventHeader">
        <h1 id="box-title"><b>Current Events</b></h1>
        <a-button
          type="primary"
          size="large"
          class="orange"
          @click="reroute_event('/event/creation')"
        >
          Create Event
        </a-button>
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
              <a href="/event/creation" style="color: #ff5b2e"> Create </a>
              one today!
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
      display: this.$store.state.details["photoUrl"],
      allCards: [],
    };
  },
  mounted() {
    this.queryEvents();
    console.log(this.allCards[0].get("data").dateStart);
    // this.allCards.sort(function(a, b) {
    //     return new Date(a.get("data").dateStart) - new Date(b.get("data").dateStart);
    // });
  },
  methods: {
    reroute_event(route) {
      this.$router.push({ path: route });
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
          if (doc.id == ev && doc.data()["eventClosed"] == false) {
            console.log(doc.id, "=>", doc.data());
            const str = doc.data().dateEnd;

            // parse string & make into datetime object
            const [day, month, year] = str.split("-");
            const date = new Date(year, month - 1, day);

            // get today's date
            const today = new Date(); // returns time

            // only show the events that have yet to end; compare time
            if (date.getTime() >= today) {
              this.allCards.push({id: ev, data: doc.data()});
            }
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

.orgEventHeader {
  display: flex;
  align-items: center;
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
  text-align: left;
  margin-top: 5vh;
  display: inline-block;
}

.header-text h1,
.header-text h2 {
  color: #020957;
}

.orange {
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
}

.ant-button .orange {
  width: 100%;
  margin-top: 5vh;
}

.orgEventHeader .orange {
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  margin-left: 30px;
  margin-bottom: 25px;
  margin-top: 0px;
}

.ant-button .orange:hover,
.orgEventHeader .orange:hover {
  /* color: black; */
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>