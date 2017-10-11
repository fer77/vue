Vue.component('message', {  });

var store = {
  username: 'Bob Belcher'
};

new Vue({
	el: '#app',
	data: store,
	components: {
		notification: {
			data: function() {
				return store;
			},
			template: '<h2>{{ username }}: <slot></slot></h2>'
		}
	}
});