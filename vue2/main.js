Vue.component('progress-view', {
  data() {
    return { completionRate: 10 };
  }
});

var app = new Vue({
  el: '#root'
});