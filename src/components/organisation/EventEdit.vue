<template>
    <div class="box" v-if="this.eventLoaded">
      <a-button type="primary" id="x" @click="go_back" danger>
        X
      </a-button>
      <a-form
        id="eventEdit"
        class="event-edit-layout"
        ref="eventEdit"
        :form="form"
        @submit.prevent="editEvent"
      >
        <h1 id="eventEditHeader">Edit Event</h1>
  
        <a-form-item>
          <label class="eventEdit">Event Name</label><br />
          <a-input
            style="width: 60%; margin-bottom: 10px"
            class="input"
            required
            type="text"
            v-model:value="eventName"
            placeholder="Enter your event name"
          ></a-input>
          <label class="eventEdit">Event Type</label><br />
          <a-select
            v-model:value="eventType"
            mode="tags"
            placeholder="Select all that apply"
            style="width: 60%; height: 35px; margin-bottom: 25px"
            :token-separators="[',']"
          >
            <a-select-option value="Carnival">Carnival</a-select-option>
            <a-select-option value="Fund Raising">Fund Raising</a-select-option>
            <a-select-option value="Recycling">Recycling</a-select-option>
            <a-select-option value="Clean-up">Clean-up</a-select-option>
            <a-select-option value="Conference">Conference</a-select-option>
            <a-select-option value="Webinar">Webinar</a-select-option>
            <a-select-option value="Education">Education</a-select-option>
            <a-select-option value="Performance">Performance</a-select-option>
            <a-select-option value="Sports">Sports</a-select-option>
          </a-select>
          <label class="eventEdit">Event Description</label><br />
          <a-textarea
            style="width: 60%; margin-bottom: 10px"
            v-model:value="eventDescription"
            required
            maxlength="1000"
            placeholder="Enter the description of your event (Max char: 1000)"
            :rows="6"
          />

          <a-modal v-model:visible="visible" title="Confirm Deletion">
                <template #footer> </template>
                <div class="modal">
                  <h2 id="modalHeader">
                    Are you sure you want to delete this event?
                  </h2>
                  <p><strong>By clicking confirm, you will be deleting <br/><br/>
                    <b>{{ this.eventName }} </b
                      ></strong>
                    </p>
            
                  <a-button
                    id="confirmButton"
                    size="large"
                    type="primary"
                    @click="deleteEvent"
                    >Confirm
                  </a-button>
                </div>
              </a-modal>

          <label class="eventEdit">Event Details</label><br />
          <label class="eventEdit">Date</label><br />
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
          <label class="eventEdit">Time</label><br />
          <a-space style="width: 60%; margin-bottom: 10px" direction="vertical">
            <a-time-range-picker
              v-model:value="eventTime"
              format='HH:mm'
              style="width: 100%; margin-bottom: 10px"
            /> </a-space
          ><br />
          <label class="eventEditLeft">Location</label>
          <label class="eventEditRight">Number of openings</label><br />
          <a-input
            style="width: 25%; margin-bottom: 10px; margin-left: 20%; float: left"
            class="input"
            required
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
          <label class="eventEditLeft">Event causes (Max: 3)</label
          ><br /><br />
          <a-select
            v-model:value="eventCauses"
            mode="multiple"
            style="width: 60%; height: 35px; margin-bottom: 10px"
            :token-separators="[',']"
            placeholder="Press tab to add another event cause"
          >
            <a-select-option value="Agriculture">Agriculture</a-select-option>
            <a-select-option value="Children and Youth">Children and Youth</a-select-option>
            <a-select-option value="Elderly">Elderly</a-select-option>
            <a-select-option value="Wildlife Protection">Wildlife Protection</a-select-option>
            <a-select-option value="Women Empowerment">Women Empowerment</a-select-option>
            <a-select-option value="Clean-up">Clean-up</a-select-option>
            <a-select-option value="Climate change">Climate change</a-select-option>
            <a-select-option value="Low-income families">Low-income families</a-select-option>
          </a-select>
          <label class="eventEdit">Preferred Volunteers (badges)</label><br />
          <a-select
            v-model:value="badgeAwarded"
            mode="multiple"
            style="width: 60%; height: 35px; margin-bottom: 30px"
            :token-separators="[',']"
            placeholder="Press tab to add another badge"
          >
            <a-select-option value="Diligent">Diligent</a-select-option>
            <a-select-option value="Detail-oriented">Detail-oriented</a-select-option>
            <a-select-option value="Good with children">Good with children</a-select-option>
            <a-select-option value="Experienced Animal caretaker">Experienced Animal caretaker</a-select-option>
            <a-select-option value="Experienced Driver">Experienced Driver</a-select-option>
            <a-select-option value="Natural Leader">Natural Leader</a-select-option>
            <a-select-option value="Brilliant Teacher">Brilliant Teacher</a-select-option>
          </a-select>
  
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
      <div id="delete-button">
        <a-button
          class="signUp"
          size="large"
          danger
          block
          @click="clickDelete"
          >Delete Event
        </a-button>
      </div>
    </div>
    <NoPageFound v-if="!this.eventLoaded"/>
  </template>
  
  <script>
  import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
  import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
  import { db } from "../../firebase.js";
  import { notification } from "ant-design-vue";
  import { SmileOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
  import { h } from "vue";
  import { bool } from "vue-types";
  import NoPageFound from "@/views/NoPageFound.vue";
  import moment from 'moment'
  
  export default {
    name: "EventEdit",
    components: {
      NoPageFound
    },
    async mounted() {
      let arr = this.$route.path.split("/");
      var currentRouteName = arr[arr.length - 1];
      var docRef = doc(db, "events", currentRouteName);
      getDoc(docRef).then( docSnap => {
        if (docSnap.exists()) {
          this.id = currentRouteName;
          this.eventLoaded = true;
          this.event = docSnap.data();
          this.eventName = this.event["eventName"]
          this.location = this.event["location"]
          this.eventType = this.event["eventType"]
          this.eventDescription = this.event["eventDescription"]
          this.noOfOpenings = this.event["noOfOpenings"]
          this.eventCauses = this.event["eventCauses"]
          this.badgeAwarded = this.event["badgeAwarded"]
          this.eventDate = this.makeDateMoment(this.event["dateStart"], this.event["dateEnd"])
          this.eventTime = this.makeTimeMoment(this.event["timeStart"], this.event["timeEnd"])
        } else {
          this.eventNotExist = true;
        }
      })
    },
    data() {
      
      return {
        eventLoaded: false,
        eventName: this.eventName,
        location: this.location,
        eventType: this.eventType,
        duration: 0,
        eventDescription: this.eventDescription,
        dateStart: "",
        dateEnd: "",
        eventDate: this.eventDate,
        eventTime: this.eventTime,
        timeStart: "",
        timeEnd: "",
        noOfOpenings: 0,
        eventCauses: [],
        badgeAwarded: [],
        participants: {},
        eventClosed: false,
        visible: false
      };
    },
    setup() {
      const formValidError = (msg) => {
        notification.open({
          message: "Error",
          description: msg,
          duration: 3,
          icon: () => h(ExclamationCircleOutlined, { style: "color: #ff3700" }),
        });
      };

      return {
        formValidError,
      };
    },
  
    methods: {
      eventCreateNotification(msg) {
        notification.open({
          message: "Success",
          description: msg,
          duration: 3,
          icon: () => h(SmileOutlined, { style: "color: #020957" }),
        });
      },
      async updateDb() {
        const docRef = doc(db, "events", this.id);
        updateDoc(docRef, {
          eventName: this.eventName,
          location: this.location,
          eventType: this.eventType,
          eventDescription: this.eventDescription,
          dateStart: this.eventDate[0].format("DD-MM-YYYY"),
          dateEnd: this.eventDate[1].format("DD-MM-YYYY"),
          timeStart: this.eventTime[0].format("HH:mm"),
          timeEnd: this.eventTime[1].format("HH:mm"),
          duration: Number(
            (this.eventDate[1].diff(this.eventDate[0], "days") + 1) *
              this.eventTime[1].diff(this.eventTime[0], "hours")
          ),
          noOfOpenings: Number(this.noOfOpenings),
          eventCauses: this.eventCauses,
          badgeAwarded: this.badgeAwarded,
        }).then(docRef => {
            this.eventCreateNotification("Event successfully updated!");
            console.log("Event sucessfully updated!");
            let arr = this.$route.path.split("/");
            var currentRouteName = arr[arr.length - 1];
            var route = "/organisation/event/" + currentRouteName
            this.$router.replace({ path: route });
          }).catch((error) => {
            console.error("Error writing document: ", error);
          });
      },
      editEvent() {
        if (Number(this.noOfOpenings) == 0 || this.eventType.length == 0 || this.eventCauses.length == 0 ||
          this.badgeAwarded.length==0 || this.eventDate == null || this.eventTime == null) {
          this.formValidError("Please fill in all fields!");
        } else {
          this.updateDb();
        }
      },
      deleteEvent() {
        const docRef = doc(db, "events", this.id);
        updateDoc(docRef, {
          eventClosed: true,
        }).then(() => {
          this.eventCreateNotification("Event successfully deleted!")
          this.$router.replace({ path: "/organisation/dashboard" });
        })
      },
      makeDateMoment(date1, date2) {
        var moment1 = moment(date1, 'DD-MM-YYYY')
        var moment2 = moment(date2, 'DD-MM-YYYY')
        return [moment1, moment2]
      },
      makeTimeMoment(time1, time2) {
        var moment1 = moment(time1, '"HH:mm:ss"')
        var moment2 = moment(time2, '"HH:mm:ss"')
        return [moment1, moment2]
      },
      go_back() {
        let arr = this.$route.path.split("/");
        var currentRouteName = arr[arr.length - 1];
        var route = "/organisation/event/" + currentRouteName
        this.$router.replace({ path: route });
      },
      clickDelete() {
      this.visible = true;
    },
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
    box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
  }
  
  .eventEdit {
    color: #020957;
    margin-left: 20%;
    display: flex;
    align-items: flex-start;
    font-weight: bold;
    margin-bottom: -10px;
  }
  
  .eventEditLeft {
    color: #020957;
    margin-left: 20%;
    float: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .eventEditRight {
    color: #020957;
    float: right;
    margin-right: 33.5%;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  #eventEditHeader {
    font-size: 40px;
    color: #020957;
  }
  
  #ant-button {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #delete-button {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 60%;
    align-items: center;
    margin-left: 20%;
    margin-right: 20%;
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
  </style>
  