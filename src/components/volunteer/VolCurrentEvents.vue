<template>
  <div class="blog-cards">
    <VolEventCard
      :event="event"
      v-for="(event, index) in EventCards"
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
      EventCards: [],
    };
  },
  components: {
    VolEventCard,
  },
  mounted() {
    this.queryDb();
  },
  methods: {
    async queryDb() {
      const eventSnapshot = await getDocs(collection(db, "events"));
      eventSnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.EventCards.push({ id: doc.id, data: doc.data() });
      });
    },
  },
};
</script>

<style scoped>
.blog-cards {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-right: 0;
}
</style>