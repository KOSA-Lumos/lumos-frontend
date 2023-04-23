<template>
  <div>
    <button @click="showModal = true">Show Modal</button>
    <div to="body">
      <div v-if="showModal" class="modal">
        <h2>Modal Title</h2>
        <p>Modal Content</p>
        <button @click="showModal = false">Close Modal</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showModal = ref(false)

    return {
      showModal
    }
  }
}
</script>


<style>
</style>
