import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',                                   
			name: 'index',
			component: () => import('@/views/index')
		},
		{
			path: '/button',                                   
			name: 'button',
			component: () => import('@/views/button')
		},
		{
			path: '/radio',                                   
			name: 'radio',
			component: () => import('@/views/radio')
		},
	]
})
