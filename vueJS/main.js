const FetchesUser = {
	methods: {
		fetchUser() {
			alert('fetch the user');
		}
	}
};

new Vue ({
	el: '#app',

	mixins: [FetchesUser],
	mounted() {
		this.fetchUser();
	}
});
