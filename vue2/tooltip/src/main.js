import Vue from 'vue'
import App from './App.vue'
import Tooltip from "tooltip.js"

Vue.config.productionTip = false

Vue.directive('tooltip', {
  bind(elem, bindings) {
    new Tooltip(elem, {
      placement: bindings.arg || 'top',
      title: bindings.value
    });
  }
});

new Vue({
  render: h => h(App)
}).$mount('#app')
