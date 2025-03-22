<template>
  <div class="cesium-demos">
    <h2>Cesium 示例</h2>
    <div class="demo-list">
      <div v-for="demo in demos" :key="demo.path" class="demo-item">
        <h3>{{ demo.title }}</h3>
        <p>{{ demo.description }}</p>
        <el-button type="primary" @click="viewDemo(demo.path)">查看示例</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const demos = ref([
  {
    title: '地球场景',
    description: '展示Cesium的基本地球场景和控制',
    path: '/cesium/earth-scene'
  }
  // 后续添加更多示例
])

const viewDemo = (path) => {
  // 实现示例查看逻辑
  console.log('查看示例:', path)
}
</script>

<style scoped>
.cesium-demos {
  padding: 20px;
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.demo-item:hover {
  background-color: #f5f7fa;
}

.demo-item h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.demo-item p {
  color: #666;
  margin-bottom: 15px;
}
</style>