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
    </div>
  </div>
</template>
    
<script>
import UserEventCards from './UserEventCards.vue';
import { collection, query, where } from "firebase/firestore";
import { doc, getDoc, getDocs} from "firebase/firestore";
import { db } from "../../../firebase.js";
import { breakStatement } from '@babel/types';

export default {
  name: "CurrentUserEvents",
  data() {
    return {
      EventCards: [],
      userEvents: this.$store.state['userAcceptedEvents'],
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
      console.log('Document data:', data);
      const userEvents = data.userAcceptedEvents;

      // event snapshot
      const eventSnapshot = await getDocs(collection(db, "events"));
      userEvents.forEach((ev) => {
        eventSnapshot.forEach((doc) => {
          if (doc.id == ev) {
            console.log(doc.id, "=>", doc.data());
            this.EventCards.push({ id: doc.id, data: doc.data() });
          }
      });
      });
    },
  }
};
</script>
    
<style scoped>
#userEvents {
  margin-top: 36px;
  margin-right: 36px;
  background-color: #ffefe2;
  width: 100%;
  height: 50vh;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>