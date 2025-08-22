import React from 'react';
import styled, { keyframes } from 'styled-components';




const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const Spinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => props.size/10}px solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--primary-color) transparent transparent transparent;
  
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loader = ({ size = 50, fullScreen = false }) => {
  return (
    <LoaderContainer fullScreen={fullScreen}>
      <SpinnerContainer size={size}>
        <Spinner size={size} />
        <Spinner size={size} />
        <Spinner size={size} />
        <Spinner size={size} />
      </SpinnerContainer>
    </LoaderContainer>
  );
};

export default Loader;