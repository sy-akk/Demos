import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ParticleScene {
  constructor(container) {
    this.container = container
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)
    
    this.setupCamera()
    this.setupRenderer()
    this.setupControls()
    this.setupParticles()
    
    this.animate()
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    )
    this.camera.position.z = 50
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.container.appendChild(this.renderer.domElement)
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  }

  setupParticles() {
    const geometry = new THREE.BufferGeometry()
    const particleCount = 5000

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100
      positions[i + 1] = (Math.random() - 0.5) * 100
      positions[i + 2] = (Math.random() - 0.5) * 100

      color.setHSL(Math.random(), 1.0, 0.5)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })

    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    const time = Date.now() * 0.001

    this.particles.rotation.x = time * 0.1
    this.particles.rotation.y = time * 0.2

    const positions = this.particles.geometry.attributes.position.array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i]) * 0.01
    }

    this.particles.geometry.attributes.position.needsUpdate = true

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  handleResize = () => {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  dispose() {
    this.renderer.dispose()
  }
}