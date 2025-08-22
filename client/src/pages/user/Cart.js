import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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

const CartSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CartItems = styled.div``;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  padding: 1.5rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-right: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ItemMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ItemProperty = styled.div`
  font-size: 0.9rem;
  
  span {
    font-weight: 600;
    margin-right: 0.25rem;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-dark);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text-primary);
  
  &:hover {
    background-color: var(--border-color);
  }
`;

const QuantityValue = styled.div`
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--error-color);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #b71c1c;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const CartSummary = styled.div`
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
    margin-bottom: 2rem;
  }
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.2rem;
  font-weight: 700;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
`;

const CheckoutButton = styled(motion(Link))`
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
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`;

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, totalPrice } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const shipping = totalPrice > 0 ? 10 : 0;
  const tax = totalPrice > 0 ? Math.round(totalPrice * 0.1 * 100) / 100 : 0;
  const finalTotal = totalPrice + shipping + tax;
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <Header>
        <HeaderContent>
          <BackLink to="/dashboard">
            <FaArrowLeft /> Back to Shopping
          </BackLink>
          <Title>Your Shopping Cart</Title>
        </HeaderContent>
      </Header>
      
      <CartSection>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <EmptyText>Your cart is empty</EmptyText>
            <Link to="/categories" className="btn btn-primary">
              Continue Shopping
            </Link>
          </EmptyCart>
        ) : (
          <CartContainer>
            <CartItems>
              {cartItems.map((item, index) => (
                <CartItem key={`${item._id}-${item.size}-${item.color}-${index}`}>
                  <ItemImage>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>
                  
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                    
                    <ItemMeta>
                      <ItemProperty>
                        <span>Size:</span> {item.size}
                      </ItemProperty>
                      <ItemProperty>
                        <span>Color:</span> {item.color}
                      </ItemProperty>
                    </ItemMeta>
                    
                    <ItemActions>
                      <QuantitySelector>
                        <QuantityButton
                          onClick={() => updateCartQuantity(item._id, item.size, item.color, Math.max(1, item.qty - 1))}
                          disabled={item.qty <= 1}
                        >
                          -
                        </QuantityButton>
                        <QuantityValue>{item.qty}</QuantityValue>
                        <QuantityButton
                          onClick={() => updateCartQuantity(item._id, item.size, item.color, item.qty + 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantitySelector>
                      
                      <RemoveButton onClick={() => removeFromCart(item._id, item.size, item.color)}>
                        <FaTrash /> Remove
                      </RemoveButton>
                    </ItemActions>
                  </ItemDetails>
                </CartItem>
              ))}
            </CartItems>
            
            <CartSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <SummaryRow>
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
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
                <span>${finalTotal.toFixed(2)}</span>
              </TotalRow>
              
              <CheckoutButton
                to="/checkout"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout <FaArrowRight />
              </CheckoutButton>
            </CartSummary>
          </CartContainer>
        )}
      </CartSection>
      
      <Footer />
    </PageContainer>
  );
};

export default Cart;