/* import * as THREE from 'three';
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
} */








import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { gsap } from 'gsap';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increase the intensity to 1
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Increase the intensity to 0.8
scene.add(ambientLight);


const material = new THREE.MeshStandardMaterial({
  color: 'aliceblue',
  roughness: 1,
  metalness: 1,
  transparent: true,
});

// Create a renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const loader = new OBJLoader();
let object;
let stars;

loader.load(
  '3d/TyrionLikenessSculpt.obj',
  function (loadedObject) {
    object = loadedObject;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    scene.add(object);
    renderer.render(scene, camera);
    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('Error loading OBJ file:', error);
  }
);


// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000; // Adjust the number of stars as needed

const positions = [];
const sizes = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = -Math.random() * 10; // Negative z to appear behind the object

  positions.push(x, y, z);

  const size = Math.random() * 3; // Adjust the size range as needed
  sizes.push(size);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

// Create stars material

const starsMaterial = new THREE.PointsMaterial({
    color: 'aliceblue',
    size: 0.04, // Initial size, can be adjusted
    sizeAttenuation: true,
    transparent: true,
    depthTest: false, // Disable depth testing to prevent occlusion
    blending: THREE.AdditiveBlending, // Additive blending for a brighter appearance
    map: createCircleTexture(), // Use a circular texture for the stars
  });

  // Create a circular texture for the stars
function createCircleTexture() {
    const canvas = document.createElement('canvas');
    const size = 128; // Adjust the size of the texture as needed
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
  
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
  
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
  
    return new THREE.CanvasTexture(canvas);
  }


stars = new THREE.Points(starsGeometry, starsMaterial);
stars.renderOrder = -1; // Render stars first
scene.add(stars);

// Track mouse position
let mouseX = 0;
let windowHalfX = window.innerWidth / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;

  // Update stars based on mouse position
  if (stars) {
    gsap.to(stars.rotation, {
      y: mouseX /4 /  windowHalfX /4,
      duration: .8,
      ease: 'power2.out',
    });
  }
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

animate();


