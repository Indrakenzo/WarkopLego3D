import * as THREE from 'three';

// 1. SETUP DUNIA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // Gue bikin agak gelap dikit biar vibe "suasana malam" dari bg.png dapet

// 2. KAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 8, 10);
camera.lookAt(0, 0, 0);

// 3. RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 4. LANTAI WARKOP (Pake bg.png lo)
const floorTex = new THREE.TextureLoader().load('assets/bg.png');
const floorGeometry = new THREE.BoxGeometry(20, 0.5, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTex });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

// 5. KARAKTER BARISTA (Udah diganti ke barista-1.png)
const baristaTex = new THREE.TextureLoader().load('assets/barista-1.png');
const baristaMat = new THREE.SpriteMaterial({ map: baristaTex });
const barista = new THREE.Sprite(baristaMat);
barista.scale.set(3, 3, 1);
barista.position.y = 1.8;
scene.add(barista);

// 6. TAMBAHAN NPC (Biar warkopnya rame)
// NPC 1 (Pengunjung Sendiri)
const npc1Tex = new THREE.TextureLoader().load('assets/npc-1.png');
const npc1Mat = new THREE.SpriteMaterial({ map: npc1Tex });
const npc1 = new THREE.Sprite(npc1Mat);
npc1.scale.set(3, 3, 1);
npc1.position.set(4, 1.8, -3); // Posisi nongkrong di pojok kanan
scene.add(npc1);

// NPC Duo (Pengunjung Berdua)
const npcDuoTex = new THREE.TextureLoader().load('assets/npc-duo.png');
const npcDuoMat = new THREE.SpriteMaterial({ map: npcDuoTex });
const npcDuo = new THREE.Sprite(npcDuoMat);
npcDuo.scale.set(4, 4, 1); // Agak digedein karena berdua
npcDuo.position.set(-4, 2, -2); // Posisi nongkrong di pojok kiri
scene.add(npcDuo);

// 7. CAHAYA
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

// 8. LOGIKA GERAK (WASD)
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function movePlayer() {
    const speed = 0.15; // Gue cepetin dikit jalannya
    if (keys['KeyW']) camera.position.z -= speed;
    if (keys['KeyS']) camera.position.z += speed;
    if (keys['KeyA']) camera.position.x -= speed;
    if (keys['KeyD']) camera.position.x += speed;
    
    // Barista ngikutin arah kamera
    barista.position.x = camera.position.x - 5;
}

// 9. START GAME TRIGGER (Ngilangin Layar Pembuka)
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => {
    overlay.parentElement.style.display = 'none';
});

// 10. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();