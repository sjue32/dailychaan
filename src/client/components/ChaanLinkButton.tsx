import React from 'react';
import { Link } from 'react-router-dom';
import { ChaanLinkButtonProps } from '../../types';

// props: user_id, username
// a div, that is a React Router Link, that contains a div containing text 
// (username), and a thumbnail

const ChaanLinkButton = (props: ChaanLinkButtonProps) => {

  const { user_id, username } = props;

  return(
    <div className="chaanLinkButton">
      <Link to={`/posts/${user_id}`} >
        <div>
          <span>{username}</span>
          {/* place thumbnail at right side, use flex, row, */}
        </div>
      </Link>
    </div>
  )
};

export default ChaanLinkButton;