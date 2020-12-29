<template>
    <transition name="topfade" @after-leave="handleAfterLeave">
        <div class="notify-body" :class="isClass" v-if="visible">
            <div class="notify-box">
                <i v-if="icon" :class="'u-icon-' + icon"></i>
                <div class="notify-txt" v-html="content"></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "UNotify",
    data() {
        return {
            content: '',
            time: 2000,
            visible: false,
            isClass:'',
            isClose:true,
            icon:''
        }
    },
    watch:{
        isClose(newVal,oldVal){
            if(newVal){
                this.close()
            }
        }, 
    },
    mounted() {
        if(this.isClose){
            this.close()
        }
    },
    methods: {
        handleAfterLeave() {
            this.$destroy(true);                       
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            window.setTimeout(() =>{
                this.visible = false
            }, this.time);
        }
    }
}
</script>
<style lang="scss" scoped>
.notify-body{ 
    width:100%; height:100%;
    position: fixed;
    top: 0; left: 0;
    z-index: 3000;
    .notify-box{   
        width: 6.86rem;
        min-height: 1.2rem;
        background: #fff;
        border-radius: .4rem;
        box-shadow: 0 0 .5rem rgba($color: #3B64A8, $alpha: .15);
        position: absolute;
        top: .32rem;
        left: 50%;
        transform: translateX(-50%);
        line-height: 0.48rem;
        color: #333333;
        font-size: 0.32rem;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    } 
}
[class^="u-icon-"], [class*=" u-icon-"] {
    width: .48rem; height: .48rem;
    margin-right: .2rem;
}
.u-icon-success{
    background: url(./../../assets/img/success.png) no-repeat 0 center;
    background-size: 100%;

}
</style>
