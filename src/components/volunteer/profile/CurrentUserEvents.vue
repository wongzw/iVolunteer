<template>
  <div id="userEvents">
    <div class="box">
      <div id="box-title">Current Events</div>
      <div id="box details" v-if="this.query">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane
            v-for="(value, key) in EventCards"
            :key="key"
            :tab="key + ' Events'"
          >
            <div class="eventCards">
              <UserEventCards
                :event="event"
                v-for="(event, index) in EventCards[key]"
                :key="index"
              />
              <div v-if="EventCards[key] == 0">
                <div class="noEvents">
                  <h2 style="color: #020957">
                    <b>
                      No {{ key }} Events Found <br />
                      <span v-if="key == 'Current'">
                        😔
                        <a href="/volunteer/dashboard" style="color: #ff5b2e">
                          Sign up
                        </a>
                        for one today!
                      </span>
                    </b>
                  </h2>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>
    
<script>
import UserEventCards from "./UserEventCards.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.js";

export default {
  name: "CurrentUserEvents",
  data() {
    return {
      SortedE: [],
      EventCards: {
        Current: [],
        Past: [],
        Closed: [],
      },
      query: false,
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
      const userId = this.$store.state.id;
      const userRef = await doc(db, "users", userId);
      const user = await getDoc(userRef);
      let data = user.data();
      console.log("Document data:", data);
      const userEvents = data.userAcceptedEvents;

      // event snapshot
      const eventSnapshot = await getDocs(collection(db, "events"));
      userEvents.forEach((ev) => {
        eventSnapshot.forEach((doc) => {
          if (doc.id == ev && doc.data()["eventClosed"] === false) {
            // get end date of event
            const str = doc.data().dateEnd;

            // parse string & make into datetime object
            const [day, month, year] = str.split("-");
            const date = new Date(year, month - 1, day);

            // get today's date
            const today = new Date(); // returns time

            // only show the events that have yet to end; compare time
            if (date.getTime() >= today) {
              // push to array to sort by date
              this.SortedE.push([ev, date]);
            } else {
              this.EventCards.Past.push({ id: doc.id, data: doc.data() });
            }
          } else if (doc.id == ev) {
            this.EventCards.Closed.push({ id: doc.id, data: doc.data() });
          }
        });
      });

       // sort curent events according to date
       this.SortedE.sort(function(a, b) {
        const date = a[1].getTime();
        const date2 = b[1].getTime();
        return date - date2;
      });

      // push to events card array
      for (let i=0; i < this.SortedE.length; i++) {
        let uid = this.SortedE[i][0];
          eventSnapshot.forEach((doc) => {
            if (doc.id == uid) {
              this.EventCards.Current.push({ id: uid, data: doc.data() });
            }
          });
      }
      
      this.query = true;
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

.eventCards {
  margin-top: 10px;
  height: 50vh;
  overflow: auto;
}

.noEvents {
  justify-content: center;
  display: flex;
  text-align: center;
  color: #020957;
}
</style>