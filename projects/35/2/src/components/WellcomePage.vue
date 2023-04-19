<template>
    <div class="wellcome_full-screan">
        <img class="back-img" src="../../public/wellcome-image.png" alt="Image"/>
        <span class="wellcome_text">
            <a href="https://sites.google.com/polytechnic.co.cc/main/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0/%D1%81%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%97?authuser=0#h.ho48gail8chq"><img class="logo" src="../../public/logo.png" alt="logo"/></a>
            <a href="https://github.com/Dokji/Practice/wiki/Site-Doc"><img class="logo" src="../../public/question.png" alt="logo"/></a><br/>
            <span class="orange">Ласкаво просимо до нашої вікторини!</span><br/><br/>
            Ви отримаєте п’ять запитань, які ми випадковим чином відібрали з десяти можливих.
            Кожен студент нашої спеціальності без заминки відповість на ці питання. Цікаво - а чи впораєтесь ви?<br/><br/>

            Навчання на нашій спеціальності “Розробка програмного забезпечення” є надзвичайно цікавим,
            а вікторина - це відмінний спосіб дізнатись про неї ще більше, бо після кожної відповіді ми
            розкажемо вам якийсь цікавий факт, що стосується заданого питання.
            Ми віримо, що ви зможете відповісти на всі запитання правильно.
            Тож не гайте часу і почніть вікторину, щоб дізнатись багато нового й цікавого про нашу спеціальність!
        </span>
        <form action="#" >
            <div>
                <input type="text" v-model="userFirstName" placeholder="Ім`я за бажанням"/>
                <span></span>
            </div>
            <button class="button_cool" type="submit" @click.prevent="() => $emit('userdata', {userFirstName})">Перейти до вікторини</button>
            <button class="button_cool red" type="submit" @click.prevent="enterWithoutName(pages)">Продовжити без заповнення форми</button>
        </form>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(235, 59, 122,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(225,168, 53,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(235, 59, 122, 0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(225,168, 53)" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
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
    .link_cool{
        color: white;
    }
    .waves{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    .logo{
        width: 60px;
        margin: 5px;
        z-index: 2;
    }

    form{
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }
    form input{
        position: relative;
        width: 266px;
        height: 40px;
        border-radius: 5px;
        background-color: rgba(107, 154, 196, 0.6);
        border: none;
        margin: 8px 0;
        padding: 3px 7px;
        color: rgb(255, 255, 255);
        font-size: 20px;
    }
    .button_cool{
        position: relative;
        z-index: 1;
        width: 280px;
        min-height: 40px;
        background-color: #E1A835;
        border: none;
        margin: 8px 0;
        padding: 3px;
        color: rgb(255, 255, 255);
        transition: 300ms;
        font-size: 20px;
        border: solid white 4px;
        border-radius: 10px;
    }
    .button_cool::after{
        position: absolute;
        content: "";
        top: 0;
        left: 50%;
        width: 10%;
        height: 100%;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        background-color: #EB3B7A;
        opacity: 0;
        transition: 300ms;
        z-index: -1;
    }
    .button_cool::before{
        position: absolute;
        content: "";
        top: 0;
        right: 50%;
        width: 10%;
        height: 100%;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
        background-color: #EB3B7A;
        opacity: 0;
        transition: 300ms;
        z-index: -1;
    }
    .red::after{
        background-color: #E1A835;
    }
    .red::before{
        background-color: #E1A835;
    }
    .button_cool:hover{
        cursor: pointer;
        background-color: none;
    }
    .button_cool:hover::before{
        opacity: 1;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        width: 50%;
    }
    .button_cool:hover::after{
        opacity: 1;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        width: 50%;
    }
    form input:focus{
        outline: none;
    }
    form input::placeholder{
        color: rgba(255, 255, 255, 0.689);
    }
    form div{
        position: relative;
    }
    form div span{
        position: absolute;
        z-index: 10;
        height: 2px;
        width: 273px;
        background-color: rgba(255, 255, 255, 0.689);
        left: 4px;
        bottom: 12px;
    }
    .wellcome_full-screan{
        min-height: calc(100vh - 40px);
        width: calc(100% - 40px);
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;;
        background-color: rgba(50, 71, 143, 0.92);
    }
    .back-img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    .wellcome_text{
        font-size: calc(16px + (9 + 9 * 0.7) * ((100vw - 320px) / 1280));
        color: white;
        z-index: 2;
    }
    .red{
        background-color: #EB3B7A;
    }
    .orange{
        color: #E1A835;
        font-size: calc(17px + (12 + 12 * 0.7) * ((100vw - 320px) / 1280));
    }
    @media (max-width: 450px) {
        .waves{
            height: 200px;
        }
    }
</style>

<script>
export default{
    props: ['pages', 'setLocalQuestions'],
    methods:{
        enterWithoutName(pages){
            pages.wellcomePage = false;
            pages.quizePage = true;
            this.setLocalQuestions();
        }
    },
    data(){
        return{
            userFirstName: null,
        }
    }
    
}
</script>