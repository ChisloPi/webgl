
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xc0c0c0);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);

var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 10;
controls.staticMoving = true;

var ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(20, 0, 10);
scene.add(light);

var p = 0;
var loader = new THREE.TextureLoader();
var material = new THREE.MeshPhongMaterial({
    map: loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPd91dX6uB5spIfM_JMhhj87Z_UIZFW8CWtlMXMLknRyxE1CP_WOK8pZ85NF4eb8fV9I&usqp=CAU'),
});
var geometry = new THREE.TorusKnotGeometry(10, 1, 10000, 10, p, 10);

var torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
    controls.update();
    initEventListeners();

    p += 1;
    if (p == 20) p = 0;
    geometry = new THREE.TorusKnotGeometry(10, 1, 10000, 100, p, 10);
    scene.remove(torus);
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    requestAnimationFrame(animate);
}

animate();
