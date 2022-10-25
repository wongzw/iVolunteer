<template>
  <img
    src="../assets/ivolunteer_logo.svg"
    alt="Logo of IVolunteer"
    class="logo"
  />
  <div class="box">
    <div id="welc-msg">
      <h1 id="signUpHeader">
        <strong>
          Create your account to start your Volunteering Journey!
        </strong>
      </h1>
    </div>
    <div class="box-inline">
      <div class="box org">
        <img src="../assets/Organisation.svg" alt="organisation_img" />
        <div class="ant-button">
          <a-button type="primary" size="large" class="blue" @click="is_org"
            >I'm an Organisation</a-button
          >
        </div>
      </div>
      <div class="box vol">
        <img src="../assets/Volunteer.svg" alt="volunteer_img" />
        <div class="ant-button">
          <a-button type="primary" size="large" class="orange" @click="is_vol"
            >I'm a Volunteer</a-button
          >
        </div>
      </div>
    </div>
  </div>

  <div id="box2" class="box">
    Already have an account?
    <a @click="reroute" style="color: #5a4ff3">Log In.</a>
  </div>
</template>

<script>
export default {
  name: "SignUpPage",
  components: {},
  methods: {
    reroute() {
      this.$router.push({ path: "/login" });
    },
    is_org() {
      this.$router.push({ path: "/register/organisation" });
    },
    is_vol() {
      this.$router.push({ path: "/register/volunteer" });
    },
  },
};
</script>

<style scoped>
.logo {
  height: 50px;
  margin-top: 10vh;
}

#welc-msg {
  place-items: center stretch;
  border-radius: 4px;
  border-block-color: black;
  align-items: center;
}

.box {
  background-color: white;
  border-radius: 2px;
  margin-top: 3%;
  margin-left: 25vw;
  margin-right: 25vw;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
}

.box-inline {
  display: flex;
  justify-items: left;
}

.box .org,
.box .vol {
  background-color: white;
  border-radius: 2px;
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  min-width: 40%;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
}

#box2 {
  margin-top: 20px;
  text-align: center;
  padding-top: -30px;
  height: 10px;
  vertical-align: middle;
  font-weight: bold;
  line-height: 5px;
}

#signUpHeader {
  font-size: 30px;
  color: #020957;
  text-overflow: wrap;
}

.ant-button .orange {
  margin: 20px 0px 10px 0px;
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  width: 80%;
  height: auto;
  white-space: normal;
}

.ant-button .blue {
  margin: 20px 0px 10px 0px;
  border-radius: 5px;
  width: 80%;
  background-color: #020957;
  border-color: #020957;
  text-align: center;
  height: auto;
  white-space: normal;
}
</style>