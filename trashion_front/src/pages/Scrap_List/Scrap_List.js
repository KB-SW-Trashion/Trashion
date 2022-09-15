import React, { useEffect } from 'react';
import { List_Null_Scrap, Navbar, Scrap_product } from 'components';
import { useRecoilState, useRecoilValue } from 'recoil';
import user from 'api/userInfo';
import { userInfoState, authState, reviewState } from 'store';

export default function Scrap_List() {
  const userAuth = useRecoilValue(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const user_id = userAuth.user_id;

  useEffect(() => {
    user.getUserInfo(user_id).then((res) => {
      setUserInfo({
        like_item_count: res.data.like_item_count,
      });
      if (res.data.social_profile) {
        setUserInfo((userInfo) => ({ ...userInfo, social_profile: res.data.social_profile }));
      } else if (res.data.profile_image) {
        setUserInfo((userInfo) => ({ ...userInfo, profile_image: res.data.profile_image.photo }));
      }
    });
  }, []);

  return (
    <div>
      <Navbar />

      {userInfo.like_item_count === '0' ? <List_Null_Scrap /> : <Scrap_product />}
    </div>
  );
}
