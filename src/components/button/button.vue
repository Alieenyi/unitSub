<template>
    <button class="u-button" type="button" :disabled="disabled || loading"
        @click="handleClick"
        :class="[
            type ? 'u-button_' + type : '',
            {
                'is-automatic': automatic,
                'is-round': round,
                'is-circle': circle,
                'is-disabled': disabled,
                'is-loading': loading,
            }
        ]">
            <i class="u-icon-loading" v-if="loading"></i>
            <i class="u-button_icon" :class="icon" v-if="icon && !loading"></i>
            <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>
<script>

export default {
    name: 'UButton',   
    componentName: 'UButton',
    /**
     * inheritAttrs默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，<div class="u-input">
     * inheritAttrs: false 组件的根元素不会继承特性设置,但是class属性会继承<div class="u-input" placeholder="最多输入10个字" maxlength="10">
     */
    inheritAttrs: false,            
    data() {
        return {
        };
    },    
    props: {
        type: {
            type: String,
            default: 'default'
        },
        icon: String,
        automatic: Boolean,
        round: Boolean,
        circle: Boolean,
        disabled: Boolean,
        loading: Boolean,
    },
    computed: {
    },
    methods: {        
        handleClick(){

        },
    },
};
</script>
