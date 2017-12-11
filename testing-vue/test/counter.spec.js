import { mount } from 'vue-test-utils'; // this will mount the component in isolation, mocking all the inputs
import Counter from '../src/components/Counter.vue';
import expect from 'expect';

// 'describe' comes from Mocha
describe ('Counter', () => {
    let wrapper; // literally a 'wrapper'

    // before each test the wrapper will be refreshed
    beforeEach(() => {
        wrapper = mount(Counter);
    });

    // what does a counter do?
    it ('defaults to a count of 0', () => {

        expect(wrapper.vm.count).toBe(0);
    });

    it('increments the count when the button is clicked', () => {

        // before:
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('button').trigger('click');

        // after:
        expect(wrapper.vm.count).toBe(1);
    });

    it('presents the current count', () => {

        // execute a click to test
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });
});