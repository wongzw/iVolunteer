<template>
  <a-modal
    title="Volunteer Details"
    v-model:visible="toggleProfile"
    @ok="handleOk"
  >
    <template #footer> </template>
    <VolunteerProfile :participantId="this.participant[0]"/>
  </a-modal>

  <div
    class="participant-card"
    v-if="this.status != 'rejected' && this.render == true"
  >
    <div class="profile">
      <img class="profileImg" src="@/assets/Volunteer.svg" />
      <div>
        <p class="text">{{ displayName }}</p>
        <a-button
          class="profileView"
          htmlType="submit"
          size="large"
          type="primary"
          @click="viewProfile"
          danger
          >View Profile
        </a-button>
      </div>
    </div>

    <div class="interest">
      <div class="indInterest" v-for="interest in this.interests.slice(0,3)">
        <img src="@/assets/check_24px.svg" />
        <p class="interestPara">Volunteering interest in {{ interest }}</p>
      </div>
    </div>

    <div class="confirm">
      <a-button
        class="confirmButton"
        htmlType="submit"
        size="large"
        type="primary"
        danger
        @click="acceptHandler"
        v-if="this.status != 'accepted'"
        >Accept
      </a-button>
      <a-button
        class="confirmButton"
        htmlType="submit"
        @click="rejectHandler"
        size="large"
        type="primary"
        danger
        v-if="this.status != 'accepted'"
        >Reject
      </a-button>
      <a-button
        class="confirmButton"
        htmlType="submit"
        @click="rejectHandler"
        size="large"
        type="primary"
        disabled
        danger
        v-if="this.status == 'accepted'"
        >Volunteer Accepted
      </a-button>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import VolunteerProfile from "@/components/organisation/VolunteerProfile.vue";

export default {
  name: "ParticipantCard",
  props: ["participant", "eventId"],
  data() {
    return {
      interests: [],
      status: "",
      render: false,
      visible: false,
      toggleProfile: false,
    };
  },
  components: {
    VolunteerProfile,
  },
  mounted() {
    this.interests = this.participant[1]["interests"];
    this.status = this.participant[1]["applicationStatus"];
    this.render = true;
  },
  computed: {
    displayName() {
      return this.participant[1]["fullName"];
    },
  },
  methods: {
    async updateRejectEvent() {
      let participantId = this.participant[0];
      const eventDocRef = doc(db, "events", this.eventId);
      const docSnap = await getDoc(eventDocRef);
      let eventDocRefData = docSnap.data();
    },
    async updateAcceptEvent() {
      let participantId = this.participant[0];
      const eventDocRef = doc(db, "events", this.eventId);
      const docSnap = await getDoc(eventDocRef);
      let eventDocRefData = docSnap.data();
      eventDocRefData["participants"][participantId]["applicationStatus"] =
        "accepted";
      await setDoc(doc(db, "events", this.eventId), eventDocRefData);
    },
    async updateAcceptUser() {
      let participantId = this.participant[0];
      const eventDocRef = doc(db, "users", participantId);
      const docSnap = await getDoc(eventDocRef);
      let eventDocRefData = docSnap.data();
      eventDocRefData["userAcceptedEvents"].push(this.eventId);
      await setDoc(doc(db, "users", participantId), eventDocRefData);
    },
    acceptHandler() {
      this.status = "accepted";
      this.updateAcceptEvent();
      this.updateAcceptUser();
    },
    rejectHandler() {
      this.status = "rejected";
      this.updateRejectEvent();
    },
    viewProfile() {
      this.toggleProfile = true;
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
}
.profileView {
  margin-top: -15%;
  width: 100%;
}
.profileImg {
  margin-right: 15%;
  width: 70%;
}
.text {
  color: #020957;
  font-weight: bold;
  font-size: 20px;
  width: 120%;
}
.participant-card {
  background-color: #ffffff;
  padding: 2% 5% 2% 5%;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  display: flex;
  margin-bottom: 2%;
}

.interest {
  margin-left: 20%;
  width: 50%;
  margin-right: 20%;
}

.confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.indInterest {
  display: flex;
}

.interestPara {
  margin-top: 2%;
}

.confirmButton {
  margin-right: 5%;
  width: 120%;
  background-color: #ff5b2e;
}

#modalHeader {
  margin-bottom: 10%;
  margin-top: 2%;
}
</style>