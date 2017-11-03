Vue.component('coupon', {
  template: `<input placeholder="Enter coupon code" @blur="onCouponApplied" />`,
  methods: {
    onCouponApplied() {
      this.$emit('applied');
    }
  }
});

var app = new Vue({
  el: '#root',
  data: {
    couponApplied: false
  },
  methods: {
    onCouponApplied() {
      this.couponApplied = true;
    }
  }
});
