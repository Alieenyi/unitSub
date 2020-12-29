<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label" @click="renderTo('/button')">按钮</div>
            <div class="label" @click="renderTo('/input')">输入框</div>
            <div class="label" @click="renderTo('/radio')">单选</div>
            <div class="label" @click="renderTo('/checkbox')">多选</div>
            <div class="label" @click="renderTo('/switch')">开关</div>
            <div class="label" @click="clickNotify">提示语Notify</div>
            <div class="label" @click="clickToast">弹层Toast</div>
            <div class="label" @click="renderTo('/echarts')">饼图</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{}
        }
    },
    methods:{
        renderTo(path){
            this.$router.push({path:path})
        },
        clickNotify(){
            this.$UNotify({
                content:"欢迎回来！",
                icon:'success',
                time: 1500
            }); 
        },
        clickToast(){
            this.$UToast({
                content:"ResultMessage",
                time: 1500
            });              //现在就可以调用了

        }
    }
}
</script>