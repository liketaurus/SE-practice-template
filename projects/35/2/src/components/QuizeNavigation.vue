<template>
    <div class="navigation">
        <div class="arrow" @click="changeQuestion(-1)" :class="{'hide': currentQuestionIndex - 1 < 0}">
            <img src="../../public/arrow.png" alt="arrow">
        </div>
        <div class="finish" @click="pages.quizePage = false, pages.resultPage = true" :class="{'hide': answerGiven < 5}">
            <div class="button-blob">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>Закінчити</span>
        </div>
        <div class="arrow rev" @click="changeQuestion(1)" :class="{'hide': currentQuestionIndex + 1 > 4}">
            <img src="../../public/arrow.png" alt="arrow">
        </div>
    </div>  
</template>

<script>
export default{
    props: ['currentQuestionIndex', 'changeQuestion', 'answerGiven', 'pages'],
}
</script>

<style scoped>
    .finish span{
        position: relative;
        z-index: 2;
    }
    .button-blob{
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        bottom: -3px;
        right: -1px;
        z-index: 1;
    }
    .button-blob div{
        background-color: #d38f8f;
        width: 34%;
        height: 100%;
        border-radius: 100%;
        position: absolute;
        transform: scale(1.4) translateY(125%) translateZ(0);
        transition: all 700ms ease;
    }
    .button-blob div:nth-child(1) {
        left: -5%;
    }
    .button-blob div:nth-child(2) {
        left: 30%;
        transition-delay: 60ms;
    }
    .button-blob div:nth-child(3) {
        left: 66%;
        transition-delay: 25ms;
    }
    .finish{
        position: relative;
        overflow: hidden;
        padding: 15px;
        color: white;
        background-color: #e16035;
        border: 6px white solid;
        font-size: 20px;
        border-radius: 10px;
        transition: 300ms;
    }
    .finish:hover .button-blob div{
        transform: scale(1.5) translateY(20px) translateZ(0);
    }
    .finish:hover{
        background-color: rgb(213, 70, 70);
        cursor: pointer;
    }
    .navigation{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ffe05569;
    }
    .arrow{
        transition: 300ms;
        position: relative;
        width: 50px;
        height: 50px;
        border: 6px white solid;
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e16035;
        animation: visible 3s infinite;
        padding: 5px;
        border-radius: 50%;
        overflow: hidden;
    }
    @keyframes visible{
        0%{
            background-color: #e16035;
        }
        50%{
            background-color: #ff8282;
        }
        100%{
            background-color: #e16035;
        }
    }
    .arrow:hover{
        cursor: pointer;
    }
    .arrow img{
        z-index: 2;
    }
    .arrow::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(1.1);
        background-color: #dbc59b;
        left: 0;
        top: -110%;
        border-radius: 50%;
        z-index: 1;
        transition: 300ms;
    }
    .arrow:hover::after{
        top: 0;
    }
    .rev{
        transform: rotate(180deg);
    }
    .hide{
        transform: translateY(100px);
    }
</style>