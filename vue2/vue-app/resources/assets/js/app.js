
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
// new Vue({
//     el: '#one',
//     data: {
//     	shared: store
//     }
// });
Vue.component('coupon', {
    props: ['code'],
    template: `
    <input type="text" :value="code " @input="updateCode($event.target.value)" ref="input">
    `,
    data() {
        return {
            invalidCodes: ['all free', 'something else']
        }
    },
    methods: {
        updateCode(code) {
            // validation, stripping, 'sanitation' can be done here
            if ( this.invalidCodes.includes(code)) {
                alert('This coupon is no longer valid!!');
                this.$refs.input.value = code = '';
            }
            this.$emit('input', code);
        }
    }
});
new Vue({
    el: '#app',
    data: {
    	coupon: 'FREEBIE'
    }
});
