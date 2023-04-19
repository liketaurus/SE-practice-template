<template>
    <div class="quize">
        <svg class="waves rev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(235, 59, 122,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(151,216, 196,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(235, 59, 122, 0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(151,216, 196)" />
            </g>
        </svg>
        <div class="content">
            <QuizeProgressBar class="progress" :answer-given="answerGiven"></QuizeProgressBar>
            <Questions :questions="questions" :get-result="getResult" :current-question-index="currentQuestionIndex" :close="close"></Questions>
            <QuizeNavigation class="navigation" :pages="pages" :change-question="changeQuestion" :current-question-index="currentQuestionIndex" :answer-given="answerGiven"></QuizeNavigation>
        </div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(235, 59, 122,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(151,216, 196,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(235, 59, 122, 0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(151,216, 196)" />
            </g>
        </svg>
    </div>  
</template>

<script>
import Questions from './Questions.vue';
import QuizeNavigation from './QuizeNavigation.vue';
import QuizeProgressBar from './QuizeProgressBar.vue';

export default{
    components:{
        Questions,
        QuizeNavigation,
        QuizeProgressBar,
    },
    methods:{
        close(question){
            question.showResult = false;
            if ((this.currentQuestionIndex + 1) < 5) {
                this.currentQuestionIndex++
            }
        },
        changeQuestion(number){
            this.currentQuestionIndex += number;
        },
        endTrue(){
            this.end = true;
        }
    },
    props: ['questions', 'getResult', 'answerGiven', 'pages'],
    data(){
        return{
            currentQuestionIndex: 0,
        }
    }
    
}
</script>

<style scoped>
    .navigation{
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .parallax > use{
        animation: wavesMove 25s cubic-bezier(.55, .5, .45, .5) infinite;
    }
    .parallax > use:nth-child(1){
        animation-delay: -2s;
        animation-duration: 7s;
    }
    .parallax > use:nth-child(2){
        animation-delay: -3s;
        animation-duration: 10s;
    }
    .parallax > use:nth-child(3){
        animation-delay: -4s;
        animation-duration: 13s;
    }
    .parallax > use:nth-child(4){
        animation-delay: -5s;
        animation-duration: 20s;
    }
    @keyframes wavesMove{
        0%{
            transform: translate3d(-90px, 0, 0);
        }
        100%{
            transform: translate3d(85px, 0, 0);
        }
    }
    .waves{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    .waves.rev{
        top: 0;
        transform: rotate(180deg);
    }
    .progress{
        position: absolute;
        top: 0;
        left: 0;
    }
    .content{
        z-index: 2;
        width: 100%;
        min-height: calc(100vh - 130px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 90px;
    }
    .quize{
        position: relative;
        min-height: 100vh;
        background-color: #97d8c4b1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }
</style>