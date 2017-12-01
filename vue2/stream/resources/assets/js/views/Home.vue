<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="status in statuses">
                    <div class="message-header">

                      <p>{{ status.user.name }} said...</p>

                      <p>{{ status.created_at | ago }}</p>

                    </div>
                    <div class="message-body" v-text="status.body"></div>
                </div>
                <!-- add to stream form -->
                <add-to-stream @completed="addStatus"></add-to-stream>
                <!-- @completed listens for the $emit event from AddToStrea -->
            </div>
        </div>
    </div>
</template>

<script>
  import moment from 'moment';
  import Status from '../models/Status';
  import AddToStream from '../components/AddToStream.vue';

  export default {
    components: { AddToStream },
      data() {
        return {
          statuses: []
        }
      },
      filters: {
        ago(date) {
          return moment(date).fromNow();
        }
      },
      created() {
        // passing an anonymous function to the all() method
        Status.all(statuses => this.statuses = statuses);
      },
      methods: {
        addStatus(status) {
          //unshift will prepend the status
          this.statuses.unshift(status);

          alert('Posted status successfully');

          window.scrollTo(0, 0);
        }
      }
  }
</script>
