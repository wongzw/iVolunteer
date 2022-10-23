<template>
    <div id="userEvents">
        <div class="box">
            <div id="box-title"> Current Events </div>
    
            <div id="box details">
                <!-- <VolCurrentEvents/> -->
            </div>
    
        </div>
    </div>
</template>
    
<script>

// import VolCurrentEvents from '@/components/VolCurrentEvents.vue'
export default ({
    name: 'CurrentUserEvents',
    components: {
        // VolCurrentEvents
    }
});

</script>
    
<style scoped>
    #userEvents{
        margin-top: 36px;
        margin-left: 40px;
        margin-right: 36px;
        margin-bottom: 62px;
        background-color: #FFEFE2;
        width: 876px;
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
</style>