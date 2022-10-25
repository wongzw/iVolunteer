<template>
  <a-row type="flex">
    <a-col flex="100px"><TheSidebar /></a-col>
    <a-col flex="auto"><RedemptionModule /></a-col>
  </a-row>
</template>



<script>
import RedemptionModule from "../components/RedemptionModule.vue";
import TheSidebar from "../components/TheSidebar.vue";

export default {
  name: "RewardsRedemption",
  components: {
    RedemptionModule,
    TheSidebar,
  },
};
</script>

<style>
</style>