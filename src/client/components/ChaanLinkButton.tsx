import React from 'react';
import { Link } from 'react-router-dom';
import type { ChaanLinkButtonProps } from '../../types';

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
  );
};

export default ChaanLinkButton;