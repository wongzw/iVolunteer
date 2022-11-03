<template>
  <div class="participant-cards" v-if="!eventClose">
    <h1>Current Participants: <strong>({{ numAccepted }} volunteers accepted)</strong></h1>
    <div class="participant-box">
    <ParticipantCard
      v-for="participant in participants" :participant="participant" :eventId="eventId" @incrementVol="updateAccepted($event)"
    />
    </div>
  </div>

  <div class="participant-cards" v-if="eventClose">
    <h1>Event Closed: <strong>(Confirm Attendance Status)</strong></h1>
    <div class="participant-box">
    <ParticipantCard
      v-for="participant in acceptedParticipants" :participant="participant" :eventId="eventId" :eventClose="eventClose" :eventHour="eventHour" :eventBadge="this.event['badgeAwarded']" @incrementVol="updateAccepted($event)"
    />
    </div>
  </div>
</template>

<script>
import ParticipantCard from "@/components/organisation/ParticipantCard.vue";

export default {
  name: "ParticipantList",
  props: ["event", "eventId", "eventClose", "eventHour"],
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
    for (let key in participantMap) {
      this.participants.push([key, participantMap[key]]);
      if (participantMap[key]["applicationStatus"] == "accepted") {
        this.numAccepted += 1;
        this.acceptedParticipants.push([key, participantMap[key]]);
      }
    }
    console.log(this.participants)
  },
  methods: {
    updateAccepted(x) {
      this.numAccepted += 1;
    },
  }
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
