<template>
    <OrgOnboard/>
    <TheFooter/>
</template>

<script>
import OrgOnboard from "../components/onboarding/OrgOnboard.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "OrgBoard",
  components: { OrgOnboard, TheFooter }
};
</script>