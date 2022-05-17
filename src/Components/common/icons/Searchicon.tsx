import React from 'react';

interface Props {
  color ? : string;
  width?: number;
  height?:number;
}

const SearchIcon: React.FC < Props > = ({ color = '#FEAA22', width, height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-search"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default SearchIcon;
