<template>
  <div>
    <div>counter: {{ counter }}</div>
    <button @click="counter += 1"></button>
  </div>
</template>
<script>
export default {
  data: () => ({
    counter: 0
  })
}
</script>
