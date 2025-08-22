import React from 'react';
import styled from 'styled-components';
import * as framerMotion from "framer-motion";
const { AnimatePresence } = framerMotion;


const Container = styled.div`
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '500px')};
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FormContainer = ({ children, maxWidth }) => {
  return <Container maxWidth={maxWidth}>{children}</Container>;
};

export default FormContainer;