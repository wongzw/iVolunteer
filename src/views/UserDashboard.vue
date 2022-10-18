<template>
  <UserDashboard/>
</template>
  
<script>
import { db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
export default {
  name: "UserDashboard",
  async mounted() {
    var docRef = doc(db, "users", this.$store.state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.$store.state.details = docSnap.data()
    }
  },
};
</script>