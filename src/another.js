// Import the CSS file for styling (not related to Three.js, just for appearance)
import './style.css'

// Import the entire Three.js library
import * as THREE from 'three';

// Import OrbitControls (for rotating, zooming, and moving camera)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1️⃣ CREATE A SCENE (Like a virtual world where everything exists)
const scene = new THREE.Scene(); 

// 2️⃣ SET UP A CAMERA (Acts like a human eye to view the 3D scene)
const camera = new THREE.PerspectiveCamera(
    75,  // Field of View (How much we can see)
    window.innerWidth / window.innerHeight, // Aspect Ratio (Keeps the scene proportional)
    0.1, // Near clipping plane (Minimum distance objects can be seen)
    1000 // Far clipping plane (Maximum distance objects can be seen)
);

// 3️⃣ CREATE A RENDERER (The engine that draws everything on the screen)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), // Connects to the <canvas> element in HTML
    antialias: true // Smooths out edges for a better visual
});

// Set the quality and size of the rendered image
renderer.setPixelRatio(window.devicePixelRatio); // Makes the rendering sharper
renderer.setSize(window.innerWidth, window.innerHeight); // Set full screen size
camera.position.setZ(30); // Move the camera **backward** so we can see objects

// 4️⃣ CREATE A SHAPE (Torus - a donut shape)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100); // Torus shape

// 5️⃣ CREATE A MATERIAL (Defines how the torus looks)
const material = new THREE.MeshStandardMaterial({
   color: 'orange', // Set the torus color
   metalness: 0.6, // Adds metallic effect
   roughness: 0.2  // Smoothness (0 = mirror, 1 = fully rough)
});

// 6️⃣ COMBINE SHAPE AND MATERIAL (To create a final object)
const torus = new THREE.Mesh(geometry, material);
scene.add(torus); // Add torus to scene

// 7️⃣ ADD LIGHTING TO THE SCENE
const pointLight = new THREE.PointLight(0xffffff, 1); // White light, intensity 1
pointLight.position.set(10, 10, 10); // Light position
scene.add(pointLight); // Add point light to scene

const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft background light
scene.add(ambientLight); // Add ambient light to scene

// OPTIONAL: Visual helper to see the light source direction
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// 8️⃣ ADD ORBIT CONTROLS (Allows user to rotate & zoom using mouse)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Set to true if you want auto rotation

// 9️⃣ CREATE AN ANIMATION LOOP (To make the torus rotate & update controls)
function animate(){
   requestAnimationFrame(animate); // Keeps running this function forever

   torus.rotation.x += 0.01; // Rotate slightly on X-axis
   torus.rotation.y += 0.005; // Rotate slightly on Y-axis
   torus.rotation.z += 0.01; // Rotate slightly on Z-axis

   controls.update(); // Updates OrbitControls

   renderer.render(scene, camera); // Update the screen with new rotation
}

// 🔄 Start the animation function
animate();

// 🔹 RESIZE HANDLING (Ensure the canvas resizes with the browser window)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 🔥 OPTIONAL: Dynamic Background Color Change Effect
let colorShift = 0;
function updateBackground() {
    colorShift += 0.005;
    scene.background = new THREE.Color(`hsl(${colorShift % 360}, 100%, 10%)`);
    requestAnimationFrame(updateBackground);
}
updateBackground();
