<template>
  <div class="box">
    <a-form
      id="eventCreation"
      class="event-creation-layout"
      ref="eventCreation"
      :form="form"
      @submit.prevent="createEvent"
    >
      <h1 id="eventCreationHeader">Create Event</h1>

      <a-form-item>
        <label class="eventCreation">Event Name</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="text"
          v-model:value="eventName"
          placeholder="Enter your event name"
        ></a-input>
        <label class="eventCreation">Event Photo</label><br />
        <a-upload
          v-model:file-list="fileList"
          name="file"
          action="//jsonplaceholder.typicode.com/posts/"
          :headers="headers"
        >
          <a-button style="margin-bottom: 10px">
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
        <label class="eventCreationLeft">Event Type</label><br /><br />
        <a-select
          v-model:value="eventType"
          mode="multiple"
          placeholder="Select all that apply"
          style="width: 60%; height: 35px; margin-bottom: 10px"
          :token-separators="[',']"
        >
          <a-select-option value="Carnival">Carnival</a-select-option>
          <a-select-option value="Fund Raising">Fund Raising</a-select-option>
          <a-select-option value="Recycling">Recycling</a-select-option>
          <a-select-option value="Clean-up">Clean-up</a-select-option>
        </a-select>
        <label class="eventCreation">Event Description</label><br />
        <a-textarea style="width: 60%; margin-bottom: 10px" v-model:value="eventDescription" maxlength="1000" placeholder="Enter the description of your event (Max char: 1000)" :rows="6" />
        <label class="eventCreation">Event Details</label><br />
        <label class="eventCreation">Date</label><br />
        <a-space style="width: 60%; margin-bottom: 10px" direction="vertical" :size="12">
          <a-range-picker v-model:value="eventDate" style="width: 100%; margin-bottom: 10px" />
        </a-space>
        <label class="eventCreation">Time</label><br />
        <a-space style="width: 60%; margin-bottom: 10px" direction="vertical">
          <a-time-range-picker v-model:value="eventTime" style="width: 100%; margin-bottom: 10px" />
        </a-space><br />
        <label class="eventCreationLeft">Location</label>
        <label class="eventCreationRight">Number of openings</label><br />
        <a-input
          style="width: 25%; margin-bottom: 10px; margin-left: 20%; float: left"
          class="input"
          type="text"
          v-model:value="location"
          placeholder="Location"
        ></a-input>
        <a-input
          style="width: 30%; margin-bottom: 10px; margin-right: 20%; float: right"
          class="input"
          type="number"
          v-model:value="noOfOpenings"
          placeholder="Enter a number"
        ></a-input><br /><br/>
        <label class="eventCreationLeft">Event causes (Max: 3)</label><br /><br />
        <a-select
          v-model:value="eventCauses"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 10px"
          :token-separators="[',']"
          placeholder="Press tab to add another event cause"
        ></a-select>
        <label class="eventCreation">Preferred Volunteers (badges)</label><br />
        <a-select
          v-model:value="badgeAwarded"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 30px"
          :token-separators="[',']"
          placeholder="Press tab to add another badge"
        ></a-select>

      
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="signUp"
            size="large"
            type="primary"
            danger
            >Confirm</a-button
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import moment from 'moment';

export default {
  name: "EventCreation",
  data() {
    return {
      eventName: "",
      location: "",
      eventType: [],
      duration: 0,
      eventUrl: "",
      eventDescription: "",
      dateStart: "",
      dateEnd: "",
      timeStart: "",
      timeEnd: "",
      noOfOpenings: 0,
      eventCauses: [],
      badgeAwarded: [],
      participants: {},
      orgId: "",
      orgEmail:""
    }
  },
  methods: {
    async createDb() {
        const colRef = collection(db, 'events')
        const docRef = await addDoc(colRef, {
          eventName: this.eventName,
          location: this.location,
          eventUrl: "thisisafakeurl",
          eventType: this.eventType,
          eventDescription: this.eventDescription,
          dateStart: this.eventDate[0].format('DD-MM-YYYY'),
          dateEnd: this.eventDate[1].format('DD-MM-YYYY'),
          timeStart: this.eventTime[0].format("HH:mm:ss"),
          timeEnd: this.eventTime[1].format("HH:mm:ss"),
          duration: Number((this.eventDate[1].diff(this.eventDate[0], 'days') + 1) * this.eventTime[1].diff(this.eventTime[0], 'hours')),
          noOfOpenings: Number(this.noOfOpenings),
          eventCauses: this.eventCauses,
          badgeAwarded: this.badgeAwarded,
          participants: {},
          orgId: this.$store.state.id,
          orgEmail: this.$store.state.email
        }).then(() => {
              alert("Event successfully created!")
              console.log("Document successfully written!");
            }).catch((error) => {
              console.error("Error writing document: ", error);
            });
    },
    createEvent() {
      this.createDb();
    }
  }
}

</script>

<style scoped>
.box {
  background-color: white;
  align-items: center;
  border-radius: 2px;
  margin-top: 2%;
  margin-left: 35%;
  margin-right: 35%;
  padding-top: 30px;
  padding-bottom: 30px;
  filter: drop-shadow(1px 1px 1px black);
}

.eventCreation {
  color: #020957;
  margin-left: 20%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: -10px;
}

.eventCreationLeft {
  color: #020957;
  margin-left: 20%;
  float: left;
  font-weight: bold;
  margin-bottom: 10px;
}

.eventCreationRight {
  color: #020957;
  float: right;
  margin-right: 23%;
  font-weight: bold;
  margin-bottom: 10px;
}

#eventCreationHeader {
  font-size: 40px;
  color: #020957;
}

#ant-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
