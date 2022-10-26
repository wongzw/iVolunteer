<template>
    <OrgProfile/>
</template>
    
<script>
    import { db } from "../../firebase.js";
    import { getDoc, doc } from "firebase/firestore";
    import OrgProfile from "../../components/OrgProfile.vue";
    
    export default {
        name: "OrganisationProfile",
        components: {
        OrgProfile,
        },
    };
</script>