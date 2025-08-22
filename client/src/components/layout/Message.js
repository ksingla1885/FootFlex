import React from 'react';
import styled from 'styled-components';


const MessageContainer = styled.div`
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  background-color: ${(props) => 
    props.variant === 'success' 
      ? 'rgba(46, 125, 50, 0.1)' 
      : props.variant === 'info' 
      ? 'rgba(30, 136, 229, 0.1)'
      : props.variant === 'warning'
      ? 'rgba(255, 143, 0, 0.1)'
      : 'rgba(198, 40, 40, 0.1)'
  };
  color: ${(props) => 
    props.variant === 'success' 
      ? 'var(--success-color)' 
      : props.variant === 'info' 
      ? 'var(--primary-color)'
      : props.variant === 'warning'
      ? 'var(--warning-color)'
      : 'var(--error-color)'
  };
  border: 1px solid ${(props) => 
    props.variant === 'success' 
      ? 'var(--success-color)' 
      : props.variant === 'info' 
      ? 'var(--primary-color)'
      : props.variant === 'warning'
      ? 'var(--warning-color)'
      : 'var(--error-color)'
  };
`;

const Message = ({ children, variant = 'info' }) => {
  return <MessageContainer variant={variant}>{children}</MessageContainer>;
};

export default Message;