import React, { useEffect, useRef, useState, useTransition } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getThemeColors, createHouse } from './HouseBuilder';
import { TimeOfDay, MaterialTheme, HotspotData } from '../types';

interface ThreeCanvasProps {
  timeOfDay: TimeOfDay;
  theme: MaterialTheme;
  explodeProgress: number; // 0 (closed) to 1 (fully exploded)
  interactionMode: 'cursor' | 'orbit';
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
  gateOpen: boolean;
}

// 3D Hotspot Coordinates matching the House geometry
const HOTSPOTS: HotspotData[] = [
  {
    id: 'gate',
    name: 'Smart Teak Gate',
    description: 'Sliding security entrance with black steel framing and frosted glass inserts.',
    position: [0.6, 0.6, 3.5],
    info: 'A motor-driven sliding gate crafted from rich water-resistant timber. Operates via biometrics and features dual glowing ambient wall sconces.'
  },
  {
    id: 'stairs',
    name: 'External Staircase',
    description: 'Cantilevered concrete flights with industrial metal handrails and landing platforms.',
    position: [-2.2, 4.4, 0.2],
    info: 'Provides secure, private external access to each residential level. The modern structural design forms a beautiful geometric profile on the left facade.'
  },
  {
    id: 'balcony',
    name: 'Level 1 Balcony',
    description: 'Projecting lounge balcony with panoramic floor-to-ceiling glass doors.',
    position: [-0.3, 2.5, 3.2],
    info: 'Extended lounge terrace designed for seamless indoor-outdoor living, secured by high-tensile safety wire balustrades and stainless steel framing.'
  },
  {
    id: 'louvers',
    name: 'Smart Louver Stack',
    description: 'Signature architectural wing with vertical charcoal sunscreens and embedded window pods.',
    position: [2.2, 5.0, 0.8],
    info: 'A prominent vertical column providing natural ventilation, privacy, and solar shade. Styled with high-contrast matte charcoal finishes and inset multi-glazed windows.'
  },
  {
    id: 'terrace',
    name: 'Rooftop Pergola',
    description: 'Skydeck with a white structural timber trellis and a sustainable planter.',
    position: [0.3, 10.3, 0.8],
    info: 'An open-air relaxation deck equipped with a modern pergola rafter system, weather-proof wood decks, and local flora planters.'
  }
];

// Helper to create a realistic, fluffy large floating cloud group
function createStylizedCloud(scale: number = 1.0): THREE.Group {
  const group = new THREE.Group();
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.85,
    flatShading: false, // smooth realistic curves
  });

  const puffs = [
    { x: 0, y: 0, z: 0, r: 1.8 },               // Central core puff
    { x: -1.3, y: -0.1, z: 0.2, r: 1.3 },       // Left shoulder
    { x: 1.3, y: -0.1, z: -0.2, r: 1.3 },        // Right shoulder
    { x: -0.8, y: 0.8, z: -0.1, r: 1.4 },        // Top left crest
    { x: 0.7, y: 0.9, z: 0.1, r: 1.5 },         // Top right crest
    { x: 0.0, y: 1.3, z: -0.2, r: 1.2 },         // High middle crown
    { x: -2.3, y: -0.4, z: 0.3, r: 0.9 },       // Far left low tail
    { x: 2.3, y: -0.4, z: -0.3, r: 0.9 },        // Far right low tail
    { x: 0.8, y: -0.3, z: 1.1, r: 1.1 },         // Front fullness
    { x: -0.8, y: -0.3, z: -1.1, r: 1.1 }        // Back fullness
  ];

  puffs.forEach((puff) => {
    const geom = new THREE.SphereGeometry(puff.r * scale, 24, 24);
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(puff.x * scale, puff.y * scale, puff.z * scale);
    group.add(mesh);
  });

  return group;
}

