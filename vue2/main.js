window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }
  fire(event, data = null) {
    this.vue.$emit(event, data);
  }
  listen(event, callback) {
    this.vue.$on(event, callback);
  }
}

Vue.component('coupon', {
  template: `<input placeholder="Enter coupon code" @blur="onCouponApplied" />`,
  methods: {
    onCouponApplied() {
      Event.fire('applied');
    }
  }
});

var app = new Vue({
  el: '#root',
  data: {
    couponApplied: false
  },
  // methods: {
  //   onCouponApplied() {
  //     this.couponApplied = true;
  //   }
  // }
  created() {
    Event.listen('applied', () => alert('Handling it!'));
  }
});