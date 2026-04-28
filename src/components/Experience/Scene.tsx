import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float, Stars, PerspectiveCamera, Environment, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'motion/react';

function Particles() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 2) * 100;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0005;
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function VideoPanel({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // High-quality cinematic placeholder
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    // Using a curated high-end cinematic shot placeholder
    return loader.load('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000');
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial 
          map={texture}
          emissive="#8B5CF6" 
          emissiveIntensity={0.1}
          metalness={0.5}
          roughness={0.5}
        />
        {/* Glow Frame */}
        <mesh position={[0, 0, -0.02]} scale={1.03}>
          <planeGeometry args={[1.6, 0.9]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
        </mesh>
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Smooth camera push
    const targetZ = 5 - (scrollProgress * 80);
    const targetY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    const targetX = Math.cos(state.clock.elapsedTime * 0.5) * 0.1 + (state.mouse.x * 0.5);
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    
    state.camera.lookAt(0, 0, targetZ - 10);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[0, 0, 5]} />;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0b0b0b]">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#0b0b0b']} />
        <fog attach="fog" args={['#0b0b0b', 5, 25]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

        <CameraRig />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Floating Portfolio Panels */}
        <VideoPanel position={[2, 1, -10]} rotation={[0, -0.2, 0]} />
        <VideoPanel position={[-2.5, -0.5, -15]} rotation={[0, 0.3, 0]} />
        <VideoPanel position={[1.5, -2, -25]} rotation={[0, -0.1, 0]} />
        <VideoPanel position={[-1.8, 1.5, -35]} rotation={[0, 0.2, 0]} scale={1.2} />
        <VideoPanel position={[0, 0, -50]} rotation={[0, 0, 0]} scale={2} />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
