<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="this.$router.push('/login')" class="orange"
        >Back Home</a-button
      >
    </template>
  </a-result>
</template>
  
<script>
export default {
  name: "NoPageFound",
};
</script>

<style scoped>
.orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  height: auto;
  padding-left: 48px;
  padding-right: 48px;
  white-space: normal;
}
</style>