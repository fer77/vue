<template>
  <transition name="fade">
    <div
      v-bind:class="[activeClass, errorClass, successClass]"
      v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    data: function() {
      return {
        activeClass: 'Alert',
        errorClass: 'Alert--Info',
        successClass: 'Alert--Success',
        show: true
      }
    },
    mounted() {
      setTimeout(
        () => this.show = false,
        3000
      )
    }
  }
</script>

<style>
  .Alert {
    padding: 10px;
    position: relative;
  }
  .Alert--Info {
    background: #e3e3e3;
  }
  .Alert--Success {
    background: green;
    color: white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
