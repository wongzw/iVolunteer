<template>
  <div id="contactDetails">
    <div class="box">
      <div id="box-title">Contact details</div>

      <div id="box details">
        <label class="fontUser">Name</label> &nbsp; {{ name }} <br />
        <label class="fontUser">Email</label> &nbsp; {{ email }} <br />
      </div>

        <div class="box button">
            <div class="ant-button">
            <a-button type="primary" size="large" class="orange" @click="showModal">
                Edit Personal Details </a-button>
        </div>

        <div class="a-modal">
            <a-modal
            v-model:visible="this.showMore"
            title="Edit Personal Details:"
            @ok="handleOk"
            >

            <template #footer>
              <div class="ant-button">
                <a-button
                    class="orange"
                    key="Confirm"
                    type="primary"
                    :loading="loading"
                    @click="showNone"
                    style="width: 40%"
                    :disabled="this.rewardConfirmChecked == false"
                    >Confirm</a-button
                >
              </div>
            </template>
            
            <div class="modalContent">
                some content
            </div>
            </a-modal>
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
                showMore: false,
                seenAll: false,
            }
        },
        methods: {
            showAll() {
                this.showMore = true;
            },
            showNone() {
                this.seenAll = false; 
                this.showMore = false;
            },
        }
    });

</script>
  
<style scoped>
#contactDetails {
  margin-top: 36px;
  background-color: #ffefe2;
  height: 23vh;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
}

#box-title{
    margin-top:4px;
    margin-bottom:3vh;
    font-size: x-large;
    font-weight: bold;
    color: #ff734c; 
}

.box .fontUser {
  color: #020957;
  font-weight: bold;
  margin-right: "";
}

.box button {
  align-items: center;
}
.box .button{
    margin-top: 2vh; 
}

.ant-button .orange {
  margin: 20px 0px 10px 0px;
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
}
</style>