import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { gsap } from 'gsap';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  10, // Adjust the FOV value
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const directionalLight = new THREE.DirectionalLight(0x1499993, 0.6);
directionalLight.position.set(1, 1, 1); // Set the direction of the light
scene.add(directionalLight);

const material = new THREE.MeshStandardMaterial({
  color: 'purple',
  roughness: 1,
  metalness: 1,
  transparent: true, // Enable transparency
});

// Create a renderer
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const loader = new OBJLoader();
let object;

loader.load(
  '3d/TyrionLikenessSculpt.obj',
  function (loadedObject) {
    object = loadedObject;
    scene.add(object);
    renderer.render(scene, camera);
    animate(); // Call animate function once the object is loaded
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('Error loading OBJ file:', error);
  }
);

const ambientLight = new THREE.AmbientLight(0x111111, 0.6);
scene.add(ambientLight);

// Track mouse position
let mouseX = 0;
let windowHalfX = window.innerWidth / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the object based on the mouse position
  if (object) {
    gsap.to(object.rotation, {
      y: mouseX / windowHalfX,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  renderer.render(scene, camera);
}



