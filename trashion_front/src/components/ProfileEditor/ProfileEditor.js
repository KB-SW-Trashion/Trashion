import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { radioSX, CssTextField } from '../ProductEditor/CssInput';
import { useRecoilValue } from 'recoil';
import { userInfoState } from 'store';
import userEdit from 'api/userInfo';
import authState from 'store/authState';
import { Link } from 'react-router-dom';

export default function ProductEditor() {
  const userInfo = useRecoilValue(userInfoState);
  const userAuth = useRecoilValue(authState);
  const email = userAuth.email;
  const [editUserInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile({
      introduce: userInfo.introduce,
      top_size: userInfo.top_size,
      bottom_size: userInfo.bottom_size,
      height: userInfo.height,
      weight: userInfo.weight,
    });
    setUserInfo({ nickname: userInfo.nickname, profile: profile });
  }, []);

  const isNickname = (e) => {
    const curValue = e.currentTarget.value;
    setUserInfo({ ...editUserInfo, nickname: curValue });
  };

  const isIntroduce = (e) => {
    const curValue = e.currentTarget.value;
    setProfile({ ...profile, introduce: curValue });
    setUserInfo({ ...editUserInfo, profile: profile });
  };

  const IsHeight = (e) => {
    const curValue = e.currentTarget.value;
    const notNum = /[^0-9]/g;
    setProfile({ ...profile, height: curValue.replace(notNum, '') });
    setUserInfo({ ...editUserInfo, profile: profile });
  };

  const IsWeight = (e) => {
    const curValue = e.currentTarget.value;
    const notNum = /[^0-9]/g;
    setProfile({ ...profile, weight: curValue.replace(notNum, '') });
    setUserInfo({ ...editUserInfo, profile: profile });
  };

  const resetNickname = () => {
    setUserInfo({ ...editUserInfo, nickname: '' });
  };

  const resetIntro = () => {
    setProfile({ ...profile, introduce: '' });
  };

  const resetBottom = () => {
    setProfile({ ...profile, bottom_size: '' });
  };

  const resetHeight = () => {
    setProfile({ ...profile, height: '' });
  };

  const resetWeight = () => {
    setProfile({ ...profile, weight: '' });
  };

  const handleSubmit = () => {
    setUserInfo({ ...editUserInfo, profile: profile });
    onCreate(editUserInfo);
  };

  const onCreate = (data) => {
    userEdit.editUserInfo(email, data).then((res) => console.log(res));
  };

  return (
    <div>
      <div>
        닉네임
        <br />
        <CssTextField onClick={resetNickname} required id="standard-required" value={editUserInfo.nickname} variant="standard" focusColor="#f8bbd0" onChange={isNickname} />
      </div>
      <p>
        자기소개
        <br />
        <CssTextField onClick={resetIntro} required id="standard-required" value={profile.introduce} variant="standard" focusColor="#f8bbd0" onChange={isIntroduce} />
      </p>
      <p>
        상의 사이즈
        <br />
        <FormControl>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => setProfile({ ...profile, top_size: e.target.value })}>
            <FormControlLabel value="XS" control={<Radio sx={radioSX} />} label="XS" />
            <FormControlLabel value="S" control={<Radio sx={radioSX} />} label="S" />
            <FormControlLabel value="M" control={<Radio sx={radioSX} />} label="M" />
            <FormControlLabel value="L" control={<Radio sx={radioSX} />} label="L" />
            <FormControlLabel value="XL" control={<Radio sx={radioSX} />} label="XL" />
            <FormControlLabel value="XXL" control={<Radio sx={radioSX} />} label="XXL" />
          </RadioGroup>
        </FormControl>
      </p>
      <p>
        하의 사이즈
        <br />
        <CssTextField
          onClick={resetBottom}
          value={profile.bottom_size}
          required
          id="standard-required"
          label="ex. 26, 36, 28"
          variant="standard"
          focusColor="#f8bbd0"
          onChange={(e) => setProfile({ ...profile, bottom_size: e.target.value })}
        />
      </p>
      <p>
        키
        <br />
        <CssTextField onClick={resetHeight} value={profile.height} inputProps={{ maxLength: 5 }} onChange={IsHeight} focusColor="#f8bbd0" required id="standard-require" variant="standard" />
      </p>
      <p>
        몸무게 <br />
        <CssTextField onClick={resetWeight} value={profile.weight} inputProps={{ maxLength: 5 }} onChange={IsWeight} focusColor="#f8bbd0" required id="standard-require" variant="standard" />
      </p>
      <br />
      <br />
      <Link to="/MyPage">
        <Fab onClick={handleSubmit} variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
          프로필 수정
        </Fab>
      </Link>
    </div>
  );
}
