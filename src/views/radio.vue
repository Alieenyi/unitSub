<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">单选</div>
            <div class="form_content">
                <u-radio v-model="radio" label="1">备选项</u-radio>
                <u-radio v-model="radio" label="2">备选项2</u-radio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            radio:'1'
        }
    },
    methods:{
    }
}
</script>