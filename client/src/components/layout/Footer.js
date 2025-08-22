import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaShoppingBag } from 'react-icons/fa';

import * as framerMotion from "framer-motion";
const { AnimatePresence } = framerMotion;


const FooterContainer = styled.footer`
  background-color: var(--text-primary);
  color: white;
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--secondary-light);
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--secondary-color);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: #ccc;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-light);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
`;

const Copyright = styled.p`
  color: #ccc;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">
            <FaShoppingBag /> FootFlex
          </FooterLogo>
          <FooterText>
            Premium destination for stylish and comfortable footwear.
            Explore our wide range of shoes for men, women, and kids.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="#" target="_blank">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="/categories">Shop</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/products/Men">Men's Collection</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/products/Women">Women's Collection</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/products/Kids">Kids' Collection</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Help</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <a href="#">Shipping Information</a>
            </FooterLink>
            <FooterLink>
              <a href="#">Returns & Exchanges</a>
            </FooterLink>
            <FooterLink>
              <a href="#">Contact Us</a>
            </FooterLink>
            <FooterLink>
              <a href="#">FAQs</a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Contact Us</FooterHeading>
          <FooterText>
            123 Fashion Street<br />
            New York, NY 10001<br />
            United States
          </FooterText>
          <FooterText>
            Email: info@footflex.com<br />
            Phone: +1 (123) 456-7890
          </FooterText>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>&copy; {new Date().getFullYear()} FootFlex. All Rights Reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;