<template>
    <li @click="selectOptionClick" :class="{'selected': itemSelected === label}">
        <slot>
            <span>{{ value }}</span>
        </slot>
    </li>
</template>
<script>
    import Emitter from '@/utils/utils';
    export default {
        name: 'UOption',
        componentName: 'UOption',
        mixins: [Emitter],
        

        props: {
            value: {
                required: true
            },
            label: [String, Number],
        },

        data() {
            return {
                index: -1,
                visible: true,
            };
        },
        created() {
            this.init()
        },
        computed: {
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'USelect') {
                        parent = parent.$parent;
                    } else {
                        this.select = parent;
                        return true;
                    }
                }
                return false;
            },
            itemSelected: {
                get() {
                    if (this.isGroup) {
                        return this.select.value
                    }else{
                        return this.value
                    }
                },
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('USelect', 'setSelected', [this]);
                    }
                }
            },
        },

        methods: {        
            init(){
                if(this.isGroup&&this.label===this.itemSelected)
                    this.dispatch('USelect', 'setSelected', [this]);
            },
            selectOptionClick() {
                this.dispatch('USelect', 'handleOptionClick', [this,true]);
            },
            
        },
    };
</script>
