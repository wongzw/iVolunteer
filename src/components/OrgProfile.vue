<template>
    <a-layout class = "background">
            <a-row gutter={[24,16]}>
                <OrgDetails/>
            </a-row>

            <a-row>
                <CurrentUserEvents/>
            </a-row>
    </a-layout>
</template>

<script>
import CurrentUserEvents from './orgprofile/CurrentUserEvents.vue';
import OrgDetails from './orgprofile/OrgDetails.vue';

export default {
  name: "UserDashboard",
  components: {
    CurrentUserEvents,
    OrgDetails
  },
};
</script>

<style scoped>
.background {
    min-height: 100vh;
    background-color: #fef8f3;
}

</style>