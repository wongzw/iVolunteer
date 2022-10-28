<template>
  <div class="card-holder">
    <div class="current-events">
      <h1 style="color: #ff734c; font-family: 'Mulish'; font-weight: 700">
        Current Events
      </h1>
      <div class="ant-button">
        <a-button
          type="primary"
          size="large"
          class="orange"
          @click="eventCreation"
        >
          Create Event</a-button
        >
      </div>
    </div>

    <div class="event-cards">
      <OrgEventCard
        :event="event"
        v-for="(event, index) in EventCards"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import OrgEventCard from "@/components/organisation/OrgEventCard.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  name: "OrgCurrentEvents",
  data() {
    return {
      EventCards: [],
    };
  },
  components: {
    OrgEventCard,
  },
  mounted() {
    this.queryDb();
  },
  methods: {
    eventCreation() {
      this.$router.push({ path: "/event/creation" });
    },
    async queryDb() {
      const eventRef = collection(db, "events");
      const q = query(eventRef, where("orgId", "==", this.$store.state.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.EventCards.push({ id: doc.id, data: doc.data() });
      });
      console.log(this.EventCards);
    },
  },
};
</script>

<style scoped>
.card-holder {
  width: 100%;
  margin-top: 36px;
  margin-right: 40px;
  margin-bottom: 38px;
  background-color: #ffefe2;
  padding: 26px 36px 16px;
}

.current-events {
  display: flex;
  margin-bottom: 20px;
}

.ant-button {
  vertical-align: middle;
  padding-top: 3px;
  margin-left: 30px;
  font-family: "Muli";
  font-weight: 700;
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