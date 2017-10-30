Vue.component('task', {
  template: '<li><slot></slot></li>'
});
var app = new Vue({
  el: '#root'
});
