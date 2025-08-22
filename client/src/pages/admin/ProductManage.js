import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNavbar from '../../components/layout/AdminNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/layout/Loader';
import Message from '../../components/layout/Message';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
`;

const AddProductButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`;

const ProductsSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SearchAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  padding: 0 1rem;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchIcon = styled.div`
  color: var(--text-secondary);
  margin-right: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  padding: 0.75rem 0;
  flex: 1;
  font-family: var(--font-family);
  
  &:focus {
    outline: none;
  }
`;

const FilterBox = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Filter = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  font-family: var(--font-family);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ProductsTable = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--background-dark);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--background-dark);
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--text-primary);
  
  &.image-cell {
    width: 80px;
  }
  
  &.price-cell {
    font-weight: 600;
  }
  
  &.stock-cell {
    font-weight: 600;
    color: ${props => props.inStock ? 'var(--success-color)' : 'var(--error-color)'};
  }
  
  &.actions-cell {
    white-space: nowrap;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  object-fit: cover;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.delete ? 'var(--error-color)' : 'var(--primary-color)'};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.delete ? '#b71c1c' : 'var(--primary-dark)'};
  }
`;

const EditLink = styled(Link)`
  color: var(--primary-color);
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-dark);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch(props.category) {
      case 'Men':
        return 'rgba(13, 71, 161, 0.1)';
      case 'Women':
        return 'rgba(233, 30, 99, 0.1)';
      case 'Kids':
        return 'rgba(255, 143, 0, 0.1)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.category) {
      case 'Men':
        return 'var(--primary-color)';
      case 'Women':
        return '#e91e63';
      case 'Kids':
        return 'var(--warning-color)';
      default:
        return 'var(--text-primary)';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-dark)' : 'var(--background-dark)'};
    border-color: ${props => props.active ? 'var(--primary-dark)' : 'var(--primary-color)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ModalMessage = styled.p`
  margin-bottom: 2rem;
  color: var(--text-secondary);
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  background-color: var(--background-dark);
  color: var(--text-primary);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--border-color);
  }
`;

const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  background-color: var(--error-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #b71c1c;
  }
`;

const ProductManage = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, [userInfo.token]);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.get('/api/products', config);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setDeleting(true);
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      await axios.delete(`/api/products/${deleteId}`, config);
      
      setProducts(products.filter(product => product._id !== deleteId));
      setConfirmDelete(false);
      setDeleteId(null);
      setDeleting(false);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      setDeleting(false);
      toast.error('Error deleting product');
    }
  };
  
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };
  
  const closeDeleteModal = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };
  
  // Filtering and sorting products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === '' || product.category === category;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <PageContainer>
      <AdminNavbar />
      
      <Header>
        <HeaderContent>
          <Title>Product Management</Title>
          <AddProductButton
            to="/admin/product/create"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add Product
          </AddProductButton>
        </HeaderContent>
      </Header>
      
      <ProductsSection>
        <ProductsContainer>
          <SearchAndFilter>
            <SearchBox>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
            
            <FilterBox>
              <Filter
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Filter>
              
              <Filter
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-low-high">Price (Low to High)</option>
                <option value="price-high-low">Price (High to Low)</option>
              </Filter>
            </FilterBox>
          </SearchAndFilter>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : filteredProducts.length === 0 ? (
            <EmptyMessage>
              No products found. Try adjusting your search or filters.
            </EmptyMessage>
          ) : (
            <>
              <ProductsTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader className="image-cell">Image</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Category</TableHeader>
                      <TableHeader>Price</TableHeader>
                      <TableHeader>Stock</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {currentItems.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="image-cell">
                          <ProductImage src={product.images[0]} alt={product.name} />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <CategoryBadge category={product.category}>
                            {product.category}
                          </CategoryBadge>
                        </TableCell>
                        <TableCell className="price-cell">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          className="stock-cell"
                          inStock={product.sizes.some(s => s.countInStock > 0)}
                        >
                          {product.sizes.some(s => s.countInStock > 0)
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </TableCell>
                        <TableCell className="actions-cell">
                          <ActionButtonGroup>
                            <EditLink to={`/admin/product/edit/${product._id}`}>
                              <FaEdit />
                            </EditLink>
                            <ActionButton
                              delete
                              onClick={() => openDeleteModal(product._id)}
                            >
                              <FaTrash />
                            </ActionButton>
                          </ActionButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </ProductsTable>
              
              {totalPages > 1 && (
                <Pagination>
                  <PageButton
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </PageButton>
                  
                  {[...Array(totalPages).keys()].map(page => (
                    <PageButton
                      key={page + 1}
                      active={currentPage === page + 1}
                      onClick={() => paginate(page + 1)}
                    >
                      {page + 1}
                    </PageButton>
                  ))}
                  
                  <PageButton
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </PageButton>
                </Pagination>
              )}
            </>
          )}
        </ProductsContainer>
      </ProductsSection>
      
      {confirmDelete && (
        <ConfirmationModal>
          <ModalContent>
            <ModalTitle>Confirm Delete</ModalTitle>
            <ModalMessage>
              Are you sure you want to delete this product? This action cannot be undone.
            </ModalMessage>
            <ModalButtons>
              <CancelButton onClick={closeDeleteModal}>Cancel</CancelButton>
              <DeleteButton onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </DeleteButton>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
      
      <Footer />
    </PageContainer>
  );
};

export default ProductManage;