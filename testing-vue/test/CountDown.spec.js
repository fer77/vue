import { mount } from 'vue-test-utils';
import expect from 'expect';
import CountDown from '../src/components/CountDown.vue';
import moment from 'moment';
import sinon from 'sinon';

describe('CountDown', () => {
    let wrapper,
        clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();

        wrapper = mount(CountDown, {
            propsData: {
                until: moment().add(10, 'seconds')
            }
        });
    });

    afterEach(() => clock.restore);

    it('shows a countdown timer', () => {
        //<countdown until="December 5 2017">

        see('0 Days');
        see('0 Hours');
        see('0 Minutes');
        see('10 Seconds');
    });

    it('reduces the countdown every second', async () => {

        see('10 Seconds');

        clock.tick(1000);

        await wrapper.vm.$nextTick();// pause until the resolution of this returned promise.

        see('9 Seconds');// continue on...
    });

    it('displays an expired message when the countdown reaches 0', async () => {

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        see('Now Expired');
    });

    it('displays a custom expired message when the countdown reaches 0', async () => {
        wrapper.setProps({ expiredText: 'Countdown is over.' });

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        see('Countdown is over.');
    });

    it('broadcasts when the countdown is finished', async () => {
        wrapper.setProps({ until: moment().add(10, 'seconds') });

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().finished).toBeTruthy();
    });

    it('clears interval when completed', async () => {
        wrapper.setProps({ until: moment().add(10, 'seconds') });

        clock.tick(10000);

        // console.log(wrapper.vm.now.getSeconds());
        expect(wrapper.vm.now.getSeconds()).toBe(10);

        await wrapper.vm.$nextTick();

        clock.tick(5000);
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