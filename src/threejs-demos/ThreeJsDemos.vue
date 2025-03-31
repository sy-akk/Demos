<template>
  <div class="threejs-demos">
    <h2>Three.js 示例</h2>
    <div class="demo-container">
      <div class="demo-list">
        <div v-for="demo in demos" 
          :key="demo.path" 
          class="demo-item"
          :class="{ 'active': selectedDemo?.path === demo.path }"
          @click="selectDemo(demo)">
          <h3>{{ demo.title }}</h3>
          <p>{{ demo.description }}</p>
        </div>
      </div>
      <div class="demo-content">
        <router-view v-if="selectedDemo"></router-view>
        <div v-else class="empty-state">
          <p>请从左侧选择一个示例查看详情</p>
        </div>
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

const selectedDemo = ref(null)

const selectDemo = (demo) => {
  selectedDemo.value = demo
  router.push(demo.path)
}
</script>

<style scoped>
.threejs-demos {
  padding: 20px;
}

.demo-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  min-height: 500px;
}

.demo-list {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}

.demo-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-item:hover {
  background-color: #f5f7fa;
  transform: translateX(5px);
}

.demo-item.active {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.demo-item h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.demo-item p {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.demo-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
}

.demo-view {
  text-align: center;
}

.demo-view h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.demo-view p {
  color: #666;
  margin-bottom: 30px;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state p {
  color: #909399;
  font-size: 16px;
}
</style>