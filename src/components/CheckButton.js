import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

const checkVariants = {
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  checked: {
    background: 'var(--primaryPurple)',
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: 'var(--gray-2)',
    transition: { duration: 0.1 },
  },
};

const svgBoxStyle = {
  flexBasis: '25px',
  flexShrink: 0,
  height: '25px',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  cursor: 'pointer',
  transition: '0.3s ease background-color',
};

const svgStyle = {
  width: '18px', // Set a smaller width
  height: '18px', // Set a smaller height
  stroke: 'white',
};

function CheckButton({ checked, handleCheck }) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      style={svgBoxStyle}
      variants={boxVariants}
      onClick={() => handleCheck()}
    >
      <motion.svg
        style={svgStyle}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="4" // Decrease the stroke width for a smaller tick
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton;
