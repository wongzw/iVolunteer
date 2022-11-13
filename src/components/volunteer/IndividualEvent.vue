<template>
  <div id="container" class="box">
    <div id="content" v-if="this.eventLoaded">
      <div id="wrapper">
        <div class="box">
          <div id="imgDiv">
            <img id="img" :src="this.event['eventUrl']" />
            <div class="box" id="bottomLeft">
              <div id="smallHeader">
                <h1 id="causeTitle">Causes</h1>
                <div class="box" id="causeContainer">
                  <div class="causeBox" v-for="type in eventType" :key="type">
                    {{ type }}
                  </div>
                </div>
              </div>

              <a-button
                class="submitButton"
                id="volunteerButton"
                htmlType="submit"
                size="large"
                type="primary"
                @click="clickVolunteer()"
                v-if="!hasVolunteered"
                >Volunteer Now
              </a-button>

              <a-button
                class="submitButton"
                id="volunteerButton"
                htmlType="submit"
                size="large"
                type="primary"
                disabled
                v-if="hasVolunteered"
                >Already Registered
              </a-button>

              <a-modal v-model:visible="visible" title="Event Confirmation">
                <template #footer> </template>
                <div class="modal">
                  <h1 id="modalHeader">
                    Hi, {{ `${this.$store.state.details["lastName"]}!` }}
                  </h1>
                  <p>Yes, I want to sign up as a volunteer for</p>
                  <p>
                    <b
                      >{{ this.event["eventName"] }} by
                      {{ this.event["orgName"] }}</b
                    >
                  </p>
                  <p>on</p>
                  <br /><br />
                  <p>
                    <b>{{ fullDate }}</b>
                  </p>
                  <p>
                    <b>{{ displayTime }}</b>
                  </p>
                  <p>
                    <b>at {{ displayLocation }}</b>
                  </p>
                  <br /><br /><br />
                  <p><strong>By clicking confirm,</strong></p>
                  <span id="spanModal">
                    <p>I agree with the</p>
                    <p style="color: orange">Terms & Conditions</p>
                  </span>

                  <a-button
                    id="confirmButton"
                    size="large"
                    type="primary"
                    @click="confirmVolunteer"
                    >Confirm
                  </a-button>
                </div>
              </a-modal>
            </div>
          </div>
          <div class="description" style="width: 60%; margin-right: 10%">
            <div class="description" id="eventDetails">
              <div>
                <h1>{{ this.event["eventName"] }}</h1>
                <p id="textBox">
                  <b>by {{ this.event["orgName"] }}</b>
                </p>
                <h3 id="textBox">
                  {{ this.event["eventDescription"] }}
                </h3>
              </div>
              <div id="details">
                <div class="icon">
                  <img class="iconImg" src="@/assets/calendar.svg" />
                  <p class="iconText">{{ fullDate }}</p>
                </div>
                <div class="icon">
                  <img class="iconImg" src="@/assets/clock-circle.svg" />
                  <p class="iconText">{{ displayTime }}</p>
                </div>
                <div class="icon">
                  <img class="iconImg" src="@/assets/room_24px.svg" />
                  <p class="iconText">{{ displayLocation }}</p>
                </div>
                <div class="icon">
                  <img class="iconImg" src="@/assets/account_circle_24px.svg" />
                  <p class="iconText">{{ displayVacancy }}</p>
                </div>
              </div>
            </div>
            <div class="box" id="bottomRight">
              <div>
                <span
                  ><img src="@/assets/star.svg" />
                  <b>{{ displayExpGain }} exp</b></span
                ><br />
                <p v-for="badge in badgeType" :key="badge">
                  {{ badge }} upon successful completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoPageFound v-if="eventNotExist" />
  </div>
</template>

<script>
import { db } from "../../firebase.js";
import NoPageFound from "@/views/NoPageFound.vue";
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { notification } from "ant-design-vue";
import { SmileOutlined, RobotOutlined } from "@ant-design/icons-vue";
import { h } from "vue";

