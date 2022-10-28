<template>
    <a-layout class = "background">
      <a-col span="9">
        <img src="" alt="companyImg"/>
      </a-col>

      <a-row gutter={[24,16]}>
        <OrgDetails/>
      </a-row>

      <a-row>
        <CurrOrgEvents/>
      </a-row>

    </a-layout>
</template>

<script>
import CurrOrgEvents from '../orgprofile/CurrOrgEvents.vue';
import OrgDetails from '../orgprofile/OrgDetails.vue';

export default {
  name: "UserDashboard",
  components: {
    CurrOrgEvents,
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