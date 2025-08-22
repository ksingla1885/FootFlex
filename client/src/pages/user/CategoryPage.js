import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';

import * as framerMotion from "framer-motion";
const { AnimatePresence } = framerMotion;


const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: var(--background-dark);
  padding: 3rem 0;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
`;

const CategoriesSection = styled.section`
  padding: 4rem 0;
  flex: 1;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion(Link))`
  height: 400px;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryContent = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 0 2rem;
`;

const CategoryTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const ShopButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--secondary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${CategoryCard}:hover & {
    background-color: var(--secondary-dark);
  }
`;

const CategoryPage = () => {
  const categories = [
    {
      id: 1,
      name: 'Men',
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Find the perfect shoes for every occasion. From casual sneakers to formal dress shoes.',
    },
    {
      id: 2,
      name: 'Women',
      image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Discover elegant heels, comfortable flats, trendy sneakers, and more.',
    },
    {
      id: 3,
      name: 'Kids',
      image: 'https://images.pexels.com/photos/36107/footwear-leather-pair-fashion.jpg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Durable and comfortable shoes designed specifically for growing feet.',
    },
  ];
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <Header>
        <Title>Shop by Category</Title>
        <Subtitle>Browse our collections of premium shoes for men, women, and kids.</Subtitle>
      </Header>
      
      <CategoriesSection>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              to={`/products/${category.name}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryContent>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <ShopButton>
                  Shop Now <FaArrowRight />
                </ShopButton>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>
      
      <Footer />
    </PageContainer>
  );
};

export default CategoryPage;