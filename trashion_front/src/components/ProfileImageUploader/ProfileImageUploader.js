import React, { useState, useEffect, useRef } from 'react';
import { PostButton } from 'components';
import { userInfoState } from 'store';
import profileState from 'store/profileState';
import { useRecoilState } from 'recoil';
import styles from './ProfileImageUploader.module.css';

const ProfileImageUploader = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [showProfileImage, setShowProfileImage] = useState([]);
  const [profile, setProfile] = useRecoilState(profileState);

  // 이미지 상대경로 저장
  const handleAddProfileImage = (event) => {
    const profile_img = event.target.files;
    let imageUrl = [...showProfileImage];

    if (profile_img.length > 1 || showProfileImage.length > 0) {
      alert('이미지는 1개만 업로드 해 주세요!');
      return;
    }

    if (profile_img[0].type !== 'image/jpeg' && profile_img[0].type !== 'image/jpg' && profile_img[0].type !== 'image/png') {
      alert('이미지 파일만 업로드 해주세요!');
      return;
    }
    const currentImageUrl = URL.createObjectURL(profile_img[0]);
    imageUrl.push(currentImageUrl);

    setShowProfileImage(imageUrl);
    setProfile({ ...profile, profile_image: profile_img });
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteProfileImage = (id) => {
    setShowProfileImage(showProfileImage.filter((_, index) => index !== id));
    let fileArray = Array.from(profile.profile_image);
    fileArray.splice(id, 1);
    setProfile({ ...profile, profile_image: fileArray });
  };

  return (
    <div className={styles.wrapUploader}>
      <div className={styles.addPicture}>
        <div className={styles.Mypage_profileImgbox}>
          <img className={styles.Mypage_profileImg} src={showProfileImage} />
        </div>
        {showProfileImage.map((image, id) => (
          <div key={id} className={styles.buttonWrap}>
            <PostButton type={'negative'} text={'삭제하기'} onClick={() => handleDeleteProfileImage(id)} />
          </div>
        ))}
      </div>
      <div className={styles.addButton}>
        <label onChange={handleAddProfileImage} htmlFor="profile_file">
          <input type="file" name="profile_file" id="profile_file" style={{ display: 'none' }} multiple accept={['.jpg', '.png']} className={styles.addButton} required />
          프로필 사진 업로드
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
