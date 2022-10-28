<template>
  <UserDashboard />
</template>
  
<script>
import { db } from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import UserDashboard from "../../components/volunteer/UserDashboard.vue";

export default {
  name: "UserDashboardView",

  components: {
    UserDashboard,
  },
};
</script>