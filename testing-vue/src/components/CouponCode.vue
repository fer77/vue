<template>
  <div>
      <input type="text" class="coupon-code" v-model="code" @input="validate">

      <p v-text="feedback"></p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            coupons: [
                // just for the demo, do not store codes here
                {
                    code: '50OFF',
                    message: '50% off!',
                    discount: 50
                },
                {
                    code: 'FREE',
                    message: '100% off, it\'s FREE!',
                    discount: 100
                },
            ],
            valid: false
        };
    },

    computed: {
        selectedCoupon() {
            return this.coupons.find(coupon => coupon.code == this.code)
        },
        message() {
            return this.selectedCoupon.message;
        },
        
        feedback() {
            if(this.valid) {
                return 'Coupon Redeemed: ' + this.message;
            }

            return 'Invalid coupon code';
        }
    },

    methods: {
        validate() {
            this.valid = !! this.selectedCoupon;

            if(this.valid) {
                this.$emit('applied', this.selectedCoupon.discount);
            }
        }
    }
}
</script>
