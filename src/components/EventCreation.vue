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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
        >
          <a-button style="margin-bottom: 10px">
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
        <label class="eventCreation">Event Description</label><br />
        <a-textarea style="width: 60%; margin-bottom: 10px" v-model:value="eventDescription" placeholder="Enter the description of your event" :rows="6" />
        <label class="eventCreation">Event Details</label><br />
        <label class="eventCreation">Date</label><br />
        <a-space style="width: 60%; margin-bottom: 10px" direction="vertical" :size="12">
          <a-range-picker v-model:value="eventDate" style="width: 100%; margin-bottom: 10px" />
        </a-space>
        <label class="eventCreation">Time</label><br />
        <a-space style="width: 60%; margin-bottom: 10px" direction="vertical">
          <a-time-range-picker :v-model:value="eventTime" style="width: 100%; margin-bottom: 10px" />
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
        <label class="eventCreationLeft">Event causes</label><br /><br />
        <a-select
          v-model:value="eventCauses"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 10px"
          :token-separators="[',']"
          placeholder="Press tab to add another event cause"
        ></a-select>
        <label class="eventCreation">Preferred Volunteers (badges)</label><br />
        <a-select
          v-model:value="preferredBadges"
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
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  name: "EventCreation",
  data() {
    return {
      eventName: "",
      //eventPhoto:
      eventDescription: "",
      eventStartDate: new Date(),
      eventEndDate: new Date(),
      eventLocation: "",
      noOfOpenings: 0,
      eventCauses: [],
      preferredBadges: [],
    }
  },
  methods: {
    async createDb() {
        // console.log(this.eventDate[0])
        // console.log(this.eventDate[1])
        // console.log(this.eventTime[0])
        // console.log(this.eventTime[1])
        const colRef = collection(db, 'events')
        const docRef = await addDoc(colRef, {
        eventName: this.eventName,
        // eventPhoto: ,
        eventDescription: this.eventDescription,
        eventStartDate: Timestamp.now(),
        eventEndDate: Timestamp.now(),
        eventDurationInMins: 100,
        // eventLocation: this.eventLocation,
        noOfOpenings: Number(this.noOfOpenings),
        eventCauses: this.eventCauses,
        preferredBadges: this.preferredBadges,
        participants: {}
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
