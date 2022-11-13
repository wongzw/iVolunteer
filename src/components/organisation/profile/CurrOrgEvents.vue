<template>
  <div id="userEvents">
    <div class="box">
      <a-row>
        <div id="box-title">
          All Events

          <a-button
            type="primary"
            size="medium"
            class="ant-button-orange"
            @click="reroute_event"
          >
            Create Event
          </a-button>
        </div>
      </a-row>
      <a-row>
        <div id="box details">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane
              v-for="(value, key) in EventCards"
              :key="key"
              :tab="key + ' Events'"
            >
              <div class="eventCards">
                <OrgEventCard
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
                          <a href="/event/creation" style="color: #ff5b2e">
                            Create
                          </a>
                          one today!
                        </span>
                      </b>
                    </h2>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-row>
    </div>
  </div>
</template>
    
<script>
import OrgEventCard from "../dashboard/OrgEventCard.vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.js";

export default {
  name: "CurrOrgEvents",
  data() {
    return {
      EventCards: {
        Current: [],
        Past: [],
      },
    };
  },
  components: {
    OrgEventCard,
  },
  mounted() {
    this.queryDb();
  },
  methods: {
    reroute_event() {
      this.$router.push({ path: "/event/creation" });
    },
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
              this.EventCards.Current.push({ id: doc.id, data: doc.data() });
            } else {
              this.EventCards.Past.push({ id: doc.id, data: doc.data() });
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
  margin-bottom: 4vh;
}
.box {
  text-align: left;
  margin-left: 15px;
  height: auto;
  margin-bottom: 20px;
}

#box\ details {
  width: 100%;
}

.noEvents {
  justify-content: center;
  display: flex;
  text-align: center;
  color: #020957;
}

.eventCards {
  margin-top: 10px;
  height: 50vh;
  overflow: auto;
}

.ant-button-orange {
  /* margin: 20px 0px 10px 0px; */
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  width: auto;
  height: auto;
  display: inline-flex;
  margin-left: 2vh;
}

.ant-button-orange:hover {
  /* color: black; */
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>