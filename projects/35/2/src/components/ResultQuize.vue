<template>
    <div class="result-content">
        <div class="rect" >
            <ul class="circles  reverse">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >
        <div class="rect" >
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >
        <span class="behind result-title">{{this.firstName != null ?  firstName + ', вітаємо з проходженням вікторини!' : 'Вітаємо з проходженням вікторини!' }}</span><br/>
        <span class="behind result-text">
            Дякуємо вам за участь в нашій вікторині! Ми сподіваємось, що ви отримали задоволення від
             гри та дізналися багато цікавого про нашу спеціальність “Розробка програмного забезпечення”.<br/><br/>

            Навчаючись на нашій спеціальності ви отримаєте багато можливостей для розвитку та кар’єрного зростання.
            Якщо ви зацікавилися розробкою програмного забезпечення, ми запрошуємо вас до нашого <a class="result-link" href="https://sites.google.com/polytechnic.co.cc/main/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0/%D1%81%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%97?authuser=0#h.ho48gail8chq">сайту</a> аби дізнатися
             більше про наш освітній заклад та нашу спеціальність.<br/><br/>

            Якщо ж ви не отримали максимальної кількості балів чи незадоволені своїм результатом - не засмучуйтесь!
            Ви можете спробувати пройти вікторину ще раз та покращити свій результат. Бажаємо вам успіхів та нехай ваші
            мрії про кар’єру в галузі розробки програмного забезпечення збудуться!<br/><br/>
        </span>
        <span class="behind result-title">Результати: </span>
        <div class="behind result-blocks">
            <div class="result-block">Ви набрали {{this.getRightAnswersCount(questions)}}/5</div>
            <div class="result-block restart" @click="restartQuize()">
                <span>Повторити вікторину</span>
                <div class="button-blob">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>  
        <div class="behind result-answers">
            <div class="result-answer" :class="resultAnswerClasses(question)" v-for="question in questions">{{question.question}}</div>
        </div>
        <div class="footer behind">
            <a href="https://sites.google.com/polytechnic.co.cc/main/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0/%D1%81%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%97?authuser=0#h.ho48gail8chq"><img class="logo" src="../../public/logo.png" alt="logo"/></a>
            <div>
                <span>Створено студентами ППФК.</span>
                <span>Команда "Хохотунчики розробники" 2023 ©.</span>
            </div>
        </div>
    </div>
    
</template>

<script>
export default{
    methods:{
        restartQuize(){
            this.setLocalQuestions();
            this.pages.resultPage = false;
            this.pages.quizePage = true;
            this.zeroAnswerGiven()
        },
        getRightAnswersCount(questions){
            let right = 0;
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].userAnswerIndex == questions[i].rightAnswerIndex) {
                    right++;
                }
            }
            return right;
        },
        resultAnswerClasses(question){
            if (question.userAnswerIndex == question.rightAnswerIndex) {
                return 'right';
            }else{
                return 'wrong';
            }
        }
    },
    props: ['zeroAnswerGiven', 'questions', 'setLocalQuestions', 'pages', 'firstName'],
}
</script>

<style scoped>
    .footer{
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        color: white;
        font-size: 15px;
    }
    .footer div{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
    .footer img{
        max-width: 50px;
        margin: 5px;
    }
    .behind{
        position: relative;
        z-index: 2;
    }
    .rect{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .circles{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .reverse{
        transform: rotate(180deg);
    }

    .circles li{
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(235, 59, 122, 0.3);
        animation: animate 10s linear infinite;
        bottom: -150px;
        
    }

    .circles li:nth-child(1){
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
    }


    .circles li:nth-child(2){
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 5s;
        background: rgba(59, 235, 168, 0.3);
    }

    .circles li:nth-child(3){
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
    }

    .circles li:nth-child(4){
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 5s;
        background: rgba(59, 235, 168, 0.3);
    }

    .circles li:nth-child(5){
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
    }

    .circles li:nth-child(6){
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
        background: rgba(59, 235, 168, 0.3);
    }

    .circles li:nth-child(7){
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
        background: rgba(59, 235, 168, 0.3);
    }

    .circles li:nth-child(8){
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 20s;
    }

    .circles li:nth-child(9){
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
        background: rgba(59, 235, 168, 0.3);
    }

    .circles li:nth-child(10){
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
    }



    @keyframes animate {

        0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
        }

        100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }

    }
    .restart:hover .button-blob div{
        transform: scale(1.5) translateY(20px) translateZ(0);
    }
    .restart:hover{
        cursor: pointer;
    }
    .button-blob{
        border-radius: 10px;
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
        background-color: #6fd4c1;
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
    .restart span{
        position: relative;
        z-index: 2;
    }
    .result-answers{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .wrong{
        background-color: #c9736fc2;
    }
    .right{
        background-color: #7bc470c6;
    }
    .result-answer{
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 20px;
        color: white;
        font-size: 25px;
        width: calc(100% - 40px);
        margin: 0 20px;
        margin-top: 20px;
    }
    .result-blocks{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .result-block{
        padding: 15px;
        background-color: #6B9AC4;
        width: 320px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-size: 35px;
        margin-top: 30px;
        margin-right: 20px;
        color: white;    
    }
    
    .restart{
        position: relative;
        background-color: rgb(219, 97, 97);
        font-size: 25px;
    }
    .result-title{
        font-size: 40px;
        color: #E1A835
    }
    .result-link{
        text-decoration: none;
        color: #E1A835;
    }
    .result-content{
        padding: 20px;
        width: calc(100% - 40px);
        min-height: calc(100vh - 40px);
        background-color: #4059AD;
        position: relative;
    }
    .result-text{
        font-size: calc(16px + (9 + 9 * 0.7) * ((100vw - 320px) / 1280));
        color: white;
        z-index: 2;
    }
    @media (max-width: 785px){
        .result-blocks{
            align-items: flex-start;
            flex-direction: column;
        }
        .result-block{
            margin: 0;
            margin-top: 20px;
        }
    }
    @media (max-width: 390px){
        .result-block{
            width: auto;
        }
    }
</style>