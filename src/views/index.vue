<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label" @click="renderTo('/button')">按钮</div>
            <div class="label" @click="renderTo('/input')">输入框</div>
            <div class="label" @click="renderTo('/radio')">单选</div>
            <div class="label" @click="renderTo('/checkbox')">多选</div>
            <div class="label" @click="renderTo('/switch')">开关</div>
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
        }
    }
}
</script>