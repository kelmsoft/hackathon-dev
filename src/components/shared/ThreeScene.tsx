
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current?.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf59e0b, 0.4);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xef4444, 0.5, 20);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Create binary/hex code particles that float around
    const createCodeParticles = () => {
      const codeParticlesGroup = new THREE.Group();
      scene.add(codeParticlesGroup);
      
      // Binary/hex code characters to use
      const codeChars = ['0', '1', 'A', 'F', 'E', 'D', 'C', 'B', '9', '8', '7', '3', '2'];
      const codeColors = [0xf59e0b, 0xef4444, 0xfbbf24, 0x34d399];
      
      // Create a canvas texture for each code character
      const createCodeTexture = (char: string, color: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (context) {
          context.fillStyle = 'transparent';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          context.font = 'bold 40px monospace';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
          context.fillText(char, canvas.width / 2, canvas.height / 2);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      };
      
      // Create a moderate number of code particles (reduced for subtlety)
      const particleCount = 200; // Reduced from 500
      
      for (let i = 0; i < particleCount; i++) {
        // Randomly select a code character and color
        const charIndex = Math.floor(Math.random() * codeChars.length);
        const colorIndex = Math.floor(Math.random() * codeColors.length);
        
        const texture = createCodeTexture(
          codeChars[charIndex], 
          codeColors[colorIndex]
        );
        
        // Create a sprite using the texture
        const material = new THREE.SpriteMaterial({ 
          map: texture,
          transparent: true,
          opacity: Math.random() * 0.3 + 0.1 // Reduced opacity for subtlety
        });
        
        const particle = new THREE.Sprite(material);
        
        // Randomize the scale (size) of particles - reduced in size
        const scale = Math.random() * 0.4 + 0.1;
        particle.scale.set(scale, scale, 1);
        
        // Position the particles throughout 3D space
        particle.position.x = (Math.random() - 0.5) * 50;
        particle.position.y = (Math.random() - 0.5) * 50;
        particle.position.z = (Math.random() - 0.9) * 30;
        
        // Store velocities for animation - slower movement
        particle.userData = {
          velocity: {
            x: (Math.random() - 0.5) * 0.01, // Reduced velocity
            y: -Math.random() * 0.02 - 0.01, // Reduced falling speed
            z: (Math.random() - 0.5) * 0.005, // Reduced z movement
          },
          originalY: particle.position.y,
          resetDistance: Math.random() * 30 + 20,
          rotationSpeed: Math.random() * 0.005 // Slower rotation
        };
        
        codeParticlesGroup.add(particle);
      }
      
      return codeParticlesGroup;
    };
    
    // Create code blocks that represent programming concepts
    const createCodeBlocks = () => {
      const codeBlocksGroup = new THREE.Group();
      scene.add(codeBlocksGroup);
      
      // Define code blocks with different shapes and effects
      const blockCount = 8; // Reduced from 15
      
      for (let i = 0; i < blockCount; i++) {
        // Create a canvas for the code block
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        if (context) {
          // Fill with a semi-transparent background
          context.fillStyle = 'rgba(20, 20, 30, 0.4)';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw code-like patterns
          context.font = '12px monospace';
          context.textBaseline = 'top';
          
          // Generate random lines of "code"
          const lines = Math.floor(Math.random() * 4) + 2; // Fewer lines
          const codeColor = Math.random() > 0.5 ? '#f59e0b' : '#34d399';
          context.fillStyle = codeColor;
          
          for (let j = 0; j < lines; j++) {
            const indent = Math.floor(Math.random() * 3) * 10;
            let codeLine = '';
            
            // Generate code-like patterns
            if (Math.random() > 0.7) {
              // Function-like
              codeLine = 'function() {';
            } else if (Math.random() > 0.5) {
              // Variable declaration-like
              codeLine = 'const x = 0x' + Math.floor(Math.random() * 16777215).toString(16);
            } else if (Math.random() > 0.3) {
              // Loop-like
              codeLine = 'for(i=0;i<n;i++)';
            } else {
              // Comment-like
              codeLine = '// ' + 'hack '.repeat(Math.floor(Math.random() * 3) + 1);
            }
            
            context.fillText(codeLine, indent, j * 16 + 10);
          }
          
          // Add border
          context.strokeStyle = codeColor;
          context.lineWidth = 1;
          context.strokeRect(0, 0, canvas.width, canvas.height);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ 
          map: texture,
          transparent: true,
          opacity: Math.random() * 0.15 + 0.05 // More subtle opacity
        });
        
        const codeBlock = new THREE.Sprite(material);
        
        // Make blocks different sizes
        const scale = Math.random() * 3 + 2; // Slightly smaller
        codeBlock.scale.set(scale * 2, scale, 1);
        
        // Position them throughout the scene, but mostly in background
        codeBlock.position.x = (Math.random() - 0.5) * 40;
        codeBlock.position.y = (Math.random() - 0.5) * 30;
        codeBlock.position.z = -10 - Math.random() * 15; // Always in background
        
        // Add movement data - slower movement
        codeBlock.userData = {
          velocity: {
            x: (Math.random() - 0.5) * 0.002, // Reduced speed
            y: (Math.random() - 0.5) * 0.002, // Reduced speed
            z: 0
          },
          rotationSpeed: (Math.random() - 0.5) * 0.0005 // Slower rotation
        };
        
        codeBlocksGroup.add(codeBlock);
      }
      
      return codeBlocksGroup;
    };
    
    // Create matrix code rain effect (reduced for subtlety)
    const createMatrixRain = () => {
      const matrixParticles = new THREE.Group();
      scene.add(matrixParticles);
      
      // Create trails of code-like particles - reduced quantity
      const particleCount = 500; // Reduced from 1500
      const codeColors = [0xf59e0b, 0xef4444, 0xfbbf24];
      
      for (let i = 0; i < particleCount; i++) {
        // Use cubes for more angular, code-like appearance
        const size = Math.random() * 0.1 + 0.01; // Smaller particles
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Choose color with bias towards orange/amber
        const colorIndex = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
        const material = new THREE.MeshPhongMaterial({
          color: codeColors[colorIndex],
          transparent: true,
          opacity: Math.random() * 0.3 + 0.1, // Reduced opacity
          emissive: codeColors[colorIndex],
          emissiveIntensity: 0.1, // Reduced glow
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Spread particles in a digital rain pattern (more vertical movement)
        particle.position.x = (Math.random() - 0.5) * 40;
        particle.position.y = (Math.random() - 0.5) * 40;
        particle.position.z = (Math.random() - 0.9) * 20;
        
        // Store velocities for animation - slower movement
        particle.userData = {
          velocity: {
            x: (Math.random() - 0.5) * 0.01, // Reduced
            y: -Math.random() * 0.05 - 0.01, // Slower falling
            z: (Math.random() - 0.5) * 0.005, // Reduced
          },
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01, // Slower rotation
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
          originalY: particle.position.y,
          resetDistance: Math.random() * 20 + 30
        };
        
        matrixParticles.add(particle);
      }
      
      return matrixParticles;
    };
    
    // Create geometric wireframe shapes that look like code structures
    const createCodeStructures = () => {
      const codeStructures = new THREE.Group();
      scene.add(codeStructures);
      
      // Create digital structures - reduced quantity
      const structureCount = 3; // Reduced from 5
      const structureTypes = [
        new THREE.OctahedronGeometry(2, 0),
        new THREE.TetrahedronGeometry(2, 0),
        new THREE.IcosahedronGeometry(2, 0),
        new THREE.DodecahedronGeometry(2, 0),
      ];
      
      for (let i = 0; i < structureCount; i++) {
        const geometryIndex = Math.floor(Math.random() * structureTypes.length);
        const geometry = structureTypes[geometryIndex];
        
        const material = new THREE.MeshPhongMaterial({
          color: 0xf59e0b,
          wireframe: true,
          transparent: true,
          opacity: 0.15, // More subtle
          emissive: 0xf59e0b,
          emissiveIntensity: 0.1, // Reduced glow
        });
        
        const structure = new THREE.Mesh(geometry, material);
        
        // Position them in the background
        structure.position.x = (Math.random() - 0.5) * 30;
        structure.position.y = (Math.random() - 0.5) * 20;
        structure.position.z = -10 - Math.random() * 10;
        
        // Store rotation data - slower rotation
        structure.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.0005, // Slower
            y: (Math.random() - 0.5) * 0.0005,
            z: (Math.random() - 0.5) * 0.0005,
          }
        };
        
        codeStructures.add(structure);
      }
      
      return codeStructures;
    };
    
    // Create binary code planes in the background
    const createCodePlanes = () => {
      const codePlanes = new THREE.Group();
      scene.add(codePlanes);
      
      // Create a few hexagon/circuit-like planes - reduced quantity
      const planeCount = 2; // Reduced from 3
      
      for (let i = 0; i < planeCount; i++) {
        // Create circuit texture appearance using wireframe
        const geometry = new THREE.CircleGeometry(5 + Math.random() * 3, 6); // Hexagon shape
        const material = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          wireframe: true,
          transparent: true,
          opacity: 0.1, // More subtle
        });
        
        const plane = new THREE.Mesh(geometry, material);
        
        // Position them in the deep background
        plane.position.x = (Math.random() - 0.5) * 30;
        plane.position.y = (Math.random() - 0.5) * 20;
        plane.position.z = -15 - Math.random() * 10;
        
        // Add rotation data - slower rotation
        plane.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.0002, // Slower
            y: (Math.random() - 0.5) * 0.0002,
            z: (Math.random() - 0.5) * 0.0002,
          }
        };
        
        codePlanes.add(plane);
      }
      
      return codePlanes;
    };
    
    // Create all the elements
    const codeParticles = createCodeParticles();
    const codeBlocks = createCodeBlocks();
    const matrixRain = createMatrixRain();
    const codeStructures = createCodeStructures();
    const codePlanes = createCodePlanes();
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate code particles
      codeParticles.children.forEach((particle) => {
        if (particle instanceof THREE.Sprite) {
          // Move particles
          particle.position.y += particle.userData.velocity.y;
          particle.position.x += particle.userData.velocity.x * Math.sin(elapsedTime * 0.3); // Slower wobble
          particle.position.z += particle.userData.velocity.z;
          
          // Add subtle rotation
          particle.material.rotation += particle.userData.rotationSpeed;
          
          // Reset particle position when it falls too far
          if (particle.position.y < -particle.userData.resetDistance) {
            particle.position.y = particle.userData.originalY;
            particle.position.x = (Math.random() - 0.5) * 50; // Randomize x position again
          }
        }
      });
      
      // Animate code blocks
      codeBlocks.children.forEach((block) => {
        if (block instanceof THREE.Sprite) {
          // Subtle movement
          block.position.x += block.userData.velocity.x;
          block.position.y += block.userData.velocity.y;
          
          // Add subtle rotation
          block.material.rotation += block.userData.rotationSpeed;
          
          // Wrap around when moving off-screen
          if (block.position.x > 25) block.position.x = -25;
          if (block.position.x < -25) block.position.x = 25;
          if (block.position.y > 15) block.position.y = -15;
          if (block.position.y < -15) block.position.y = 15;
        }
      });
      
      // Animate matrix rain particles
      matrixRain.children.forEach((particle) => {
        if (particle instanceof THREE.Mesh) {
          // Move particles down like raining code
          particle.position.y += particle.userData.velocity.y;
          particle.position.x += particle.userData.velocity.x * Math.sin(elapsedTime * 0.3); // Slower wobble
          particle.position.z += particle.userData.velocity.z;
          
          // Rotate particles
          particle.rotation.x += particle.userData.rotationSpeed.x;
          particle.rotation.y += particle.userData.rotationSpeed.y;
          particle.rotation.z += particle.userData.rotationSpeed.z;
          
          // Reset particle position when it falls too far
          if (particle.position.y < -particle.userData.resetDistance) {
            particle.position.y = particle.userData.originalY;
            particle.position.x = (Math.random() - 0.5) * 40; // Randomize x position again
          }
        }
      });
      
      // Animate code structures
      codeStructures.children.forEach((structure) => {
        if (structure instanceof THREE.Mesh) {
          structure.rotation.x += structure.userData.rotationSpeed.x;
          structure.rotation.y += structure.userData.rotationSpeed.y;
          structure.rotation.z += structure.userData.rotationSpeed.z;
        }
      });
      
      // Animate code planes
      codePlanes.children.forEach((plane) => {
        if (plane instanceof THREE.Mesh) {
          plane.rotation.x += plane.userData.rotationSpeed.x;
          plane.rotation.y += plane.userData.rotationSpeed.y;
          plane.rotation.z += plane.userData.rotationSpeed.z;
        }
      });
      
      // Camera subtle movement based on mouse position - reduced effect
      camera.position.x += (mouseX * 1 - camera.position.x) * 0.01; // Reduced impact
      camera.position.y += (mouseY * 1 - camera.position.y) * 0.01; // Reduced impact
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose geometries and materials
      // Code particles
      codeParticles.children.forEach((particle) => {
        if (particle instanceof THREE.Sprite && particle.material instanceof THREE.SpriteMaterial) {
          if (particle.material.map) particle.material.map.dispose();
          particle.material.dispose();
        }
      });
      
      // Code blocks
      codeBlocks.children.forEach((block) => {
        if (block instanceof THREE.Sprite && block.material instanceof THREE.SpriteMaterial) {
          if (block.material.map) block.material.map.dispose();
          block.material.dispose();
        }
      });
      
      // Matrix rain
      matrixRain.children.forEach((particle) => {
        if (particle instanceof THREE.Mesh) {
          particle.geometry.dispose();
          if (particle.material instanceof THREE.Material) {
            particle.material.dispose();
          } else if (Array.isArray(particle.material)) {
            particle.material.forEach(material => material.dispose());
          }
        }
      });

      codeStructures.children.forEach((structure) => {
        if (structure instanceof THREE.Mesh) {
          structure.geometry.dispose();
          if (structure.material instanceof THREE.Material) {
            structure.material.dispose();
          } else if (Array.isArray(structure.material)) {
            structure.material.forEach(material => material.dispose());
          }
        }
      });
      
      codePlanes.children.forEach((plane) => {
        if (plane instanceof THREE.Mesh) {
          plane.geometry.dispose();
          if (plane.material instanceof THREE.Material) {
            plane.material.dispose();
          } else if (Array.isArray(plane.material)) {
            plane.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, []);
  
  return <div ref={mountRef} id="three-canvas" />;
};

export default ThreeScene;
