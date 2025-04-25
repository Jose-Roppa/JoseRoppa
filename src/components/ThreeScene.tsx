import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './ThreeScene.css';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.IcosahedronGeometry;
    material: THREE.MeshPhysicalMaterial;
    mesh: THREE.Mesh;
    particles: THREE.Points;
    particleGeometry: THREE.BufferGeometry;
    particleMaterial: THREE.PointsMaterial;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    raycaster: THREE.Raycaster;
    mousePosition: THREE.Vector2;
    clock: THREE.Clock;
    animation: number;
  } | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Clock for animations
    const clock = new THREE.Clock();
    
    // Create geometry and material for main object
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9370db,
      wireframe: true,
      emissive: 0x4b0082,
      emissiveIntensity: 0.3,
      metalness: 0.2,
      roughness: 0.1,
      reflectivity: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      transmission: 0.5
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Create particles
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in 3D space
      const i3 = i * 3;
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);
      
      // Random sizes for particles
      particleSizes[i] = Math.random() * 2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe0b0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Add lights
    const pointLight1 = new THREE.PointLight(0x9370db, 2);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff69b4, 2);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Raycaster for mouse interactions
    const raycaster = new THREE.Raycaster();
    const mousePosition = new THREE.Vector2(0, 0);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate main mesh
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      
      // Move main mesh in a subtle wave pattern
      mesh.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
      
      // Scale the mesh with a breathing effect
      const scale = 1 + Math.sin(elapsedTime) * 0.05;
      mesh.scale.set(scale, scale, scale);
      
      // Rotate particles
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.1;
      
      // Update particle positions for dynamic movement
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Apply a subtle wave effect to particles
        positions[i3] = x + Math.sin(elapsedTime + i * 0.1) * 0.01;
        positions[i3 + 1] = y + Math.cos(elapsedTime + i * 0.1) * 0.01;
        positions[i3 + 2] = z + Math.sin(elapsedTime + i * 0.05) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 10;
      pointLight1.position.z = Math.cos(elapsedTime * 0.5) * 10;
      
      pointLight2.position.x = Math.sin(elapsedTime * 0.5 + Math.PI) * 10;
      pointLight2.position.z = Math.cos(elapsedTime * 0.5 + Math.PI) * 10;
      
      // Update raycaster
      raycaster.setFromCamera(mousePosition, camera);
      
      // Render scene
      renderer.render(scene, camera);
      
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animation = animationId;
    };
    
    // Store all three.js objects in ref for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      geometry,
      material,
      mesh,
      particles,
      particleGeometry,
      particleMaterial,
      pointLight1,
      pointLight2,
      ambientLight,
      raycaster,
      mousePosition,
      clock,
      animation: 0
    };
    
    // Start animation
    animate();
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      const y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // Update mouse position for raycaster
      sceneRef.current.mousePosition.x = x;
      sceneRef.current.mousePosition.y = y;
      
      // Move the mesh based on mouse position but with dampening
      sceneRef.current.mesh.rotation.x += (y * 0.5 - sceneRef.current.mesh.rotation.x) * 0.05;
      sceneRef.current.mesh.rotation.y += (x * 0.5 - sceneRef.current.mesh.rotation.y) * 0.05;
    };
    
    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current || !containerRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Handle click event
    const handleClick = () => {
      if (!sceneRef.current) return;
      
      setIsClicked(prev => !prev);
      
      // Change color on click
      if (sceneRef.current.material instanceof THREE.MeshPhysicalMaterial) {
        const material = sceneRef.current.material;
        
        // Toggle between two color schemes
        if (isClicked) {
          material.color.set(0x9370db);
          material.emissive.set(0x4b0082);
          sceneRef.current.pointLight1.color.set(0x9370db);
          sceneRef.current.pointLight2.color.set(0xff69b4);
          sceneRef.current.particleMaterial.color.set(0xe0b0ff);
        } else {
          material.color.set(0x00ced1);
          material.emissive.set(0x008b8b);
          sceneRef.current.pointLight1.color.set(0x00ced1);
          sceneRef.current.pointLight2.color.set(0xff6347);
          sceneRef.current.particleMaterial.color.set(0xadd8e6);
        }
      }
      
      // Add a pulse animation
      if (sceneRef.current.mesh) {
        sceneRef.current.mesh.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => {
          if (sceneRef.current && sceneRef.current.mesh) {
            sceneRef.current.mesh.scale.set(1, 1, 1);
          }
        }, 300);
      }
    };
    
    containerRef.current.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animation);
        containerRef.current?.removeChild(sceneRef.current.renderer.domElement);
        
        // Dispose geometries and materials
        sceneRef.current.geometry.dispose();
        sceneRef.current.material.dispose();
        sceneRef.current.particleGeometry.dispose();
        sceneRef.current.particleMaterial.dispose();
        sceneRef.current.renderer.dispose();
      }
      containerRef.current?.removeEventListener('click', handleClick);
    };
  }, [isClicked]);
  
  return (
    <motion.div 
      ref={containerRef}
      className={`three-scene-container ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="three-scene-overlay"></div>
      <div className="three-scene-instructions">
        Clique para mudar as cores
      </div>
    </motion.div>
  );
};

export default ThreeScene; 