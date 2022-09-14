import React from 'react';

const Scrap_product_img = (photo) => {
  return (
    <div>
      <img src={photo && photo.photo} />
    </div>
  );
};

export default Scrap_product_img;
