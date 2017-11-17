import Vue from 'vue';
import axios from 'axios';
import Form from './core/Form';

import Example from './components/Example';

// Since we'll want to reference these two in other files as 'new Form':
window.axios = axios;
window.Form = Form;

new Vue({
    el: '#app',
    components: {
    	Example // <example></example>
    },
    data: {
        form: new Form({
            name: '',
            description: ''
        })
    },

    methods: {
        onSubmit() {
            this.form.post('/projects')
                .then(response => alert('Wahoo!'));
        }
    }
});