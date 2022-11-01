<template>
  <div id="userEvents">
    <div class="box">
      <div id="box-title">Current Events</div>
      <div id="box details">
        <UserEventCards
          :event="event"
          v-for="(event, index) in EventCards"
          :key="index"
        />
      </div>

      <div v-if="this.EventCards.length == 0">
        <div class="noEvents">
          <h2>
            <b>
              No Current Events Found 😔 <br />
              Post one today!
            </b>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import UserEventCards from '../../volunteer/profile/UserEventCards.vue'
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.js";

export default {
  name: "CurrentUserEvents",
  data() {
    return {
      EventCards: [],
    };
  },
  components: {
    UserEventCards,
  },
  mounted() {
    this.queryDb();
  },
  methods: {
    async queryDb() {
      // user snapshot data
      const orgId = this.$store.state.id;
      const orgRef = await doc(db, "organisation", orgId);
      const org = await getDoc(orgRef);
      let data = org.data();
      console.log("Document data:", data);
      const orgEvents = data.events;

      // event snapshot
      const eventSnapshot = await getDocs(collection(db, "events"));
      orgEvents.forEach((ev) => {
        eventSnapshot.forEach((doc) => {
          if (doc.id == ev) {
            // get end date of event
            const str = doc.data().dateEnd;

            // parse string & make into datetime object
            const [day, month, year] = str.split("-");
            const date = new Date(year, month, day);

            // get today's date
            const today = new Date(); // returns time

            // only show the events that have yet to end; compare time
            if (date.getTime() >= today) {
              console.log(doc.id, "=>", doc.data());
              this.EventCards.push({ id: doc.id, data: doc.data() });
            }
          }
        });
      });
    },
  },
};
</script>
    
<style scoped>
#box-title {
  margin-top: 4px;
  margin-bottom: 3vh;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}

#userEvents {
  margin-top: 36px;
  margin-right: 36px;
  background-color: #ffefe2;
  width: 100%;
  height: auto;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
  height: auto;
  margin-bottom: 20px;
}

.noEvents {
  justify-content: center;
  display: flex;
  text-align: center;
}
</style>