<template>
  <a-modal title="Volunteer Details" v-model:visible="toggleProfile">
    <template #footer> </template>
    <VolunteerProfile :participantId="this.participant[0]" />
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
          >View Profile
        </a-button>
      </div>
    </div>

    <div class="interest">
      <div class="indInterest" v-for="interest in this.interests.slice(0, 3)">
        <img src="@/assets/check_24px.svg" />
        <p class="interestPara">Volunteering interest in {{ interest }}</p>
      </div>
    </div>

    <div class="confirm" v-if="!eventClose">
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
        v-if="this.status == 'accepted'"
        >Volunteer Accepted
      </a-button>
    </div>

    <div class="confirm" v-if="eventClose">
      <a-button
        class="confirmButton"
        htmlType="submit"
        size="large"
        type="primary"
        @click="attendHandler"
        v-if="this.confirmStatus == 'unconfirmed'"
        >Attended
      </a-button>
      <a-button
        class="confirmButton"
        htmlType="submit"
        size="large"
        type="primary"
        @click="noShowHandler"
        v-if="this.confirmStatus == 'unconfirmed'"
        >No Show
      </a-button>
      <a-button
        class="confirmButton"
        htmlType="submit"
        @click="rejectHandler"
        size="large"
        type="primary"
        disabled
        v-if="this.confirmStatus == 'noshow'"
        >No Show
      </a-button>
      <a-button
        class="confirmButton"
        htmlType="submit"
        @click="rejectHandler"
        size="large"
        type="primary"
        disabled
        v-if="this.confirmStatus == 'attend'"
        >Attended
      </a-button>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import VolunteerProfile from "@/components/organisation/VolunteerProfile.vue";

export default {
  name: "ParticipantCard",
  props: ["participant", "eventId", "eventClose", "eventHour", "eventBadge"],
  emits: ["incrementVol"],
  data() {
    return {
      interests: [],
      status: "",
      render: false,
      visible: false,
      toggleProfile: false,
      confirmStatus: "",
    };
  },
  components: {
    VolunteerProfile,
  },
  mounted() {
    this.interests = this.participant[1]["interests"];
    this.status = this.participant[1]["applicationStatus"];
    this.confirmStatus = this.participant[1]["attendanceStatus"];
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
      const participantDocRef = doc(db, "users", participantId);
      const newNotification = {
        date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        eventId: this.eventId,
        notifType: "Accept",
      };
      await updateDoc(participantDocRef, {
        userAcceptedEvents: arrayUnion(this.eventId),
        userNotification: arrayUnion(newNotification),
      });
    },
    async updateAttendEvent() {
      let participantId = this.participant[0];
      const eventDocRef = doc(db, "events", this.eventId);
      const docSnap = await getDoc(eventDocRef);
      let eventDocRefData = docSnap.data();
      eventDocRefData["participants"][participantId]["attendanceStatus"] =
        this.confirmStatus;
      await setDoc(doc(db, "events", this.eventId), eventDocRefData);
    },
    async updateUser() {
      let participantId = this.participant[0];
      const participantDocRef = doc(db, "users", participantId);
      const docSnap = await getDoc(participantDocRef);
      let participantDocSnapData = docSnap.data();

      for (const badge of this.eventBadge) {
        let now = new Date();
        let todayUTC = new Date(
          Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
        );
        participantDocSnapData["userBadges"][badge] = todayUTC
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/");
      }

      if (this.confirmStatus == "attend") {
        await updateDoc(participantDocRef, {
          userAttendedEvents: arrayUnion(this.eventId),
          hoursVolunteered: increment(this.eventHour),
          userExp: increment(this.eventHour * 50),
          userBadges: participantDocSnapData["userBadges"],
        });
      } else {
        await updateDoc(participantDocRef, {
          noShowNum: increment(1),
        });
      }
    },
    acceptHandler() {
      this.status = "accepted";
      this.updateAcceptEvent();
      this.updateAcceptUser();
      this.$emit("incrementVol", 1);
    },
    rejectHandler() {
      this.status = "rejected";
      this.updateRejectEvent();
    },
    viewProfile() {
      this.toggleProfile = true;
    },
    attendHandler() {
      this.confirmStatus = "attend";
      this.updateAttendEvent();
      this.updateUser();
    },
    noShowHandler() {
      this.confirmStatus = "noshow";
      this.updateAttendEvent();
      this.updateUser();
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
  background-color: #ff3700;
  border-color: #ff3700;
}

.profileView:hover {
  background-color: #ff3700;
  border-color: #ff3700;
}

.profileView:focus {
  background-color: #ff3700;
  border-color: #ff3700;
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
  border-color: #ff5b2e;
  border-radius: 5px;
}

.confirmButton:hover {
  background-color: #ff3700;
  border-color: #ff3700;
}

.confirmButton:focus {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
}

.confirmButton:disabled {
  background-color: lightgray;
  border-color: darkgray;
  transition: 0.3s ease;
}

#modalHeader {
  margin-bottom: 10%;
  margin-top: 2%;
}
</style>