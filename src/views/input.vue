<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">输入框</div>
            <div class="form_content">
                <u-input placeholder="可删除" v-model="form.text" clearable></u-input>
            </div>
            <div class="form_content">
                <u-input type="password" placeholder="密码" v-model="form.pass"></u-input>
                <p class="vtips">输入密码错误，还可以输入3次</p>
            </div>
            <div class="form_content">
                <u-input type="password" placeholder="是否可视密码" v-model="form.showpass" showPassword clearable></u-input>
            </div>
            <div class="form_content">
                <u-input placeholder="最多输入10个字" v-model="form.phone">
                    <i class="u-icon-edit" slot="prepend"></i>
                    <i class="u-icon-edit" slot="append"></i>
                </u-input>
            </div>
            <div class="form_content">
                <u-input placeholder="最多输入10个字" v-model="form.name" maxlength="10" showWordLimi></u-input>
            </div>
            <div class="form_content">
                <u-input type="textarea" placeholder="请输入" v-model="form.Content" maxlength="505" showWordLimi></u-input>
            </div>
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
        submit(){
            this.$UToast({
                content:"ResultMessage",
                time: 1500
            });              //现在就可以调用了

        }
    }
}
</script>