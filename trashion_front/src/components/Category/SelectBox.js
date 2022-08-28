import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import categorydata from './Category.json';
import productState from 'store/productState';

const SelectBox = () => {
  //   const [category, setCategory] = useState([]);
  //   const [big_categoryid, setbig_categoryid] = useState('');
  const [product, setProduct] = useRecoilState(productState);
  const [, setSmallCategoryId] = useState('');
  const [smallCategory, setSmallCategory] = useState([]);

  const handleBig_category = (e) => {
    const getbigcategoryId = e.target.value;
    const getSmallCategoryData = categorydata.find((big_category) => big_category.big_category_id === getbigcategoryId).small_category;
    setSmallCategory(getSmallCategoryData);
    setProduct({ ...product, big_category: categorydata[getbigcategoryId].big_category_name });
  };

  const handleSmall_category = (e) => {
    const smallCategoryId = e.target.value;
    setSmallCategoryId(smallCategoryId);
    setProduct({ ...product, small_category: smallCategory[smallCategoryId].small_category_name });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">카테고리</InputLabel>
        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={categorydata.big_category_name} label="Age" onChange={(e) => handleBig_category(e)}>
          {categorydata.map((getBigCategory, index) => (
            <MenuItem value={getBigCategory.big_category_id} key={index}>
              {getBigCategory.big_category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">소분류</InputLabel>
        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={categorydata.small_category_name} label="Age" onChange={(e) => handleSmall_category(e)}>
          {smallCategory.map((getSmallCategory, index) => (
            <MenuItem value={getSmallCategory.small_category_id} key={index}>
              {getSmallCategory.small_category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBox;
