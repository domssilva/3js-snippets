import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.getElementById('webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: 460,
    height: 320
}


/**
 * Objects
 */
class Cube {
    constructor(side = 0.3) {
        this.side = side
        this.color = this.getRandomColor()
        this.build()
    }

    build() {
        this.geometry = new THREE.BoxGeometry(this.side, this.side, this.side)
        this.material = new THREE.MeshBasicMaterial({ color: this.color })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    getMesh() {
        this.setPosition(1, 1, 1)
        return this.mesh
    }

    getId() {
        return this.mesh.id
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z)
    }

    setRandomPosition() {
        this.setPosition(
            this.getRandomNumber(-3, 2.5),
            this.getRandomNumber(-3, 2.5),
            this.getRandomNumber(-3, 2.5)
        )
    }

    getRandomNumber(min, max, rounded = false) {
        const generatedNum = Math.random() * (max - min) + min
        return rounded ? Math.round(generatedNum) : generatedNum;
    }

    getRandomColor() {
        return "#" + ((1<<24)*Math.random() | 0).toString(16)
    }
}

class MeshesManager {
    constructor() {
        this.cubesList = []
    }

    generateCubes(amount) {
        for (let i = 0; i < amount; i++) {
            const cube = new Cube()
            const mesh = cube.getMesh()
            cube.setRandomPosition()
            
            this.cubesList.push(mesh)
        }
    }

    sceneAddCubes() {
        this.cubesList.map((mesh) => scene.add(mesh))
    }
}

// my experiments
const manager = new MeshesManager()
manager.generateCubes(15)
manager.sceneAddCubes()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)