export default {
  name: "IndividualEvent",
  components: {
    NoPageFound,
  },
  data() {
    return {
      event: false,
      eventLoaded: false,
      eventNotExist: false,
      hasRegistered: false,
      eventStartDate: new Date(),
      eventEndDate: new Date(),
      docSnap: false,
      visible: false,
    };
  },

  setup() {
    const successfulEventApplied = () => {
      notification.open({
        message: "Success",
        description:
          "Succesfully applied for event! Organisation will get back soon.",
        duration: 3,
        icon: () => h(SmileOutlined, { style: "color: #020957" }),
      });
    };

    const error = () => {
      notification.open({
        message: "Error",
        description: "An Error Occurred. Please try again. ",
        duration: 3,
        icon: () => h(RobotOutlined, { style: "color: #ff3700" }),
      });
    };

    return { successfulEventApplied, error };
  },

  computed: {
    fullDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let startDate = this.eventStartDate.split("-");
      startDate[1] = monthNames[startDate[1] - 1];
      let endDate = this.eventEndDate.split("-");
      endDate[1] = monthNames[endDate[1] - 1];
      startDate = startDate.join(" ");
      endDate = endDate.join(" ");
      if (startDate == endDate) {
        return this.startDate;
      } else {
        return `${startDate} to ${endDate}`;
      }
    },
    displayExpGain() {
      let timeStart = this.event["timeStart"].split(":").map(Number);
      let timeEnd = this.event["timeEnd"].split(":").map(Number);
      let hh = 0;
      hh += timeEnd[0] - timeStart[0];
      if (hh == 0) {
        return 50;
      } else {
        return hh * 50;
      }
    },
    displayTime() {
      const zeroPad = (num, places) => String(num).padStart(places, "0");
      let timeStart = this.event["timeStart"].split(":").map(Number);
      if (timeStart[0] >= 12) {
        timeStart[2] = "pm";
      } else {
        timeStart[2] = "am";
      }
      let timeEnd = this.event["timeEnd"].split(":").map(Number);
      if (timeEnd[0] >= 12) {
        timeEnd[2] = "pm";
      } else {
        timeEnd[2] = "am";
      }
      timeStart[0] = timeStart[0] % 13;
      timeEnd[0] = timeEnd[0] % 13;
      timeStart =
        String(timeStart[0]) +
        "." +
        String(zeroPad(timeStart[1], 2)) +
        " " +
        String(timeStart[2]);
      timeEnd =
        String(timeEnd[0]) +
        "." +
        String(zeroPad(timeEnd[1], 2)) +
        " " +
        String(timeEnd[2]);
      return `${timeStart} to ${timeEnd}`;
    },
    displayLocation() {
      return this.event["location"];
    },
    displayVacancy() {
      return `${this.event["noOfOpenings"]} Openings`;
    },
    currentRouteName() {
      let arr = this.$route.path.split("/");
      return arr[arr.length - 1];
    },
    hasVolunteered() {
      if (this.$store.state.details["userAppliedEvents"] == null) {
        return false;
      }
      let check = this.$store.state.details["userAppliedEvents"];
      return check.includes(this.currentRouteName);
    },
    badgeType() {
      let badges = this.event["badgeAwarded"];
      return badges;
    },
    eventType() {
      let eventType = this.event["eventType"];
      return eventType;
    },
  },
  async mounted() {
    //Update event store
    var docRef = doc(db, "events", this.currentRouteName);
    const docSnap = await getDoc(docRef);
    this.docSnap = docSnap;
    if (docSnap.exists()) {
      this.eventLoaded = true;
      this.event = docSnap.data();
      this.eventStartDate = this.event["dateStart"];
      this.eventEndDate = this.event["dateEnd"];
    } else {
      this.eventNotExist = true;
    }
  },
  methods: {
    async updatedUser(eventId) {
      let appliedEvents = this.$store.state.details["userAppliedEvents"];
      appliedEvents.push(eventId);
      this.$store.state.details["userAppliedEvents"] = appliedEvents;

      // Update Notifications
      const newNotification = {
        date: new Date().toJSON().replace(/-/g, "/"),
        eventId: eventId,
        notifType: "Register",
      };

      this.$store.state.details["userNotification"].push(newNotification);

      const volRef = doc(db, "users", this.$store.state.id);
      await setDoc(volRef, this.$store.state.details);
    },
    async updateEvent() {
      let participantMap = this.event["participants"];
      console.log(participantMap);
      participantMap[this.$store.state.id] = {
        applicationStatus: "pending",
        attendanceStatus: "unconfirmed",
        fullName:
          this.$store.state.details["firstName"] +
          " " +
          this.$store.state.details["lastName"],
        interests: this.$store.state.details["interests"],
        photoUrl: this.$store.state.details["photoUrl"],
      };
      this.event["participants"] = participantMap;
      console.log(participantMap);
      const eventRef = doc(db, "events", this.currentRouteName);
      await setDoc(eventRef, this.event);
    },
    confirmVolunteer() {
      try {
        this.updatedUser(this.currentRouteName);
        this.updateEvent();
        this.visible = false;
        this.hasRegistered = true;
        this.successfulEventApplied();
      } catch {
        this.error();
      }
    },
    clickVolunteer() {
      this.visible = true;
    },
  },
};
</script>

<style scoped>
#container {
  width: 140%;
  margin-left: 1%;
}
h1 {
  font-weight: bolder;
  color: #020957;
}
#wrapper {
  margin-top: 50px;
  justify-content: center;
}
#content {
  width: 75%;
}
#imgDiv {
  display: block;
  width: 100%;
  margin-right: 10px;
}
#img {
  width: 35vw;
  height: auto;
  margin-top: 10px;
}
#bottomLeft {
  flex-direction: column;
  align-items: left;
  padding-top: 5%;
  justify-content: space-between;
}
#bottomRight {
  flex-direction: column;
  align-items: left;
  border: solid #ff5b2e;
  width: auto;
  border-radius: 10px;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 5%;
}
.icon {
  display: flex;
}
.box {
  display: flex;
}
.iconImg {
  width: 5%;
}

.iconText {
  margin-top: 5%;
  margin-left: 1%;
}

.description {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

#eventDetails {
  margin-left: 0%;
}

#textBox {
  color: #020957;
  text-align: justify;
}

.iconImg {
  width: 30px;
}

.submitButton {
  width: 50%;
  margin-top: 10%;
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
}

.submitButton:hover {
  background-color: #ff3700;
  border-color: #ff3700;
}

.submitButton:focus {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
}

.submitButton:disabled {
  background-color: lightgray;
  border-color: darkgray;
  transition: 0.3s ease;
}

#causeContainer {
  width: 100%;
  display: flex;
  gap: 5% 2%;
  justify-content: left;
  align-items: left;
  flex-wrap: wrap;
}

.causeBox {
  background-color: #ffe3dc;
  color: orange;
  width: 32%;
  height: 50%;
  font-weight: bold;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5%;
}

#causeTitle {
  text-align: left;
  margin-bottom: -2%;
}

#modalHeader {
  margin-bottom: 10%;
  margin-top: 2%;
}

.modal {
  text-align: center;
  color: #020957;
  line-height: 80%;
}

#spanModal {
  display: flex;
  justify-content: center;
  gap: 1%;
}

#confirmButton {
  width: 50%;
  margin-top: 10%;
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  white-space: normal;
}

#confirmButton:hover {
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}

#volunteerButton {
  margin-left: 25%;
}
</style>