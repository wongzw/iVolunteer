<template>
  <div class="exp">
            <div class="level">
                Level {{userLevel}}
            </div>
            <div class="exp-bar">
                <div class="exp-outer">
                    <div class="exp-inner" :style="`width: ${totalPercent}%`"> </div>
                </div>
                    <div class="level-progress">{{totalPercent}}%</div>
            </div>
            <div class="nextLevel">
                {{expRemaining}} EXP to Next Level
            </div>
        </div>
</template>

<script>
export default {
    name: 'expBar',
    props: ['name', 'userExp', 'userLevel'],
    data() { 

    },
    computed: {
        totalPercent() {
            let percent = (this.userExp) / 2000;
            let percentRounded = Math.round(percent*100);
            return percentRounded;
        },
        expRemaining() {
            return 2000 - this.userExp;
        }
    },
}
</script>

<style scoped>
    .exp-bar {
        display: flex;
        height: 12px;
    }

    .level-progress {
        color: #020957; 
        margin-top: -8px; 
        font-size: 16px;
    }

    .nextLevel {
        color: #020957; 
        font-size: 16px;
        display: flex;
        margin-top: 5px;
    }

    .level {
        font-family: 'Mulish';
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 0;
        color: #020957;
        display: flex;

    }

    .exp-outer {
        width: 85%;
        margin-right: 10px;
        background-color: #DAE3EA;
        border-radius: 10px;
    }

    .exp-inner {
        background-image: linear-gradient(to right, #020957, #2484E4);
        border-radius: 10px;
        height: 100%;
    }


</style>