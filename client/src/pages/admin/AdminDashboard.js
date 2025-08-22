import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBox, FaShoppingBag, FaUsers, FaClipboardList, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import AdminNavbar from '../../components/layout/AdminNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/layout/Loader';




const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DashboardSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const WelcomeSection = styled.div`
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const WelcomeSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.bg};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(motion(Link))`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
`;

const ActionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
`;

const ActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const RecentSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--background-dark);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const OrderId = styled.div`
  font-weight: 600;
  color: var(--primary-color);
`;

const OrderCustomer = styled.div`
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const OrderDate = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const OrderStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch(props.status) {
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
    switch(props.status) {
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

const OrderPrice = styled.div`
  font-weight: 600;
  color: var(--text-primary);
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: var(--primary-color);
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdminDashboard = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        // Fetch products
        const productsResponse = await axios.get('/api/products', config);
        
        // Fetch users
        const usersResponse = await axios.get('/api/admins/users', config);
        
        // Fetch orders
        const ordersResponse = await axios.get('/api/orders', config);
        
        // Calculate revenue from completed orders
        const revenue = ordersResponse.data
          .filter(order => order.isPaid)
          .reduce((acc, order) => acc + order.totalPrice, 0);
        
        // Set stats
        setStats({
          products: productsResponse.data.length,
          users: usersResponse.data.length,
          orders: ordersResponse.data.length,
          revenue,
        });
        
        // Get recent orders (last 5)
        const sortedOrders = [...ordersResponse.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentOrders(sortedOrders.slice(0, 5));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [userInfo]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <DashboardContainer>
        <AdminNavbar />
        <DashboardSection>
          <Loader fullScreen />
        </DashboardSection>
        <Footer />
      </DashboardContainer>
    );
  }
  
  return (
    <DashboardContainer>
      <AdminNavbar />
      
      <DashboardSection>
        <DashboardContent>
          <WelcomeSection>
            <WelcomeTitle>Welcome, {userInfo.name}</WelcomeTitle>
            <WelcomeSubtitle>
              Here's what's happening with your store today.
            </WelcomeSubtitle>
          </WelcomeSection>
          
          <StatsGrid>
            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatIcon bg="var(--primary-color)">
                <FaBox />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.products}</StatValue>
                <StatLabel>Products</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StatIcon bg="var(--success-color)">
                <FaUsers />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.users}</StatValue>
                <StatLabel>Customers</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatIcon bg="var(--warning-color)">
                <FaClipboardList />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.orders}</StatValue>
                <StatLabel>Orders</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatIcon bg="var(--secondary-color)">
                <FaShoppingBag />
              </StatIcon>
              <StatContent>
                <StatValue>${stats.revenue.toFixed(2)}</StatValue>
                <StatLabel>Revenue</StatLabel>
              </StatContent>
            </StatCard>
          </StatsGrid>
          
          <ActionsGrid>
            <ActionCard
              to="/admin/product/create"
              whileHover={{ scale: 1.02 }}
            >
              <ActionIcon>
                <FaPlus />
              </ActionIcon>
              <ActionTitle>Add Product</ActionTitle>
              <ActionDescription>
                Create a new product listing with details, images, and inventory.
              </ActionDescription>
            </ActionCard>
            
            <ActionCard
              to="/admin/products"
              whileHover={{ scale: 1.02 }}
            >
              <ActionIcon>
                <FaBox />
              </ActionIcon>
              <ActionTitle>Manage Products</ActionTitle>
              <ActionDescription>
                View, edit, and delete existing product listings in your store.
              </ActionDescription>
            </ActionCard>
            
            <ActionCard
              to="/admin/orders"
              whileHover={{ scale: 1.02 }}
            >
              <ActionIcon>
                <FaClipboardList />
              </ActionIcon>
              <ActionTitle>Manage Orders</ActionTitle>
              <ActionDescription>
                Review and update status of customer orders and shipments.
              </ActionDescription>
            </ActionCard>
          </ActionsGrid>
          
          <RecentSection>
            <SectionTitle>Recent Orders</SectionTitle>
            
            {recentOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <OrdersList>
                {recentOrders.map((order) => (
                  <OrderItem key={order._id}>
                    <OrderId>#{order._id.substring(0, 8)}</OrderId>
                    <OrderCustomer>{order.user.name}</OrderCustomer>
                    <OrderDate>{formatDate(order.createdAt)}</OrderDate>
                    <OrderStatus status={order.status}>
                      {order.status}
                    </OrderStatus>
                    <OrderPrice>${order.totalPrice.toFixed(2)}</OrderPrice>
                  </OrderItem>
                ))}
              </OrdersList>
            )}
            
            <ViewAllLink to="/admin/orders">
              View All Orders
            </ViewAllLink>
          </RecentSection>
        </DashboardContent>
      </DashboardSection>
      
      <Footer />
    </DashboardContainer>
  );
};

export default AdminDashboard;