import VueRouter from 'vue-router';

let routes = [
	{
		// a single route can define multiple named components
		// which will be rendered into <router-view>s with corresponding names.
		path: '/',
		component: require('./views/Home')
	},
	{
		path: '/about',
		component: require('./views/About')
	},
	{
		path: '/contact',
		component: require('./views/Contact')
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active'
});