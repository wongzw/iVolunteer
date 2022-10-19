<template>
  <VolOnboard />
  <TheFooter />
</template>

<script>
import VolOnboard from "../components/onboarding/VolOnboard.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "VolunteerBoard",
  components: { VolOnboard, TheFooter },
};
</script>