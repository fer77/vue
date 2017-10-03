Vue.component('tasks', {
    props: ['list'],
    template: '#tasks-template',
    computed: {
        remaining: function () {
            return this.list.filter(this.inProgress).length;
        }
    },
    methods: {
        isCompleted: function (task) {
            return task.completed;
        },
        inProgress: function (task) {
            return !task.completed;
        },
        deleteTask: function (task) {
            this.list.$remove(task);
        },
        clearCompleted: function () {
            this.list = this.list.filter(this.inProgress);
        }
    }
});
  
new Vue({
    el: '#app',
    data: {
        tasks: [
            { body: 'Got to store', completed: false },
            { body: 'Go to bank', completed: false },
            { body: 'Go to the doctor', completed: true }
        ]
    }
});