import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  position?: boolean;
  width?: string;
  height?: string;
  color?: string;
}

const LoaderDots: React.FC<Props> = ({ color }) => (
  <LoaderStyled>
    <Div color={color} />
    <Div color={color} />
    <Div color={color} />
  </LoaderStyled>
);

const scale = keyframes`
  0% {
    transform: scale(1);
    opacity: 1; 
  }
  24% {
    transform: scale(0.72);
    opacity: 0.3; 
  }
  48% {
    transform: scale(1);
    opacity: 1; 
  }
`;

const LoaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  background-color:${({ color }) => color || '#ececec'};
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin: 3px;
  animation-fill-mode: both;
  display: inline-block;

  &:nth-child(1) {
    animation: ${scale} 1.44s -0.24s infinite cubic-bezier(0, 0, .4, 1);
  }
  &:nth-child(2) {
    animation: ${scale} 1.44s -0.12s infinite cubic-bezier(0, 0, .4, 1);
  }
  &:nth-child(3) {
    animation: ${scale} 1.44s 0s infinite cubic-bezier(0, 0, .4, 1);
  }
`;

export default LoaderDots;
