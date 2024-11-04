import React from 'react';

const PageTitle = ({ children, ...rest }) => {
  const titleStyle = {
    display: 'inline-block',
    width: '100%',
    fontSize: '3.5rem', // Increased font size for thicker appearance
    fontWeight: 800, // Increased weight for more boldness
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '2rem auto 2.5rem',
    color: 'var(--black-1)',
  };

  // Responsive adjustment for small devices
  const isSmallDevice = window.innerWidth < 768;
  if (isSmallDevice) {
    titleStyle.fontSize = '3.5rem'; // Slightly larger size on small devices
  }

  return (
    <p style={titleStyle} {...rest}>
      {children}
    </p>
  );
};

export default PageTitle;
