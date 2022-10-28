<template>
    <OrgDashboard/>
  </template>
    
  <script>
  import { db } from "../../firebase.js";
  import { getDoc, doc } from "firebase/firestore";
  import OrgDashboard from "../../components/OrgDashboard.vue";
  
  export default {
    name: "OrgDashboardView",
    
    components: {
      OrgDashboard,
    },
  };
  </script>