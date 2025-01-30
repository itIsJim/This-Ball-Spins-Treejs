import * as THREE from 'three';
import { GridHelper, MeshToonMaterial, AxisHelper, CameraHelper, TextureLoader, Mesh, BoxGeometry, MeshBasicMaterial, Sphere } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './Sphere.css'

/* environment setup */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70,  window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas01"), 
})

/* window and camera */
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

/* geometry setup */
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xFF9C87, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere )

/* light setup */
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(5,5,5)

const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight, ambientlight);

/* helpers */
// const lighthelper = new THREE.PointLightHelper(pointlight);
const gridhelper = new THREE.GridHelper(200,50)
scene.add (gridhelper)
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

/* controls */
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 80;

/* move camera onscroll */
const moveCam = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.05;
  camera.rotation.y = t * -0.05;
}

window.onscroll = moveCam;



/* button on hold animation */

const button = document.getElementById("button");

let interval, time = 25.0;

const btn_pressed = () =>{
  let i = 1.85;
  sphere.rotation.y += 2.0;
  clearInterval( interval );
  interval = setInterval( btn_pressed , time );
  time -= (Math.log(i))/2; // inv: (3*log(10)*n)/ log(3)
}

const btn_released = () => {
  console.log(time);
  clearInterval( interval );
  interval = setInterval( btn_released , time );
}

button.addEventListener("mousedown", btn_pressed);
button.addEventListener("mouseup", btn_released);
// button.addEventListener("mouseout", btn_released);


/* render out */
const animate = () => {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render(scene,camera);
} 
animate();