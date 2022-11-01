<template>
    <div class="eventCards">
        <a-card class = "indivEvent" type="inner">
            <div class="info">
                <!-- <h2 class="event-title">{{ event.data.eventName }}</h2> -->
                <h2 class="event-title">Event 1</h2>

                <div class="info">
                    <div class="details">
                        <img class="image" src="@/assets/calendarIcon.svg" alt="calendar" />
                        <!-- <h2 class="event-host">{{ event.data.dateStart }}</h2> -->
                        <h2 class="event-host"> start date </h2>
                    </div>
                    <div class="details">
                        <img class="image" src="@/assets/clockIcon.svg" alt="clock" />
                        <!-- <h2 class="event-host">{{ event.data.timeStart }}</h2> -->
                        <h2 class="event-host"> start time </h2>

                    </div>
                    <div class="details">
                        <img class="image" src="@/assets/locationIcon.svg" alt="location" />
                        <!-- <h2 class="event-host">{{ event.data.location }}</h2> -->
                        <h2 class="event-host"> location </h2>
                    </div>
                </div>
            </div>
        <div class="ant-button">
            <a-button
                type="primary"
                size="medium"
                class="orange"
                @click="reroute_event"
            >
                View Event</a-button
            >
            </div>
        </a-card>

        <!-- <a-card class="indivEvent" type="inner">
            Event 2
            <div class="ant-button">
            <a-button
                type="primary"
                size="medium"
                class="orange"
                @click="reroute_event"
            >
                View Event</a-button
            >
            </div>
        </a-card> -->

    </div>

</template>

<script>
export default {
    name: "UserEventCards",
    props: ["event"],
    methods: {
        reroute_event() {
            const route = "/event/" + this.event.id;
            this.$router.push({ path: route });
        },
    },
}
</script>

<style scoped>
.event-title {
  font-family: "Mulish";
  font-weight: 700;
  font-size: 16px;
  color: #020957;
  margin-top: 24px;
  margin-left: 28px;
  text-align: left;
}
.details {
  display: flex;
  margin-left: 24px;
}

.event-host {
  color: #020957;
  font-size: 14px;
  font-family: "Cabin";
  margin-left: 12px;
  padding-top: 8px;
}

.image {
  width: 24px;
}

.indivEvent{
    margin-top: 4vh;
}
.ant-button{
    float: right;
}
.ant-button .orange {
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
  margin-top: 2vh;
}
</style>