<template>
  <div>
      <!-- enter a new reminder -->
      <input class="new-reminder" v-model="newReminder">
      <!-- add the new reminder to the list -->
      <button @click="add">Add Reminder</button>

      <ul v-if="reminders.length">
          <li v-for="reminder in reminders" :key="reminder">
              {{ reminder }}

              <button class="remove" @click="remove(reminder)">Remove</button>
          </li>
      </ul>
  </div>
</template>

<<script>
export default {
  data() {
      return {
          newReminder: '',
          reminders: []
      };
  },

  methods: {
      add() {
        //  add the new reminder to the list
          this.reminders.push(this.newReminder);

        // clear the input
          this.newReminder = '';
      },

      remove(reminder) {
          this.reminders.splice(reminder, 1);
      }
  }
}
</script>
