<template>
    <a-layout class="background">
      <a-layout-sider width=400 style="background-color: #fef8f3">
        <img src="@/assets/companyLogoTemp.png" alt="companyImg" /> 
      </a-layout-sider>
      <a-layout-content>
        <a-row class="content">
          <OrgDetails />
        </a-row>
        <a-row class="content">
          <CurrOrgEvents />
        </a-row>
      </a-layout-content>
  </a-layout>
</template>

<script>
import CurrOrgEvents from "./CurrOrgEvents.vue";
import OrgDetails from "./OrgDetails.vue";

export default {
  name: "OrgProfile",
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

.content{
  width: 100%;
}

img {
  margin-top: 5vh;
  max-height: 100%;
  max-width: 80%;
}
</style>