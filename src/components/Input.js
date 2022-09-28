import React from 'react';

const Input = ({ loading, placeholder, type, value, change }) => {
  return (
    <input
      style={myInput}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={change}
    />
  );
};

export default Input;

const myInput = {
  width: '80%',
  border: 'none',
  borderBottom: '1px solid #17A2B8',
  marginBottom: '2rem',
  marginLeft: '2rem',
  backgroundColor: '#DBDFFD',
};
