import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/threejs'
    },
    {
      path: '/threejs',
      component: () => import('../threejs-demos/ThreeJsDemos.vue'),
      meta: { title: 'Three.js 示例' },
      children: [
        {
          path: 'basic-scene',
          component: () => import('../threejs-demos/basic-scene/index.vue'),
          meta: { title: 'Three.js 基础场景' }
        },
        {
          path: 'raycaster-interaction',
          component: () => import('../threejs-demos/raycaster-interaction/index.vue'),
          meta: { title: 'Three.js 光线投射交互' }
        },
        {
          path: 'particle-system',
          component: () => import('../threejs-demos/particle-system/index.vue'),
          meta: { title: 'Three.js 粒子系统' }
        }
      ]
    },
    {
      path: '/cesium',
      component: () => import('../cesium-demos/CesiumDemos.vue'),
      meta: { title: 'Cesium 示例' }
    },
    {
      path: '/vue',
      component: () => import('../vue-demos/VueDemos.vue'),
      meta: { title: 'Vue 示例' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '示例集合'
  next()
})

export default router