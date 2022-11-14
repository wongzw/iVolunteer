<template>
  <div class="participant-cards" v-if="!eventPast">
    <h1>
      Current Participants:
      <strong>({{ numAccepted }} volunteers accepted)</strong>
    </h1>
    <div class="participant-box">
      <ParticipantCard
        v-for="participant in participants"
        :participant="participant"
        :eventId="eventId"
        @incrementVol="updateAccepted($event)"
      />
    </div>
  </div>

  <div class="participant-cards" v-if="eventPast">
    <h1>Event Closed: <strong>(Confirm Attendance Status)</strong></h1>
    <div class="participant-box">
      <ParticipantCard
        v-for="participant in acceptedParticipants"
        :participant="participant"
        :eventId="eventId"
        :eventPast="eventPast"
        :eventHour="eventHour"
        :eventBadge="this.event['badgeAwarded']"
        @incrementVol="updateAccepted($event)"
      />
    </div>
  </div>
</template>

<script>
import ParticipantCard from "@/components/organisation/ParticipantCard.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  name: "ParticipantList",
  props: ["event", "eventId", "eventPast", "eventHour"],
  components: {
    ParticipantCard,
  },
  data() {
    return {
      participants: [],
      acceptedParticipants: [],
      numAccepted: 0,
    };
  },
  mounted() { 
    let participantMap = this.event["participants"];
    console.log(participantMap);
    let ordered = [];

    for (let key in participantMap) {
      let skillCount = participantMap[key]["interests"].length;
      ordered.push([key, skillCount]);
    }

    // sort array
    ordered.sort((a, b) => b[1] - a[1]);
    console.log(ordered);

    for (let i=0; i < ordered.length; i++) {
      console.log(ordered[i][0]);
      let key = ordered[i][0];
      this.participants.push([key, participantMap[key]]);
      if (participantMap[key]["applicationStatus"] == "accepted") {
        this.numAccepted += 1;
        this.acceptedParticipants.push([key, participantMap[key]]);
      }
    }

    console.log(this.participants);
  
  },
  methods: {
    updateAccepted(x) {
      this.numAccepted += 1;
    },
  },
};
</script>

<style scoped>
.participant-cards {
  margin-top: 2%;
  background-color: #ffefe2;
  text-align: left;
  width: 90%;
  padding: 2% 2% 2% 2%;
  margin-bottom: 5%;
}

h1 {
  font-weight: bolder;
  color: #020957;
}
.participant-box {
  flex-direction: column;
}

strong {
  color: #ff3700;
}
</style>
