<template>
    <div>
      <body>
        <OrgDashboardEvent/>
      </body>
    </div>
  </template>
  
  <script>
  import OrgDashboardEvent from './OrgDashboardEvent.vue'
  
  export default {
    name: "OrgCurrentEvents",
    components: {
      OrgDashboardEvent, 
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #fef8f3;
  }
  </style>