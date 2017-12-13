import { mount } from 'vue-test-utils';
import expect from 'expect';
import CouponCode from '../src/components/CouponCode.vue'

describe('CouponCode', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);

        wrapper.setData({
            coupons: [
                {
                    code: '50OFF',
                    message: '50% off!',
                    discount: 50
                }
            ]
        });
    });

    it('accepts a coupon code', () => {

        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it('validates a real coupon code', () => {

        enterCouponCode('50OFF');

        expect(wrapper.html()).toContain('Coupon Redeemed: 50% off!');
    });

    it('validates a fake coupon code', () => {
        
        enterCouponCode('NOTREAL');

        expect(wrapper.html()).toContain('Invalid coupon code');
    });

    it('broadcasts the percentage sidcount when a valid code is entered', () => {
        
        // let couponCode = wrapper.find('input.coupon-code');
        
        // couponCode.element.value = '50OFF';
        // couponCode.trigger('input');

        // this is more readable, but ties you to the implementation. If at anytime things are renamed or changed this will need to be changed or it will fail.
        // wrapper.setData({
        //     code: '50OFF'
        // });

        // or create helper functions
        enterCouponCode('50OFF');

        wrapper.vm.validate();

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    });

    function enterCouponCode(code) {
        // find an input
        let couponCode = wrapper.find('input.coupon-code');
        
        // type in code
        couponCode.element.value = code;
        couponCode.trigger('input');
    }
});