<template>
  <div class="threejs-demos">
    <h2>Three.js 示例</h2>
    <div class="demo-list">
      <div v-for="demo in demos" :key="demo.path" class="demo-item">
        <h3>{{ demo.title }}</h3>
        <p>{{ demo.description }}</p>
        <el-button type="primary" @click="viewDemo(demo.path)">查看示例</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const demos = ref([
  {
    title: '基础场景',
    description: '展示Three.js的基本场景创建和渲染',
    path: '/threejs/basic-scene'
  },
  {
    title: '光线投射交互',
    description: '展示如何使用光线投射实现3D对象的选择和交互',
    path: '/threejs/raycaster-interaction'
  },
  {
    title: '粒子系统',
    description: '展示如何创建和控制大量粒子的动画效果',
    path: '/threejs/particle-system'
  }
])

const viewDemo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.threejs-demos {
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