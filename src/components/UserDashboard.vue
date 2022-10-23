<template>
    <a-layout class = "background">
            <a-row gutter={[24,16]}>
                <UserContactDetails/>
                <UserAchievements/> 
            </a-row>

            <a-row>
                <!-- <CurrentUserEvents/> -->
                <VolCurrentEvents/>
            </a-row>
    </a-layout>
</template>

<script>
// import VolCurrentEvents from '@/components/VolCurrentEvents.vue'
import CurrentUserEvents from './dashboard/CurrentUserEvents.vue'
import UserAchievements from './dashboard/UserAchievements.vue'
import UserContactDetails from './dashboard/UserContactDetails.vue';
import VolCurrentEvents from './VolCurrentEvents.vue';

export default {
  name: "UserDashboard",
  components: {
    UserContactDetails,
    UserAchievements,
    // CurrentUserEvent
    VolCurrentEvents, 
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