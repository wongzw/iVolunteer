<template>
  <div class="box">
    <a-button type="primary" id="x" @click="reroute_main" danger>
      X
    </a-button>
    <a-form
      id="eventCreation"
      class="event-creation-layout"
      ref="eventCreation"
      :form="form"
      @submit.prevent="createEvent"
    >
      <h1 id="eventCreationHeader">Create Event</h1>
      <a-form-item required="true">
        <label class="eventCreation">Event Name</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="text"
          v-model:value="eventName"
          placeholder="Enter your event name"
        ></a-input>
        <label class="eventCreation">Event Photo</label><br />
        <div class="eventCreation">
          <input type="file" name="file" @change="previewFile" />
        </div>
        <br />
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
        <a-textarea
          style="width: 60%; margin-bottom: 10px"
          v-model:value="eventDescription"
          maxlength="1000"
          placeholder="Enter the description of your event (Max char: 1000)"
          :rows="6"
        />
        <label class="eventCreation">Event Details</label><br />
        <label class="eventCreation">Date</label><br />
        <a-space
          style="width: 60%; margin-bottom: 10px"
          direction="vertical"
          :size="12"
        >
          <a-range-picker
            v-model:value="eventDate"
            style="width: 100%; margin-bottom: 10px"
          />
        </a-space>
        <label class="eventCreation">Time</label><br />
        <a-space style="width: 60%; margin-bottom: 10px" direction="vertical">
          <a-time-range-picker
            v-model:value="eventTime"
            style="width: 100%; margin-bottom: 10px"
          /> </a-space
        ><br />
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
          style="
            width: 30%;
            margin-bottom: 10px;
            margin-right: 20%;
            float: right;
          "
          class="input"
          type="number"
          v-model:value="noOfOpenings"
          placeholder="Enter a number"
        ></a-input
        ><br /><br />
        <label class="eventCreationLeft">Event causes (Max: 3)</label
        ><br /><br />
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
            @click="createEvent"
            danger
            >Confirm</a-button
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase.js";
import { notification } from "ant-design-vue";
import { SmileOutlined, ExclamationCircleOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import { bool } from "vue-types";

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
      orgName: "",
      eventClosed: false
    };
  },

  methods: {
    reroute_main() {
      this.$router.push({path: '/organisation/profile'});
    },
    eventCreateNotification() {
      notification.open({
        message: "Success",
        description: "Event successfully created!",
        duration: 3,
        icon: () => h(SmileOutlined, { style: "color: #020957" }),
      });
    },
    // eventFailedNotification() {
    //   notification.open({
    //     message: "Failed to create event",
    //     description: "Did you fill in all fields?",
    //     duration: 3,
    //     icon: () => h(ExclamationCircleOutlined, { style: "color: #020957" }),
    //   })
    // },
    async createDb() {
      const storage = getStorage();
      const storageRef = ref(storage, "Event photos/" + this.file.name);
      uploadBytes(storageRef, this.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          this.eventUrl = downloadURL;
          const colRef = collection(db, "events");
          const docRef = addDoc(colRef, {
            eventName: this.eventName,
            location: this.location,
            eventUrl: this.eventUrl,
            eventType: this.eventType,
            eventDescription: this.eventDescription,
            dateStart: this.eventDate[0].format("DD-MM-YYYY"),
            dateEnd: this.eventDate[1].format("DD-MM-YYYY"),
            timeStart: this.eventTime[0].format("HH:mm:ss"),
            timeEnd: this.eventTime[1].format("HH:mm:ss"),
            duration: Number(
              (this.eventDate[1].diff(this.eventDate[0], "days") + 1) *
                this.eventTime[1].diff(this.eventTime[0], "hours")
            ),
            noOfOpenings: Number(this.noOfOpenings),
            eventCauses: this.eventCauses,
            badgeAwarded: this.badgeAwarded,
            participants: {},
            orgId: this.$store.state.id,
            orgName: this.$store.state.details.orgName,
            eventClosed:this.eventClosed
          })
            .then(docRef => {
              this.eventCreateNotification();
              const orgDocRef = doc(db, "organisation", this.$store.state.id)
              const orgDocSnap = getDoc(orgDocRef).then(orgDocSnap => {
                updateDoc(orgDocRef, {
                  events: arrayUnion(docRef.id)
                });
              })             
              console.log("Document successfully written!");
            })
            .catch((error) => {
              // this.eventFailedNotification();
              console.error("Error writing document: ", error);
            });
        });
      });
    },
    createEvent() {
      this.createDb()
      this.reroute_main()
    },
    previewFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  },
  async mounted() {
    var docRef = doc(db, "organisation", this.$store.state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.$store.state.details = docSnap.data();
      console.log(docSnap.data());
      this.rendered = true;
    }
  },
};
</script>

<style scoped>
.box {
  background-color: white;
  align-items: center;
  border-radius: 2px;
  margin-top: 3%;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 3%;
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
  margin-right: 33.5%;
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

#x {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10%;
  height: 5%;
  font-weight: bold;
  font-size: large;
}
</style>
