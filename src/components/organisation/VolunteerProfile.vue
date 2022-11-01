<template>
  <div class="modal" v-if="this.rendered">
    <img style="margin-bottom: 5%" src="@/assets/Volunteer.svg" />
    <h2>{{ displayFullName }}</h2>

    <div class="details">
      <p>
        Hours Volunteered: {{ this.participantDetails["hoursVolunteered"] }}
      </p>
      <p>No Show Count: {{ this.participantDetails["noShowNum"] }}</p>
      <p>Skills: {{ displaySkills }}</p>
      <p>Badge Awarded: {{ displayBadges }}</p>
      <p>Number of Applied Events: {{ numAppliedEvents }}</p>
      <p>Number of Accepted Events: {{ numAcceptedEvents }}</p>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";

export default {
  name: "VolunteerProfile",
  props: ["participantId"],
  computed: {
    displaySkills() {
      return this.participantDetails["interests"].join(", ");
    },
    numAppliedEvents() {
      return this.participantDetails["userAppliedEvents"].length;
    },
    numAcceptedEvents() {
      return this.participantDetails["userAcceptedEvents"].length;
    },
    displayFullName() {
        return this.participantDetails["firstName"] + " " + this.participantDetails["lastName"]
    },
    displayBadges() {
      let showBadges = []
      for (let key in this.participantDetails["userBadges"]) {
        showBadges.push(key);
      }
      return showBadges.join(",");
    }
  },
  data() {
    return {
      participantDetails: false,
      rendered: false,
    };
  },
  async mounted() {
    var docRef = doc(db, "users", this.participantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.participantDetails = docSnap.data();
      this.rendered = true;
    }
  },
};
</script>

<style scoped>
.modal {
  text-align: center;
  color: #020957;
  line-height: 80%;
  flex-direction: column;
}

h2 {
  font-weight: bold;
  color: #020957;
}

.details {
  margin-top: 5%;
}

p {
  color: orange;
  font-weight: bold;
  line-height: 120%;
}
</style>