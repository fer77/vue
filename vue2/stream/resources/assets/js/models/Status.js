class Status {
  static all(then) {
    return axios.get('/statuses')
    // anonymous function passed from the Home.vue will be triggered here once the promise has resolved.
        .then(({data}) => then(data));
  }
}

export default Status;
