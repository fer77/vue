import { mount } from 'vue-test-utils';
import expect from 'expect';
import CountDown from '../src/components/CountDown.vue';
import moment from 'moment'

describe('CountDown', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CountDown);
    });

    it('shows a count-down timer', () => {

        wrapper.seteProps({ until: moment().add(10, 'seconds') });
        //<countdown until="December 5 2017">

        see('10 Seconds');
    });

// Helper functions:
    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    };
    let type = (selector, text) => {
        let node =  wrapper.find(selector);
        node.element.value = text;
        node.trigger('input'); // triggers an input event so vue can detect it
    };
    let click = selector => {
        wrapper.find(selector).trigger('click');
    };
});