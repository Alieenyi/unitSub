<template>
    <div :class="['u-checkbox',{ 'is-checked': model }]">
        <span class="u-checkbox_input">
            <span class="u-checkbox_inner"></span>
            <input class="u-checkbox_original" type="checkbox">
        </span>
        <span class="u-checkbox_label">
            <slot></slot>
        </span>
    </div>
</template>
<script>
import Emitter from '@/utils/utils';

export default {
    name: 'UCheckbox',   
    componentName: 'UCheckbox',
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
    computed:{
        model: {
            get() {
                return this.value
            },

            set(val) {
                // if (this.isGroup) {
                //     this.isLimitExceeded = false;
                //     (this._checkboxGroup.min !== undefined &&
                //     val.length < this._checkboxGroup.min &&
                //     (this.isLimitExceeded = true));

                //     (this._checkboxGroup.max !== undefined &&
                //     val.length > this._checkboxGroup.max &&
                //     (this.isLimitExceeded = true));

                //     this.isLimitExceeded === false &&
                //     this.dispatch('ElCheckboxGroup', 'input', [val]);
                // } else {
                //     this.$emit('input', val);
                //     this.selfModel = val;
                // }
            }
        },
    }
}
</script>