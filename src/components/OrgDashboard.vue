<template>
    <div>
      <body>
        <OrgCurrentEvents/>
      </body>
    </div>
  </template>
  
  <script>
  import OrgCurrentEvents from '@/components/OrgCurrentEvents.vue'
  
  export default {
    name: "OrgCurrentEvents",
    components: {
      OrgCurrentEvents, 
    },
  };
  </script>
  
  <style scoped>
  body {
    min-height: 100vh;
    background-color: #fef8f3;
  }
  </style>