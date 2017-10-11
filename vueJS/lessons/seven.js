new Vue({
    el: '#app',
    data: {
        tasks: [
            { body: 'Got to store', completed: false },
            { body: 'Go to bank', completed: false },
            { body: 'Go to the doctor', completed: true }
        ]
    }
    // methods: {
    //     toggleDone: function (task) {
    //         task.completed = !task.completed;
    //     }
    // }
});