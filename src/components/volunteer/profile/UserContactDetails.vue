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
                Edit Personal Details </a-button>
        </div>
      </div>
    </div>
</div>
</template>
  
<script>
import { updateEmail } from "firebase/auth";
import { notification } from "ant-design-vue";
import { SmileOutlined, robotOutlined } from "@ant-design/icons-vue";
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";

    export default ({
        name: 'ContactDetails',
        data() {
            return {
                name: this.$store.state.details['firstName'] + " " + this.$store.state.details['lastName'],
                email: this.$store.getters.getEmail,
            }
        },
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