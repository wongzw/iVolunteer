<template>
  <UserDashboard v-if="rendered" />
</template>
  
<script>
import { db } from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import UserDashboard from "../../components/UserDashboard.vue";

export default {
  name: "UserDashboardView",
  data() {
    return {
      rendered: false,
    };
  },
  async mounted() {
    var docRef = doc(db, "users", this.$store.state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.$store.state.details = docSnap.data();
      this.rendered = true;
    }
  },
  components: {
    UserDashboard,
  },
};
</script>