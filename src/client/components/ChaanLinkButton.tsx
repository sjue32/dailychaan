import React from 'react';
import { Link } from 'react-router-dom';

// props: user_id, username
// a div, that is a React Router Link, that contains a div containing text 
// (username), and a thumbnail

const ChaanLinkButton = (props) => {

  const { user_id, username } = props;

  return(
    <div className="chaanLinkButton">
      <Link to={`/posts/${user_id}`} >

      </Link>
    </div>
  )
};

export default ChaanLinkButton;