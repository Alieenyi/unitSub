<template>
    <transition name="tips" @after-leave="handleAfterLeave">
        <div class="tip-body" :class="isClass" v-if="visible">
            <div class="tip-box">
                <div v-html="content"></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "UToast",
    data() {
        return {
            content: '',
            time: 2000,
            visible: false,
            isClass:'',
            isClose:true,
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
        // this指向组件的实例。
        // $el指向当前组件的DOM元素。
        handleAfterLeave() {
            this.$destroy(true);                        //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
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
<style>
    .tip-body{ 
        width:100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3000;
    }
    .tip-box{   
        line-height: 0.42rem;
        padding: 0.36rem 0.54rem;
        background: rgba(0,0,0,.7);
        border-radius: 0.22rem; 
        color: #fff;
        font-size: 0.24rem;
        box-sizing: border-box;
        min-width: 2.8rem;
        max-width: 3.8rem;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);		/* IE 9 */
        -webkit-transform: translate(-50%,-50%);	/* Safari and Chrome */
        -o-transform: translate(-50%,-50%);	/* Opera */
        -moz-transform: translate(-50%,-50%);	/* Firefox */
    }
    .tip-enter-active{
        animation-name:zoomIn;animation-duration:.5s;
    }
    .tip-leave-active{
        animation-name:zoomOut;animation-duration:.5s;
    }
</style>
