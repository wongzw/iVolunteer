<template>
  <a-layout class="background">
    <a-row type="flex">
      <a-col :flex="0.5"><UserContactDetails /></a-col>
      <a-col :flex="3"><UserAchievements /></a-col>
      <a-col :flex="5"><UserRewards /></a-col>
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
import UserRewards from "./UserRewards.vue";
import VolProfileEventCard from "./VolProfileEventCard.vue";

export default {
  name: "UserDashboard",
  components: {
    UserContactDetails,
    UserAchievements,
    CurrentUserEvents,
    UserRewards,
  },
};
</script>

<style scoped>
.background {
  min-height: 30vh;
  background-color: #fef8f3;
}
</style>