import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaCreditCard, FaMoneyBillWave, FaCheck } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/layout/Loader';

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

const PaymentSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const PaymentContainer = styled.div`
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

const PaymentOptions = styled.div``;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PaymentMethod = styled.div`
  border: 2px solid ${props => props.selected ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: var(--border-radius);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.selected ? 'rgba(13, 71, 161, 0.05)' : 'white'};
  
  &:hover {
    border-color: ${props => props.selected ? 'var(--primary-color)' : 'var(--primary-light)'};
  }
`;

const MethodHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: ${props => props.selected ? '1rem' : '0'};
`;

const MethodIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.selected ? 'var(--primary-color)' : 'var(--text-secondary)'};
`;

const MethodTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.selected ? 'var(--primary-color)' : 'var(--text-primary)'};
  font-weight: 600;
`;

const MethodDetails = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const CreditCardForm = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(2, 1fr)'};
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
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

const PlaceOrderButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
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

const ShippingAddressContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: var(--border-radius);
`;

const ShippingAddressTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const AddressDetail = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  
  // Credit card form state
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };
  
  // Get shipping address from localStorage
  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};
  
  const shipping = totalPrice > 0 ? 10 : 0;
  const tax = totalPrice > 0 ? Math.round(totalPrice * 0.1 * 100) / 100 : 0;
  const total = totalPrice + shipping + tax;
  
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          size: item.size,
          color: item.color,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice: total,
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.post('/api/orders', orderData, config);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to thank you page
      setLoading(false);
      navigate('/thank-you', { state: { orderId: data._id } });
    } catch (error) {
      console.error('Error placing order:', error);
      setLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <Header>
        <HeaderContent>
          <BackLink to="/checkout">
            <FaArrowLeft /> Back to Checkout
          </BackLink>
          <Title>Payment</Title>
        </HeaderContent>
      </Header>
      
      <PaymentSection>
        <PaymentContainer>
          <PaymentOptions>
            <FormTitle>Payment Method</FormTitle>
            
            <PaymentMethodsContainer>
              <PaymentMethod
                selected={paymentMethod === 'cash'}
                onClick={() => setPaymentMethod('cash')}
              >
                <MethodHeader selected={paymentMethod === 'cash'}>
                  <MethodIcon selected={paymentMethod === 'cash'}>
                    <FaMoneyBillWave />
                  </MethodIcon>
                  <MethodTitle selected={paymentMethod === 'cash'}>
                    Cash on Delivery
                  </MethodTitle>
                  {paymentMethod === 'cash' && (
                    <FaCheck style={{ marginLeft: 'auto', color: 'var(--primary-color)' }} />
                  )}
                </MethodHeader>
                {paymentMethod === 'cash' && (
                  <MethodDetails>
                    Pay with cash when your order is delivered.
                  </MethodDetails>
                )}
              </PaymentMethod>
              
              <PaymentMethod
                selected={paymentMethod === 'card'}
                onClick={() => setPaymentMethod('card')}
              >
                <MethodHeader selected={paymentMethod === 'card'}>
                  <MethodIcon selected={paymentMethod === 'card'}>
                    <FaCreditCard />
                  </MethodIcon>
                  <MethodTitle selected={paymentMethod === 'card'}>
                    Credit / Debit Card
                  </MethodTitle>
                  {paymentMethod === 'card' && (
                    <FaCheck style={{ marginLeft: 'auto', color: 'var(--primary-color)' }} />
                  )}
                </MethodHeader>
                
                {paymentMethod === 'card' && (
                  <CreditCardForm>
                    <FormGroup>
                      <FormLabel htmlFor="cardName">Name on Card</FormLabel>
                      <FormInput
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={handleCardDetailsChange}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                      <FormInput
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                      />
                    </FormGroup>
                    
                    <FormRow>
                      <FormGroup>
                        <FormLabel htmlFor="expiryDate">Expiry Date</FormLabel>
                        <FormInput
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardDetailsChange}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="cvv">CVV</FormLabel>
                        <FormInput
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                        />
                      </FormGroup>
                    </FormRow>
                    
                    <MethodDetails>
                      This is a dummy form. No real payment will be processed.
                    </MethodDetails>
                  </CreditCardForm>
                )}
              </PaymentMethod>
            </PaymentMethodsContainer>
            
            <PlaceOrderButton
              onClick={handlePlaceOrder}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <Loader size={24} /> : 'Place Order'}
            </PlaceOrderButton>
          </PaymentOptions>
          
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryRow>
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
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
            
            {Object.keys(shippingAddress).length > 0 && (
              <ShippingAddressContainer>
                <ShippingAddressTitle>Shipping To:</ShippingAddressTitle>
                <AddressDetail>{shippingAddress.address}</AddressDetail>
                <AddressDetail>
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </AddressDetail>
                <AddressDetail>{shippingAddress.country}</AddressDetail>
              </ShippingAddressContainer>
            )}
          </OrderSummary>
        </PaymentContainer>
      </PaymentSection>
      
      <Footer />
    </PageContainer>
  );
};

export default Payment;