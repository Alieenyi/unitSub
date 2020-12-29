<template>
    <div :class="[type === 'textarea' ? 'u-textarea' : 'u-input',
            {'is-border': showBorder},
            {'is-center': center},
            {'is-prefix': getPrefixVisible()},
            {'is-suffix': getSuffixVisible()}]">
        <template v-if="type !== 'textarea'">
            <!-- 前置内容 -->
            <span class="u-input_prefix" v-if="getPrefixVisible()">
                <i v-if="showPwdVisible" class="u-input_icon" :class="'u-input_visual'+[passwordVisible?'':'un']" @click="handlePasswordVisible"></i>
            </span>
            <!-- 前置元素 -->
            <div class="u-input-group_prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input v-bind="$attrs" :value="nativeInputValue" ref="input"
                :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
                @compositionstart="handleCompositionStart"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @change="handleChange"                
                @focus="handleFocus"
                @blur="handleBlur"
            >
            <!-- 后置内容 -->
            <span class="u-input_suffix" v-if="getSuffixVisible()">
                <i v-if="showClear" class="u-input_icon u-input_clear" @click="clear"></i>
            </span>
            <!-- 后置元素 -->
            <div class="u-input-group_append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea v-bind="$attrs" v-if="type === 'textarea'" :value="nativeInputValue" ref="textarea"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
            @input="handleInput"
            @change="handleChange"            
            @focus="handleFocus"
            @blur="handleBlur"
            >
        </textarea>
        
        <span class="note" v-if="showWordLimi"><i>{{textLength}}</i>/{{$attrs.maxlength}}</span>
    </div>
</template>
<script>

