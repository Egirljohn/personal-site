const THREE = require('three');
const fragmentShader = require('../shaders/fragment.frag');
const vertexShader = require('../shaders/vertex.vert');

function shaderbg() {
  if (document.getElementById('bg-shader')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-shader';
  document.body.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x181825, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  };

  const geo = new THREE.PlaneGeometry(2, 2);

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  const mesh = new THREE.Mesh(geo, material);
  scene.add(mesh);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }

  document.documentElement.classList.add('has-shader');
  animate();
}

try {
  shaderbg();
} catch (error) {
  document.documentElement.classList.remove('has-shader');
}
