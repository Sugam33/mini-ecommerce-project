import React from 'react';

const InputForm = ({ label, type, value, onChange, placeholder }) => (
  <div style={{ marginBottom: '12px' }}>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      required
      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
    />
  </div>
);

export default InputForm;
