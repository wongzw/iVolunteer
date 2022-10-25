<template>
  <a-row type="flex">
    <a-col flex="300px">
      <!-- <TheSidebar />
      <TheSidebarLink /> -->
    </a-col>
    <a-col flex="auto">
      <RedemptionModule />
    </a-col>
  </a-row>
</template>



<script>
import RedemptionModule from "../components/RedemptionModule.vue";
// import TheSidebar from "../components/sidebar/TheSidebar.vue";
// import TheSidebarLink from "../components/sidebar/TheSidebarLink.vue";

export default {
  name: "RewardsRedemption",
  components: {
    RedemptionModule,
    // TheSidebar,
    // TheSidebarLink,
  },
};
</script>

<style>
</style>