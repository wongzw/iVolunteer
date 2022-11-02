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
                  danger
                  @click="proceedToEdit()"
                  v-if="!hasVolunteered"
                  >Edit Details
                </a-button>
  
                <a-button
                  class="submitButton"
                  id="volunteerButton"
                  htmlType="submit"
                  size="large"
                  type="primary"
                  danger
                  disabled
                  v-if="hasVolunteered"
                  >Already Registered
                </a-button>
              </div>
            </div>
            <div class="description" style="width: 60%; margin-right: 10%">
              <div class="description" id="eventDetails">
                <div>
                  <h1>{{ this.event["eventName"] }}</h1>
                  <p id="textBox">
                    <b>by {{ this.event["orgName"] }}</b>
                  </p>
                  <p id="textBox">
                    Description: {{ this.event["eventDescription"] }}
                  </p>
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
                    {{ displayExpGain }} exp</span
                  ><br />
                  <p v-for="badge in badgeType" :key="badge">
                    {{ badge }} upon successful completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ParticipantList :event="event" :eventId="this.currentRouteName" v-if="event"/>
      </div>
      <NoPageFound v-if="eventNotExist" />
    </div>
  </template>
  
  <script>
  import { db } from "../../firebase.js";
  import NoPageFound from "@/views/NoPageFound.vue";
  import ParticipantList from "@/components/organisation/ParticipantList.vue";
  import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
  
  export default {
    name: "OrgEvent",
    components: {
      NoPageFound,
      ParticipantList,
    },
    data() {
      return {
        event: false,
        eventLoaded: false,
        eventNotExist: false,
        hasRegistered: false,
        eventStartDate: new Date(),
        eventEndDate: new Date(),
      };
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
        startDate[1] = monthNames[startDate[1]];
        let endDate = this.eventEndDate.split("-");
        endDate[1] = monthNames[endDate[1]];
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
        let timeEnd = this.event["timeEnd"].split(':').map(Number)
        if (timeEnd[0] >= 12) {
          timeEnd[2] = 'pm'
        } else {
          timeEnd[2] = "am";
        }
        timeStart[0] = timeStart[0] % 13;
        timeEnd[0] = timeEnd[0] % 13;
        timeStart = String(timeStart[0]) + "." + String(zeroPad(timeStart[1], 2)) + " " + String(timeStart[2])
        timeEnd = String(timeEnd[0]) + "." + String(zeroPad(timeEnd[1], 2)) + " " + String(timeEnd[2])  
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
      proceedToEdit() {
        let arr = this.$route.path.split("/");
        var currentRouteName = arr[arr.length - 1];
        var route = "/organisation/event/edit/" + currentRouteName
        this.$router.replace({ path: route });
      },
    },
  };
  </script>
  
  <style scoped>
  #container {
    width: 110%;
    justify-content: center;
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
    max-width: 100%;
    height: auto;
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
    border: solid #cdd0ec;
    width: 500px;
    border-radius: 10px;
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 5%;
    padding-right: 5;
    margin-top: 10%;
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
    width: 80%;
  }
  
  #eventDetails {
    margin-left: 0%;
  }
  
  #textBox {
    font-size: 15px;
    font-weight: bold;
  }
  
  .iconImg {
    width: 30px;
  }
  
  .submitButton {
    width: 50%;
    margin-top: 10%;
    background-color: #ff5b2e;
  }
  #causeContainer {
    width: 100%;
    display: flex;
    gap: 5% 2%;
    justify-content: center;
    align-items: center;
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
  
  
  #confirmButton {
    width: 50%;
    margin-top: 10%;
    background-color: #ff5b2e;
  }
  
  #volunteerButton {
    margin-left: 25%;
  }
  </style>