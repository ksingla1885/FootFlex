import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';



const Card = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Category = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid #ddd;
`;

const ProductCard = ({ product }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ImageContainer>
        <Image src={product.images[0]} alt={product.name} />
        <Category>{product.category}</Category>
      </ImageContainer>
      
      <CardContent>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
        
        <ColorOptions>
          {product.colors && product.colors.map((color, index) => (
            <ColorCircle key={index} color={color.hex} title={color.name} />
          ))}
        </ColorOptions>
        
        <Button to={`/product/${product._id}`}>View Details</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;