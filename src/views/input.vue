<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">输入框</div>
            <div class="form_content">
                <u-input placeholder="可删除" v-model="form.text" clearable showBorder></u-input>
            </div>
            <div class="form_content">
                <u-input type="password" placeholder="密码" v-model="form.pass"></u-input>
                <p class="vtips">输入密码错误，还可以输入3次</p>
            </div>
            <div class="form_content">
                <u-input type="phone" placeholder="请输入手机号" v-model="form.tel" maxlength="13" center clearable></u-input>
            </div>
            <div class="form_content">
                <u-input type="password" placeholder="是否可视密码" v-model="form.showpass" showPassword clearable center></u-input>
            </div>
            <div class="form_content">
                <u-input type="num" placeholder="数字" v-model="form.number" clearable></u-input>
            </div>
            <div class="form_content">
                <u-input placeholder="最多输入10个字" v-model="form.phone" showBorder>
                    <i class="u-icon-edit" slot="prepend"></i>
                    <i class="u-icon-edit" slot="append"></i>
                </u-input>
            </div>
            <div class="form_content">
                <u-input placeholder="最多输入10个字" v-model="form.name" maxlength="10" showBorder showWordLimi></u-input>
            </div>
            <div class="form_content">
                <u-input type="textarea" placeholder="请输入" v-model="form.Content" maxlength="505" showBorder showWordLimi></u-input>
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
    }
}
</script>