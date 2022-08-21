import React from 'react';
import './PostButton.css';

const PostButton = ({ text, type, onClick }) => {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <div>
      <button className={['PostButton', `PostButton_${btnType}`].join(' ')} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

PostButton.defaultProps = {
  type: 'default',
};

export default PostButton;
