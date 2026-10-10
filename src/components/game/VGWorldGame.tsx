import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { INITIAL_VG_WORLD_COLLECTIBLES } from '../../data/gameAssets';
import { CollectibleItem, RemotePlayer, TravelEmote } from '../../types/game';
import { VirtualJoystick } from './VirtualJoystick';
import { GameHUD } from './GameHUD';

interface VGWorldGameProps {
  onScoreUpdate?: (score: number, collectedCount: number) => void;
}

type TimeOfDay = 'day' | 'sunset' | 'night';

// Web Audio API Sound Effects Synthesizer (100% Offline)
function playSoundEffect(type: 'pickup' | 'jump' | 'bounce' | 'boost' | 'chest') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'jump') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'bounce') {
      // Comic boing sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.3);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'boost') {
      // Supersonic whoosh
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'chest') {
      // Fanfare chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else {
      // Pickup chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {
    // Audio restricted or autoplay blocked
  }
}

export const VGWorldGame: React.FC<VGWorldGameProps> = ({ onScoreUpdate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game states
  const [collectibles, setCollectibles] = useState<CollectibleItem[]>(INITIAL_VG_WORLD_COLLECTIBLES);
  const [score, setScore] = useState<number>(0);
  const [unlockedItem, setUnlockedItem] = useState<CollectibleItem | null>(null);
  const [nearbyPlayerName, setNearbyPlayerName] = useState<string | undefined>(undefined);
  const [playerEmote, setPlayerEmote] = useState<{ text: string; expires: number } | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [speedBoostActive, setSpeedBoostActive] = useState<boolean>(false);
  const [activeBadge, setActiveBadge] = useState<{ text: string; icon: string } | null>(null);

  // Jump trigger ref for mobile / keyboard
  const jumpTriggerRef = useRef<boolean>(false);
  const speedBoostExpiresRef = useRef<number>(0);

  // Mobile / Joystick vector
  const moveVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
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
    },
    {
      id: 'usr_alex',
      displayName: 'Alex (Bridge Explorer)',
      avatarColor: '#10B981',
      x: 26.0,
      y: 3.2,
      z: 2.0,
      rotationY: -1.5,
      currentEmote: 'Crossing the Creek! 🌉'
    }
  ]);

  const handleJoystickMove = useCallback((vec: { x: number; y: number }) => {
    moveVectorRef.current = vec;
  }, []);

  const handleSendEmote = useCallback((emote: TravelEmote) => {
    setPlayerEmote({
      text: emote,
      expires: Date.now() + 4500
    });
  }, []);

  const handleJump = useCallback(() => {
    jumpTriggerRef.current = true;
  }, []);

  const handleToggleTimeOfDay = useCallback(() => {
    setTimeOfDay(prev => prev === 'day' ? 'sunset' : prev === 'sunset' ? 'night' : 'day');
  }, []);

  // Show a temporary comic badge decal
  const showBadge = (text: string, icon: string) => {
    setActiveBadge({ text, icon });
    setTimeout(() => {
      setActiveBadge(prev => prev?.text === text ? null : prev);
    }, 2400);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEEB');
    scene.fog = new THREE.FogExp2('#87CEEB', 0.009);

    // 2. CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight - 130);
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 600);
    const targetCameraPos = new THREE.Vector3();

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight('#FFFBEB', 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#FFFFFF', '#E8D2A6', 0.6);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight('#F59E0B', 2.0);
    sunLight.position.set(35, 45, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 280;
    sunLight.shadow.camera.left = -90;
    sunLight.shadow.camera.right = 90;
    sunLight.shadow.camera.top = 90;
    sunLight.shadow.camera.bottom = -90;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Night Point Lights for Atmosphere
    const nightLightGroup = new THREE.Group();
    const lanternLight1 = new THREE.PointLight('#FBBF24', 0, 18);
    lanternLight1.position.set(24, 4.5, 0); // On the bridge
    nightLightGroup.add(lanternLight1);

    const lanternLight2 = new THREE.PointLight('#38BDF8', 0, 25);
    lanternLight2.position.set(30, 8, -50); // Burj Khalifa base
    nightLightGroup.add(lanternLight2);
    scene.add(nightLightGroup);

    // Update Atmosphere Lighting helper
    const updateAtmosphere = (mode: TimeOfDay) => {
      if (mode === 'sunset') {
        scene.background = new THREE.Color('#F97316');
        scene.fog = new THREE.FogExp2('#EA580C', 0.011);
        ambientLight.color.set('#FEF08A');
        ambientLight.intensity = 0.7;
        sunLight.color.set('#EF4444');
        sunLight.intensity = 2.4;
        lanternLight1.intensity = 1.0;
        lanternLight2.intensity = 0.5;
      } else if (mode === 'night') {
        scene.background = new THREE.Color('#0F172A');
        scene.fog = new THREE.FogExp2('#0F172A', 0.012);
        ambientLight.color.set('#312E81');
        ambientLight.intensity = 0.45;
        sunLight.color.set('#6366F1');
        sunLight.intensity = 0.6;
        lanternLight1.intensity = 2.5;
        lanternLight2.intensity = 3.0;
      } else {
        // Day
        scene.background = new THREE.Color('#87CEEB');
        scene.fog = new THREE.FogExp2('#87CEEB', 0.009);
        ambientLight.color.set('#FFFBEB');
        ambientLight.intensity = 0.85;
        sunLight.color.set('#F59E0B');
        sunLight.intensity = 2.0;
        lanternLight1.intensity = 0;
        lanternLight2.intensity = 0;
      }
    };

    updateAtmosphere(timeOfDay);

    // 5. GROUND & EXPANDED WORLD (240 x 240 m)
    const groundGeo = new THREE.PlaneGeometry(260, 260);
    const groundMat = new THREE.MeshLambertMaterial({ color: '#E8D2A6' });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Subtle Neo-Brutalist Grid
    const gridHelper = new THREE.GridHelper(260, 130, '#d1d5db', '#d1d5db');
    gridHelper.position.y = 0.02;
    (gridHelper.material as THREE.Material).opacity = 0.2;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // 6. ROLLING SAND DUNES (Western Edge)
    const createDune = (x: number, z: number, r: number, h: number) => {
      const duneGeo = new THREE.ConeGeometry(r, h, 16);
      const duneMat = new THREE.MeshLambertMaterial({ color: '#D97706' });
      const dune = new THREE.Mesh(duneGeo, duneMat);
      dune.position.set(x, h / 2, z);
      dune.scale.set(1.4, 0.4, 1.0);
      dune.receiveShadow = true;
      dune.castShadow = true;
      return dune;
    };
    scene.add(createDune(-45, -50, 18, 5.0));
    scene.add(createDune(-40, -65, 22, 6.5));
    scene.add(createDune(-50, 35, 20, 5.5));

    // 7. ROADS & GRAND BOULEVARDS
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
    // Heritage district roads
    scene.add(createRoad(10, 150, -10, 0));
    scene.add(createRoad(90, 10, -15, 20, Math.PI / 2));
    scene.add(createRoad(90, 10, -15, -25, Math.PI / 2));
    // Modern district boulevard (across the creek)
    scene.add(createRoad(12, 160, 32, -10));
    scene.add(createRoad(70, 10, 32, -45, Math.PI / 2));

    // 8. DUBAI CREEK WATERWAY (x = 8.5 to 43.5)
    const creekGeo = new THREE.PlaneGeometry(35, 240);
    const creekMat = new THREE.MeshLambertMaterial({ 
      color: '#38BDF8', 
      transparent: true, 
      opacity: 0.88 
    });
    const creekMesh = new THREE.Mesh(creekGeo, creekMat);
    creekMesh.rotation.x = -Math.PI / 2;
    creekMesh.position.set(26, 0.05, 0);
    creekMesh.receiveShadow = true;
    scene.add(creekMesh);

    // Creek West Quay Wall
    const quayGeo = new THREE.BoxGeometry(1.5, 0.8, 240);
    const quayMat = new THREE.MeshLambertMaterial({ color: '#C2A378' });
    const quayWest = new THREE.Mesh(quayGeo, quayMat);
    quayWest.position.set(8.5, 0.4, 0);
    quayWest.receiveShadow = true;
    quayWest.castShadow = true;
    scene.add(quayWest);

    // Creek East Quay Wall (Modern side)
    const quayEast = new THREE.Mesh(quayGeo, quayMat);
    quayEast.position.set(43.5, 0.4, 0);
    quayEast.receiveShadow = true;
    quayEast.castShadow = true;
    scene.add(quayEast);

    // 9. GRAND HERITAGE CAUSEWAY / ARCH BRIDGE ACROSS CREEK (x: 7.5 to 44.5, z: 0)
    const bridgeGroup = new THREE.Group();
    const bridgeLength = 37.0; // from x=7.5 to x=44.5
    const bridgeWidth = 8.0;
    const bridgePlankMat = new THREE.MeshLambertMaterial({ color: '#78350F' });
    const bridgeRailingMat = new THREE.MeshLambertMaterial({ color: '#FBBF24' });

    // Curved segments for bridge deck
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const bx = 7.5 + t * bridgeLength;
      const by = 0.4 + Math.sin(t * Math.PI) * 3.2; // Peak height 3.6m
      const segGeo = new THREE.BoxGeometry(bridgeLength / segments + 0.1, 0.4, bridgeWidth);
      const segMesh = new THREE.Mesh(segGeo, bridgePlankMat);
      segMesh.position.set(bx, by, 0);
      segMesh.castShadow = true;
      segMesh.receiveShadow = true;
      bridgeGroup.add(segMesh);

      // Side balustrade railings
      if (i % 2 === 0) {
        for (let rz of [-bridgeWidth / 2 + 0.2, bridgeWidth / 2 - 0.2]) {
          const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.2);
          const post = new THREE.Mesh(postGeo, bridgeRailingMat);
          post.position.set(bx, by + 0.7, rz);
          post.castShadow = true;
          bridgeGroup.add(post);
        }
      }
    }
    // Bridge Lanterns on arch crest
    const bridgeLanternGeo = new THREE.DodecahedronGeometry(0.35);
    const bridgeLanternMat = new THREE.MeshLambertMaterial({ color: '#FBBF24', emissive: '#F59E0B', emissiveIntensity: 0.6 });
    const bLantern1 = new THREE.Mesh(bridgeLanternGeo, bridgeLanternMat);
    bLantern1.position.set(26, 4.4, -bridgeWidth / 2 + 0.2);
    const bLantern2 = new THREE.Mesh(bridgeLanternGeo, bridgeLanternMat);
    bLantern2.position.set(26, 4.4, bridgeWidth / 2 - 0.2);
    bridgeGroup.add(bLantern1, bLantern2);
    scene.add(bridgeGroup);

    // 10. TRADITIONAL ABRA BOATS IN THE CREEK
    const createAbra = (zPos: number) => {
      const abraGroup = new THREE.Group();
      const hullGeo = new THREE.BoxGeometry(3.5, 0.6, 6.5);
      const hullMat = new THREE.MeshLambertMaterial({ color: '#78350F' });
      const hull = new THREE.Mesh(hullGeo, hullMat);
      hull.position.y = 0.3;
      hull.castShadow = true;
      abraGroup.add(hull);

      const roofGeo = new THREE.BoxGeometry(3.2, 0.1, 5.0);
      const roofMat = new THREE.MeshLambertMaterial({ color: '#FBBF24' });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 1.6;
      roof.castShadow = true;
      abraGroup.add(roof);

      for (let px of [-1.4, 1.4]) {
        for (let pz of [-2.2, 2.2]) {
          const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.3);
          const pole = new THREE.Mesh(poleGeo, new THREE.MeshLambertMaterial({ color: '#52290D' }));
          pole.position.set(px, 0.95, pz);
          abraGroup.add(pole);
        }
      }
      abraGroup.position.set(20, 0, zPos);
      return abraGroup;
    };
    const abra1 = createAbra(-18);
    const abra2 = createAbra(22);
    scene.add(abra1);
    scene.add(abra2);

    // 11. DUBAI LANDMARKS
    // a) Burj Khalifa
    const bkGroup = new THREE.Group();
    const bkSilver = new THREE.MeshLambertMaterial({ color: '#E2E8F0' });
    const bkDark = new THREE.MeshLambertMaterial({ color: '#4B5563' });
    for (let i = 0; i < 5; i++) {
      const size = 7 - i * 1.2;
      const h = 10;
      const boxGeo = new THREE.BoxGeometry(size, h, size);
      const box = new THREE.Mesh(boxGeo, i === 0 ? bkDark : bkSilver);
      box.position.y = i * h + h / 2;
      box.castShadow = true;
      box.receiveShadow = true;
      bkGroup.add(box);
    }
    const bkSpireGeo = new THREE.CylinderGeometry(0.15, 0.6, 12, 4);
    const bkSpire = new THREE.Mesh(bkSpireGeo, bkSilver);
    bkSpire.position.y = 56;
    bkSpire.castShadow = true;
    bkGroup.add(bkSpire);
    bkGroup.position.set(30, 0, -50);
    scene.add(bkGroup);

    // b) Dubai Frame
    const dfGroup = new THREE.Group();
    const goldMat = new THREE.MeshLambertMaterial({ color: '#D4AF37' });
    const pillarGeo = new THREE.BoxGeometry(2.5, 26, 2.5);
    const p1 = new THREE.Mesh(pillarGeo, goldMat);
    p1.position.set(-7, 13, 0);
    p1.castShadow = true;
    const p2 = new THREE.Mesh(pillarGeo, goldMat);
    p2.position.set(7, 13, 0);
    p2.castShadow = true;
    const bridgeGeo = new THREE.BoxGeometry(16.5, 2.5, 2.5);
    const bridge = new THREE.Mesh(bridgeGeo, goldMat);
    bridge.position.set(0, 25, 0);
    bridge.castShadow = true;
    dfGroup.add(p1, p2, bridge);
    dfGroup.position.set(-25, 0, -35);
    scene.add(dfGroup);

    // c) Burj Al Arab
    const baaGroup = new THREE.Group();
    const whiteMat = new THREE.MeshLambertMaterial({ color: '#F8FAFC' });
    const tealMat = new THREE.MeshLambertMaterial({ color: '#0D9488' });
    const sailGeo = new THREE.CylinderGeometry(0.1, 5.5, 22, 3);
    const sail = new THREE.Mesh(sailGeo, whiteMat);
    sail.position.y = 11;
    sail.rotation.y = -Math.PI / 2;
    sail.castShadow = true;
    const accentGeo = new THREE.CylinderGeometry(0.5, 0.5, 24, 16);
    const accent = new THREE.Mesh(accentGeo, tealMat);
    accent.position.set(2.2, 12, 0);
    accent.rotation.z = -0.15;
    baaGroup.add(sail, accent);
    const islandGeo = new THREE.CylinderGeometry(10, 10, 0.6, 32);
    const islandMat = new THREE.MeshLambertMaterial({ color: '#CBD5E1' });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = 0.3;
    island.receiveShadow = true;
    baaGroup.add(island);
    baaGroup.position.set(40, 0, 25);
    scene.add(baaGroup);

    // d) Museum of the Future
    const motfGroup = new THREE.Group();
    const chromeMat = new THREE.MeshStandardMaterial({ color: '#CBD5E1', roughness: 0.25, metalness: 0.8 });
    const torusGeo = new THREE.TorusGeometry(4.5, 2.2, 16, 50);
    const torus = new THREE.Mesh(torusGeo, chromeMat);
    torus.position.y = 6.5;
    torus.castShadow = true;
    const baseGeo = new THREE.BoxGeometry(7, 1.2, 5);
    const base = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: '#334155' }));
    base.position.y = 0.6;
    motfGroup.add(torus, base);
    motfGroup.position.set(-35, 0, 15);
    motfGroup.rotation.y = Math.PI / 4;
    scene.add(motfGroup);

    // 12. AL FAHIDI HISTORIC BUILDINGS & ROOFTOP OVERLOOK
    const buildingMat = new THREE.MeshLambertMaterial({ color: '#D4B996' });
    const woodMat = new THREE.MeshLambertMaterial({ color: '#451A03' });

    // Special Wind-Tower Rooftop Observatory (walkable via ramp)
    const observatoryGroup = new THREE.Group();
    const obsBase = new THREE.Mesh(new THREE.BoxGeometry(10, 5.5, 12), buildingMat);
    obsBase.position.set(-16, 2.75, -18);
    obsBase.castShadow = true;
    obsBase.receiveShadow = true;
    observatoryGroup.add(obsBase);

    // Rooftop Walkable Deck
    const obsDeck = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.3, 11.6), woodMat);
    obsDeck.position.set(-16, 5.65, -18);
    obsDeck.receiveShadow = true;
    observatoryGroup.add(obsDeck);

    // Rooftop Safety Railings
    const obsRailing = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.8, 11.8), new THREE.MeshBasicMaterial({ wireframe: true, color: '#FBBF24' }));
    obsRailing.position.set(-16, 6.1, -18);
    observatoryGroup.add(obsRailing);

    // Walkable Angled Ramp up to Rooftop (from x: -9 to x: -16 at z: -18)
    const rampLength = 7.0;
    const rampAngle = Math.atan2(5.5, rampLength);
    const rampGeo = new THREE.BoxGeometry(Math.hypot(rampLength, 5.5), 0.4, 2.4);
    const ramp = new THREE.Mesh(rampGeo, woodMat);
    ramp.position.set(-12.5, 2.75, -18);
    ramp.rotation.z = rampAngle;
    ramp.castShadow = true;
    ramp.receiveShadow = true;
    observatoryGroup.add(ramp);
    scene.add(observatoryGroup);

    // Other heritage buildings
    const createAlFahidiHouse = (x: number, z: number, w: number, h: number, d: number) => {
      const houseGroup = new THREE.Group();
      const main = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
      main.position.y = h / 2;
      main.castShadow = true;
      main.receiveShadow = true;
      houseGroup.add(main);
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.2), woodMat);
      door.position.set(0, 1.1, d / 2 + 0.05);
      houseGroup.add(door);
      const tower = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.5, 2.5), buildingMat);
      tower.position.set(w / 3, h + 1.75, -d / 3);
      tower.castShadow = true;
      houseGroup.add(tower);
      houseGroup.position.set(x, 0, z);
      return houseGroup;
    };
    scene.add(createAlFahidiHouse(-18, 8, 11, 6.0, 14));
    scene.add(createAlFahidiHouse(-6, -26, 8, 4.8, 9));
    scene.add(createAlFahidiHouse(-2, 22, 10, 5.2, 11));
    scene.add(createAlFahidiHouse(-28, -6, 12, 6.5, 12));

    // 13. INTERACTIVE SPEED BOOST PADS (⚡)
    const boostPads = [
      { x: -10, z: 0 },
      { x: 26, z: 0 },
      { x: 32, z: -30 }
    ];
    const boostPadMeshes: THREE.Mesh[] = [];
    boostPads.forEach((pad) => {
      const padGeo = new THREE.BoxGeometry(3.0, 0.1, 4.5);
      const padMat = new THREE.MeshLambertMaterial({ 
        color: '#06B6D4', 
        emissive: '#0891B2', 
        emissiveIntensity: 0.8 
      });
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padMesh.position.set(pad.x, 0.08, pad.z);
      scene.add(padMesh);
      boostPadMeshes.push(padMesh);
    });

    // 14. INTERACTIVE TRAMPOLINE BOUNCE PADS (🦘)
    const bouncePads = [
      { x: -8, z: 12 },
      { x: 32, z: -15 }
    ];
    const bouncePadMeshes: THREE.Mesh[] = [];
    bouncePads.forEach((pad) => {
      const bGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.25, 24);
      const bMat = new THREE.MeshLambertMaterial({ 
        color: '#F59E0B', 
        emissive: '#D97706', 
        emissiveIntensity: 0.7 
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(pad.x, 0.15, pad.z);
      scene.add(bMesh);
      bouncePadMeshes.push(bMesh);
    });

    // 15. SECRET MYSTERY CHESTS (🎁)
    const chests = [
      { id: 'chest-rooftop', x: -16, y: 5.8, z: -16, opened: false },
      { id: 'chest-burj', x: 34, y: 0.3, z: -62, opened: false }
    ];
    const chestMeshes: { [id: string]: { group: THREE.Group; lid: THREE.Mesh } } = {};
    chests.forEach((ch) => {
      const cGroup = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.8, 1.0),
        new THREE.MeshLambertMaterial({ color: '#78350F' })
      );
      trunk.position.y = 0.4;
      trunk.castShadow = true;
      cGroup.add(trunk);

      const lid = new THREE.Mesh(
        new THREE.BoxGeometry(1.45, 0.3, 1.05),
        new THREE.MeshLambertMaterial({ color: '#FBBF24', emissive: '#F59E0B', emissiveIntensity: 0.4 })
      );
      lid.position.set(0, 0.95, -0.45);
      lid.castShadow = true;
      cGroup.add(lid);

      cGroup.position.set(ch.x, ch.y, ch.z);
      scene.add(cGroup);
      chestMeshes[ch.id] = { group: cGroup, lid };
    });

    // 16. PALM TREES
    const createPalmTree = (x: number, z: number) => {
      const palmGroup = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.35, 4.5, 6),
        new THREE.MeshLambertMaterial({ color: '#78350F' })
      );
      trunk.position.y = 2.25;
      trunk.castShadow = true;
      palmGroup.add(trunk);

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
        const leaf = new THREE.Mesh(
          new THREE.ConeGeometry(0.9, 2.2, 4),
          new THREE.MeshLambertMaterial({ color: '#15803D' })
        );
        leaf.position.set(Math.cos(angle) * 0.9, 4.3, Math.sin(angle) * 0.9);
        leaf.rotation.x = Math.PI / 3;
        leaf.rotation.y = angle;
        leaf.castShadow = true;
        palmGroup.add(leaf);
      }
      palmGroup.position.set(x, 0, z);
      return palmGroup;
    };
    const palmPositions = [
      [6, -8], [5, 12], [-8, -10], [-10, 16], [2, -2],
      [45, -15], [45, 10], [38, -35], [38, 30]
    ];
    palmPositions.forEach(([px, pz]) => scene.add(createPalmTree(px, pz)));

    // 17. PLAYER RIG & AVATARS
    const createCharacterRig = (primaryColor: string, isMainPlayer: boolean) => {
      const rigGroup = new THREE.Group();
      const bodyMat = new THREE.MeshLambertMaterial({ color: primaryColor });
      const skinMat = new THREE.MeshLambertMaterial({ color: '#FDE047' });
    
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.1, 4), bodyMat);
      torso.rotation.y = Math.PI / 4;
      torso.position.y = 0.85;
      torso.castShadow = true;
      rigGroup.add(torso);
    
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), skinMat);
      head.position.y = 1.6;
      head.castShadow = true;
      rigGroup.add(head);
    
      const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16), new THREE.MeshLambertMaterial({ color: '#FBBF24' }));
      hat.position.y = 1.95;
      hat.castShadow = true;
      rigGroup.add(hat);
    
      if (isMainPlayer) {
        const pack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.35), new THREE.MeshLambertMaterial({ color: '#FF5722' }));
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

    const playerGroup = new THREE.Group();
    const playerChar = createCharacterRig('#1B3FFF', true);
    playerGroup.add(playerChar.rigGroup);
    playerGroup.position.set(0, 0, 0);
    scene.add(playerGroup);

    // Remote Players
    remotePlayersRef.current.forEach((rp) => {
      const rGroup = new THREE.Group();
      const char = createCharacterRig(rp.avatarColor, false);
      rGroup.add(char.rigGroup);
      rGroup.position.set(rp.x, rp.y || 0, rp.z);
      rGroup.rotation.y = rp.rotationY || 0;
      scene.add(rGroup);
    });

    // 18. 3D COLLECTIBLE ITEMS MESHES
    const collectibleMeshes: { [id: string]: THREE.Group } = {};
    const collectibleRings: { [id: string]: THREE.MeshLambertMaterial } = {};

    INITIAL_VG_WORLD_COLLECTIBLES.forEach((item) => {
      const cGroup = new THREE.Group();
      let mesh: THREE.Mesh;

      if (item.type === 'pearl') {
        const geo = new THREE.SphereGeometry(0.4, 16, 16);
        const mat = new THREE.MeshLambertMaterial({ color: '#E0F2FE', emissive: '#38BDF8', emissiveIntensity: 0.25 });
        mesh = new THREE.Mesh(geo, mat);
      } else if (item.type === 'coin') {
        const geo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16);
        const mat = new THREE.MeshLambertMaterial({ color: '#FBBF24', emissive: '#D97706', emissiveIntensity: 0.35 });
        mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = Math.PI / 2;
      } else {
        const geo = new THREE.DodecahedronGeometry(0.38);
        const mat = new THREE.MeshLambertMaterial({ color: item.color, emissive: item.color, emissiveIntensity: 0.2 });
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

    // 19. CAMERA DRAG & ROTATION
    let cameraAngle = Math.PI * 0.75;
    let cameraPitch = 0.45;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      // Do not capture drag if touching virtual joystick area or jump button
      if (clientX < 180 && clientY > height - 180) return;
      if (clientX > width - 100 && clientY > height - 100) return;

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
      cameraPitch = Math.max(0.18, Math.min(1.25, cameraPitch + deltaY * 0.005));
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

    // Keyboard controls
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.code === 'Space') {
        jumpTriggerRef.current = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const onWindowResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (window.innerHeight - 130);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onWindowResize);

    // 20. PHYSICS & HEIGHT CALCULATION
    const getGroundHeight = (px: number, pz: number): number => {
      // 1. Grand Arch Bridge: x between 7.5 and 44.5, z between -4.2 and 4.2
      if (px >= 7.5 && px <= 44.5 && Math.abs(pz) <= 4.2) {
        const t = (px - 7.5) / 37.0;
        return 0.4 + Math.sin(t * Math.PI) * 3.2;
      }
      // 2. Wind-Tower Rooftop Observatory deck: x: [-21, -11], z: [-24, -12]
      if (px >= -21 && px <= -11 && pz >= -24 && pz <= -12) {
        return 5.65;
      }
      // 3. Observatory Ramp: x between -11 and -7 at z around -18
      if (px >= -16 && px <= -9 && Math.abs(pz - (-18)) <= 1.4) {
        const rampProgress = (-9 - px) / 7.0;
        return Math.max(0, Math.min(5.65, rampProgress * 5.65));
      }
      // 4. Sand dunes (Gentle rise on west side)
      if (px <= -30 && pz <= -35) {
        return Math.max(0, ((-30 - px) / 20.0) * 2.2);
      }
      return 0;
    };

    // 21. MAIN GAME LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const velocity = new THREE.Vector3();
    let playerY = 0;
    let playerVelY = 0;
    let isGrounded = true;
    const gravity = -28.0;
    const baseSpeed = 10.0;
    const accelRate = baseSpeed / 0.15;
    const decelRate = baseSpeed / 0.1;

    // Initial camera placement
    const camDist = 7.5;
    targetCameraPos.x = playerGroup.position.x + Math.sin(cameraAngle) * Math.cos(cameraPitch) * camDist;
    targetCameraPos.y = playerGroup.position.y + Math.sin(cameraPitch) * camDist + 1.2;
    targetCameraPos.z = playerGroup.position.z + Math.cos(cameraAngle) * Math.cos(cameraPitch) * camDist;
    camera.position.copy(targetCameraPos);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();
      const now = Date.now();

      // Check speed boost expiration
      const isBoosting = now < speedBoostExpiresRef.current;
      setSpeedBoostActive(isBoosting);
      const currentMaxSpeed = isBoosting ? 17.5 : baseSpeed;

      // Collect movement input
      const joyX = moveVectorRef.current.x;
      const joyY = moveVectorRef.current.y;

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

        const fwdX = -Math.sin(cameraAngle);
        const fwdZ = -Math.cos(cameraAngle);
        const rightX = Math.cos(cameraAngle);
        const rightZ = -Math.sin(cameraAngle);

        const worldX = normX * rightX + normY * fwdX;
        const worldZ = normX * rightZ + normY * fwdZ;

        const effectiveSpeed = currentMaxSpeed * Math.min(1, inputLen);
        targetVelocity.set(worldX, 0, worldZ).multiplyScalar(effectiveSpeed);
      }

      // Smooth horizontal velocity
      const rate = targetVelocity.lengthSq() > 0 ? accelRate : decelRate;
      const diff = targetVelocity.clone().sub(velocity);
      if (diff.length() <= rate * delta) {
        velocity.copy(targetVelocity);
      } else {
        velocity.add(diff.normalize().multiplyScalar(rate * delta));
      }

      playerGroup.position.addScaledVector(velocity, delta);

      // Map boundary checks (expanded across Creek to modern district)
      playerGroup.position.x = Math.max(-55, Math.min(60, playerGroup.position.x));
      playerGroup.position.z = Math.max(-85, Math.min(85, playerGroup.position.z));

      // Water barrier: prevent walking in deep water if not on bridge
      const inWaterChannel = playerGroup.position.x > 8.8 && playerGroup.position.x < 43.2;
      const onBridgeDeck = Math.abs(playerGroup.position.z) <= 4.2;
      if (inWaterChannel && !onBridgeDeck) {
        // Soft boundary reflection push
        if (playerGroup.position.x < 26) {
          playerGroup.position.x = 8.6;
        } else {
          playerGroup.position.x = 43.4;
        }
      }

      // Vertical gravity & Ground Collision
      const targetGround = getGroundHeight(playerGroup.position.x, playerGroup.position.z);

      // Check Jump Trigger
      if (jumpTriggerRef.current) {
        jumpTriggerRef.current = false;
        if (isGrounded) {
          playerVelY = 11.5;
          isGrounded = false;
          playSoundEffect('jump');
        }
      }

      if (!isGrounded) {
        playerVelY += gravity * delta;
        playerY += playerVelY * delta;
        if (playerY <= targetGround) {
          playerY = targetGround;
          playerVelY = 0;
          isGrounded = true;
        }
      } else {
        // Snap/smooth to ground terrain height
        playerY = THREE.MathUtils.lerp(playerY, targetGround, 0.25);
      }

      playerGroup.position.y = playerY;

      // Character orientation and run animation
      const currentSpeed = velocity.length();
      if (currentSpeed > 0.1) {
        playerGroup.rotation.y = Math.atan2(velocity.x, velocity.z);
        const animSpeed = isBoosting ? 24 : 15;
        const bob = Math.abs(Math.sin(time * animSpeed)) * 0.12 * (currentSpeed / currentMaxSpeed);
        playerChar.rigGroup.position.y = bob;
        
        const swing = Math.sin(time * animSpeed) * 0.65;
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

      // Smooth camera follow with orbit
      targetCameraPos.x = playerGroup.position.x + Math.sin(cameraAngle) * Math.cos(cameraPitch) * camDist;
      targetCameraPos.y = playerGroup.position.y + Math.sin(cameraPitch) * camDist + 1.2;
      targetCameraPos.z = playerGroup.position.z + Math.cos(cameraAngle) * Math.cos(cameraPitch) * camDist;
      camera.position.lerp(targetCameraPos, 0.08);
      camera.lookAt(playerGroup.position.x, playerGroup.position.y + 1.2, playerGroup.position.z);

      // Check Speed Boost Pads proximity (<= 2.0m)
      boostPads.forEach((pad) => {
        const d = Math.hypot(playerGroup.position.x - pad.x, playerGroup.position.z - pad.z);
        if (d <= 2.2 && !isBoosting) {
          speedBoostExpiresRef.current = Date.now() + 3200;
          playSoundEffect('boost');
          showBadge('⚡ SPEED SURGE!', '⚡');
        }
      });

      // Check Bounce Pads proximity (<= 1.8m)
      bouncePads.forEach((pad) => {
        const d = Math.hypot(playerGroup.position.x - pad.x, playerGroup.position.z - pad.z);
        if (d <= 2.0 && isGrounded) {
          playerVelY = 17.0; // Mega bounce launch
          isGrounded = false;
          playSoundEffect('bounce');
          showBadge('SUPER BOUNCE!', '🦘');
        }
      });

      // Check Secret Chests proximity (<= 2.2m)
      chests.forEach((ch) => {
        if (!ch.opened) {
          const d = Math.hypot(playerGroup.position.x - ch.x, playerGroup.position.z - ch.z);
          if (d <= 2.2) {
            ch.opened = true;
            const meshEntry = chestMeshes[ch.id];
            if (meshEntry) {
              meshEntry.lid.rotation.x = -Math.PI / 3; // Open lid
            }
            playSoundEffect('chest');
            setScore(prev => prev + 250);
            if (onScoreUpdate) onScoreUpdate(score + 250, collectibles.filter(c => c.type === 'pearl' && c.collected).length);
            showBadge('SECRET CHEST +250 PTS!', '🎁');
          }
        }
      });

      // Rotate & Bob Collectibles, collect on proximity
      const pulse = 0.5 + Math.sin(time * 3) * 0.3;
      INITIAL_VG_WORLD_COLLECTIBLES.forEach((item) => {
        const cMesh = collectibleMeshes[item.id];
        const ringMat = collectibleRings[item.id];
        if (ringMat) ringMat.emissiveIntensity = pulse;

        if (cMesh && cMesh.visible) {
          cMesh.rotation.y += 2.2 * delta;
          cMesh.position.y = item.y + Math.sin(time * 3 + item.x) * 0.16;

          const dist = Math.hypot(
            playerGroup.position.x - item.x,
            playerGroup.position.z - item.z
          );

          if (dist <= 1.4) {
            cMesh.visible = false;
            playSoundEffect('pickup');

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

      // Proximity to remote players (<= 3.5m)
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

    // 22. CLEANUP INVARIANT (THREE.JS VRAM MEMORY CLEANUP)
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
  }, [timeOfDay, onScoreUpdate]);

  const pearlsCollected = collectibles.filter(c => c.type === 'pearl' && c.collected).length;
  const totalPearls = collectibles.filter(c => c.type === 'pearl').length;

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[480px] bg-[#87CEEB] overflow-hidden rounded-2xl border-[2.5px] border-[#111827] shadow-[4px_4px_0px_#111827]">
      
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Game HUD (Score, Pearls, Atmosphere, Jump & Lore Popup) */}
      <GameHUD
        score={score}
        pearlsCollected={pearlsCollected}
        totalPearls={totalPearls}
        playersOnline={3}
        nearbyPlayerName={nearbyPlayerName}
        onSendEmote={handleSendEmote}
        unlockedItem={unlockedItem}
        onDismissUnlock={() => setUnlockedItem(null)}
        timeOfDay={timeOfDay}
        onToggleTimeOfDay={handleToggleTimeOfDay}
        speedBoostActive={speedBoostActive}
        onJump={handleJump}
        activeBadge={activeBadge}
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
