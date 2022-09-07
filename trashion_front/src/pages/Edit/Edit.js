import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductEditor } from 'components';

const Edit = () => {
  return (
    <div>
      <ProductEditor isEdit={true} />
    </div>
  );
};

export default Edit;
