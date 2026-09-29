// Rotating gold smartphone for the black band. three.js is self-hosted in /vendor.
import * as THREE from '../vendor/three.module.min.js';

const band = document.querySelector('.band');
const canvas = band && band.querySelector('canvas');
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (e) {
  if (band) band.classList.add('nogl');
}

if (renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  // A small studio of soft light panels; metal only looks like metal through what it reflects.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new THREE.Scene();
  studio.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x3a3128, side: THREE.BackSide })));
  const panel = (w, h, x, y, z, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    studio.add(m);
  };
  panel(10, 3, 0, 8, 2, 6);        // top
  panel(7, 7, -4, 2, 9, 3.6);      // big soft front-left
  panel(1.6, 10, 5, 0, 8, 7);      // bright strip front-right: sweeps across as it turns
  panel(2, 9, -8, 0.5, 2, 4);      // left rim
  panel(2.5, 9, 8, 0, -2, 3.5);    // right rim
  panel(12, 2.5, 0, -7, 3, 1.2);   // floor bounce
  scene.environment = pmrem.fromScene(studio, 0.035).texture;

  // Brushed grain for the frame and back.
  const grain = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#8c8c8c';
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 5000; i++) {
      const y = Math.random() * 512;
      const v = (105 + Math.random() * 70) | 0;
      g.strokeStyle = `rgba(${v},${v},${v},0.35)`;
      g.lineWidth = Math.random() * 1.3;
      g.beginPath();
      g.moveTo(Math.random() * 512 - 120, y);
      g.lineTo(Math.random() * 512 + 120, y);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.4, 1.4);
    return tex;
  })();

  const brushed = new THREE.MeshPhysicalMaterial({ color: 0xE2AE45, metalness: 1, roughness: 0.7, roughnessMap: grain, clearcoat: 0.25, clearcoatRoughness: 0.3 });
  const polished = new THREE.MeshPhysicalMaterial({ color: 0xF0C25C, metalness: 1, roughness: 0.16 });
  const deep = new THREE.MeshPhysicalMaterial({ color: 0xB9852A, metalness: 1, roughness: 0.18 });

  const rounded = (w, h, r) => {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const slab = (w, h, r, depth, bevel, mat) => {
    const geo = new THREE.ExtrudeGeometry(rounded(w - 2 * bevel, h - 2 * bevel, Math.max(r - bevel, 0.001)), {
      depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 10, curveSegments: 28,
    });
    geo.center();
    return new THREE.Mesh(geo, mat);
  };

  const W = 0.8, H = 1.64, D = 0.07, B = 0.04, R = 0.13;
  const front = D / 2 + B;
  const phone = new THREE.Group();

  phone.add(slab(W, H, R, D, B, brushed));

  const screen = new THREE.Mesh(new THREE.ShapeGeometry(rounded(W - 0.07, H - 0.07, R - 0.03), 28), polished);
  screen.position.z = front + 0.0015;
  phone.add(screen);

  const island = slab(0.2, 0.055, 0.0275, 0.004, 0.003, deep);
  island.position.set(0, H / 2 - 0.1, front + 0.004);
  phone.add(island);

  const bump = slab(0.34, 0.34, 0.09, 0.018, 0.012, brushed);
  bump.position.set(-W / 2 + 0.22, H / 2 - 0.22, -front - 0.012);
  phone.add(bump);
  const lens = new THREE.CylinderGeometry(0.058, 0.064, 0.03, 40);
  [[-0.07, 0.07], [-0.07, -0.07], [0.075, 0]].forEach(([dx, dy]) => {
    const l = new THREE.Mesh(lens, polished);
    l.rotation.x = Math.PI / 2;
    l.position.set(bump.position.x + dx, bump.position.y + dy, -front - 0.03);
    phone.add(l);
  });

  const key = new THREE.BoxGeometry(0.016, 1, 0.032);
  [[W / 2 + 0.006, 0.28, 0.2], [-W / 2 - 0.006, 0.36, 0.1], [-W / 2 - 0.006, 0.2, 0.12]].forEach(([x, y, h]) => {
    const k = new THREE.Mesh(key, polished);
    k.scale.y = h;
    k.position.set(x, y, 0);
    phone.add(k);
  });

  phone.rotation.set(0.12, -0.6, 0.06);
  scene.add(phone);

  const size = () => {
    const w = band.clientWidth, h = band.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const s = Math.min(1, (w / h) / 0.7);
    phone.scale.setScalar(s);
  };
  size();
  window.addEventListener('resize', () => { size(); if (still) renderer.render(scene, camera); });

  if (still) {
    renderer.render(scene, camera);
  } else {
    let visible = true, last = performance.now(), t = 0;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = performance.now(); }).observe(band);
    const tick = (now) => {
      requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      phone.rotation.y += dt * 0.55;
      phone.rotation.x = 0.12 + Math.sin(t * 0.6) * 0.08;
      phone.position.y = Math.sin(t * 0.9) * 0.05;
      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);
  }
}
