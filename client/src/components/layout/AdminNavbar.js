import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingBag, FaSignOutAlt, FaBars, FaTimes, FaBoxOpen, FaClipboardList, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

import * as framerMotion from "framer-motion";
const { AnimatePresence } = framerMotion;


const NavbarContainer = styled.nav`
  background-color: var(--primary-dark);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--secondary-light);
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
    background-color: var(--primary-dark);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease-in-out;
    z-index: 99;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover, &.active {
    color: var(--secondary-light);
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  color: white;
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
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const AdminName = styled.span`
  font-weight: 500;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: var(--secondary-light);
  }
`;

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useContext(AuthContext);
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
        <Logo to="/admin/dashboard">
          <FaShoppingBag /> FootFlex Admin
        </Logo>
        
        <HamburgerButton onClick={toggleMenu}>
          <FaBars />
        </HamburgerButton>
        
        <NavLinks isOpen={isOpen}>
          <CloseButton onClick={toggleMenu}>
            <FaTimes />
          </CloseButton>
          
          <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </NavLink>
          
          <NavLink to="/admin/products" onClick={() => setIsOpen(false)}>
            <FaBoxOpen /> Products
          </NavLink>
          
          <NavLink to="/admin/orders" onClick={() => setIsOpen(false)}>
            <FaClipboardList /> Orders
          </NavLink>
          
          <NavLink to="/admin/users" onClick={() => setIsOpen(false)}>
            <FaUsers /> Users
          </NavLink>
        </NavLinks>
        
        <AdminInfo>
          {userInfo && (
            <>
              <AdminName>Welcome, {userInfo.name}</AdminName>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </LogoutButton>
            </>
          )}
        </AdminInfo>
      </NavContent>
    </NavbarContainer>
  );
};

export default AdminNavbar;