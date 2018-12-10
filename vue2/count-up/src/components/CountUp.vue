<template>
<span v-text="count"></span>
</template>

<script>
import inView from 'in-viewport';

export default {
  name: 'CountUp',
  props: ['to'],
  data() {
    return {
      count: 0,
      interval: null,
    }
  },
  computed: {
    increment() {
      return Math.ceil(this.to / 10);
    }
  },
  mounted() {
    inView(this.$el, () => {
      this.interval = setInterval(this.tick, 200);
    });
  },
  methods: {
    tick() {
      if (this.count + this.increment >= this.to) {
        this.count = this.to;
        return clearInterval(this.interval);
      }

      return (this.count += this.increment);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
