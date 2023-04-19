<template>
  <WellcomePage @userdata="userData" v-if="pages.wellcomePage" :pages="pages" :set-local-questions="setLocalQuestions"></WellcomePage>
  <Quize v-if="pages.quizePage" :pages="pages" :questions="localQuestions" :get-result="getResult" :answer-given="answerGiven"></Quize>
  <ResultQuize v-if="pages.resultPage" :firstName="firstName" :pages="pages" :zero-answer-given="zeroAnswerGiven" :questions="localQuestions" :set-local-questions="setLocalQuestions"></ResultQuize>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
  *{
    margin: 0;
    padding: 0;
    font-family: Inter;
  }
  #app{
    overflow: hidden;
  }
  ::-webkit-scrollbar{
    width: 10px;
  }
  ::-webkit-scrollbar-track{
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb{
    background: linear-gradient(#8a4c56, #bd606f);
      border: 4px solid #ffffff;
    border-radius: 5px;
    transition: 300ms;
  }
</style>

<script>
import WellcomePage from './components/WellcomePage.vue';
import Quize from './components/Quize.vue';
import ResultQuize from './components/ResultQuize.vue';

export default {
  components:{
    WellcomePage,
    Quize,
    ResultQuize,
  },
  methods:{
    zeroAnswerGiven(){
      this.answerGiven = 0;
    },
    setLocalQuestions(){
      let currentIndex = this.globalQuestions.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [this.globalQuestions[currentIndex], this.globalQuestions[randomIndex]] = [this.globalQuestions[randomIndex], this.globalQuestions[currentIndex]];
      }
      for (let i = 0; i < 5; i++) {
        this.globalQuestions[i].result = "";
        this.globalQuestions[i].userAnswerIndex = null; 
        this.localQuestions[i] = this.globalQuestions[i];
      }
    },
    userData(data){
      if (data.userFirstName) {
        this.firstName = data.userFirstName;
        this.pages.wellcomePage = false;
        this.pages.quizePage = true;
        this.setLocalQuestions();
      }
    },
    getResult(questionIndex, answerIndex){
      let question = this.localQuestions[questionIndex];
      if (question.userAnswerIndex == null) {
          this.answerGiven++;
          question.userAnswerIndex = answerIndex;
          question.showResult = true;
          if (question.rightAnswerIndex == answerIndex) {
              question.result = "Саме так! <br/>" + question.ifRight;
          }else{
              question.result = "На жаль, це не так. <br/>" + question.ifWrong;
          }
      }
  }
  },
  data(){
    return{
      pages: {wellcomePage: true, quizePage: false, resultPage: false},
      localQuestions: [],
      answerGiven: 0,
      firstName: null,
      globalQuestions: [
          {
            question: "Що таке програмна інженерія?",
            answers: ["Процес створення програмного забезпечення", "Навчання використанню комп’ютерних програм", "Метод пошуку вакансій в IT-індустрії", "Процес розробки технічних креслень"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/1.png",
            ifRight: "Програмна інженерія - це процес розробки програмного забезпечення, який включає в себе весь життєвий цикл програмного продукту: від аналізу вимог до його розробки, тестування, випробування, внесення змін та підтримки. Навчаючись на нашій спеціальності, ви матимете змогу попрацювати у складі команди над реальним проектом на всіх етапах його життєвого циклу!",
            ifWrong: "Але навчаючись на нашій спеціальності, ви зможете вивчити основи програмної інженерії та набути необхідні навички для розробки, тестування та підтримки програмного забезпечення. Ми допоможемо вам засвоїти концепції, методи та інструменти, які використовуються в індустрії, і підготуємо вас до роботи в команді!"
          },
          {
            question: "Що таке GitHub?",
            answers: ["хмарний веб-сервіс для зберігання, керування та спільної роботи над програмним кодом", "операційна система з вбудованими інструментами для розробки програмного забезпечення", "це спеціалізований веб-браузер для перегляду вихідних кодів програм", "це програма для розрахунку податків на доходи від розробки програмного забезпечення"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/2.gif",
            ifRight: "До речі, ми є партнерами GitHub, тому навчаючись на нашій спеціальності, ви матимете змогу користуватись широким спектром інструментів, сервісів та ресурсів, які надає компанія GitHub, що стане значною перевагою у вашій майбутній професійній діяльності!",
            ifWrong: "Але, якщо ви вступите на нашу спеціальність, ви зможете дізнатися більше про те, що таке GitHub і як використовувати його сервіси для спільної роботи над проектами. Ми є партнерами GitHub, тому ви матимете можливість отримати також практичний досвід використання цієї платформи!"
          },
          {
            question: "Який з перелічених інструментів використовується для спільної роботи над проектом в команді?",
            answers: ["Git", "Microsoft Word", "Adobe Photoshop", "Google Chrome"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/3.png",
            ifRight: "Вміння використовувати Git є надзвичайно важливим для розробника, оскільки це найпопулярніший інструмент для контролю версій програмного забезпечення та спільної роботи над проектами в команді. Вивчення Git є необхідною складовою навчання на нашій спеціальності, оскільки це допоможе студентам зрозуміти, як працювати з програмним кодом та як ефективно співпрацювати з іншими.",
            ifWrong: "Але на нашій спеціальності ми навчаємо студентів використовувати Git для контролю версій програмного коду та ефективної співпраці з іншими розробниками, тож вступ до нас може стати важливим кроком на шляху до успішної кар’єри!"
          },
          {
            question: "Як називається сервіс Google, який дозволяє створювати та працювати з Jupyter-блокнотами?",
            answers: ["Google Notebook", "Google Jupyter", "Google Colab", "Google Code"],
            rightAnswerIndex: 2,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/4.png",
            ifRight: "На нашій спеціальності, на заняттях з об’єктно-орієнтованого програмування ми використовуємо Google Colab для вивчення мови Python, що значно спрощує процес навчання та дозволяє студентам отримати досвід роботи з актуальними технологіями та інструментами.",
            ifWrong: "На нашій спеціальності ми використовуємо чимало сервісів, які використовуються в розробці програмного забезпечення. Тож вступайте до нас аби дізнатись відповідь на це та інші питання й отримати практичний досвід роботи з найсучаснішими технологіями та інструментами!"
          },
          {
            question: "Який продукт компанії JetBrains використовують для розробки програмного забезпечення мовою Java?",
            answers: ["IntelliJ IDEA", "PyCharm", "RubyMine", "WebStorm"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/5.webp",
            ifRight: "До речі, навчаючись на нашій спеціальності, ви матимете змогу безкоштовно використовувати будь-які з перелічених програмних продуктів, в рамках академічної співпраці з компанією JetBrains!",
            ifWrong: "На нашій спеціальності ви зможете опанувати кілька мов програмування, таких як Python, JavaScript, Java та інші, що дозволить вам легко адаптуватись до використання різних інструментів для розробки програмного забезпечення, включаючи продукти компанії JetBrains."
          },
          {
            question: "Як називається сервіс Google для організації відеозустрічей,онлайн-конференцій, дистанційного навчання?",
            answers: ["Google Meet", "Google Hangouts", "Google Duo", "Google Classroom"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/6.png",
            ifRight: "Коледж був одним з перших навчальних закладів в Україні, які почали використовувати Google Workspace, тож ми активно використовуємо сервіс Google Meet, який дає можливість нашим студентам і викладачам легко спілкуватися та працювати разом незалежно від місця перебування, що дуже важливо з огляду на події останніх років.",
            ifWrong: "Але на нашій спеціальності ми активно використовуємо сервіси Google Workspace для спільної роботи та комунікації. Опанування Google Workspace та інших сучасних інструментів та сервісів є важливою складовою нашої програми, а відповідні знання, вміння й навички допоможуть нашим студентам зробити успішну кар’єру."
          },
          {
            question: "Який текстовий редактор з відкритим кодом став одним з найпопулярніших в останні роки і зараз є фактичним стандартом в галузі розробки програмного забезпечення?",
            answers: ["Notepad++", "Visual Studio Code", "Sublime Text", "GitHub Atom"],
            rightAnswerIndex: 1,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/7.png",
            ifRight: "На нашій спеціальності ми активно використовуємо VisualStudio S Code для розробки, налагодження та тестування програмного забезпечення та написання документації. Він чудово працює з GitHub та має велику кількість розширень і плагінів, що дозволяє забезпечити високу продуктивність та ефективність розробки.",
            ifWrong: "Наша спеціальність спрямована на розробку програмного забезпечення мовами Python, Java, JavaScript, C# тощо, але окрім синтаксису обраної мови і вміння знайти алгоритм вирішення проблеми, важливо також вміти працювати зі стандартними інструментами, і такі вміння ми вам забезпечимо!"
          },
          {
            question: "Який мовний формат зазвичай використовується для написання документації, README-файлів та звітів, та підтримується більшістю редакторів коду?",
            answers: ["Markdown", "JSON", "HTML", "XML"],
            rightAnswerIndex: 0,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/8.png",
            ifRight: "На нашій спеціальності студенти в ході практики з ТРПЗ отримують досвід створення пакету проектної документації мовою Markdown. Цей формат дозволяє ефективно структурувати і форматувати текст, а також є стандартом у більшості редакторів коду та систем версійного контролю, що значно полегшує роботу з документацією.",
            ifWrong: "Звертаємо вашу увагу на той факт, що знання Markdown є дуже корисним для багатьох професій, особливо для тих, хто працює над розробкою програмного забезпечення та написанням технічної документації. Навчаючись на нашій спеціальності у вас буде можливість відшліфувати свої знання, вміння й навички з використання Markdown."
          },
          {
            question: "Який інструментарій веб-розробника поєднує в себі інструменти для відладки, інспекції HTML та CSS, профайлер, консоль для JavaScript та інші інструменти і є частиною популярного браузера?",
            answers: ["Visual Studio Code", "Adobe Photoshop", "Chrome Developer Tools", "Git Bash"],
            rightAnswerIndex: 2,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/9.jpg",
            ifRight: "Зручні інструменти розробника є однією з ключових складових успіху веб-розробки, а Chrome Developer Tools, що є частиною популярного браузера Chrome, є одним з найкращих інструментів на ринку. Саме тому студенти нашої спеціальності здебільного віддають перевагу GOogle Chrome.",
            ifWrong: "Наша спеціальність пов’язана з розробкою програмного забезпечення передбачає також вивчення стандартних інструментів розробника. Вступайте до нас, і ви отримаєте досвід розробки власних проектів, роботи з актуальними технологіями та популярними інструментами розробника!"
          },
          {
            question: "Яка візуальна мова програмування є вбудованою в MIT App Inventor?",
            answers: ["Scratch", "Python", "C++", "Blockly"],
            rightAnswerIndex: 3,
            result: "",
            showResult: false,
            userAnswerIndex: null,
            image: "question-img/10.jpg",
            ifRight: "На нашій спеціальності студенти використовують сучасні засоби візуального програмування, зокрема мову Blockly та платформу MIT App Inventor для створення інтерактивних додатків та веб-сайтів. У рамках дисципліни “Засоби візуального програмування” вони отримують практичні навички роботи з цими інструментами, що дозволяє їм реалізувати свій творчий потенціал без необхідності писати програмний код.",
            ifWrong: "Опанування засобів візуального програмування допомагає створювати інноваційні та захоплюючі проекти без необхідності вивчення складних мов програмування. Саме на нашій спеціальності ви зможете отримати практичні навички та досвід роботи з такими популярними візуальними інструментами, як Blockly та MIT App Inventor."
          },
        ]
    };
  }
}
</script>