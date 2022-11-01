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
            <a-button type="primary" size="medium" class="orange" @click="edit_details">
                Edit Personal Details </a-button>
        </div>

        <div class="a-modal">
            <a-modal
            v-model:visible="this.canEdit"
            title="Edit Personal Details:"
            @ok="handleOk"
            >

            <template #footer>
              <div class="ant-button">
                <a-button key="cancel" @click="confirmCancel" style="width: 40%">
                  Cancel</a-button>
                <a-button
                    class="orange"
                    key="Confirm"
                    type="primary"
                    :loading="loading"
                    @click="changeDetails"
                    style="width: 40%"
                    :disabled="this.confirmDetails == false"
                    >Confirm</a-button
                >
              </div>
            </template>
            
            <div class="modalContent">
                <a-form
                    id="editDetails"
                    class="edit-details-form"
                    ref="editDetails"
                    @submit.prevent="confirmDetails"
                    >
                    <a-form-item class="form">
                        <label class="formSignUp">New First Name</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="name"
                        v-model:value="newFirstName"
                        placeholder="Enter your first name"
                        ></a-input> <br />

                        <label class="formSignUp">New Last Name</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="name"
                        v-model:value="newLastName"
                        placeholder="Enter your last name"
                        ></a-input> <br />

                        <label class="formSignUp">New Email</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="email"
                        v-model:value="newEmail"
                        placeholder="Enter your email"
                        ></a-input> <br />

                        <label class="formSignUp">Current Password</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="email"
                        v-model:value="password"
                        placeholder="Enter your password"
                        ></a-input>

                    </a-form-item> 
                </a-form>
                <div class="confirmBox">
                    <a-checkbox
                        class="a-checkbox"
                        v-model:checked="this.confirmDetails"
                        ><h4 style="text-align: center">
                        My personal details are correct.
                        </h4></a-checkbox
                    >
                </div>
            </div>
            </a-modal>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import { getAuth, updateEmail, reauthenticateWithPopup, GoogleAuthProvider, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { doc, getDocs, setDoc, updateDoc, update} from "firebase/firestore";
import { db } from "../../../firebase.js";
import { notification } from "ant-design-vue";
import {
  SmileOutlined,
  RobotOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

export default ({
  name: 'ContactDetails',
  data() {
    return {
      name: this.$store.state.details['firstName'] + " " + this.$store.state.details['lastName'],
      email: this.$store.getters.getEmail,
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      password: "",
      canEdit: false,
      seenAll: false,
      confirmDetails: false, 
    }
  },
  setup() {
    const success = () => {
      notification.open({
        message: "Success",
        description: "Personal Details Successfully Updated!",
        duration: 3,
        icon: () => h(SmileOutlined, { style: "color: #020957" }),
      });
    };

    const error = (msg) => {
      notification.open({
        message: "Error",
        description: msg,
        duration: 3,
        icon: () => h(RobotOutlined, { style: "color: #ff3700" }),
      });
    };

    return {
      success,
      error
    }
  },
  methods: {
    edit_details() {
      this.canEdit = true;
    },
    showNone() {
      this.seenAll = false; 
      this.canEdit = false;
    },
    confirmCancel() {
      this.canEdit = false;
      this.confirmDetails = false;
      location.reload();
    },
    confirm() {
      this.confirmDetails = true;
    },
    emailProcess(newEmail) {
      const auth = getAuth();
      const user = auth.currentUser;

      updateEmail(user, newEmail).then(() => {
        // need to commit change to user!!!!
        this.$store.commit("updateVolunteer", user);
        console.log('Email updated')
        console.log(this.$store.state.email)

      }).catch((error) => { 
        const errorMessage = error.message;
        this.error('Unable to change email, please try again! \n' + errorMessage);
        console.log(errorMessage);

        // reauthentication without relogin from user
        const credential = EmailAuthProvider.credential(
          user.email, this.password
        );

        reauthenticateWithCredential(user, credential);
        updateEmail(user, newEmail);
      });
    },
    changeDetails() {
      // check that fields were updated:
      if (this.newFirstName != "" & this.newLastName != "" & this.newEmail != "") {
        // Pop Data from FS
        console.log(this.newFirstName, this.newLastName, this.newEmail, this.password);
        this.confirmDetails = false;
        this.canEdit = false;

        // logging changes
        console.log('name fields are being updated...');
        // update name
        const newFields = {
          firstName: this.newFirstName,
          lastName: this.newLastName,
        };

        console.log('updating database...');
        this.updateDb(this.$store.state.id, newFields);
        this.emailProcess(this.newEmail);

        // success confirmation 
        this.success();
        location.reload();
      } 
      else {
        // error for incomplete fields
        this.canEdit = true;
        this.confirmDetails = true;
        this.error("Please ensure that you've completed all fields.")
      }
    },
    async updateDb(uid, data) {
      const userRef = doc(db, "users", uid);
      console.log(userRef);
      // updates name fields 
      await updateDoc(userRef, data).then(userRef => {
        console.log("Value of an Existing Document Field has been updated")
      }).catch(error => {
        console.log(error);
      });
    },
  },

});

</script>
  
<style scoped>
#contactDetails {
  margin-top: 36px;
  background-color: #ffefe2;
  height: 28vh;
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
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
  margin-top: 2vh;
}
</style>