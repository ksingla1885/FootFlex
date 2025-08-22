import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

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
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
`;

const CheckoutSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(2, 1fr)'};
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 71, 161, 0.1);
  }
`;

const ContinueButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const OrderSummary = styled.div`
  background-color: var(--background-dark);
  border-radius: var(--border-radius);
  padding: 2rem;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SummaryItems = styled.div`
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
`;

const ItemMeta = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.2rem;
  font-weight: 700;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  margin-top: 1rem;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    firstName: userInfo?.name?.split(' ')[0] || '',
    lastName: userInfo?.name?.split(' ')[1] || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    address: userInfo?.address?.street || '',
    city: userInfo?.address?.city || '',
    state: userInfo?.address?.state || '',
    postalCode: userInfo?.address?.postalCode || '',
    country: userInfo?.address?.country || '',
  });
  
  const [errors, setErrors] = useState({});
  
  const shipping = totalPrice > 0 ? 10 : 0;
  const tax = totalPrice > 0 ? Math.round(totalPrice * 0.1 * 100) / 100 : 0;
  const total = totalPrice + shipping + tax;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'city', 'state', 'postalCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^\d{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save shipping address to localStorage
      localStorage.setItem('shippingAddress', JSON.stringify({
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      }));
      
      navigate('/payment');
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <Header>
        <HeaderContent>
          <BackLink to="/cart">
            <FaArrowLeft /> Back to Cart
          </BackLink>
          <Title>Checkout</Title>
        </HeaderContent>
      </Header>
      
      <CheckoutSection>
        <CheckoutContainer>
          <CheckoutForm onSubmit={handleSubmit}>
            <FormTitle>Shipping Information</FormTitle>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="firstName">First Name*</FormLabel>
                <FormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.firstName}
                  </p>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="lastName">Last Name*</FormLabel>
                <FormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.lastName}
                  </p>
                )}
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="email">Email Address*</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="phone">Phone Number*</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.phone}
                  </p>
                )}
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel htmlFor="address">Street Address*</FormLabel>
              <FormInput
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && (
                <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.address}
                </p>
              )}
            </FormGroup>
            
            <FormRow columns="repeat(3, 1fr)">
              <FormGroup>
                <FormLabel htmlFor="city">City*</FormLabel>
                <FormInput
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.city}
                  </p>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="state">State/Province*</FormLabel>
                <FormInput
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.state}
                  </p>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="postalCode">Postal Code*</FormLabel>
                <FormInput
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && (
                  <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.postalCode}
                  </p>
                )}
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel htmlFor="country">Country*</FormLabel>
              <FormInput
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              />
              {errors.country && (
                <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.country}
                </p>
              )}
            </FormGroup>
            
            <ContinueButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Payment <FaArrowRight />
            </ContinueButton>
          </CheckoutForm>
          
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryItems>
              {cartItems.map((item, index) => (
                <SummaryItem key={`${item._id}-${item.size}-${item.color}-${index}`}>
                  <ItemImage>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>
                  
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>
                      Size: {item.size} | Color: {item.color} | Qty: {item.qty}
                    </ItemMeta>
                    <ItemPrice>${(item.price * item.qty).toFixed(2)}</ItemPrice>
                  </ItemInfo>
                </SummaryItem>
              ))}
            </SummaryItems>
            
            <SummaryRow>
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </SummaryRow>
            
            <TotalRow>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </TotalRow>
          </OrderSummary>
        </CheckoutContainer>
      </CheckoutSection>
      
      <Footer />
    </PageContainer>
  );
};

export default Checkout;