<template>
  <div>
    <body>
        <VolCurrentEvents />
    </body>
  </div>
</template>

<script>
import VolCurrentEvents from '@/components/VolCurrentEvents.vue'
export default {
  name: "UserDashboard",
  components: {VolCurrentEvents},
};
</script>

<style scoped>
body {
  /* min-height: 100vh; */
  background-color: #fef8f3;
}

</style>