<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">多选</div>
            <div class="form_content">
                <u-checkbox v-model="checked">备选项</u-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            checked: true
        }
    },
    methods:{
    }
}
</script>