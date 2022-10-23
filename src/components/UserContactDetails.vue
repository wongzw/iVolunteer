<template>
<div id="contactDetails">
    <div class="box">
        <div id="box title">
            <h3> <strong> Contact Details </strong></h3>
        </div>

        <div id="box details">
            <label class="fontUser">Name</label> <strong>{{name}}</strong> <br/>
            <label class="fontUser">Email</label> <strong>{{email}}</strong> <br/>
        </div>

        <div class="box button">
            <div class="ant-button">
            <a-button type="primary" size="large" class="orange" @click="updateVolunteer">
                Edit Personal Details </a-button>
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
                name: this.$store.getters.getId,
                email: this.$store.getters.getEmail
                // name: user.displayName,
                // email: user.email
            }
        },
        updateVolunteer() {

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
/* .box {
    box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
} */
.box title{
    text-align: left;
    color: #ff734c; 

}

.fontUser {
  color: #020957;
  margin-left: 20%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: -10px;
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

</style>