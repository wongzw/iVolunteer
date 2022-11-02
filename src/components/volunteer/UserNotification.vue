<template>
  <div class="header">
    <h1><b>Notification Centre</b></h1>
  </div>
  <div class="notificationTable">
    <p>{{ this.user_notifications }}</p>
    <div
      class="notificationCard"
      v-for="notification in this.user_notifications"
      :key="notification"
    >
      <div class="notificationContent">
        <div class="notificationDetails">
          <h3>
            <b>{{ this.template_message[notification.notifType][0] }}</b>
          </h3>

          <p>
            <b>{{ this.template_message[notification.notifType][1] }}</b>
          </p>
        </div>
      </div>

      <div class="eventCard">
        <div class="info">
          <h2 class="event-title">
            {{ this.event_details[notification.eventId][0].eventName }}
          </h2>
          <div class="details">
            <img
              class="image"
              src="../../assets/calendarIcon.svg"
              alt="calendar"
            />
            <h2 class="event-host">
              {{ this.event_details[notification.eventId][0].dateStart }}
            </h2>
          </div>
          <div class="details">
            <img class="image" src="../../assets/clockIcon.svg" alt="clock" />
            <h2 class="event-host">
              {{ this.event_details[notification.eventId][0].timeStart }}
            </h2>
          </div>
          <div class="details">
            <img
              class="image"
              src="../../assets/locationIcon.svg"
              alt="location"
            />
            <h2 class="event-host">
              {{ this.event_details[notification.eventId][0].location }}
            </h2>
          </div>
        </div>
        <div class="ant-button">
          <a-button
            type="primary"
            size="large"
            class="orange"
            @click="reroute_event"
          >
            View Event</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { notification } from "ant-design-vue";

export default {
  name: "UserNotification",
  data() {
    return {
      user_notifications: [],
      template_message: {
        Register: ["Register Header", "Register Message"],
        Confirm: ["Confirm Header", "Confirm Message"],
        Accept: ["Accept Header", "Accept Message"],
        Attendance: ["Attendance Header", "Attendance Message"],
      },
      event_details: {},
    };
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    async getNotifications() {
      this.user_notifications = this.$store.state.details["userNotification"];
      for (var notification of this.user_notifications) {
        var event_id = notification.eventId;
        if (!this.event_details[event_id]) {
          this.event_details[event_id] = [];
          const eventRef = doc(db, "events", event_id);
          const eventDocSnap = await getDoc(eventRef);
          const eventData = eventDocSnap.data();
          this.event_details[event_id].push(eventData);
        } else {
          continue;
        }
      }
      console.log(this.event_details);
    },
  },
};
</script>

<style scoped>
.header h1,
.rewardName h3 {
  color: #020957;
  text-align: left;
  margin-bottom: 10px;
}

.header h1 {
  padding-top: 30px;
}

.notificationTable {
  background-color: #ffefe2;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 8px;
  height: auto;
  min-height: 60vh;
}

.header,
.notificationTable {
  width: 100%;
}

.notificationCard {
  background-color: #fef8f3;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  margin-bottom: 32px;
  padding: 21px 32px 10px;
}

.eventCard {
  background-color: #ffefe2;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  margin-bottom: 32px;
  padding: 21px 32px 10px;
}

.info {
  display: flex;
}

.details {
  display: inline;
}

.notificationDetails {
  text-align: left;
}

.notification {
  display: inline;
}
</style>