<template>
    <div class="u-switch" :class="{'is-checked': checked }">
        <span :class="['u-switch-label label_left', !checked ? 'is-active' : '']" v-if="inactiveText">
            <span>{{ inactiveText }}</span>
        </span>
        <input :disabled="disabled" class="u-switch_input" type="checkbox" ref="input" @change="handleChange" />
        <span :class="['u-switch-label label_right', checked ? 'is-active' : '']" v-if="activeText">
            <span>{{ activeText }}</span>
        </span>
    </div>
</template>
<script>

export default {
    name: 'USwitch',   
    componentName: 'USwitch',
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
        value: {
            type: [Boolean, String, Number],
            default: false
        },
        activeText: String,
        inactiveText: String,
        disabled: Boolean,
    },
    computed: {
        checked() {
            return this.value;
        },
    },
    watch: {
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.input.checked = this.value;
        });
    },
    methods: {   
        handleChange(){
            const val = this.$refs.input.checked
            this.$emit('input', val);
            this.$emit('change', val);
        },
    },
};
</script>