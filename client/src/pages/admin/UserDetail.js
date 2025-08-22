// src/pages/admin/UserDetail.js

import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import AdminNavbar from '../../components/layout/AdminNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';
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
  font-size: 2.5rem;
`;

const UserSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const UserContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  position: sticky;
  top: 2rem;
`;

const UserAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--primary-light);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 3rem;
`;

const UserName = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: var(--text-primary);
`;

const UserEmail = styled.p`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const DetailIcon = styled.div`
  color: var(--primary-color);
  font-size: 1.2rem;
  width: 24px;
`;

const OrdersCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`;

const OrdersTable = styled.div`
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
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'Pending':
        return 'rgba(255, 143, 0, 0.1)';
      case 'Accepted':
        return 'rgba(46, 125, 50, 0.1)';
      case 'Rejected':
        return 'rgba(198, 40, 40, 0.1)';
      case 'Shipped':
        return 'rgba(13, 71, 161, 0.1)';
      case 'Delivered':
        return 'rgba(46, 125, 50, 0.1)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Pending':
        return 'var(--warning-color)';
      case 'Accepted':
        return 'var(--success-color)';
      case 'Rejected':
        return 'var(--error-color)';
      case 'Shipped':
        return 'var(--primary-color)';
      case 'Delivered':
        return 'var(--success-color)';
      default:
        return 'var(--text-primary)';
    }
  }};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const UserDetail = () => {
  const { id } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data: userData } = await axios.get(`/api/admins/users/${id}`, config);
        setUser(userData);

        const { data: ordersData } = await axios.get('/api/orders', config);
        const userOrders = ordersData.filter(
          (order) => order.user && order.user._id === id
        );
        setOrders(userOrders);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        setLoading(false);
      }
    };

    if (userInfo?.token) {
      fetchUserDetails();
    }
  }, [id, userInfo?.token]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <PageContainer>
        <AdminNavbar />
        <UserSection>
          <Loader fullScreen />
        </UserSection>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <AdminNavbar />
        <UserSection>
          <UserContainer>
            <Message variant="error">{error}</Message>
          </UserContainer>
        </UserSection>
        <Footer />
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <AdminNavbar />
        <UserSection>
          <UserContainer>
            <Message variant="error">User not found</Message>
          </UserContainer>
        </UserSection>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AdminNavbar />

      <Header>
        <HeaderContent>
          <BackLink to="/admin/users">
            <FaArrowLeft /> Back to Users
          </BackLink>
          <Title>User Details</Title>
        </HeaderContent>
      </Header>

      <UserSection>
        <UserContainer>
          <ProfileCard>
            <UserAvatar>
              <FaUser />
            </UserAvatar>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>

            <ProfileDetail>
              <DetailIcon>
                <FaEnvelope />
              </DetailIcon>
              <div>{user.email}</div>
            </ProfileDetail>

            <ProfileDetail>
              <DetailIcon>
                <FaPhone />
              </DetailIcon>
              <div>{user.phone || 'Not provided'}</div>
            </ProfileDetail>

            <ProfileDetail>
              <DetailIcon>
                <FaMapMarkerAlt />
              </DetailIcon>
              <div>
                {user.address && user.address.street
                  ? `${user.address.street}, ${user.address.city}, ${user.address.country}`
                  : 'No address provided'}
              </div>
            </ProfileDetail>

            <ProfileDetail>
              <DetailIcon>
                <FaCalendarAlt />
              </DetailIcon>
              <div>Joined: {formatDate(user.createdAt)}</div>
            </ProfileDetail>

            <ProfileDetail>
              <DetailIcon>
                <FaShoppingBag />
              </DetailIcon>
              <div>Orders: {orders.length}</div>
            </ProfileDetail>
          </ProfileCard>

          <OrdersCard>
            <SectionTitle>Order History</SectionTitle>

            {orders.length === 0 ? (
              <EmptyMessage>
                This user has not placed any orders yet.
              </EmptyMessage>
            ) : (
              <OrdersTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Order ID</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Total</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Payment Method</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>#{order._id.substring(0, 8)}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status}>
                            {order.status}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </OrdersTable>
            )}
          </OrdersCard>
        </UserContainer>
      </UserSection>

      <Footer />
    </PageContainer>
  );
};

export default UserDetail;
