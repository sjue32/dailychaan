import React, { useState } from 'react';
import type { LoginInputProps } from '../../types';

 const LoginInput = (props: LoginInputProps) => {
  const { id, value, onChange, loginInputData } = props;
  const { name, type, placeholder, pattern, errorMessage, required, htmlFor } = loginInputData;

  const [ focused, setFocused ] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  }

  return(
    <div className="loginInputGroup">
      {/* <div className="loginInputGroupTopRow"> */}
        {/* <label htmlFor={htmlFor}>{placeholder}</label> */}
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
      {/* </div> */}
      <div className="loginInputErrorContainer">
        <span className="loginInputErrorMessage" >{errorMessage}</span>
      </div>
    </div>
  )

 };

 export default LoginInput;