import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<"logic" | "ethics" | "reflection">("logic");
  const meshRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [interactionMessage, setInteractionMessage] = useState("Hover and drag the glass deck!");

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 450;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer with Alpha and antialias for glass aesthetics
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Card Core Geometry (Thick, rounded card-like box)
    const cardGeometry = new THREE.BoxGeometry(2.6, 4.0, 0.15);

    // Glass material with premium properties
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5, // Elegant Indigo
      metalness: 0.1,
      roughness: 0.15,
      transparent: true,
      opacity: 0.70,
      transmission: 0.85, // Refraction transparency
      ior: 1.5,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const cardMesh = new THREE.Mesh(cardGeometry, glassMaterial);
    group.add(cardMesh);
    meshRef.current = cardMesh;

    // Inner core chip inside the card to symbolize data/logic
    const chipGeo = new THREE.BoxGeometry(0.8, 1.2, 0.05);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f, // Orange Core
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xff5a1f,
      emissiveIntensity: 0.35,
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipMesh.position.z = 0.09;
    cardMesh.add(chipMesh);

    // Decorative scientific orbit rings
    const ringGeo = new THREE.RingGeometry(2.3, 2.35, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff5a1f, // Orange Orbit Ring
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    group.add(ring);

    // Extra decorative glowing particle dots
    const particlesCount = 40;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6; // z
    }

    pGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0x4f46e5,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const glowParticles = new THREE.Points(pGeometry, pMaterial);
    group.add(glowParticles);

    // Lighting config
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xff5a1f, 2, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4f46e5, 2, 10);
    pointLight2.position.set(3, 2, 2);
    scene.add(pointLight2);

    // Mouse movement interaction values
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse positions relative to visual container
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;

      targetRotationY = mouseX * 0.9;
      targetRotationX = -mouseY * 0.9;
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);

    // Touch support
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;

        mouseX = (x / rect.width) * 2 - 1;
        mouseY = -(y / rect.height) * 2 + 1;

        targetRotationY = mouseX * 1.2;
        targetRotationX = -mouseY * 1.2;
      }
    };
    containerRef.current.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Scroll trigger behavior
    const handleScroll = () => {
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (group) {
        // Scroll triggered horizontal shift and gentle spinning
        group.position.x = Math.sin(scrollRatio * Math.PI) * 0.6;
        group.rotation.z = scrollRatio * Math.PI * 1.5;
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth lerp rotation toward target mouse positions
      if (cardMesh) {
        cardMesh.rotation.y += (targetRotationY - cardMesh.rotation.y) * 0.08;
        cardMesh.rotation.x += (targetRotationX - cardMesh.rotation.x) * 0.08;
        // Constant slow idle float
        cardMesh.position.y = Math.sin(Date.now() * 0.001) * 0.15;
      }

      // Spin orbital ring and particles
      ring.rotation.z += 0.005;
      glowParticles.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handles container resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height || 450;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (containerRef.current) {
        try {
          containerRef.current.removeChild(renderer.domElement);
          containerRef.current.removeEventListener("mousemove", handleMouseMove);
          containerRef.current.removeEventListener("touchmove", handleTouchMove);
        } catch (e) {
          // ignore
        }
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Preset button actions to show custom reactive 3D logic states
  const triggerPreset = (preset: "logic" | "ethics" | "reflection") => {
    setActivePreset(preset);
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.MeshPhysicalMaterial;

    if (preset === "logic") {
      material.color.setHex(0x4f46e5); // Vibrant Indigo
      setInteractionMessage("State: Deductive Reasoning Deck active (High-IOR Glass)");
      // Spin quickly for response feedback
      meshRef.current.rotation.y += Math.PI * 0.5;
    } else if (preset === "ethics") {
      material.color.setHex(0xff5a1f); // Vibrant Orange
      setInteractionMessage("State: Socratic Dilemma Deck active (High-Transmission Glass)");
      meshRef.current.rotation.x += Math.PI * 0.5;
    } else {
      material.color.setHex(0x10b981); // Emerald Green
      setInteractionMessage("State: Meta-Cognitive Bias Shield active");
      meshRef.current.rotation.z += Math.PI * 0.5;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-indigo-100 shadow-xl shadow-indigo-100/30">
      {/* 3D Canvas Box */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 left-4 z-10 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 text-xs text-indigo-700 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          Interactive Three.js Sandbox
        </div>
        
        <div 
          ref={containerRef} 
          className="w-full h-[380px] md:h-[450px] cursor-grab active:cursor-grabbing relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100/70"
        />

        <div className="text-center mt-3 text-xs font-mono text-gray-500">
          {interactionMessage}
        </div>
      </div>

      {/* Information Sidebar */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 text-left">
        <div>
          <span className="text-orange-500 text-xs font-mono tracking-widest uppercase mb-1 block">
            Crafted 3D Engine
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold font-sans text-indigo-950 tracking-tight">
            Immersion Beyond Paper
          </h3>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            The core philosophy of <strong className="text-indigo-600">StayGlassy.ca</strong> is transparency—making complex logical deductions and cognitive bias processing simple, visual, and beautiful. Our physical card layers utilize a special ultra-smooth finish that feels premium.
          </p>
        </div>

        {/* Preset Triggers */}
        <div className="flex flex-col gap-2.5 text-left">
          <span className="text-xs font-mono text-gray-500 uppercase">
            Toggle Physical Card Mockup Material:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              id="btn-3d-logic"
              onClick={() => triggerPreset("logic")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans border transition-all duration-300 cursor-pointer ${
                activePreset === "logic"
                  ? "bg-indigo-600 text-white border-transparent shadow shadow-indigo-200"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Logical Indigo
            </button>
            <button
              id="btn-3d-ethics"
              onClick={() => triggerPreset("ethics")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans border transition-all duration-300 cursor-pointer ${
                activePreset === "ethics"
                  ? "bg-orange-500 text-white border-transparent shadow shadow-orange-100"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Socratic Orange
            </button>
            <button
              id="btn-3d-reflection"
              onClick={() => triggerPreset("reflection")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans border transition-all duration-300 cursor-pointer ${
                activePreset === "reflection"
                  ? "bg-emerald-600 text-white border-transparent shadow shadow-emerald-100"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Reflective Teal
            </button>
          </div>
        </div>

        {/* Benefits bullets list */}
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-serif mt-0.5">
              ✓
            </div>
            <p className="text-gray-600 text-xs leading-normal">
              <strong className="text-indigo-950">Lag-Free WebGL Geometry:</strong> Highly micro-optimized, garbage-collector friendly buffer layouts ensuring stable 60FPS on Chrome and mobile Safari viewports.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-serif mt-0.5">
              ✓
            </div>
            <p className="text-gray-600 text-xs leading-normal">
              <strong className="text-indigo-950">Reactive Perspective Physics:</strong> Card faces follow your mouse coordinates with realistic physical spring damping properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
