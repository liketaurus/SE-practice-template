<template>
    <div v-for="question, questionIndex in questions" class="question" :class="{'current': currentQuestionIndex == questionIndex, 'next': currentQuestionIndex != questionIndex}">
        <div class="question-info">
            <div class="question-text">{{question.question}}</div>
            <div class="question-img">
                <img :src="question.image" alt="question-img"/>
            </div>
        </div>
        <div class="question-answers">
            <button v-for="answer, answerIndex in question.answers" class="button-answer" @click="getResult(questionIndex, answerIndex)" :class="buttonClasses(questionIndex, answerIndex)">
                <span>{{answer}}</span>
                <div class="button-blob">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </button>
        </div>
        <div class="result" :class="resultClasses(questionIndex)" @click="close(question)">
            <span v-html="question.result"></span>
            <button @click="close(question)">
                <img src="../../public/close.png" alt="Close">
            </button>
        </div>
    </div>
</template>

<script>
export default{
    methods:{
        
        buttonClasses(questionIndex, answerIndex){
            let question = this.questions[questionIndex];
            if (question.userAnswerIndex != null) {
                if (answerIndex == question.rightAnswerIndex){
                    return ['rightAnswer', 'disabled'];
                }
                else{
                    return ['wrongAnswer', 'disabled'];
                }
            }
        },
        resultClasses(questionIndex){
            let question = this.questions[questionIndex];
            if (question.showResult) {
                if (question.userAnswerIndex == question.rightAnswerIndex){
                    return 'right';
                }
                else{
                    return 'wrong';
                }
            }else{
                return 'hiden';
            }
        }
    },
    props: ['questions', 'getResult', 'currentQuestionIndex', 'close'],
}
</script>

<style scoped>
    .result{
        position: fixed;
        width: calc(100% - 40px);
        height: calc(100% - 40px);;
        padding: 20px;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        color: white;
        transition: 300ms;
        z-index: 11;
    }
    .wrong{
        background-color: rgba(160, 56, 56, 0.848);
    }
    .right{
        background-color: rgba(56, 160, 61, 0.838);
    }
    .result button{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 10px;
        right: 10px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background-color: rgb(227, 119, 119);
        overflow: hidden;
    }
    .result button::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(1.1);
        background-color: rgb(165, 62, 62);
        left: 0;
        top: -110%;
        border-radius: 50%;
        z-index: 1;
        transition: 300ms;
    }
    .result button img{
        z-index: 2;
    }
    .result button:hover{
        cursor: pointer;
    }
    .result button:hover::after{
        top: 0;
    }
    .hiden{
        top: -150%;
    }
    .button-answer{
        position: relative;
        min-width: 230px;
        min-height: 100px;
        border: none;
        border-radius: 10px;
        background-color: #6B9AC4;
        font-size: 18px;
        padding: 15px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: 500ms;
    }
    .disabled{
        pointer-events: none;
    }
    .button-answer span{
        z-index: 2;
    }
    .button-answer:hover{
        cursor: pointer;
        color: black;
    }
    .button-answer:hover .button-blob div{
        transform: scale(1.5) translateY(0) translateZ(0);
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
        background-color: #e8c98b;
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
    .wrongAnswer{
        background-color: rgb(210, 106, 106);
    }
    .rightAnswer{
        background-color: rgb(129, 203, 129);
    }
    .next{
        position: absolute;
        top: 0;
        left: 100%;
    }
    .current{
        position: relative;
    }
    .question{
        display: flex;
        width: 100%;
        max-width: 1900px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 300ms;
    }
    .question-answers{
        max-width: 650px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        column-gap: 40px;
        row-gap: 40px;
        padding: 20px;
    }
    .question-info{
        width: 100%;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
    }
    .question-text{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #4059AD;
        font-size: 30px;
        color: white;
        text-align: center;
        border-radius: 10px;
        margin: 0 20px;
    }
    .question-img{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #4059AD;
        border-radius: 10px;
        margin: 0 20px;
    }
    .question-img img{
        max-width: calc(100% - 40px);
        max-height: 250px;
        border-radius: 10px;
    }
    @media (max-width: 820px){
        .question-answers{
            row-gap: 10px;
            column-gap: 10px;
            padding: 10px;
        }
        .question-text{
            margin: 5px 10px;
        }
        .question-img{
            margin: 5px 10px;
        }
        .question-info{
            grid-template-columns: 100%;
            grid-template-rows: 1fr 1fr;
        }
    }
    @media (max-width: 500px){
        .question-answers{
            max-width: 650px;
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 1fr 1fr 1fr 1fr;
        }
        .question-text{
            font-size: 20px;
        }
        .result{
            font-size: 20px;
        }
    }
</style>
