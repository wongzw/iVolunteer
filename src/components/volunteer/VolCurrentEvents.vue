<template>
  <h1 class="header-text">Events For You</h1>
  <div class="blog-cards">
    <VolEventCard
      :event="event"
      v-for="(event, index) in interestCards"
      :key="index"
    />
  </div>
  <h1 class="header-text">All Events</h1>
  <div class="blog-cards">
    <VolEventCard
      :event="event"
      v-for="(event, index) in allCards"
      :key="index"
    />
  </div>
</template>

<script>
import OrgEventCard from "@/components/organisation/OrgEventCard.vue";
import VolEventCard from "./VolEventCard.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  name: "VolCurrentEvents",
  data() {
    return {
      interestCards: [],
      allCards: [],
    };
  },
  components: {
    VolEventCard,
  },
  mounted() {
    this.queryInterests();
    this.queryEvents();
  },
  methods: {
    async queryInterests() {
      const userInterests = this.$store.state.details["interests"];
      const q = query(
        collection(db, "events"),
        where("eventCauses", "array-contains-any", userInterests)
      );
      const eventSnapshot = await getDocs(q);
      eventSnapshot.forEach((doc) => {
        const eventDate = doc.data()["dateStart"];
        const eventDateParts = eventDate.split("-");
        const eventDateObject = new Date(
          +eventDateParts[2],
          eventDateParts[1] - 1,
          +eventDateParts[0]
        );
        const today = new Date();
        if (eventDateObject > today) {
          this.interestCards.push({ id: doc.id, data: doc.data() });
        }
      });
    },
    async queryEvents() {
      const eventSnapshot = await getDocs(collection(db, "events"));
      eventSnapshot.forEach((doc) => {
        const eventDate = doc.data()["dateStart"];
        const eventDateParts = eventDate.split("-");
        const eventDateObject = new Date(
          +eventDateParts[2],
          eventDateParts[1] - 1,
          +eventDateParts[0]
        );
        const today = new Date();
        if (eventDateObject > today) {
          this.allCards.push({ id: doc.id, data: doc.data() });
        }
      });
    },
  },
};
</script>

<style scoped>
.blog-cards {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 0;
}

.header-text {
  color: #020957;
  text-align: left;
  margin-top: 40px;
}

.header-text:last-of-type {
  margin-top: 0;
}
</style>