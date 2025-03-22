<template>
  <div class="scene-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BasicScene } from './scene'

const container = ref(null)
let scene

onMounted(() => {
  scene = new BasicScene(container.value)
  window.addEventListener('resize', scene.handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', scene.handleResize)
  scene.dispose()
})
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: calc(100vh - 200px);
}
</style>