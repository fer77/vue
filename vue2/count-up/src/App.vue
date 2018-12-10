<template>
  <div id="app">
      <p>Scroll down &darr;</p>
      <div class="container">
        <div class="col-1-3">
          <CountUp :to="105" />
        </div>
        <div class="col-1-3">
          <CountUp :to="55" />
        </div>
        <div class="col-1-3">
          <CountUp :to="5" />
        </div>
      </div>
  </div>
</template>

<script>
import CountUp from './components/CountUp.vue'

export default {
  name: 'app',
  components: {
    CountUp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  /* for demonstration purposes only */
  margin-top: 1500px;
  margin-bottom: 500px;
}
.col-1-3 {
  display: inline-block;
  width: 32.3%;
}
</style>
