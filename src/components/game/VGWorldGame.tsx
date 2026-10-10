import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { INITIAL_VG_WORLD_COLLECTIBLES } from '../../data/gameAssets';
import { CollectibleItem, RemotePlayer, TravelEmote } from '../../types/game';
import { VirtualJoystick } from './VirtualJoystick';
import { GameHUD } from './GameHUD';

interface VGWorldGameProps {
  onScoreUpdate?: (score: number, collectedCount: number) => void;
}

export const VGWorldGame: React.FC<VGWorldGameProps> = ({ onScoreUpdate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game states
  const [collectibles, setCollectibles] = useState<CollectibleItem[]>(INITIAL_VG_WORLD_COLLECTIBLES);
  const [score, setScore] = useState<number>(0);
  const [unlockedItem, setUnlockedItem] = useState<CollectibleItem | null>(null);
  const [nearbyPlayerName, setNearbyPlayerName] = useState<string | undefined>(undefined);
  const [playerEmote, setPlayerEmote] = useState<{ text: string; expires: number } | null>(null);

  // Mobile / Joystick vector
  const moveVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Keyboard keys
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Remote players
  const remotePlayersRef = useRef<RemotePlayer[]>([
    {
      id: 'usr_rohan',
      displayName: 'Rohan (Tourist)',
      avatarColor: '#1B3FFF',
      x: 4.5,
      y: 0.8,
      z: -4.0,
      rotationY: 0.5,
      currentEmote: 'Marhaba! 👋',
      emoteExpiresAt: Date.now() + 10000
    },
    {
      id: 'usr_fatima',
      displayName: 'Fatima (Deira)',
      avatarColor: '#FF5722',
      x: -6.0,
      y: 0.8,
      z: 7.0,
      rotationY: 1.2
    }
  ]);

  // Audio synthesizer via Web Audio API
  const playPickupSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }, []);

  const handleJoystickMove = useCallback((vec: { x: number; y: number }) => {
    moveVectorRef.current = vec;
  }, []);

  const handleSendEmote = useCallback((emote: TravelEmote) => {
    setPlayerEmote({
      text: emote,
      expires: Date.now() + 4500
    });
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEEB'); // Light blue skybox gradient effect
    scene.fog = new THREE.FogExp2('#87CEEB', 0.012);

    // 2. CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight - 130);
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    const targetCameraPos = new THREE.Vector3();

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight('#FFFBEB', 0.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#FFFFFF', '#E8D2A6', 0.6);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight('#F59E0B', 2.0);
    sunLight.position.set(25, 35, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -70;
    sunLight.shadow.camera.right = 70;
    sunLight.shadow.camera.top = 70;
    sunLight.shadow.camera.bottom = -70;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // 5. GROUND: Sandy Desert & Sikka Streets
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshLambertMaterial({ color: '#E8D2A6' });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Grid pattern
    const gridHelper = new THREE.GridHelper(200, 100, '#d1d5db', '#d1d5db');
    gridHelper.position.y = 0.02;
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.opacity = 0.25;
    gridMat.transparent = true;
    scene.add(gridHelper);

    // Road system
    const createRoad = (w: number, d: number, x: number, z: number, rotationY = 0) => {
      const roadGeo = new THREE.PlaneGeometry(w, d);
      const roadMat = new THREE.MeshLambertMaterial({ color: '#374151' });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.rotation.z = rotationY;
      road.position.set(x, 0.03, z);
      road.receiveShadow = true;
      return road;
    };
    scene.add(createRoad(10, 140, -10, 0));
    scene.add(createRoad(80, 10, -15, 20, Math.PI / 2));
    scene.add(createRoad(80, 10, -15, -25, Math.PI / 2));

    // 6. DUBAI CREEK WATERWAY
    const creekGeo = new THREE.PlaneGeometry(35, 200);
    const creekMat = new THREE.MeshLambertMaterial({ 
      color: '#38BDF8', 
      transparent: true, 
      opacity: 0.85 
    });
    const creekMesh = new THREE.Mesh(creekGeo, creekMat);
    creekMesh.rotation.x = -Math.PI / 2;
    creekMesh.position.set(26, 0.05, 0);
    creekMesh.receiveShadow = true;
    scene.add(creekMesh);

    // Creek Quay Wall
    const quayGeo = new THREE.BoxGeometry(1.5, 0.8, 200);
    const quayMat = new THREE.MeshLambertMaterial({ color: '#C2A378' });
    const quay = new THREE.Mesh(quayGeo, quayMat);
    quay.position.set(8.5, 0.4, 0);
    quay.receiveShadow = true;
    quay.castShadow = true;
    scene.add(quay);

    // 7. TRADITIONAL ABRA BOATS IN THE CREEK
    const createAbra = (zPos: number) => {
      const abraGroup = new THREE.Group();
      // Hull
      const hullGeo = new THREE.BoxGeometry(3.5, 0.6, 6.5);
      const hullMat = new THREE.MeshLambertMaterial({ color: '#78350F' }); // Teak wood
      const hull = new THREE.Mesh(hullGeo, hullMat);
      hull.position.y = 0.3;
      hull.castShadow = true;
      abraGroup.add(hull);

      // Canopy roof
      const roofGeo = new THREE.BoxGeometry(3.2, 0.1, 5.0);
      const roofMat = new THREE.MeshLambertMaterial({ color: '#FBBF24' }); // Yellow canopy
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 1.6;
      roof.castShadow = true;
      abraGroup.add(roof);

      // Canopy poles
      for (let px of [-1.4, 1.4]) {
        for (let pz of [-2.2, 2.2]) {
          const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.3);
          const poleMat = new THREE.MeshLambertMaterial({ color: '#52290D' });
          const pole = new THREE.Mesh(poleGeo, poleMat);
          pole.position.set(px, 0.95, pz);
          abraGroup.add(pole);
        }
      }

      abraGroup.position.set(22, 0, zPos);
      return abraGroup;
    };

    const abra1 = createAbra(-12);
    const abra2 = createAbra(16);
    scene.add(abra1);
    scene.add(abra2);

    // 8. DUBAI LANDMARKS
    
    // a) Burj Khalifa
    const bkGroup = new THREE.Group();
    const bkSilver = new THREE.MeshLambertMaterial({ color: '#C0C0C0' });
    const bkDark = new THREE.MeshLambertMaterial({ color: '#4B5563' });
    for (let i = 0; i < 5; i++) {
      const size = 6 - i * 1.1;
      const h = 9;
      const boxGeo = new THREE.BoxGeometry(size, h, size);
      const box = new THREE.Mesh(boxGeo, i === 0 ? bkDark : bkSilver);
      box.position.y = i * h + h / 2;
      box.castShadow = true;
      box.receiveShadow = true;
      bkGroup.add(box);
    }
    const bkSpireGeo = new THREE.CylinderGeometry(0.1, 0.5, 10, 4);
    const bkSpire = new THREE.Mesh(bkSpireGeo, bkSilver);
    bkSpire.position.y = 45 + 5;
    bkSpire.castShadow = true;
    bkGroup.add(bkSpire);
    const obsDeckGeo = new THREE.TorusGeometry(2.5, 0.4, 8, 16);
    const obsDeck = new THREE.Mesh(obsDeckGeo, new THREE.MeshLambertMaterial({ color: '#374151' }));
    obsDeck.rotation.x = Math.PI / 2;
    obsDeck.position.y = 30;
    bkGroup.add(obsDeck);
    bkGroup.position.set(30, 0, -60);
    scene.add(bkGroup);

    // b) Dubai Frame
    const dfGroup = new THREE.Group();
    const goldMat = new THREE.MeshLambertMaterial({ color: '#D4AF37' });
    const pillarGeo = new THREE.BoxGeometry(2, 25, 2);
    const p1 = new THREE.Mesh(pillarGeo, goldMat);
    p1.position.set(-6.5, 12.5, 0);
    p1.castShadow = true;
    const p2 = new THREE.Mesh(pillarGeo, goldMat);
    p2.position.set(6.5, 12.5, 0);
    p2.castShadow = true;
    const bridgeGeo = new THREE.BoxGeometry(15, 2, 2);
    const bridge = new THREE.Mesh(bridgeGeo, goldMat);
    bridge.position.set(0, 24, 0);
    bridge.castShadow = true;
    dfGroup.add(p1, p2, bridge);
    dfGroup.position.set(-25, 0, -35);
    scene.add(dfGroup);

    // c) Burj Al Arab
    const baaGroup = new THREE.Group();
    const whiteMat = new THREE.MeshLambertMaterial({ color: '#F5F5F5' });
    const tealMat = new THREE.MeshLambertMaterial({ color: '#0D9488' });
    const sailGeo = new THREE.CylinderGeometry(0.1, 5, 20, 3);
    const sail = new THREE.Mesh(sailGeo, whiteMat);
    sail.position.y = 10;
    sail.rotation.y = -Math.PI / 2;
    sail.castShadow = true;
    const accentGeo = new THREE.CylinderGeometry(0.5, 0.5, 22, 16);
    const accent = new THREE.Mesh(accentGeo, tealMat);
    accent.position.set(2, 11, 0);
    accent.rotation.z = -0.15;
    baaGroup.add(sail, accent);
    const islandGeo = new THREE.CylinderGeometry(8, 8, 0.5, 32);
    const islandMat = new THREE.MeshLambertMaterial({ color: '#D4D4D8' });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = 0.25;
    island.receiveShadow = true;
    baaGroup.add(island);
    baaGroup.position.set(40, 0, 25);
    scene.add(baaGroup);

    // d) Museum of the Future
    const motfGroup = new THREE.Group();
    const chromeMat = new THREE.MeshStandardMaterial({ color: '#A8A29E', roughness: 0.3, metalness: 0.8 });
    const torusGeo = new THREE.TorusGeometry(4, 2, 16, 50);
    const torus = new THREE.Mesh(torusGeo, chromeMat);
    torus.position.y = 6;
    const baseGeo = new THREE.BoxGeometry(6, 1, 4);
    const base = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: '#374151' }));
    base.position.y = 0.5;
    motfGroup.add(torus, base);
    torus.castShadow = true;
    motfGroup.position.set(-35, 0, 15);
    motfGroup.rotation.y = Math.PI / 4;
    scene.add(motfGroup);

    // 9. AL FAHIDI HISTORIC BUILDINGS & BARAJEEL WIND TOWERS
    const buildingMat = new THREE.MeshLambertMaterial({ color: '#D4B996' });
    const woodMat = new THREE.MeshLambertMaterial({ color: '#451A03' });

    const createAlFahidiHouse = (x: number, z: number, w: number, h: number, d: number) => {
      const houseGroup = new THREE.Group();
      
      const mainGeo = new THREE.BoxGeometry(w, h, d);
      const main = new THREE.Mesh(mainGeo, buildingMat);
      main.position.y = h / 2;
      main.castShadow = true;
      main.receiveShadow = true;
      houseGroup.add(main);

      const doorGeo = new THREE.BoxGeometry(1.2, 2.2, 0.2);
      const door = new THREE.Mesh(doorGeo, woodMat);
      door.position.set(0, 1.1, d / 2 + 0.05);
      houseGroup.add(door);

      const towerWidth = 2.5;
      const towerHeight = 3.5;
      const towerGeo = new THREE.BoxGeometry(towerWidth, towerHeight, towerWidth);
      const tower = new THREE.Mesh(towerGeo, buildingMat);
      tower.position.set(w / 3, h + towerHeight / 2, -d / 3);
      tower.castShadow = true;
      houseGroup.add(tower);

      const slitGeo = new THREE.BoxGeometry(towerWidth + 0.1, 0.8, 0.4);
      const slit = new THREE.Mesh(slitGeo, woodMat);
      slit.position.set(w / 3, h + towerHeight - 0.5, -d / 3);
      houseGroup.add(slit);

      houseGroup.position.set(x, 0, z);
      return houseGroup;
    };

    const houses = [
      createAlFahidiHouse(-16, -18, 10, 5.5, 12),
      createAlFahidiHouse(-18, 8, 11, 6.0, 14),
      createAlFahidiHouse(-6, -24, 8, 4.8, 9),
      createAlFahidiHouse(-2, 22, 10, 5.2, 11),
      createAlFahidiHouse(-28, -6, 12, 6.5, 12)
    ];
    houses.forEach(h => scene.add(h));

    // 10. PALM TREES
    const createPalmTree = (x: number, z: number) => {
      const palmGroup = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 4.5, 6);
      const trunkMat = new THREE.MeshLambertMaterial({ color: '#78350F' });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.25;
      trunk.castShadow = true;
      palmGroup.add(trunk);

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
        const leafGeo = new THREE.ConeGeometry(0.9, 2.2, 4);
        const leafMat = new THREE.MeshLambertMaterial({ color: '#15803D' });
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(Math.cos(angle) * 0.9, 4.3, Math.sin(angle) * 0.9);
        leaf.rotation.x = Math.PI / 3;
        leaf.rotation.y = angle;
        leaf.castShadow = true;
        palmGroup.add(leaf);
      }
      palmGroup.position.set(x, 0, z);
      return palmGroup;
    };

    const palms = [
      createPalmTree(6, -8),
      createPalmTree(5, 12),
      createPalmTree(-8, -10),
      createPalmTree(-10, 16),
      createPalmTree(2, -2),
      createPalmTree(5, 30),
      createPalmTree(5, -25),
      createPalmTree(5, -40),
      createPalmTree(5, 45)
    ];
    palms.forEach(p => scene.add(p));

    // Helper to create characters (Player + Remotes)
    const createCharacterRig = (primaryColor: string, isMainPlayer: boolean) => {
      const rigGroup = new THREE.Group();
      
      const bodyMat = new THREE.MeshLambertMaterial({ color: primaryColor });
      const skinMat = new THREE.MeshLambertMaterial({ color: '#FDE047' });
    
      const torsoGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.1, 4);
      const torso = new THREE.Mesh(torsoGeo, bodyMat);
      torso.rotation.y = Math.PI / 4;
      torso.position.y = 0.85;
      torso.castShadow = true;
      rigGroup.add(torso);
    
      const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const head = new THREE.Mesh(headGeo, skinMat);
      head.position.y = 1.6;
      head.castShadow = true;
      rigGroup.add(head);
    
      const hatGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
      const hatMat = new THREE.MeshLambertMaterial({ color: '#FBBF24' });
      const hat = new THREE.Mesh(hatGeo, hatMat);
      hat.position.y = 1.95;
      hat.castShadow = true;
      rigGroup.add(hat);
    
      if (isMainPlayer) {
        const packGeo = new THREE.BoxGeometry(0.5, 0.6, 0.35);
        const packMat = new THREE.MeshLambertMaterial({ color: '#FF5722' });
        const pack = new THREE.Mesh(packGeo, packMat);
        pack.position.set(0, 0.9, -0.4);
        pack.castShadow = true;
        rigGroup.add(pack);
      }
    
      const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8);
      const legGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 8);
    
      const leftArm = new THREE.Group();
      leftArm.position.set(0.45, 1.3, 0);
      const leftArmMesh = new THREE.Mesh(armGeo, skinMat);
      leftArmMesh.position.y = -0.35;
      leftArmMesh.castShadow = true;
      leftArm.add(leftArmMesh);
      rigGroup.add(leftArm);
    
      const rightArm = new THREE.Group();
      rightArm.position.set(-0.45, 1.3, 0);
      const rightArmMesh = new THREE.Mesh(armGeo, skinMat);
      rightArmMesh.position.y = -0.35;
      rightArmMesh.castShadow = true;
      rightArm.add(rightArmMesh);
      rigGroup.add(rightArm);
    
      const leftLeg = new THREE.Group();
      leftLeg.position.set(0.2, 0.8, 0);
      const leftLegMesh = new THREE.Mesh(legGeo, bodyMat);
      leftLegMesh.position.y = -0.4;
      leftLegMesh.castShadow = true;
      leftLeg.add(leftLegMesh);
      rigGroup.add(leftLeg);
    
      const rightLeg = new THREE.Group();
      rightLeg.position.set(-0.2, 0.8, 0);
      const rightLegMesh = new THREE.Mesh(legGeo, bodyMat);
      rightLegMesh.position.y = -0.4;
      rightLegMesh.castShadow = true;
      rightLeg.add(rightLegMesh);
      rigGroup.add(rightLeg);
    
      return { rigGroup, leftArm, rightArm, leftLeg, rightLeg };
    };

    // 11. PLAYER AVATAR MESH
    const playerGroup = new THREE.Group();
    const playerChar = createCharacterRig('#1B3FFF', true);
    playerGroup.add(playerChar.rigGroup);
    playerGroup.position.set(0, 0, 0);
    scene.add(playerGroup);

    // 12. REMOTE PLAYERS MESHES (Multiplayer Avatars)
    const remoteMeshes: { [id: string]: THREE.Group } = {};

    remotePlayersRef.current.forEach((rp) => {
      const rGroup = new THREE.Group();
      const char = createCharacterRig(rp.avatarColor, false);
      rGroup.add(char.rigGroup);
      rGroup.position.set(rp.x, 0, rp.z);
      // Face roughly towards center
      rGroup.rotation.y = rp.rotationY || 0;
      scene.add(rGroup);
      remoteMeshes[rp.id] = rGroup;
    });

    // 13. 3D COLLECTIBLE ITEMS MESHES
    const collectibleMeshes: { [id: string]: THREE.Group } = {};
    const collectibleRings: { [id: string]: THREE.MeshLambertMaterial } = {};

    INITIAL_VG_WORLD_COLLECTIBLES.forEach((item) => {
      const cGroup = new THREE.Group();

      let mesh: THREE.Mesh;
      if (item.type === 'pearl') {
        const geo = new THREE.SphereGeometry(0.4, 16, 16);
        const mat = new THREE.MeshLambertMaterial({ color: '#E0F2FE', emissive: '#38BDF8', emissiveIntensity: 0.2 });
        mesh = new THREE.Mesh(geo, mat);
      } else if (item.type === 'coin') {
        const geo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16);
        const mat = new THREE.MeshLambertMaterial({ color: '#FBBF24', emissive: '#D97706', emissiveIntensity: 0.3 });
        mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = Math.PI / 2;
      } else if (item.type === 'dallah') {
        const geo = new THREE.ConeGeometry(0.35, 0.8, 8);
        const mat = new THREE.MeshLambertMaterial({ color: '#F59E0B' });
        mesh = new THREE.Mesh(geo, mat);
      } else {
        const geo = new THREE.DodecahedronGeometry(0.35);
        const mat = new THREE.MeshLambertMaterial({ color: item.color });
        mesh = new THREE.Mesh(geo, mat);
      }

      mesh.castShadow = true;
      cGroup.add(mesh);

      // Glow Ring
      const ringGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 16);
      const ringMat = new THREE.MeshLambertMaterial({ color: '#FBBF24', emissive: '#F59E0B', emissiveIntensity: 0.5 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = 0.03;
      cGroup.add(ringMesh);

      cGroup.position.set(item.x, item.y, item.z);
      scene.add(cGroup);
      collectibleMeshes[item.id] = cGroup;
      collectibleRings[item.id] = ringMat;
    });

    // 14. CAMERA ORBIT DRAG LISTENER
    let cameraAngle = Math.PI * 0.75;
    let cameraPitch = 0.45;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (clientX < 180 && clientY > height - 180) return;

      isDragging = true;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      cameraAngle -= deltaX * 0.007;
      cameraPitch = Math.max(0.2, Math.min(1.2, cameraPitch + deltaY * 0.005));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Keyboard handlers
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Resize handler
    const onWindowResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (window.innerHeight - 130);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onWindowResize);

    // 15. GAME LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const velocity = new THREE.Vector3();
    const maxSpeed = 10.0;
    const accelRate = maxSpeed / 0.15;
    const decelRate = maxSpeed / 0.1;

    // Set initial camera position so it doesn't snap on load
    const initialCamDist = 7.5;
    targetCameraPos.x = playerGroup.position.x + Math.sin(cameraAngle) * Math.cos(cameraPitch) * initialCamDist;
    targetCameraPos.y = playerGroup.position.y + Math.sin(cameraPitch) * initialCamDist + 1.2;
    targetCameraPos.z = playerGroup.position.z + Math.cos(cameraAngle) * Math.cos(cameraPitch) * initialCamDist;
    camera.position.copy(targetCameraPos);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Collect movement input (analog joystick + keyboard)
      const joyX = moveVectorRef.current.x;
      const joyY = moveVectorRef.current.y; // Positive is UP/forward

      let keyX = 0;
      let keyY = 0;
      if (keysPressed.current['w'] || keysPressed.current['arrowup']) keyY += 1;
      if (keysPressed.current['s'] || keysPressed.current['arrowdown']) keyY -= 1;
      if (keysPressed.current['a'] || keysPressed.current['arrowleft']) keyX -= 1;
      if (keysPressed.current['d'] || keysPressed.current['arrowright']) keyX += 1;

      let inputX = joyX + keyX;
      let inputY = joyY + keyY;
      const inputLen = Math.hypot(inputX, inputY);

      const targetVelocity = new THREE.Vector3(0, 0, 0);
      if (inputLen > 0.05) {
        const normX = inputX / Math.max(1, inputLen);
        const normY = inputY / Math.max(1, inputLen);

        // Forward vector relative to camera (pointing away from camera into the scene)
        const fwdX = -Math.sin(cameraAngle);
        const fwdZ = -Math.cos(cameraAngle);

        // Right vector relative to camera (perpendicular to forward)
        const rightX = Math.cos(cameraAngle);
        const rightZ = -Math.sin(cameraAngle);

        const worldX = normX * rightX + normY * fwdX;
        const worldZ = normX * rightZ + normY * fwdZ;

        const effectiveSpeed = maxSpeed * Math.min(1, inputLen);
        targetVelocity.set(worldX, 0, worldZ).multiplyScalar(effectiveSpeed);
      }

      // Smooth acceleration/deceleration
      const rate = targetVelocity.lengthSq() > 0 ? accelRate : decelRate;
      const diff = targetVelocity.clone().sub(velocity);
      if (diff.length() <= rate * delta) {
        velocity.copy(targetVelocity);
      } else {
        velocity.add(diff.normalize().multiplyScalar(rate * delta));
      }

      playerGroup.position.addScaledVector(velocity, delta);

      const currentSpeed = velocity.length();
      if (currentSpeed > 0.1) {
        playerGroup.rotation.y = Math.atan2(velocity.x, velocity.z);
        
        // Bobbing and swinging
        const bob = Math.abs(Math.sin(time * 15)) * 0.1 * (currentSpeed / maxSpeed);
        playerChar.rigGroup.position.y = bob;
        
        const swing = Math.sin(time * 15) * 0.6 * (currentSpeed / maxSpeed);
        playerChar.leftArm.rotation.x = swing;
        playerChar.rightArm.rotation.x = -swing;
        playerChar.leftLeg.rotation.x = -swing;
        playerChar.rightLeg.rotation.x = swing;
      } else {
        playerChar.rigGroup.position.y = 0;
        playerChar.leftArm.rotation.x = 0;
        playerChar.rightArm.rotation.x = 0;
        playerChar.leftLeg.rotation.x = 0;
        playerChar.rightLeg.rotation.x = 0;
      }

      // Keep player inside boundary [-50, 50], [-70, 70] but limit x <= 7.5 near water
      playerGroup.position.x = Math.max(-50, Math.min(7.5, playerGroup.position.x));
      playerGroup.position.z = Math.max(-70, Math.min(70, playerGroup.position.z));

      // Camera follow player with orbit and smoothing
      const camDist = 7.5;
      targetCameraPos.x = playerGroup.position.x + Math.sin(cameraAngle) * Math.cos(cameraPitch) * camDist;
      targetCameraPos.y = playerGroup.position.y + Math.sin(cameraPitch) * camDist + 1.2;
      targetCameraPos.z = playerGroup.position.z + Math.cos(cameraAngle) * Math.cos(cameraPitch) * camDist;
      
      camera.position.lerp(targetCameraPos, 0.08); // Smooth dampening
      camera.lookAt(playerGroup.position.x, playerGroup.position.y + 1.2, playerGroup.position.z);

      // Rotate & Bob Collectibles, pulse glow
      const pulse = 0.5 + Math.sin(time * 3) * 0.3;
      INITIAL_VG_WORLD_COLLECTIBLES.forEach((item) => {
        const cMesh = collectibleMeshes[item.id];
        const ringMat = collectibleRings[item.id];
        if (ringMat) ringMat.emissiveIntensity = pulse;

        if (cMesh && cMesh.visible) {
          cMesh.rotation.y += 2.0 * delta;
          cMesh.position.y = item.y + Math.sin(time * 3 + item.x) * 0.15;

          const dist = Math.hypot(
            playerGroup.position.x - item.x,
            playerGroup.position.z - item.z
          );

          if (dist <= 1.3) {
            cMesh.visible = false;
            playPickupSound();

            setCollectibles(prev => {
              const updated = prev.map(c => c.id === item.id ? { ...c, collected: true } : c);
              const totalScore = updated.reduce((sum, c) => c.collected ? sum + c.points : sum, 0);
              const pearlsCount = updated.filter(c => c.type === 'pearl' && c.collected).length;
              setScore(totalScore);
              setUnlockedItem(item);
              if (onScoreUpdate) onScoreUpdate(totalScore, pearlsCount);
              return updated;
            });
          }
        }
      });

      // Bob Abra boats on Creek water
      abra1.position.y = Math.sin(time * 2) * 0.08;
      abra1.rotation.z = Math.sin(time * 1.5) * 0.04;
      abra2.position.y = Math.sin(time * 2 + 1) * 0.08;
      abra2.rotation.z = Math.sin(time * 1.5 + 1) * 0.04;

      // Check proximity to remote players (<= 3.5m)
      let foundNearby: string | undefined = undefined;
      remotePlayersRef.current.forEach((rp) => {
        const dist = Math.hypot(playerGroup.position.x - rp.x, playerGroup.position.z - rp.z);
        if (dist <= 3.5) {
          foundNearby = rp.displayName;
        }
      });
      setNearbyPlayerName(foundNearby);

      renderer.render(scene, camera);
    };

    animate();

    // 16. MEMORY CLEANUP INVARIANT (THREE.JS VRAM DISPOSAL)
    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onWindowResize);

      // Comprehensive WebGL memory disposal pattern from AGENTS.md
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [playPickupSound, onScoreUpdate]);

  const pearlsCollected = collectibles.filter(c => c.type === 'pearl' && c.collected).length;
  const totalPearls = collectibles.filter(c => c.type === 'pearl').length;

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[480px] bg-[#87CEEB] overflow-hidden rounded-2xl border-[2.5px] border-[#111827] shadow-[4px_4px_0px_#111827]">
      
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Game HUD (Score, Pearls, Lore Popup) */}
      <GameHUD
        score={score}
        pearlsCollected={pearlsCollected}
        totalPearls={totalPearls}
        playersOnline={3}
        nearbyPlayerName={nearbyPlayerName}
        onSendEmote={handleSendEmote}
        unlockedItem={unlockedItem}
        onDismissUnlock={() => setUnlockedItem(null)}
      />

      {/* Player floating emote speech bubble */}
      {playerEmote && playerEmote.expires > Date.now() && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-white border-2 border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] font-comic text-xl text-[#111827] animate-bounce">
          {playerEmote.text}
        </div>
      )}

      {/* Floating Virtual Joystick (Left Thumb) */}
      <div className="absolute bottom-6 left-4 z-30 pointer-events-auto">
        <VirtualJoystick onMove={handleJoystickMove} maxRadius={56} />
      </div>

    </div>
  );
};
