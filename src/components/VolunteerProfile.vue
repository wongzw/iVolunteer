<template>
    <a-layout class = "background">
            <a-row gutter={[24,16]}>
                <UserContactDetails/>
                <UserAchievements/> 
            </a-row>

            <a-row>
                <CurrentUserEvents/>
            </a-row>
    </a-layout>
</template>

<script>
import CurrentUserEvents from './profile/CurrentUserEvents.vue'
import UserAchievements from './profile/UserAchievements.vue'
import UserContactDetails from './profile/UserContactDetails.vue';

export default {
  name: "UserDashboard",
  components: {
    UserContactDetails,
    UserAchievements,
    CurrentUserEvents
  },
};
</script>

<style scoped>
/* body {
  min-height: 100vh;
  background-color: #fef8f3;
} */

.background {
    min-height: 100vh;
    background-color: #fef8f3;
}

</style>