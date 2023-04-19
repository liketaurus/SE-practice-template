<template>
    <div class="quize-progress">
        <div class="progress-bar">
            <span>{{answerGiven}}/5</span>
            <div class="progress-bar_active" :style="{'width': (answerGiven/5) * 100 + '%'}"></div>
        </div>
    </div>  
</template>

<script>
export default{
    props: ['answerGiven'],
}
</script>

<style scoped>
    .quize-progress{
        width: calc(100% - 40px);
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .progress-bar{
        position: relative;
        background-color: #e1a83553;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 20px;
        margin: 10px 0;
        color: white;
    }
    .progress-bar span{
        z-index: 2;
    }
    .progress-bar_active{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        background-color: #E1A835;
        transition: 300ms;
    }
</style>