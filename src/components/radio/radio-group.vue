<template>
    <div class="u-radio-group">
        <slot></slot>
    </div>
</template>
<script>

export default {
    name: 'URadioGroup',   
    componentName: 'URadioGroup',
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
        value: {},
    },
    computed: {
    },
    created() {
        this.$on('handleChange', value => {
            this.$emit('change', value);
        });
    },
    methods: {   
    },
};
</script>