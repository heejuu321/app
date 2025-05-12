import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Input({type = 'text', name, value, errorMessage, label, onChange = () => {}, autoFocus = false }) {

  const inputRef = useRef(null);

  // autoFocus 처리
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // input 값 변경 핸들러
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <fieldset>
      <label htmlFor={`input_${name}`}>
        {errorMessage || label}
      </label>
      <input
        id={`input_${name}`}
        ref={inputRef}
        type={type}
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'price']),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  autoFocus: false,
};

export default Input;