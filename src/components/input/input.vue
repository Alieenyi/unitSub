<template>
    <div :class="[type === 'textarea' ? 'u-textarea' : 'u-input',
            {'is-suffix': getSuffixVisible()}]">
        <template v-if="type !== 'textarea'">
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
                <i v-if="showPwdVisible" class="u-input_icon" :class="'u-input_visual'+[passwordVisible?'':'un']" @click="handlePasswordVisible"></i>
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
            this.$emit('input', event.target.value);
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        //判断是否有后缀样式   显示清除符号、密码符号、字数。。。
        getSuffixVisible() {
            return this.showClear || this.showPassword || this.showWordLimi;
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
