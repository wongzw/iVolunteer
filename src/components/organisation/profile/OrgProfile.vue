<template>
    <a-layout class="background">
    <a-row type="flex">
      <a-col :flex="4"> <img src="" alt="companyImg" /> </a-col>
      <a-col :flex="0.5"> <OrgDetails /></a-col>
    </a-row>
    <a-row>
      <CurrOrgEvents />
    </a-row>
  </a-layout>
</template>

<script>
import CurrOrgEvents from "./CurrOrgEvents.vue";
import OrgDetails from "./OrgDetails.vue";

export default {
  name: "UserDashboard",
  components: {
    CurrOrgEvents,
    OrgDetails,
  },
};
</script>

<style scoped>
.background {
  min-height: 30vh;
  background-color: #fef8f3;
}
</style>