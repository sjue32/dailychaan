import React, { CSSProperties } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const LoaderNew = () => {

  const color = '#C4A484';

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    width: '40%'
  };

  return(
    <div className='spinnerContainer'>
      <BeatLoader
        color={color}
        loading={true}
        // cssOverride={override}
        size={500}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
    </div>
  );
};

export default LoaderNew;