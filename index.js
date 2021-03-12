const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.0001,
  10000
); //  ogniskowa, proporcja, najbliższy punkt od kamery, najdalszy punkt od kamery
camera.position.set(0, 0, 30);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const handleResize = () => {
  const { innerWidth, innerHeight } = windows;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

const createSphere = (r = 1, color = 0xff00ff) => {
  const sphereMat = new THREE.MeshPhongMaterial({
    color,
    shineness: 20,
  });
  const sphereGeo = new THREE.TorusGeometry(1, 0.2, 7, 3, 6, 3);
  return new THREE.Mesh(sphereGeo, sphereMat);
};

const createSphereTorus = (r = 1, color = 0x0000ff) => {
  const sphereMatT = new THREE.MeshPhongMaterial({
    color,
    shineness: 20,
  });
  const sphereGeoT = new THREE.TorusKnotGeometry(5, 0.5, 3, 3, 2, 3);
  return new THREE.Mesh(sphereGeoT, sphereMatT);
};

const createPointLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, i);
};

const nucleus = createSphereTorus(1);
const l1 = createPointLight(0.8);
const l2 = createPointLight(0.4);
l1.position.set(120, 5, 10);
l2.position.set(-60, 0, 20);

scene.add(nucleus, l2);
nucleus.add(l1);

const createElectron = (r = 0.4, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();

  pivot.add(sphere);
  return {
    sphere,
    pivot,
  };
};

const e1 = createElectron();
const e2 = createElectron();
const e3 = createElectron();
const e4 = createElectron();
const e5 = createElectron();
e1.sphere.position.set(10, 0, 0);
e2.sphere.position.set(10, 5, 0);
e3.sphere.position.set(5, -5, 0);
e4.sphere.position.set(-5, -10, 0);
e5.sphere.position.set(-10, 10, 0);
nucleus.add(e1.pivot, e2.pivot, e3.pivot, e4.pivot, e5.pivot);

e1.pivot.rotation.y = 120;
e2.pivot.rotation.y = 30;
e3.pivot.rotation.y = 60;
e4.pivot.rotation.y = 160;
e5.pivot.rotation.y = 120;

const loop = () => {
  e1.pivot.rotation.z += 0.001;
  e2.pivot.rotation.z += 0.003;
  e3.pivot.rotation.z += 0.002;
  e4.pivot.rotation.z += 0.001;
  e5.pivot.rotation.z += 0.001;
  nucleus.rotation.z += 0.0001;
  nucleus.rotation.x += 0.0002;
  nucleus.rotation.y += 0.0003;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
window.addEventListener("resize", handleResize);