export default {
    name: 'UInput',   
    componentName: 'UInput',
    /**
     * inheritAttrs默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，<div class="u-input">
     * inheritAttrs: false 组件的根元素不会继承特性设置,但是class属性会继承<div class="u-input" placeholder="最多输入10个字" maxlength="10">
     */
    inheritAttrs: false,            
    data() {
        return {
            isComposing: false,            
            focused: false,
            passwordVisible: false,             //可以切换密码是否可视
        };
    },    
    props: {
        value: [String, Number],
        type: {
            type: String,
            default: 'text'
        },        
        showBorder: Boolean,
        center: Boolean,                        //输入框文字居中
        clearable: Boolean,
        showPassword: Boolean,                  //可以切换密码是否可视
        showWordLimi:Boolean,
        disabled: Boolean,
        readonly: Boolean,
    },
    computed: {
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : this.value;
        },        
        textLength() {
            if (typeof this.value === 'number') {
                return String(this.value).length;
            }
            return (this.value || '').length;
        },
        //显示清除按钮
        showClear() {
            return this.clearable && !this.readonly && !this.disabled && this.nativeInputValue;
        },
        showPwdVisible(){
            return this.showPassword && !this.readonly && !this.disabled && this.nativeInputValue;
        },
    },
    methods: {        
        handleFocus(event) {
            this.focused = true;
        },        
        handleBlur(event) {
            this.focused = false;
        },
        /**
         * 声明一个标记flag，在compositionstart、compositionend两个事件过程之间的时候flag值为false，在input事件中通过flag的值来判断当前输入的状态。
         * 控制输入拼音时计数
         */
        handleCompositionStart() {
            this.isComposing = true;
        },
        handleCompositionEnd(event) {
            if (this.isComposing) {
                this.isComposing = false;
                this.handleInput(event);
            }
        },
        handleInput(event) {
            if (this.isComposing) return;
            if (event.target.value === this.nativeInputValue) return;
            if(this.type == "phone"){
                const input = event.target;
                let phoneNum = input.value.replace(/\s*/g,'');		//去除所有空格
                // let nowVal = input.value.replace(/[^\d\s]/g,'')	//只能输入数字与空格    不能直接复制会导致光标自动末尾
                // input.value = input.value.replace(/[^\d\s]/g,'')	//只能输入数字与空格
                let pos = 0
                let isDelSpace = false

                let org_len = this.nativeInputValue.length
                let now_len = input.value.length

                if(org_len>now_len){                //删除
                    pos = input.selectionEnd
                    if(pos == 3 || pos == 8){
                        isDelSpace = true
                        let list = phoneNum.split('')
                        let ind = pos==8?6:2
                        list.splice(ind,1);
                        phoneNum = list.join('')
                    }
                }else{
                    pos = input.selectionEnd
                    if(pos==4 || pos==9) pos = pos+1
                }
                input.value = this.ruleTel(phoneNum).replace(/[^\d\s]/g,'');  

                if(input.setSelectionRange){  
                    setTimeout(function() {
                        input.focus();
                        if(isDelSpace) pos = pos-1
                        input.setSelectionRange(pos,pos)
                    }, 0);
                }

                // if(!event.data){             //安卓不支持
                //     pos = input.selectionEnd
                //     if(pos == 3 || pos == 8){
                //         isDelSpace = true
                //         let list = phoneNum.split('')
                //         let ind = pos==8?6:2
                //         list.splice(ind,1);
                //         phoneNum = list.join('')
                //     }
                // }else{
                //     pos = input.selectionEnd
                //     if(pos==4 || pos==9) pos = pos+1
                // }
                // input.value = this.ruleTel(phoneNum);    
                // if(event.data != "undefined" &&pos>0 && input.setSelectionRange){
                //     input.focus();
                //     if(isDelSpace) pos = pos-1
                //     input.setSelectionRange(pos,pos)
                // }
            }
            if(this.type == "num"){
                const input = event.target;
                input.value = input.value.replace(/[^\d\s]/g,'');  

            }
            this.$emit('input', event.target.value);
        },
        
        ruleTel(phoneNum){
            let telVal = new Array(3)
            telVal[0] = phoneNum.slice(0,3)
            telVal[1] = phoneNum.slice(3,7)
            telVal[2] = phoneNum.slice(7,11)
            let _phone= telVal[0]
            if(telVal[1])
                _phone += " "+telVal[1]
            if(telVal[2])
                _phone += " "+telVal[2]

            return _phone;    
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        //判断是否有后缀样式   显示清除符号、密码符号、字数。。。
        getSuffixVisible() {
            return this.showClear || this.showWordLimi;
        },
        //判断是否有前置样式   显示清除符号、密码符号、字数。。。
        getPrefixVisible(){
            return this.showPassword;
        },
        //清除
        clear(){
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
        },
        //密码是否可视
        handlePasswordVisible(){
            this.passwordVisible = !this.passwordVisible;
        },
    },
};
</script>
<style lang="scss" scoped>
.u-input,.u-textarea{
    position: relative;
    width: 100%; 
    background: #F3F5F7;
    &.is-border {
        border: 1px solid #e0e0e0;
        background: #fff;
    }
}
.u-input{
    height: .8rem;
    border-radius: .8rem;
    padding: 0 .4rem;
    display: table;
    input{        
        font-size: .3rem;  
        width: 100%; height: 100%;
        caret-color: #409EFF;
        display: table-cell;
        float: left;
        &:-webkit-autofill{
            box-shadow: 0 0 0px 1000px #F3F5F7 inset;
        }
    }
    .u-input-group_prepend,.u-input-group_append{
        height: 100%;
        display: table-cell;
        vertical-align: middle;
    }
    .u-input-group_prepend{ 
        padding-right: .3rem;
    }
    .u-input-group_append{ 
        padding-left: .3rem;
    }
}
.u-textarea{
    height: 4.04rem;
    border-radius: .4rem;
    vertical-align: bottom;
    padding: .3rem .4rem .5rem;
    textarea{   
        font-size: .3rem;  
        line-height: .4rem;
        width: 100%; height: 100%;
    }
}
.u-input .note,.u-textarea .note{
    position: absolute; right: .4rem; bottom: 0;
    color:#ccc;
    font-size: .3rem; line-height: .78rem; 
    i{
        color: #409EFF;
    }
}

.u-input_prefix{
    position: absolute; left: .4rem; top: 0;
    height: 100%;
    .u-input_icon{
        float: left;
    }    
    .u-input_visual{
        background: url(./../../assets/img/ico_visual.png) no-repeat center center;
        background-size: 50%;
        width: .72rem; height: 100%;
    }
    .u-input_visualun{
        background: url(./../../assets/img/ico_visualun.png) no-repeat center center;
        background-size: 50%;
        width: .72rem; height: 100%;
    }
}
.u-input_suffix{
    position: absolute; right: .4rem; top: 0;
    height: 100%;
    .u-input_icon{
        float: left;
        margin-left: .4rem;
    }
    .u-input_clear{
        background: url(./../../assets/img/ico_close_tag.png) no-repeat center center;
        background-size: 100%;
        width: .32rem; height: 100%;
    }
}
.u-input.is-limi{
    padding-right: 1.2rem;
}
.u-input.is-suffix{
    padding-right: 1.2rem;
}
.u-input.is-prefix{
    padding-left: 1.2rem;
}
.u-input.is-center{
    input{
        text-align: center;
    }
    &.is-prefix{
        padding-right: 1.2rem;
    }
    &.is-suffix{
        padding-left: 1.2rem;
    }
}
</style>