export default function ThreeCanvas({
  timeOfDay,
  theme,
  explodeProgress,
  interactionMode,
  activeHotspot,
  setActiveHotspot,
  gateOpen
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States to keep projected screen positions of hotspots for HTML overlays
  const [projectedHotspots, setProjectedHotspots] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // References for anim frame updates
  const mouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const houseGroupRef = useRef<THREE.Group | null>(null);
  const celestialRef = useRef<THREE.Group | null>(null);
  const cloudsRef = useRef<Array<{
    group: THREE.Group;
    speed: number;
    initialY: number;
    noiseOffset: number;
    baseX: number;
    baseZ: number;
  }>>([]);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    sun: THREE.DirectionalLight;
    pointLights: THREE.PointLight[];
  } | null>(null);

  // Handle cursor tracking coordinate updates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current = { x, y };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(7.5, 6.2, 9.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 22;
    controls.target.set(0, 4.2, 0);
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    const d = 8.5;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.001;
    sunLight.shadow.radius = 5.5;
    scene.add(sunLight);

    const p1 = new THREE.PointLight(0xfde047, 0, 4);
    p1.position.set(0.9, 3.6, 2.7);
    p1.castShadow = true;
    p1.shadow.bias = -0.001;
    p1.shadow.radius = 4.0;
    scene.add(p1);

    const p2 = new THREE.PointLight(0xfde047, 0, 3);
    p2.position.set(-0.5, 0.8, 3.4);
    p2.castShadow = true;
    p2.shadow.bias = -0.001;
    p2.shadow.radius = 4.0;
    scene.add(p2);

    const p3 = new THREE.PointLight(0xfde047, 0, 3);
    p3.position.set(1.7, 0.8, 3.4);
    p3.castShadow = true;
    p3.shadow.bias = -0.001;
    p3.shadow.radius = 4.0;
    scene.add(p3);

    const p4 = new THREE.PointLight(0xfde047, 0, 5);
    p4.position.set(-0.5, 1.0, 0);
    scene.add(p4);

    const p5 = new THREE.PointLight(0xfde047, 0, 5);
    p5.position.set(-0.5, 3.2, 0);
    scene.add(p5);

    lightsRef.current = {
      ambient: ambientLight,
      sun: sunLight,
      pointLights: [p1, p2, p3, p4, p5]
    };

    const celestialGroup = new THREE.Group();
    celestialGroup.name = 'celestial_body';

    const celestialCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff3a1 })
    );
    celestialCore.name = 'celestial_core';
    celestialGroup.add(celestialCore);

    const celestialGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xffe875,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      })
    );
    celestialGlow.name = 'celestial_glow';
    celestialGroup.add(celestialGlow);

    celestialGroup.position.set(8, 12, 6);
    scene.add(celestialGroup);
    celestialRef.current = celestialGroup;

    cloudsRef.current = [];
    const cloudConfigs = [
      { x: -18, y: 14, z: -12, speed: 0.003, size: 2.2 },
      { x: -8, y: 16, z: -16, speed: 0.002, size: 3.2 },
      { x: 3, y: 15, z: -14, speed: 0.0025, size: 2.8 },
      { x: 14, y: 17, z: -10, speed: 0.0018, size: 2.4 },
      { x: -11, y: 13, z: -6, speed: 0.0028, size: 2.0 },
      { x: 7, y: 12, z: -4, speed: 0.0022, size: 1.7 }
    ];

    cloudConfigs.forEach((config, idx) => {
      const cloudGroup = createStylizedCloud(config.size);
      cloudGroup.position.set(config.x, config.y, config.z);
      scene.add(cloudGroup);

      cloudsRef.current.push({
        group: cloudGroup,
        speed: config.speed,
        initialY: config.y,
        noiseOffset: idx * 2.5,
        baseX: config.x,
        baseZ: config.z
      });
    });

    const houseGroup = createHouse(theme, timeOfDay, explodeProgress, activeHotspot);
    scene.add(houseGroup);
    houseGroupRef.current = houseGroup;

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const defaultCameraPos = new THREE.Vector3(7.5, 6.2, 9.5);
    const defaultLookAt = new THREE.Vector3(0, 4.2, 0);

    const targetCamPos = defaultCameraPos.clone();
    const targetLookAtPos = defaultLookAt.clone();

    const currentLookAt = defaultLookAt.clone();

    const tick = () => {
      if (!sceneRef.current || !cameraRef.current || !controlsRef.current) return;

      const cam = cameraRef.current;
      const ctrl = controlsRef.current;

      if (activeHotspot) {
        switch (activeHotspot) {
          case 'gate':
            targetLookAtPos.set(0.6, 0.8, 3.3);
            targetCamPos.set(4.0, 2.2, 7.5);
            break;
          case 'stairs':
            targetLookAtPos.set(-2.2, 4.4, 0.2);
            targetCamPos.set(-7.5, 5.5, 6.0);
            break;
          case 'balcony':
            targetLookAtPos.set(-0.3, 2.5, 2.5);
            targetCamPos.set(2.2, 3.8, 6.8);
            break;
          case 'louvers':
            targetLookAtPos.set(2.2, 5.0, 0.8);
            targetCamPos.set(7.0, 5.5, 5.0);
            break;
          case 'terrace':
            targetLookAtPos.set(0.3, 10.3, 0.8);
            targetCamPos.set(4.5, 12.0, 5.5);
            break;
        }
      } else {
        targetLookAtPos.copy(defaultLookAt);
        targetCamPos.copy(defaultCameraPos);
      }

      if (interactionMode === 'cursor' && !activeHotspot) {
        ctrl.enabled = false;

        const angleX = mouseRef.current.x * 0.25;
        const angleY = mouseRef.current.y * 0.15;

        const mouseOffsetCam = new THREE.Vector3(
          defaultCameraPos.x + angleX * 5.0,
          defaultCameraPos.y + angleY * 3.5,
          defaultCameraPos.z - angleX * 3.0
        );

        cam.position.lerp(mouseOffsetCam, 0.06);
        currentLookAt.lerp(defaultLookAt, 0.06);
        cam.lookAt(currentLookAt);
      } else {
        ctrl.enabled = true;

        if (activeHotspot) {
          cam.position.lerp(targetCamPos, 0.05);
          ctrl.target.lerp(targetLookAtPos, 0.05);
        } else {
          cam.position.lerp(targetCamPos, 0.05);
          ctrl.target.lerp(targetLookAtPos, 0.05);
        }

        ctrl.update();
      }

      if (houseGroupRef.current) {
        const gate = houseGroupRef.current.getObjectByName('main_gate');
        if (gate) {
          const targetGateX = gateOpen ? -1.6 : 0.0;
          gate.position.x = THREE.MathUtils.lerp(gate.position.x, targetGateX, 0.08);
        }
      }

      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;

        const projected = HOTSPOTS.map((hotspot) => {
          const vector = new THREE.Vector3(...hotspot.position);
          if (explodeProgress > 0) {
            let floorIndex = 0;
            if (hotspot.id === 'stairs') floorIndex = 2;
            if (hotspot.id === 'balcony') floorIndex = 1;
            if (hotspot.id === 'louvers') floorIndex = 2;
            if (hotspot.id === 'terrace') floorIndex = 4;
            vector.y += floorIndex * 2.2 * explodeProgress + floorIndex * explodeProgress;
          }

          vector.project(cam);

          const screenX = (vector.x * 0.5 + 0.5) * w;
          const screenY = (-vector.y * 0.5 + 0.5) * h;

          return { id: hotspot.id, x: screenX, y: screenY };
        });

        startTransition(() => {
          setProjectedHotspots(projected);
        });
      }

      const elapsed = clock.getDelta();
      cloudsRef.current.forEach((cloud) => {
        cloud.group.position.x += cloud.speed * elapsed * 60;
        if (cloud.group.position.x > 18) {
          cloud.group.position.x = -18;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    const clock = new THREE.Clock();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [interactionMode]);

  useEffect(() => {
    if (sceneRef.current && houseGroupRef.current) {
      sceneRef.current.remove(houseGroupRef.current);
      const newHouse = createHouse(theme, timeOfDay, explodeProgress, activeHotspot);
      sceneRef.current.add(newHouse);
      houseGroupRef.current = newHouse;
    }

    if (lightsRef.current && celestialRef.current) {
      const isNight = timeOfDay === 'night';
      const isSunset = timeOfDay === 'sunset';

      const lights = lightsRef.current;
      const celestial = celestialRef.current;

      if (isNight) {
        sceneRef.current!.background = new THREE.Color(0x020617);
        lights.sun.color.setHex(0x38bdf8);
        lights.sun.intensity = 0.2;
        lights.sun.position.set(-6, 8, -4);
        lights.ambient.color.setHex(0x0f172a);
        lights.ambient.intensity = 0.3;

        celestial.position.set(-6, 8, -4);
        const core = celestial.getObjectByName('celestial_core') as THREE.Mesh;
        if (core) (core.material as THREE.MeshBasicMaterial).color.setHex(0xe2e8f0);

        lights.pointLights.forEach((light) => {
          light.intensity = 1.8;
        });
      } else if (isSunset) {
        sceneRef.current!.background = new THREE.Color(0xfc6a03);
        lights.sun.color.setHex(0xfb923c);
        lights.sun.intensity = 1.0;
        lights.sun.position.set(-8, 3, 2);
        lights.ambient.color.setHex(0x7c2d12);
        lights.ambient.intensity = 0.5;

        celestial.position.set(-8, 3, 2);
        const core = celestial.getObjectByName('celestial_core') as THREE.Mesh;
        if (core) (core.material as THREE.MeshBasicMaterial).color.setHex(0xfea356);

        lights.pointLights.forEach((light) => {
          light.intensity = 0.2;
        });
      } else {
        sceneRef.current!.background = new THREE.Color(0xf1f5f9);
        lights.sun.color.setHex(0xfef08a);
        lights.sun.intensity = 1.8;
        lights.sun.position.set(8, 12, 6);
        lights.ambient.color.setHex(0xffffff);
        lights.ambient.intensity = 0.8;

        celestial.position.set(8, 12, 6);
        const core = celestial.getObjectByName('celestial_core') as THREE.Mesh;
        if (core) (core.material as THREE.MeshBasicMaterial).color.setHex(0xfef08a);

        lights.pointLights.forEach((light) => {
          light.intensity = 0.0;
        });
      }
    }
  }, [theme, timeOfDay, explodeProgress, activeHotspot]);

  const handleHotspotClick = (id: string) => {
    if (activeHotspot === id) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(id);
    }
  };

  return (
    <div
      ref={containerRef}
      id="3d-canvas-wrapper"
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden bg-[#050505] transition-colors duration-500 rounded-none border border-white/10"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* HTML Absolute Interactive Hotspot Markers */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {projectedHotspots.map(({ id, x, y }) => {
          const data = HOTSPOTS.find((h) => h.id === id);
          if (!data) return null;

          const isActive = activeHotspot === id;
          const isHovered = hoveredHotspot === id;

          // Check if coordinate is within canvas bounds
          if (x < 15 || x > (containerRef.current?.clientWidth || 0) - 15 || y < 15 || y > (containerRef.current?.clientHeight || 0) - 15) {
            return null;
          }

          return (
            <div
              key={id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${x}px`, top: `${y}px`, zIndex: isActive ? 40 : 20 }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute w-8 h-8 rounded-full border transition-all duration-1000 animate-ping opacity-65 ${
                    isActive
                      ? 'border-white bg-white/20'
                      : 'border-white/40 bg-white/5'
                  }`}
                />

                <button
                  id={`hotspot-${id}`}
                  onClick={() => handleHotspotClick(id)}
                  onMouseEnter={() => setHoveredHotspot(id)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-2xl transition-all transform duration-300 ${
                    isActive
                      ? 'bg-white text-black border border-white scale-110'
                      : 'bg-black/60 text-white/80 border border-white/20 hover:bg-white hover:text-black hover:scale-110'
                  }`}
                >
                  {isActive ? '✕' : '•'}
                </button>

                {(isHovered || isActive) && (
                  <div
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 p-3 rounded-none border border-white/15 backdrop-blur-md transition-all duration-300 translate-y-0 ${
                      isActive
                        ? 'bg-[#0c0c0c]/95 text-white'
                        : 'bg-[#050505]/95 text-white/80'
                    }`}
                  >
                    <p className="font-medium text-[10px] uppercase tracking-widest font-mono text-white/90">{data.name}</p>
                    <p className="text-[9px] leading-relaxed mt-1 text-white/50 font-sans">{data.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none select-none font-mono">
        <h1 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Interactive 3D Sandbox
        </h1>
        <p className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">
          {interactionMode === 'cursor' ? 'Cursor Tracking Parallax' : '360° Free Orbit'}
        </p>
      </div>

      {activeHotspot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 bg-[#0c0c0c]/95 backdrop-blur-md text-white p-4 rounded-none border border-white/15 shadow-2xl animate-fade-in flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 border border-white/20 text-white/40 text-[8px] font-mono rounded-none uppercase tracking-[0.2em]">
                Specification
              </span>
              <h3 className="font-light text-base tracking-wide text-white font-serif">
                {HOTSPOTS.find((h) => h.id === activeHotspot)?.name}
              </h3>
            </div>
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed font-sans">
              {HOTSPOTS.find((h) => h.id === activeHotspot)?.info}
            </p>
          </div>
          <button
            onClick={() => setActiveHotspot(null)}
            className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black text-[9px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 rounded-none self-end md:self-auto cursor-pointer"
          >
            Reset View
          </button>
        </div>
      )}
    </div>
  );
}
