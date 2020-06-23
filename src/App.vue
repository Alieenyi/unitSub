<template>
	<div id="app">
        <transition name="page-switch">
            <router-view/>
        </transition>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>

</style>
