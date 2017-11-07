Vue.component('modal', {
  template: `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="header"></slot>
        </p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot>Default text can go here and be replaced in the component's body later.</slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer">
          <button class="button">Sign Up</button>
        </slot>
      </footer>
    </div>
  </div>
  `
});

var app = new Vue({
  el: '#root'
});