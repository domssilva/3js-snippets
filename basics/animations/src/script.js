import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6)
const material = new THREE.MeshBasicMaterial({ color: 'purple' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sphereGeo = new THREE.SphereGeometry(0.3, 100)
const sphereMa = new THREE.MeshBasicMaterial({ color: 'yellow' })
const spheremesh = new THREE.Mesh(sphereGeo, sphereMa)
//scene.add(spheremesh)

// Sizes
const sizes = {
    width: 420,
    height: 400
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
// WHY? PRESERVE THE SAME SPEED ON DIFFERENT DEVICES REGARDLESS OF THE FRAMRATE
const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 3, delay: 1, z: 2 })

// Animations
function animationFrameLoop(timestamp) {
    /*
    // demonstration of manual animations (we're gonna rely on GSAP)
    const elapsedTime = clock.getElapsedTime()
    spheremesh.position.y = Math.sin(elapsedTime)
    spheremesh.position.x = Math.cos(elapsedTime)

    camera.position.y = Math.sin(elapsedTime)
    camera.position.x = Math.cos(elapsedTime)
    camera.lookAt(mesh.position)
    
    mesh.rotation.y = elapsedTime * Math.PI * 0.3
    mesh.rotation.x = elapsedTime * Math.PI * -0.3 
    */

    // Renderer
    renderer.render(scene, camera) // this is all we really need for now
    window.requestAnimationFrame(animationFrameLoop)
}
animationFrameLoop()