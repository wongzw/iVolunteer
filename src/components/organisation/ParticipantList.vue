<template>
  <div class="participant-cards">
    <h1>Current Participants</h1>
    <div class="participant-box">
    <ParticipantCard
      v-for="participant in participants" :participant="participant" :eventId="eventId"
    />
    </div>
  </div>
</template>

<script>
import ParticipantCard from "@/components/organisation/ParticipantCard.vue";

export default {
  name: "ParticipantList",
  props: ["event", "eventId"],
  components: {
    ParticipantCard,
  },
  data() {
    return {
      participants: [],
    };
  },
  computed: {

  },
  mounted() {
    let participantMap = this.event["participants"];
    console.log(participantMap);
    for (let key in participantMap) {
      this.participants.push([key, participantMap[key]]);
    }
    console.log(this.participants)
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
</style>
