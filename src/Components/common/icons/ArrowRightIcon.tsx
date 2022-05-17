import React from 'react';

interface Props {
  color ? : string;
}

const ArrowRightIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    color={color}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-right"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default ArrowRightIcon;
