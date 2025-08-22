import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';



const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ThankYouSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`;

const ThankYouCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  width: 90%;
`;

const CheckIcon = styled(motion.div)`
  color: var(--success-color);
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const ThankYouTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const ThankYouMessage = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OrderInfo = styled.div`
  background-color: var(--background-dark);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
`;

const OrderLabel = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const OrderNumber = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const HomeButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`;

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};
  
  useEffect(() => {
    // If no order ID, redirect to home
    if (!orderId) {
      navigate('/dashboard');
    }
  }, [orderId, navigate]);
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <ThankYouSection>
        <ThankYouCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CheckIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaCheckCircle />
          </CheckIcon>
          
          <ThankYouTitle>Thank You for Your Order!</ThankYouTitle>
          
          <ThankYouMessage>
            Your order has been placed successfully. We'll send you an email confirmation with details and tracking information.
          </ThankYouMessage>
          
          {orderId && (
            <OrderInfo>
              <OrderLabel>Order Number:</OrderLabel>
              <OrderNumber>{orderId}</OrderNumber>
            </OrderInfo>
          )}
          
          <HomeButton
            to="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Return to Home
          </HomeButton>
        </ThankYouCard>
      </ThankYouSection>
      
      <Footer />
    </PageContainer>
  );
};

export default ThankYou;