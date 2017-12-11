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

    it('increments the count when an increment button is clicked', () => {

        // before:
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('.increment').trigger('click');

        // after:
        expect(wrapper.vm.count).toBe(1);
    });

    it('decrements the count when an decrement button is clicked', () => {

        wrapper.setData({ count: 5 })

        wrapper.find('.decrement').trigger('click'); // 4

        // after:
        expect(wrapper.vm.count).toBe(4);
    });

    it.only('never goes below 0', () => {
        expect(wrapper.vm.count).toBe(0);

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(true);

        wrapper.setData({ count: 1 });

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(false);
    });

    it('presents the current count', () => {

        // execute a click to test
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });
});