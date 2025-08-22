import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FaSearch, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import AdminNavbar from '../../components/layout/AdminNavbar';
import Footer from '../../components/layout/Footer';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/layout/Loader';
import Message from '../../components/layout/Message';

// Styled components

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

const OrdersSection = styled.section`
  padding: 3rem 0;
  flex: 1;
`;

const OrdersContainer = styled.div`
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

const OrdersTable = styled.div`
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

  &.price-cell {
    font-weight: 600;
  }

  &.actions-cell {
    white-space: nowrap;
  }
`;

const StatusSelectContainer = styled.div`
  position: relative;
`;

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  font-family: var(--font-family);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
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
  background-color: ${(props) => (props.active ? 'var(--primary-color)' : 'white')};
  color: ${(props) => (props.active ? 'white' : 'var(--text-primary)')};
  border: 1px solid ${(props) => (props.active ? 'var(--primary-color)' : 'var(--border-color)')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? 'var(--primary-dark)' : 'var(--background-dark)')};
    border-color: ${(props) => (props.active ? 'var(--primary-dark)' : 'var(--primary-color)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Order details modal styled components

const OrderModal = styled.div`
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
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
  }
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailSection = styled.div``;

const DetailTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const DetailContent = styled.div`
  color: var(--text-secondary);

  p {
    margin-bottom: 0.5rem;
  }
`;

const OrderItemsList = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: var(--primary-color);
`;

const OrderSummary = styled.div`
  background-color: var(--background-dark);
  padding: 1rem;
  border-radius: var(--border-radius);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
    font-weight: 700;
    border-top: 1px solid var(--border-color);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const OrderAction = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Main component

const ManageOrders = () => {
  const { userInfo } = useContext(AuthContext);

  // State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAtDesc');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalStatus, setModalStatus] = useState('');

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filtered orders based on search and filter
  const filteredOrders = orders
    .filter((order) => {
      // Filter by status
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }

      // Search by order id or user name (case insensitive)
      const searchLower = searchQuery.toLowerCase();
      const orderId = order._id.toLowerCase();
      const userName = order.user && order.user.name ? order.user.name.toLowerCase() : '';

      return orderId.includes(searchLower) || userName.includes(searchLower);
    })
    .sort((a, b) => {
      if (sortBy === 'createdAtDesc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'createdAtAsc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'totalPriceDesc') {
        return b.totalPrice - a.totalPrice;
      } else if (sortBy === 'totalPriceAsc') {
        return a.totalPrice - b.totalPrice;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  // Open modal with selected order
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalStatus(order.status);
    // Lock scroll
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setSelectedOrder(null);
    // Unlock scroll
    document.body.style.overflow = '';
  };

  // Handle modal status change
  const handleModalStatusChange = (e) => {
    setModalStatus(e.target.value);
  };

  // Save status from modal
  const saveModalStatus = async () => {
    if (!selectedOrder) return;
    if (modalStatus === selectedOrder.status) {
      toast.info('No status change detected.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${selectedOrder._id}/status`,
        { status: modalStatus },
        config
      );

      // Update orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id ? { ...order, status: data.status } : order
        )
      );

      toast.success('Order status updated successfully');
      closeModal();
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // Inline status update handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/status`,
        { status: newStatus },
        config
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: data.status } : order))
      );

      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <Header>
        <HeaderContent>
          <Title>Manage Orders</Title>
        </HeaderContent>
      </Header>

      <OrdersSection>
        <OrdersContainer>
          <SearchAndFilter>
            <SearchBox>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search by Order ID or User Name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchBox>

            <FilterBox>
              <Filter value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Filter>

              <Filter value={sortBy} onChange={handleSortChange}>
                <option value="createdAtDesc">Newest First</option>
                <option value="createdAtAsc">Oldest First</option>
                <option value="totalPriceDesc">Price High to Low</option>
                <option value="totalPriceAsc">Price Low to High</option>
              </Filter>
            </FilterBox>
          </SearchAndFilter>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : filteredOrders.length === 0 ? (
            <EmptyMessage>No orders found.</EmptyMessage>
          ) : (
            <>
              <OrdersTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Order ID</TableHeader>
                      <TableHeader>User</TableHeader>
                      <TableHeader>Order Date</TableHeader>
                      <TableHeader>Total Price</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Details</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell title={order._id}>
                          #{order._id.substring(0, 8)}
                        </TableCell>
                        <TableCell>{order.user ? order.user.name : 'Unknown'}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="price-cell">${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <StatusSelectContainer>
                            <StatusSelect
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </StatusSelect>
                          </StatusSelectContainer>
                        </TableCell>
                        <TableCell className="actions-cell">
                          <button
                            aria-label="View Details"
                            onClick={() => openModal(order)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--primary-color)',
                              fontSize: '1.2rem',
                            }}
                          >
                            <FaEye />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </OrdersTable>

              <Pagination>
                <PageButton
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </PageButton>
                {[...Array(totalPages)].map((_, i) => (
                  <PageButton
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
                <PageButton
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </PageButton>
              </Pagination>
            </>
          )}
        </OrdersContainer>
      </OrdersSection>

      {selectedOrder && (
        <OrderModal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Order Details #{selectedOrder._id.substring(0, 8)}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            <OrderDetails>
              <DetailSection>
                <DetailTitle>User Info</DetailTitle>
                <DetailContent>
                  <p><strong>Name:</strong> {selectedOrder.user?.name || 'Unknown'}</p>
                  <p><strong>Email:</strong> {selectedOrder.user?.email || 'Unknown'}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}</p>
                </DetailContent>
              </DetailSection>

              <DetailSection>
                <DetailTitle>Payment & Shipping</DetailTitle>
                <DetailContent>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Paid:</strong> {selectedOrder.isPaid ? `Yes (on ${new Date(selectedOrder.paidAt).toLocaleDateString()})` : 'No'}</p>
                  <p><strong>Delivered:</strong> {selectedOrder.isDelivered ? `Yes (on ${new Date(selectedOrder.deliveredAt).toLocaleDateString()})` : 'No'}</p>
                </DetailContent>
              </DetailSection>
            </OrderDetails>

            <OrderItemsList>
              <DetailTitle>Items Ordered</DetailTitle>
              {selectedOrder.orderItems.map((item) => (
                <OrderItem key={item.product}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>Qty: {item.qty}</ItemMeta>
                    <ItemMeta>Size: {item.size || 'N/A'}</ItemMeta>
                    <ItemPrice>${(item.price * item.qty).toFixed(2)}</ItemPrice>
                  </ItemDetails>
                </OrderItem>
              ))}
            </OrderItemsList>

            <OrderSummary>
              <SummaryRow>
                <span>Items Price:</span>
                <span>${selectedOrder.itemsPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Shipping Price:</span>
                <span>${selectedOrder.shippingPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax Price:</span>
                <span>${selectedOrder.taxPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Total Price:</span>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
              </SummaryRow>
            </OrderSummary>

            <OrderAction>
              <StatusSelect value={modalStatus} onChange={handleModalStatusChange}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </StatusSelect>
              <SaveButton onClick={saveModalStatus}>Save</SaveButton>
            </OrderAction>
          </ModalContent>
        </OrderModal>
      )}

      <Footer />
    </PageContainer>
  );
};

export default ManageOrders;