//Variables
let container;
let camera;
let renderer;
let scene;
let house;

function init(){
	container = document.querySelector('.scene');
	//Create Scene
	scene = new THREE.Scene();

	const fov = 35;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 10000000;

	//Camera
	camera  = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 15, 50);

	  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 50);
  scene.add(light);

	//Renderer
	renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	console.log(container.clientWidth)
	console.log(container.clientHeight)
	console.log(aspect)
	//load model
	let loader = new THREE.GLTFLoader();
	loader.load("./3dmodels/bethharmon/scene.gltf", function(gltf){
		scene.add(gltf.scene);
		house = gltf.scene.children[0]
		animate()
	})

}
function animate() {
	requestAnimationFrame(animate)
	house.rotation.z += 0.01
	renderer.render(scene, camera)
}
init();
function onWindowResize(){
	camera.aspect = container.clientWidth / container.clientHeight
	camera.updateProjectionMatrix()

	renderer.setSize(container.clientWidth, container.clientHeight)
}
window.addEventListener("resize", onWindowResize)