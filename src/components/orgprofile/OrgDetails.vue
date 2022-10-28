<template>
<div id="contactDetails">
    <div class="box">
        <div id="box-title">
            Contact details
        </div>

        <div id="box details">
            <label class="fontUser">Name</label> &nbsp; {{name}} <br>
            <label class="fontUser">Email</label> &nbsp; {{email}} <br/>
        </div>

        <div class="box button">
            <div class="ant-button">
            <a-button type="primary" size="large" class="orange" @click="showModal">
                Change Password </a-button>
            <!-- <a-modal
                v-model:visible="visible"
                title="Event Confirmation"
                @ok="handleOk"
              >
                <template #footer> </template>
                <div class="modal">
                  <h1 id="modalHeader">
                    Hi, {{ `${this.$store.state.details["lastName"]}!` }}
                  </h1>
                  <p>Yes, I want to sign up as a volunteer for</p>
                  <p>
                    <b
                      >{{ this.event["eventName"] }} by
                      {{ this.event["eventHost"] }}</b
                    >
                  </p>
                  <p>on</p>
                  <p>
                    <b>{{ fullDate }}</b>
                  </p>
                  <p><b>TBC</b></p>
                  <p>
                    <b>at {{ displayLocation }}</b>
                  </p>
                  <br /><br />
                  <span id="spanModal">
                    <p>I agree with the</p>
                    <p style="color: orange">Terms & Conditions</p>
                  </span>

                  <a-button id="confirmButton" htmlType="submit" size="large" type="primary" danger @click="confirmVolunteer"
                    >Confirm
                  </a-button>
                </div>
              </a-modal> -->
            </div>
        </div>
    </div>
</div>
</template>
  
<script>
import { updateEmail } from "firebase/auth";

    export default ({
        name: 'ContactDetails',
        data() {
            return {
                name: this.$store.state.details['orgName'],
                email: this.$store.getters.getEmail,
            }
        },
        methods: {
            edit_profile() {
                this.$store.dispatch('updateProfile')
            }
        }
    });

</script>
  
<style scoped>
#contactDetails{
    margin-top: 36px;
    margin-left: 40px;
    margin-right: 36px;
    background-color: #FFEFE2;
    width: 400px;
    height: 217px;
    border-radius: 5px;
    padding: 24px;
}
.box {
    text-align: left;
    margin-left: 15px;
}

#box-title{
    margin-top:4px;
    margin-bottom:15px;
    font-size: x-large;
    font-weight: bold;
    color: #ff734c; 
}

.box .fontUser {
  color: #020957;
  font-weight: bold;
  margin-right:"";
}

.ant-button .orange {
  margin: 20px 0px 10px 0px;
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  width: 90%;
  height: auto;
  white-space: normal;
}

</style>