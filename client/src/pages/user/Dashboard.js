import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';



const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
    url('https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=1600') no-repeat center center/cover;
  height: 70vh;
  display: flex;
  align-items: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ShopButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--secondary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-dark);
    color: white;
  }
`;

const FeaturedSection = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeaturedCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 400px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CategoryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 0.5rem;
  
  &:hover {
    color: var(--primary-dark);
  }
`;

const UserDashboard = () => {
  const { userInfo } = useContext(AuthContext);
  
  const categories = [
    {
      id: 1,
      name: 'Men',
      image: 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Stylish and comfortable footwear for men.',
    },
    {
      id: 2,
      name: 'Women',
      image: 'https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Elegant and fashionable shoes for women.',
    },
    {
      id: 3,
      name: 'Kids',
      image: 'https://images.pexels.com/photos/5865874/pexels-photo-5865874.jpeg?auto=compress&cs=tinysrgb&w=1600',
      description: 'Comfortable and durable footwear for kids.',
    },
  ];
  
  return (
    <DashboardContainer>
      <UserNavbar />
      
      <HeroSection>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome{userInfo ? `, ${userInfo.name}` : ''}
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Browse our latest collection of premium shoes designed for style, comfort, and durability.
          </Subtitle>
          
          <ShopButton
            to="/categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now <FaArrowRight />
          </ShopButton>
        </HeroContent>
      </HeroSection>
      
      <FeaturedSection>
        <SectionTitle>Browse By Category</SectionTitle>
        
        <FeaturedGrid>
          {categories.map((category, index) => (
            <FeaturedCard
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardImage style={{ backgroundImage: `url(${category.image})` }} />
              <CardContent>
                <CardTitle>{category.name}</CardTitle>
                <p>{category.description}</p>
                <CategoryLink to={`/products/${category.name}`}>
                  Browse {category.name}'s Collection <FaArrowRight />
                </CategoryLink>
              </CardContent>
            </FeaturedCard>
          ))}
        </FeaturedGrid>
      </FeaturedSection>
      
      <Footer />
    </DashboardContainer>
  );
};

export default UserDashboard;