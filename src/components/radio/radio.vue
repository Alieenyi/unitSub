<template>
    <label :class="['u-radio',{'is-checked': model === label,'is-disabled': disabled}]">
        <span class="u-radio_input">
            <span class="u-radio_inner"></span>
            <input class="u-radio_original" :disabled="disabled" type="radio" :value="label" v-model="model" @change="handleChange">
        </span>
        <span class="u-radio_label">
            <slot></slot>
        </span>
    </label>
</template>
<script>
import Emitter from '@/utils/utils';

export default {
    name: 'URadio',   
    componentName: 'URadio',
    /**
     * inheritAttrs默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，<div class="u-input">
     * inheritAttrs: false 组件的根元素不会继承特性设置,但是class属性会继承<div class="u-input" placeholder="最多输入10个字" maxlength="10">
     */
    inheritAttrs: false,   
    mixins: [Emitter],         
    data() {
        return {
        };
    },    
    props: {
        value: {},
        label: {},
        disabled: Boolean,
    },
    computed: {
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'URadioGroup') {
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set(val) {
                if (this.isGroup) {
                    this.dispatch('URadioGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
            }
        },
    },
    methods: {   
        handleChange(event){
            this.$emit('change', event.target.value);
            this.isGroup && this.dispatch('URadioGroup', 'handleChange', [event.target.value]);
        },
    },
};
</script>
