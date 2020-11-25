<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">按钮</div>
            <div class="form_content">
                <u-button @click.native="handleClick">默认按钮</u-button>
                <!-- 改变button的样式，可以通过改变type来达到添加class从而更改样式 -->
                <u-button type="primary">主要按钮</u-button>   
            </div>
            <div class="form_content">
                <u-button automatic>自适应内容的按钮</u-button> 
            </div>
            <div class="form_content">
                <u-button round>圆角按钮</u-button>
            </div>
            <div class="form_content">
                <u-button icon="u-icon-edit" circle></u-button>
                <u-button>上传<i class="u-icon-edit u-icon--right"></i></u-button>
            </div>
            <div class="form_content">
                <u-button disabled>禁用按钮</u-button>
            </div>
            <div class="form_content">
                <u-button type="text">文字按钮</u-button>
            </div>
            <div class="form_content">
                <u-button-group>
                    <u-button type="primary">默认按钮</u-button>
                    <u-button type="primary">默认按钮</u-button>
                </u-button-group>
            </div>
            <div class="form_content">
                <u-button type="primary" :loading="true">加载中</u-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        handleClick(){
            console.log("aaaaaa")
        }
    }
}
</script>