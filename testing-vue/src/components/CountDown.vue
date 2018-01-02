<template>
    <div>
        <div v-show="!finished">
            <span>{{ remaining.days() }} Days, </span>
            <span>{{ remaining.hours() }} Hours, </span>
            <span>{{ remaining.minutes() }} Minutes, </span>
            <span>{{ remaining.seconds() }} Seconds </span>
            left...
        </div>
        <div v-show="finished" v-text="expiredText"></div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        props: {
            until: null,
            expiredText: { default: 'Now Expired' }
        },

        data() {
            return { now: new Date(), interval: null };
        },

        computed: {
            finished() {
                return this.remaining <= 0;
            },

            remaining() {
                let remaining = moment.duration(Date.parse(this.until) - this.now);// Depends on the time the test is run.  Needs to be reset to a common value everytime.

                if(remaining <= 0) {
                    this.$emit('finished');
                }

                return remaining;
            }
        },

        created() {
            this.interval = setInterval(() => {
                this.now = new Date();// every second this.now will change, re-evaluate remaining() and update the DOM
            }, 1000);

            this.$on('finished', () => clearInterval(this.interval));
        }, 
        destroyed() {
            clearInterval(this.interval);
        }
    }
</script>
