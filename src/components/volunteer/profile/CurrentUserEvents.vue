<template>
  <div id="userEvents">
    <div class="box">
      <div id="box-title">Current Events</div>
      <div id="box details">
        <UserEventCards/>
      </div>
    </div>
  </div>
</template>
    
<script>
import UserEventCards from './UserEventCards.vue';

export default {
  name: "CurrentUserEvents",
  components: {
    UserEventCards,
  },
};
</script>
    
<style scoped>
#userEvents {
  margin-top: 36px;
  margin-right: 36px;
  background-color: #ffefe2;
  width: 100%;
  height: 50vh;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}
</style>