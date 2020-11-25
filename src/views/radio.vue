<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">单选</div>
            <div class="form_content">
                <u-radio v-model="radio" label="1">备选项</u-radio>
                <u-radio v-model="radio" label="2">备选项2</u-radio>
            </div>
            <div class="form_content">
                <u-radio disabled v-model="radio1" label="1">备选项</u-radio>
                <u-radio disabled v-model="radio1" label="2">备选项2</u-radio>
            </div>
            <div class="form_content">
                <u-radio-group v-model="radio2" @change="handleChange">
                    <u-radio v-for="(item,index) in list2" :key="index" :label="item.label">{{item.value}}</u-radio>
                </u-radio-group>
            </div>
            <div class="form_content">
                <u-radio-group v-model="radio3">
                    <u-radio v-for="(item,index) in list3" :key="index" :label="item.label">{{item.value}}</u-radio>
                </u-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            radio:'1',
            radio1:'2',
            radio2:'1',
            list2:[
                {label:"1",value:"备选项"},
                {label:"2",value:"备选项2"},
            ],
            radio3:1,
            list3:[
                {label:1,value:"备选项"},
                {label:2,value:"备选项2"},
            ]
        }
    },
    methods:{
        handleChange(val){
            console.log(val)
        },
    }
}
</script>