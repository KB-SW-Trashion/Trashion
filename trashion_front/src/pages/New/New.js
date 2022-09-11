import React from 'react';
import { ProductEditor } from 'components';

const New = () => {
  return (
    <div>
      <ProductEditor isNew={true} isEdit={false} />
    </div>
  );
};

export default New;
