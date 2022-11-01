<template>
    <div class="card-holder">
    <div class="current-events">
      <h1 style="color: #ff734c; font-family: 'Mulish'; font-weight: 700">
        Current Events
      </h1>
    </div>

    <div class="event-cards">
      <VolProfileEventCard
        :event="event"
        v-for="(event, index) in acceptedEvents"
        :key="index"
      />
    </div>
  </div>
</template>
    
<script>
import VolProfileEventCard from "@/components/volunteer/profile/VolProfileEventCard.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.js";


export default {
    name: 'CurrentUserEvents',
    data() {
        return {
            acceptedEvents: [],
        };
    },
    components: {
        VolProfileEventCard,
    },
    mounted() {
        this.queryDb();
    },
    methods: {
        async queryDb() {
            const userAccepted = this.$store.state.details["userAcceptedEvents"]
            const eventSnapshot = await getDocs(collection(db, "events"))
            eventSnapshot.forEach((doc) => {
                if (userAccepted.includes(doc.id)) {
                    this.acceptedEvents.push({ id: doc.id, data: doc.data()})
                } 
            })
            console.log(this.acceptedEvents);
        },
    },
  };

</script>
    
<style scoped>

    .card-holder {
        width: 876px;
        margin-top: 36px;
        margin-right: 40px;
        margin-left: 40px;
        margin-bottom: 38px;
        background-color: #ffefe2;
        padding: 26px 36px 16px;
        border-radius: 5px;
    }

    .current-events {
    display: flex;
    margin-bottom: 20px;
    }
</style>