<template>
<div>
    <h2>Counter is: {{ count }}</h2>
    <button @click="count += 1">Increment counter</button>
</div>
</template>

<script>
export default {
  data() {
      return { count: 0 }
  }
}
</script>
