<template>
  <div id="contactDetails">
    <div class="box">
      <div id="box-title">Company Profile</div>

      <div id="box details">
        <label class="fontUser"> Name</label> &nbsp; {{ name }} <br />
        <label class="fontUser"> Email</label> &nbsp; {{ email }} <br />
      </div>

      <div class="box button">
        <div class="ant-button">
          <a-button
            type="primary"
            size="medium"
            class="orange"
            style="width: 70"
            @click="edit_details"
          >
            Change Password
          </a-button>
        </div>

        <div class="a-modal">
          <a-modal
            v-model:visible="this.canEdit"
            title="Change Password:"
            @ok="handleOk"
          >
            <template #footer>
              <div class="ant-button">
                <a-button
                  key="cancel"
                  @click="confirmCancel"
                  style="width: 40%"
                >
                  Cancel</a-button
                >
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
                  <label class="formSignUp">Current Password</label><br />
                  <a-input
                    style="width: 60%; margin-bottom: 10px"
                    class="input"
                    type="email"
                    v-model:value="currentPassword"
                    placeholder="Enter your current password"
                  ></a-input>
                  <br />

                  <label class="formSignUp">New Password</label><br />
                  <a-input
                    style="width: 60%; margin-bottom: 10px"
                    class="input"
                    type="email"
                    v-model:value="newPassword"
                    placeholder="Enter your new password"
                  ></a-input>
                </a-form-item>
              </a-form>
              <div class="confirmBox">
                <a-checkbox
                  class="a-checkbox"
                  v-model:checked="this.confirmDetails"
                  ><h4 style="text-align: center">
                    My details are correct.
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
import {
  updatePassword,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { notification } from "ant-design-vue";
import { SmileOutlined, RobotOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

export default {
  name: "ContactDetails",
  data() {
    return {
      name: this.$store.state.details["orgName"],
      email: this.$store.getters.getEmail,
      newPassword: "",
      currentPassword: "",
      canEdit: false,
      seenAll: false,
      confirmDetails: false,
    };
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
      error,
    };
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
    },
    confirm() {
      this.confirmDetails = true;
    },
    changePassword(currentPassword, newPassword) {
      const auth = getAuth();
      const user = auth.currentUser;

      updatePassword(user, newPassword)
        .then(() => {
          // need to commit change to user!!!!
          this.$store.commit("updateOrganisation", user);
          console.log("password changed");
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.error(
            "Unable to change password, please try again! \n" + errorMessage
          );
          console.log(errorMessage);

          // reauthentication without relogin from user
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );
          reauthenticateWithCredential(user, credential);
          updatePassword(user, newPassword);
        });
    },
    async changeDetails() {
      // check that fields were updated:
      if ((this.currentPassword != "") & (this.newPassword != "")) {
        // Pop Data from FS
        console.log(this.currentPassword, this.newPassword);
        this.confirmDetails = false;
        this.canEdit = false;
      }

      // logging changes
      console.log("updating password...");
      await this.changePassword(this.currentPassword, this.newPassword);

      // success confirmation
      this.success();
      // location.reload();
    },
  },
};
</script>
  
<style scoped>
#contactDetails {
  margin-top: 36px;
  margin-right: 36px;
  background-color: #ffefe2;
  width: 100%;
  height: 217px;
  border-radius: 5px;
  padding: 24px;
}
.box {
  text-align: left;
  margin-left: 15px;
  margin-bottom: 20px;
  width: 100%;
}

#box-title {
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: x-large;
  font-weight: bold;
  color: #ff734c;
}

.box .fontUser {
  color: #020957;
  font-weight: bold;
  margin-right: "";
}

.ant-button .orange:disabled {
  background-color: lightgray;
  border-color: darkgray;
  transition: 0.3s ease;
}

.ant-button .orange {
  margin: 20px 0px 10px 0px;
  background-color: #ff734c;
  border-color: #ff734c;
  border-radius: 5px;
  height: auto;
  white-space: normal;
}
</style>