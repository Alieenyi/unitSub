<template>
    <div class="view">
        <div class="m-form_item">
            <div class="label">开关</div>
            <div class="form_content">
                <u-switch v-model="value" @change="handleChange"></u-switch>
            </div>
            <div class="form_content">
                <u-switch v-model="value2" disabled></u-switch>
            </div>
            <div class="form_content">
                <u-switch v-model="value3" active-text="按月付费" inactive-text="按年付费"></u-switch>
            </div>
        </div>
    </div>
</template>
<script>
export default {          
    data() {
        return {
            value: true,
            value2: true,
            value3: false,
        };
    },   
    methods: {   
        handleChange(val){
            console.log(val,"11111aaaa")
        },
    },
};
</script>