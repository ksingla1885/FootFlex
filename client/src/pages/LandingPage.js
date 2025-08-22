import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Footer from '../components/layout/Footer';


const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CirclesContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const UserCircle = styled(Circle)`
  background-color: var(--secondary-color);

  &:hover {
    background-color: var(--secondary-dark);
    transform: scale(1.05);
  }
`;

const AdminCircle = styled(Circle)`
  background-color: var(--primary-dark);

  &:hover {
    background-color: #001a4d;
    transform: scale(1.05);
  }
`;

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;
    let particlesMaterial, particlesGeometry;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Particles
      particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1500;

      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );

      particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scene && particles) scene.remove(particles);
      if (particlesMaterial) particlesMaterial.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <LandingContainer>
      <HeroSection>
        <Canvas ref={canvasRef} />

        <HeroContent>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to FootFlex
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover stylish, comfortable footwear for every occasion. Premium shoes for men, women, and kids.
          </Subtitle>

          <CirclesContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <UserCircle whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <h3>User</h3>
              <p>Shop Now</p>
              <motion.div style={{ marginTop: '1rem' }} whileHover={{ scale: 1.1 }}>
                <Link to="/login/user" style={{ color: 'white', textDecoration: 'underline' }}>
                  Login
                </Link>
                {' / '}
                <Link to="/register/user" style={{ color: 'white', textDecoration: 'underline' }}>
                  Register
                </Link>
              </motion.div>
            </UserCircle>

            <AdminCircle whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <h3>Admin</h3>
              <p>Manage Store</p>
              <motion.div style={{ marginTop: '1rem' }} whileHover={{ scale: 1.1 }}>
                <Link to="/login/admin" style={{ color: 'white', textDecoration: 'underline' }}>
                  Login
                </Link>
                {' / '}
                <Link to="/register/admin" style={{ color: 'white', textDecoration: 'underline' }}>
                  Register
                </Link>
              </motion.div>
            </AdminCircle>
          </CirclesContainer>
        </HeroContent>
      </HeroSection>

      <Footer />
    </LandingContainer>
  );
};

export default LandingPage;
