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
                <a-button key="cancel" @click="confirmCancel" style="width: 40%"
            >Cancel</a-button>
                <a-button
                    class="orange"
                    key="Confirm"
                    type="primary"
                    :loading="loading"
                    @click="showNone"
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
                        <label class="formSignUp">First Name</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="name"
                        placeholder="Enter your first name"
                        ></a-input> <br />

                        <label class="formSignUp">Last Name</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="email"
                        placeholder="Enter your last name"
                        ></a-input> <br />

                        <label class="formSignUp">Email</label><br />
                        <a-input
                        style="width: 60%; margin-bottom: 10px"
                        class="input"
                        type="email"
                        v-model:value="email"
                        placeholder="Enter your email"
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
    export default ({
        name: 'ContactDetails',
        data() {
            return {
                name: this.$store.state.details['firstName'] + " " + this.$store.state.details['lastName'],
                email: this.$store.getters.getEmail,
                canEdit: false,
                seenAll: false,
                confirmDetails: false, 
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
            }
        }
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