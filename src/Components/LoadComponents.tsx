import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadComponents = (props:any) => (
  <ContentLoader
    speed={2}
    width={240}
    height={45}
    viewBox="0 0 200 40"
    backgroundColor="#ebebeb"
    foregroundColor="#ebebeb"
    {...props}
  >
    <rect x="565" y="231" rx="3" ry="3" width="52" height="6" />
    <rect x="369" y="231" rx="3" ry="3" width="410" height="6" />
    <rect x="369" y="247" rx="3" ry="3" width="380" height="6" />
    <rect x="369" y="263" rx="3" ry="3" width="178" height="6" />
    <rect x="46" y="24" rx="3" ry="3" width="128" height="12" />
    <circle cx="20" cy="20" r="20" />
    <rect x="46" y="4" rx="3" ry="3" width="128" height="12" />
  </ContentLoader>
);
export default LoadComponents;
