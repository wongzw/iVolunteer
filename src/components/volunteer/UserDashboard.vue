<template>
  <div>
    <body>
      <VolCurrentEvents />
    </body>
  </div>
</template>

<script>
import VolCurrentEvents from "./VolCurrentEvents.vue";

export default {
  name: "UserDashboard",
  components: {
    VolCurrentEvents,
  },
};
</script>

<style scoped>
body {
  background-color: #fef8f3;
}
</style>