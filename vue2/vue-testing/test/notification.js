import Vue from 'vue/dist/vue.js';
import test from 'ava';
import Notification from '../src/Notification';

let vm;

test.beforeEach(t => {
    // extend Vue and its Notification component, that way it can be its own constructor:
    let N = Vue.extend(Notification);
    
    // new up that vue instance and explicitly pass any properties that it requires:
    vm = new N({ propsData: {
        message: 'Foobar'
    }}).$mount(); // $mount and compile.
})

test('that it renders a notification', t => {
    // assert that textContent is equal to 'Foobar':
    t.is(vm.$el.textContent, 'FOOBAR');
});

test('that it computes the notification', t => {
    t.is(vm.notification, 'FOOBAR');
});