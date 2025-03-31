<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <h1>示例集合</h1>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/threejs">Three.js 示例</el-menu-item>
        <el-menu-item index="/vue">Vue 示例</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="app-footer">
      <p>© 2024 示例集合. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<script setup>
// 组件逻辑
</script>

<style>
.app-container {
  min-height: 100vh;
}

.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  padding: 10px 0;
  font-size: 24px;
}

.app-footer {
  text-align: center;
  background-color: #f5f7fa;
  padding: 20px 0;
}
</style>