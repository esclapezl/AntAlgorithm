// load-3d.js
import * as THREE from 'three';

class Load3D {
    constructor(gl) {
        this.gl = gl;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, gl.canvas.width / gl.canvas.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: gl.canvas });
        this.treeMesh = null;
    }

    loadTexture(url) {
        return new Promise((resolve, reject) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(url, resolve, undefined, reject);
        });
    }

    createTreeMesh(texture, width, height) {
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.treeMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.treeMesh);
    }

    drawTree(x, y, width, height) {
        if (!this.treeMesh) return;

        this.treeMesh.position.set(x, y, 0);
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        this.renderer.render(this.scene, this.camera);
    }
}

export default Load3D;
