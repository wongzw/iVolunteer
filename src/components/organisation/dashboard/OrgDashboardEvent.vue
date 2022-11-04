<template>
    <h1 class="header-text">
        Welcome, {{companyName}}! <br/>
        Here are your volunteering events :)
    </h1>
    <div class="box">
        <h1 class="header-text">All Events</h1>
        <div class="blog-cards">
        <OrgEventCard :event="event" v-for="(event, index) in EventCards" :key="index"/>
        </div>
    </div>
  </template>
  
  <script>
  import OrgEventCard from "./OrgEventCard.vue";
  import { collection, query, where } from "firebase/firestore";
  import { doc, getDoc, getDocs } from "firebase/firestore";
  import { db } from "@/firebase.js";

  export default {
    name: "OrgDashboardEvent",
    data() {
      return {
        companyName: this.$store.state.details['orgName'],
        EventCards: []
      };
    },
    components: {
      OrgEventCard,
    },
    mounted() {
        this.queryEvents();
    },
    methods: {
      async queryEvents() {
        // org snapshot data
        const orgId = this.$store.state.id;
        const orgRef = await doc(db, "organisation", orgId);
        const org = await getDoc(orgRef);
        let data = org.data();
        console.log("Document data:", data);
        const orgEvents = org.events;

        // event snapshot
        const eventSnapshot = await getDocs(collection(db, "events"));
        orgEvents.forEach((ev) => {
            eventSnapshot.forEach((doc) => {
          if (doc.id == ev) {
              console.log(doc.id, "=>", doc.data());
              this.EventCards.push({ id: doc.id, data: doc.data() });
            }
        });
        });
      },
    }
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