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
            <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </a-modal>
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
                name: this.$store.state.details['firstName'] + " " + this.$store.state.details['lastName'],
                email: this.$store.getters.getEmail,
            }
        },
        setup() {
            // var visible = false;

            // const showModal = () => {
            //     visible = true;   
            // };

            // const handleOk = () => {
            //     visible = false;
            // };
            // return {
            //     visible,
            //     showModal,
            //     handleOk,
            // };
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