<template>
  <div class="blog-card">
    <img class="display" :src="event.data.eventPhoto" alt="" />
    <div class="info">
      <h2 class="event-title">{{ event.data.eventName }}</h2>
      <div class="details">
        <img class="image" src="../../assets/calendarIcon.svg" alt="calendar" />
        <h2 class="event-host">{{ event.data.dateStart }}</h2>
      </div>
      <div class="details">
        <img class="image" src="../../assets/clockIcon.svg" alt="clock" />
        <h2 class="event-host">{{ event.data.timeStart }}</h2>
      </div>
      <div class="details">
        <img class="image" src="../../assets/locationIcon.svg" alt="location" />
        <h2 class="event-host">{{ event.data.location }}</h2>
      </div>
    </div>
    <div class="ant-button">
      <a-button
        type="primary"
        size="large"
        class="orange"
        @click="reroute_event"
      >
        View Event</a-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "VolEventCard",
  props: ["event"],
  methods: {
    reroute_event() {
      const route = "/event/" + this.event.id;
      this.$router.push({ path: route });
    },
  },
};
</script>

<style scoped>
.event-title {
  font-family: "Mulish";
  font-weight: 700;
  font-size: 24px;
  color: #020957;
  margin-top: 24px;
  margin-left: 28px;
  text-align: left;
}

.blog-card {
  width: 0%;
  border-radius: 8px;
  background-color: #ffe9d6;
  min-height: 420px;
  min-width: 300px;
  transition: 0.5s ease all;
  margin-right: 32px;
  margin-bottom: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.blog-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.details {
  display: flex;
  margin-left: 24px;
}

.event-host {
  color: #020957;
  font-size: 16px;
  font-family: "Cabin";
  margin-left: 12px;
  padding-top: 8px;
}

.image {
  width: 24px;
}

.display {
  display: block;
  border-radius: 8px 8px 0 0;
  z-index: 0.5;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
}

.details:last-child {
  margin-bottom: 24px;
}

.ant-button .orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  width: 80%;
  height: auto;
  padding-left: 48px;
  padding-right: 48px;
  white-space: normal;
}

.ant-button .orange:hover {
  /* color: black; */
  background-color: #ff3700;
  border-color: #ff3700;
  transition: 0.3s ease;
}
</style>