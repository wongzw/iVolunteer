<template>
  <div class="header">
    <h1><b>Notification Centre</b></h1>
  </div>
  <div class="notificationTable">
    <div v-if="this.user_notifications.length == 0" class="notificationCard">
      <h2>
        <b>
          Inbox Zero!
          <a href="/volunteer/dashboard" style="color: #ff5b2e">
            Sign up for a new event today!
          </a>
        </b>
      </h2>
    </div>
    <div
      class="notificationCard"
      v-for="notification in this.user_notifications"
      :key="notification"
      v-else
    >
      <div class="notificationContent" v-if="this.data_retrived">
        <div class="notificationDetails">
          <div class="notificationheader">
            <h3>
              <b>
                {{ this.event_details[notification.eventId][0].eventName }}
                :
                {{ this.template_message[notification.notifType][0] }}</b
              >
            </h3>
          </div>

          <div class="notificationDate">
            <p>{{ notification.date }}</p>
          </div>

          <div class="notificationMessage">
            <h3>
              {{ this.template_message[notification.notifType][1] }}
            </h3>
          </div>
        </div>
      </div>

      <div class="eventCard" v-if="this.data_retrived">
        <div class="info">
          <a-row>
            <a-col :span="4"
              ><div class="details">
                <h3 class="eventDetails">
                  <div style="margin-right: 10px">
                    <strong>Date -</strong>
                  </div>
                  {{ this.event_details[notification.eventId][0].dateStart }}
                </h3>
              </div></a-col
            >
            <a-col :span="4"
              ><div class="details">
                <h3 class="eventDetails">
                  <div style="margin-right: 10px">
                    <strong>Start Time -</strong>
                  </div>
                  {{ this.event_details[notification.eventId][0].timeStart }}
                </h3>
              </div></a-col
            >
            <a-col :span="8"
              ><div class="details">
                <h3 class="eventDetails">
                  <div style="margin-right: 10px">
                    <strong>Location -</strong>
                  </div>
                  {{ this.event_details[notification.eventId][0].location }}
                </h3>
              </div></a-col
            >
            <a-col :span="8">
              <div class="ant-button">
                <a-button
                  type="primary"
                  size="large"
                  class="orange"
                  @click="reroute_event(notification.eventId)"
                >
                  View Event Details</a-button
                >
              </div></a-col
            >
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { notification } from "ant-design-vue";
import messageTemplate from "./messageTemplate.json";
// import { DeleteOutlined } from "@ant-design/icons-vue";

export default {
  name: "UserNotification",
  // components: {
  //   DeleteOutlined,
  // },
  data() {
    return {
      user_notifications: [],
      template_message: messageTemplate,
      event_details: {},
      data_retrived: false,
    };
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    async getNotifications() {
      this.user_notifications =
        this.$store.state.details["userNotification"].reverse();
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
      this.data_retrived = true;
      console.log(this.event_details);
    },
    reroute_event(event_id) {
      const route = "/event/" + event_id;
      this.$router.push({ path: route });
    },
  },
};
</script>

<style scoped>
.header h1,
.notificationheader h3,
.notificationheader h3 {
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
  height: 70vh;
  overflow: auto;
}

.header,
.notificationTable {
  width: 100%;
}

.notificationMessage {
  padding-bottom: 10px;
}

.notificationDate p {
  margin-bottom: 5px;
}

.notificationheader {
  display: inline;
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
  margin-bottom: 20px;
  padding: 20px 20px 20px 20px;
}

.eventCard .details .eventDetails {
  display: flex;
  align-items: left;
  vertical-align: middle;
  line-height: normal;
  margin-top: 5px;
  margin-left: 10px;
}

.notificationDetails {
  text-align: left;
}

.notification {
  display: inline;
}

.a-col {
  align-items: left;
}

.ant-button .orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  width: 100%;
  height: auto;
  padding-left: 48px;
  padding-right: 48px;
  white-space: normal;
}

.ant-button .orange:hover {
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>