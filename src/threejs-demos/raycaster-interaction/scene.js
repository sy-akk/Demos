import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class RaycasterScene {
  constructor(container) {
    this.container = container
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf0f0f0)
    
    this.setupCamera()
    this.setupRenderer()
    this.setupControls()
    this.setupLights()
    this.setupObjects()
    this.setupRaycaster()
    
    this.animate()
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.container.appendChild(this.renderer.domElement)
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x404040)
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(ambientLight)
    this.scene.add(directionalLight)
  }

  setupObjects() {
    this.objects = []
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(geometry, material.clone())
      cube.position.x = (Math.random() - 0.5) * 8
      cube.position.y = (Math.random() - 0.5) * 8
      cube.position.z = (Math.random() - 0.5) * 8
      this.scene.add(cube)
      this.objects.push(cube)
    }
  }

  setupRaycaster() {
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.selectedObject = null

    this.container.addEventListener('mousemove', this.onMouseMove)
    this.container.addEventListener('click', this.onClick)
  }

  onMouseMove = (event) => {
    const rect = this.container.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1
  }

  onClick = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.objects)

    if (intersects.length > 0) {
      if (this.selectedObject) {
        this.selectedObject.material.emissive.setHex(0x000000)
      }
      this.selectedObject = intersects[0].object
      this.selectedObject.material.emissive.setHex(0xff0000)
    } else if (this.selectedObject) {
      this.selectedObject.material.emissive.setHex(0x000000)
      this.selectedObject = null
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.objects)

    this.objects.forEach(object => {
      object.material.emissive.setHex(0x000000)
    })

    if (intersects.length > 0 && intersects[0].object !== this.selectedObject) {
      intersects[0].object.material.emissive.setHex(0x666666)
    }

    if (this.selectedObject) {
      this.selectedObject.material.emissive.setHex(0xff0000)
    }

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  handleResize = () => {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  dispose() {
    this.container.removeEventListener('mousemove', this.onMouseMove)
    this.container.removeEventListener('click', this.onClick)
    this.renderer.dispose()
  }
}