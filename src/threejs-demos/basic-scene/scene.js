import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class BasicScene {
  constructor(container) {
    this.container = container
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.cube = null
    this.init()
  }

  init() {
    // 创建场景
    this.scene = new THREE.Scene()

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.container.appendChild(this.renderer.domElement)

    // 添加轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    // 创建立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    // 添加光源
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(1, 1, 1)
    this.scene.add(light)

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040)
    this.scene.add(ambientLight)

    // 开始动画
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    // 旋转立方体
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  handleResize = () => {
    if (this.camera && this.renderer && this.container) {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    }
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose()
    }
  }
}