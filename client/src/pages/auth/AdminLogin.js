import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import FormContainer from '../../components/forms/FormContainer';
import Loader from '../../components/layout/Loader';
import Message from '../../components/layout/Message';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-dark) 0%, #001a4d 100%);
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  color: var(--primary-dark);
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 2px rgba(0, 33, 113, 0.2);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-dark);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #001a4d;
  }
  
  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const RegisterText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: var(--primary-dark);
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-dark);
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { adminLogin, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <LoginContainer>
      <FormContainer>
        <BackLink to="/">
          <FaArrowLeft /> Back to Home
        </BackLink>
        
        <Title>Admin Login</Title>
        
        {errorMessage && <Message variant="error">{errorMessage}</Message>}
        {'}'}
        {error && <Message variant="error">{error}</Message>}
        {'}'}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          
          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <Loader size={24} /> : 'Login'}
          </Button>
        </Form>
        
        <RegisterText>
          Don't have an admin account?{' '}
          <Link to="/register/admin">Register</Link>
        </RegisterText>
      </FormContainer>
    </LoginContainer>
  );
};

export default AdminLogin;