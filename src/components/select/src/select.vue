<template>
    <div class="u-select">
        <div class="u-select_inner" @click="handleClick">
            <slot name = "calendar"></slot>
            <div class="u-input">
                <input v-bind="$attrs" readonly="readonly" disabled type="text" v-model="selectedLabel">
            </div>
            <span class="icon-arrow-up-deep"></span>
        </div>
        <div class="u-select_dropdown" v-show="visible">
            <i class="ico"></i>
            <ul class="isScroll">                
                <slot></slot>
            </ul>
        </div>
        <div class="mask" v-if="visible" @click="handleClick"></div>
    </div>
</template>
<script>
    import Emitter from '@/utils/utils';
    export default {
        name: 'USelect',
        componentName: 'USelect',
        mixins: [Emitter],
        inheritAttrs: false, 
        props: {
            value: {},
            dataPick: Boolean,
            effect: String,
        },
        data() {
            return {               
                visible: false,
                optionvalue:'',
            }
        },  
        created() {
            this.$on('handleOptionClick', this.handleOptionSelect);
            this.$on('setSelected', this.setSelected);
        },
        
        computed: {
            selectedLabel() {
                return this.optionvalue
            },
        },
        mounted() {
        },
        methods: {
            handleClick() {    
                this.visible = !this.visible
                this.$store.dispatch("setMaskAct",this.visible);
            },
            
            handleOptionSelect(option, byClick) {
                this.optionvalue = option.value
                this.$emit('input', option.label) 
                if(byClick){
                    this.visible = false;
                    this.$store.dispatch("setMaskAct",this.visible);
                }
                    
            },
            setSelected(option) {
                this.optionvalue = option.value
                this.$emit('input', option.label) 
            },
        }
    };
</script>  