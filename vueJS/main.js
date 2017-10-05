Vue.component('message', {
  template: '<input v-model="message" @keyup.enter="storeMessage">',

  data: function() {
    return { message: '' };
  },

  methods: {
    storeMessage: function() {
      // console.log('Storing ' + this.message);

      newMessage.$emit('new-message', this.message);

      this.message = '';
    }
  }
});

var newMessage = new Vue();

new Vue({
	el: '#app',

  data: {
    messages: []
  },

  created: function () {
    newMessage.$on('new-message', this.sendNewMessage);
    newMessage.$on('new-message', this.handleNewMessage);
  },
    methods: {
    sendNewMessage: function(message) {
      console.log('Parent is handling ' + message);
    },
    handleNewMessage: function(message) {
      console.log('Parent handled the ' + message);
      this.messages.push(message);
    }
  }
  // events: {
    // 'new-message': function(message) {
    //   console.log('Parent is handling ' + message);
  //   }
  // }
});