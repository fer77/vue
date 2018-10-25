<template>
  <div id="app">
    <p>Hover over <span data-tooltip="I'm a tooltip!!!">this</span></p>
    <p>And <span data-tooltip="I'm a tooltip!!!" data-tooltip-placement="right">this too</span></p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Tooltip from "tooltip.js";

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  mounted() {
    document.querySelectorAll('[data-tooltip]').forEach(elem => {
      new Tooltip(elem, {
        placement: elem.dataset.tooltipPlacement || 'top',
        title: elem.dataset.tooltip
      });
    });
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
.tooltip {
  color: white;
  background-color: black;
  padding: 10px;
  border-radius: 15px;
}
</style>
// NOTES

/*
.dataset provides read/write access to all the custom data attributes (data-*) set on the element. This access is available both in HTML and within the DOM...(https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
 */