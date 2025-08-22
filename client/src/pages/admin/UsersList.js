import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaEye } from 'react-icons/fa';
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
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
`;

const UsersSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const UsersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  margin-bottom: 2rem;
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

const UsersTable = styled.div`
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
  
  &.actions-cell {
    white-space: nowrap;
  }
`;

const ViewLink = styled(Link)`
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

const UsersList = () => {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    fetchUsers();
  }, [userInfo.token]);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.get('/api/admins/users', config);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filtering users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <PageContainer>
      <AdminNavbar />
      
      <Header>
        <HeaderContent>
          <Title>Manage Users</Title>
        </HeaderContent>
      </Header>
      
      <UsersSection>
        <UsersContainer>
          <SearchBox>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : filteredUsers.length === 0 ? (
            <EmptyMessage>
              No users found. Try adjusting your search.
            </EmptyMessage>
          ) : (
            <>
              <UsersTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>ID</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Joined</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user._id.substring(0, 8)}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="actions-cell">
                          <ViewLink to={`/admin/user/${user._id}`}>
                            <FaEye />
                          </ViewLink>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </UsersTable>
              
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
        </UsersContainer>
      </UsersSection>
      
      <Footer />
    </PageContainer>
  );
};

export default UsersList;