import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/layout/Loader';
import Message from '../../components/layout/Message';
import { CartContext } from '../../context/CartContext';

import * as framerMotion from "framer-motion";
const { AnimatePresence } = framerMotion;


const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProductSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div``;

const MainImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    border-color: var(--primary-light);
  }
`;

const DetailsSection = styled.div``;

const Category = styled.div`
  display: inline-block;
  background-color: var(--background-dark);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PriceRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  color: #ffc107;
`;

const RatingText = styled.span`
  color: var(--text-secondary);
`;

const Description = styled.p`
  margin-bottom: 2rem;
  line-height: 1.7;
  color: var(--text-secondary);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2rem 0;
`;

const SelectionRow = styled.div`
  margin-bottom: 1.5rem;
`;

const SelectionLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SizeOption = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius);
  border: 1px solid ${props => props.selected ? 'var(--primary-color)' : 'var(--border-color)'};
  background-color: ${props => props.selected ? 'rgba(13, 71, 161, 0.1)' : 'white'};
  color: ${props => props.selected ? 'var(--primary-color)' : 'var(--text-primary)'};
  font-weight: ${props => props.selected ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--border-color);
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? 'var(--primary-color)' : 'white'};
  box-shadow: 0 0 0 1px ${props => props.selected ? 'var(--primary-color)' : 'var(--border-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    opacity: ${props => props.selected ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.color};
    z-index: 1;
    opacity: ${props => props.selected ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityLabel = styled.div`
  font-weight: 600;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.disabled ? 'var(--border-color)' : 'var(--background-dark)'};
  border: none;
  font-size: 1.2rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.disabled ? 'var(--text-secondary)' : 'var(--text-primary)'};
  
  &:hover {
    background-color: ${props => props.disabled ? 'var(--border-color)' : 'var(--border-color)'};
  }
`;

const QuantityValue = styled.div`
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const StockInfo = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  margin-bottom: 1.5rem;
  background-color: ${props => props.inStock ? 'rgba(46, 125, 50, 0.1)' : 'rgba(198, 40, 40, 0.1)'};
  color: ${props => props.inStock ? 'var(--success-color)' : 'var(--error-color)'};
`;

const AddToCartButton = styled(motion.button)`
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
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Check if size is in stock
  const isSizeInStock = (size) => {
    if (!product) return false;
    const sizeObj = product.sizes.find((s) => s.size === size);
    return sizeObj && sizeObj.countInStock > 0;
  };
  
  // Get stock for selected size
  const getStockForSelectedSize = () => {
    if (!product || !selectedSize) return 0;
    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    return sizeObj ? sizeObj.countInStock : 0;
  };
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select both size and color');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart successfully!');
    navigate('/cart');
  };
  
  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <ProductSection>
        <ProductContainer>
          <BackLink to={`/products/${product?.category || 'Men'}`}>
            <FaArrowLeft /> Back to {product?.category || 'Products'}
          </BackLink>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : product ? (
            <ProductGrid>
              <ImageSection>
                <MainImage>
                  <img src={mainImage} alt={product.name} />
                </MainImage>
                
                <ThumbnailsContainer>
                  {product.images.map((image, index) => (
                    <Thumbnail
                      key={index}
                      active={image === mainImage}
                      onClick={() => setMainImage(image)}
                    >
                      <img src={image} alt={`${product.name} - View ${index + 1}`} />
                    </Thumbnail>
                  ))}
                </ThumbnailsContainer>
              </ImageSection>
              
              <DetailsSection>
                <Category>{product.category}</Category>
                <ProductTitle>{product.name}</ProductTitle>
                
                <PriceRating>
                  <Price>${product.price.toFixed(2)}</Price>
                  
                  <Rating>
                    <Stars>{renderStars(product.rating)}</Stars>
                    <RatingText>({product.numReviews} reviews)</RatingText>
                  </Rating>
                </PriceRating>
                
                <Description>{product.description}</Description>
                
                <StockInfo inStock={product.sizes.some(s => s.countInStock > 0)}>
                  {product.sizes.some(s => s.countInStock > 0)
                    ? 'In Stock'
                    : 'Out of Stock'}
                </StockInfo>
                
                <Divider />
                
                <SelectionRow>
                  <SelectionLabel>Size</SelectionLabel>
                  <SizeOptions>
                    {product.sizes.map((size) => (
                      <SizeOption
                        key={size.size}
                        selected={selectedSize === size.size}
                        disabled={size.countInStock === 0}
                        onClick={() => setSelectedSize(size.size)}
                      >
                        {size.size}
                      </SizeOption>
                    ))}
                  </SizeOptions>
                </SelectionRow>
                
                <SelectionRow>
                  <SelectionLabel>Color</SelectionLabel>
                  <ColorOptions>
                    {product.colors.map((color) => (
                      <ColorOption
                        key={color.name}
                        color={color.hex}
                        selected={selectedColor === color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                      />
                    ))}
                  </ColorOptions>
                </SelectionRow>
                
                <QuantityRow>
                  <QuantityLabel>Quantity</QuantityLabel>
                  <QuantitySelector>
                    <QuantityButton
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </QuantityButton>
                    <QuantityValue>{quantity}</QuantityValue>
                    <QuantityButton
                      onClick={() => setQuantity(q => Math.min(getStockForSelectedSize(), q + 1))}
                      disabled={quantity >= getStockForSelectedSize() || !selectedSize}
                    >
                      +
                    </QuantityButton>
                  </QuantitySelector>
                </QuantityRow>
                
                <AddToCartButton
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor || getStockForSelectedSize() === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingCart /> Add to Cart
                </AddToCartButton>
              </DetailsSection>
            </ProductGrid>
          ) : null}
        </ProductContainer>
      </ProductSection>
      
      <Footer />
    </PageContainer>
  );
};

export default ProductDetail;