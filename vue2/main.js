Vue.component('task-list', {
  template:
  `<div>
      <task v-for="task in tasks">{{ task.task }}</task>
    </div>`,
  
  data() {
    return {
      tasks: [
        { task: 'go to store', complete: true },
        { task: 'pay bills', complete: false },
        { task: 'go to bank', complete: false },
        { task: 'some other task', complete: false },
        { task: 'some other task 2', complete: true },
      ]
    }
  }
});

Vue.component('task', {
  template: '<li><slot></slot></li>'
});

var app = new Vue({
  el: '#root'
});
