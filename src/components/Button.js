import React from 'react';

const styles = {
  button: {
    display: 'inline-block',
    height: 'auto',
    padding: '1rem 2.5rem', // Increased padding for larger size
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '1.8rem', // Increased font size
    textDecoration: 'none',
    textTransform: 'capitalize',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  select: {
    color: 'var(--black-2)',
    fontFamily: 'Poppins, sans-serif',
    padding: '1.2rem', // Increased padding for larger size
    fontSize: '1.6rem', // Increased font size to match button
    border: 'none',
    backgroundColor: 'var(--bg-3)',
    width: '180px', // Slightly increased width
    cursor: 'pointer',
    borderRadius: '6px',
  },
  primary: {
    backgroundColor: 'var(--primaryPurple)',
    color: 'var(--white)',
  },
  secondary: {
    backgroundColor: 'var(--bg-3)',
    color: 'var(--black-1)',
  },
};

const Button = ({ type, variant = 'primary', children, ...rest }) => {
  const buttonStyle = {
    ...styles.button,
    ...(variant === 'primary' ? styles.primary : styles.secondary),
  };
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      style={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id, ...rest }) => {
  return (
    <select id={id} style={styles.select} {...rest}>
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
