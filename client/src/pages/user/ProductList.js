import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import UserNavbar from '../../components/layout/UserNavbar';
import Footer from '../../components/layout/Footer';
import ProductCard from '../../components/products/ProductCard';
import Loader from '../../components/layout/Loader';
import Message from '../../components/layout/Message';



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
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;

const ResultCount = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const FiltersSection = styled.section`
  background-color: white;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
`;

const FiltersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: var(--text-primary);
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  font-family: var(--font-family);
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const ProductsSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?category=${category}`);
        setProducts(data);
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
    
    fetchProducts();
  }, [category]);
  
  // Sort products based on selected criteria
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-to-high':
        return a.price - b.price;
      case 'price-high-to-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  
  return (
    <PageContainer>
      <UserNavbar />
      
      <Header>
        <HeaderContent>
          <BackLink to="/categories">
            <FaArrowLeft /> Back to Categories
          </BackLink>
          <Title>{category}'s Collection</Title>
          <ResultCount>{products.length} products found</ResultCount>
        </HeaderContent>
      </Header>
      
      <FiltersSection>
        <FiltersContainer>
          <FilterGroup>
            <FilterLabel htmlFor="sort">Sort by:</FilterLabel>
            <Select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </Select>
          </FilterGroup>
        </FiltersContainer>
      </FiltersSection>
      
      <ProductsSection>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : sortedProducts.length === 0 ? (
          <EmptyState>
            <EmptyText>No products found in this category.</EmptyText>
            <Link to="/categories" className="btn btn-primary">
              Browse Categories
            </Link>
          </EmptyState>
        ) : (
          <ProductsGrid>
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
      
      <Footer />
    </PageContainer>
  );
};

export default ProductList;