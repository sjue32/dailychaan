import React, { useState } from 'react';
import type { LoginInputProps } from '../../types';

const LoginInput = (props: LoginInputProps) => {
  const { id, value, onChange, loginInputData } = props;
  const { name, type, placeholder, pattern, errorMessage, required } = loginInputData;
  // unused var: htmlFor

  const [ focused, setFocused ] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return(
    <div className="loginInputGroup">
      <input 
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        required={required}
        data-focused={focused.toString()}
        onChange={onChange}
        onBlur={handleFocus}
      />
      <div className="loginInputErrorContainer">
        <span className="loginInputErrorMessage" >{errorMessage}</span>
      </div>
    </div>
  );

};

export default LoginInput;