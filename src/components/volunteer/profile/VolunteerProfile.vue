<template>
  <a-layout class="background">
    <a-row gutter="{[24,16]}">
      <UserContactDetails />
      <UserAchievements />
    </a-row>

    <a-row>
      <CurrentUserEvents />
    </a-row>
  </a-layout>
</template>

<script>
import CurrentUserEvents from "./CurrentUserEvents.vue";
import UserAchievements from "./UserAchievements.vue";
import UserContactDetails from "./UserContactDetails.vue";

export default {
  name: "UserDashboard",
  components: {
    UserContactDetails,
    UserAchievements,
    CurrentUserEvents,
  },
};
</script>

<style scoped>

.background {
  background-color: #fef8f3;
}
</style>