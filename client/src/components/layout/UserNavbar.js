import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaBars, FaTimes, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';



const NavbarContainer = styled.nav`
  background-color: var(--background-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--primary-dark);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 4rem;
    gap: 2rem;
    background-color: var(--background-light);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    z-index: 99;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconLink = styled(Link)`
  position: relative;
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -12px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 100;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/dashboard">
          <FaShoppingBag /> FootFlex
        </Logo>
        
        <HamburgerButton onClick={toggleMenu}>
          <FaBars />
        </HamburgerButton>
        
        <NavLinks isOpen={isOpen}>
          <CloseButton onClick={toggleMenu}>
            <FaTimes />
          </CloseButton>
          
          <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          
          <NavLink to="/categories" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>
          
          {userInfo && (
            <NavLink to="#!" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </NavLink>
          )}
        </NavLinks>
        
        <NavIcons>
          <IconLink to="/cart">
            <FaShoppingCart />
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
            {'}'}
          </IconLink>
        </NavIcons>
      </NavContent>
    </NavbarContainer>
  );
};

export default UserNavbar;