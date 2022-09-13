import React, { useEffect } from 'react';
import hangjungdong from 'utils/hangjungdong';
import { useRecoilState } from 'recoil';
import { locationState } from 'store';
import productState from 'store/productState';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LocationCategory() {
  const [product, setProduct] = useRecoilState(productState);
  const [cityInfo, setCityInfo] = useRecoilState(locationState);
  const { sido, sigugun, dong } = hangjungdong;

  const handleCity = (e) => {
    setProduct({ ...product, city: e.target.value });
    setCityInfo({ ...cityInfo, city: e.target.value });
  };

  const handleGu = (e) => {
    setProduct({ ...product, gu: e.target.value });
    setCityInfo({ ...cityInfo, gu: e.target.value });
  };

  const handleDong = (e) => {
    setProduct({ ...product, dong: e.target.value });
    setCityInfo({ ...cityInfo, dong: e.target.value });
  };

  useEffect(() => {}, []);
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 223 }}>
        <InputLabel id="demo-simple-select-helper-label">시/도</InputLabel>
        <Select required={true} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" onChange={handleCity}>
          {sido.map((el) => (
            <MenuItem key={el.sido} value={el.sido}>
              {el.codeNm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 223 }}>
        <InputLabel id="demo-simple-select-helper-label">시/군/구</InputLabel>
        <Select required={true} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" onChange={handleGu}>
          {sigugun
            .filter((el) => el.sido === product.city)
            .map((el) => (
              <MenuItem key={el.sigugun} value={el.sigugun}>
                {el.codeNm}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 223 }}>
        <InputLabel id="demo-simple-select-helper-label">읍/면/동</InputLabel>
        <Select required={true} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" onChange={handleDong}>
          {dong
            .filter((el) => el.sido === product.city && el.sigugun === product.gu)
            .map((el) => (
              <MenuItem key={el.dong} value={el.dong}>
                {el.codeNm}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
