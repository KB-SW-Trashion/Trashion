import React, { useState, useEffect } from 'react';
import { PostButton } from 'components';
import { productState } from 'store';
import { useRecoilState } from 'recoil';
import styles from './ImageUploader.module.css';

const ImageUploader = ({ isEdit }) => {
  const [showProductImages, setShowProductImages] = useState([]);
  const [showStyleImages, setShowStyleImages] = useState([]);
  const [product, setProduct] = useRecoilState(productState);

  // 이미지 상대경로 저장
  const handleAddProductImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showProductImages];

    if (imageLists.length > 4 || showProductImages.length > 3) {
      alert('이미지는 4개 이하로 업로드 해 주세요!');
      return;
    }

    for (let i = 0; i < imageLists.length; i++) {
      if (imageLists[i].type !== 'image/jpeg' && imageLists[i].type !== 'image/jpg' && imageLists[i].type !== 'image/png') {
        alert('이미지 파일만 업로드 해주세요!');
        return;
      }
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    setShowProductImages(imageUrlLists);
    setProduct({ ...product, photos: imageLists });
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteProductImage = (id) => {
    setShowProductImages(showProductImages.filter((_, index) => index !== id));
    let fileArray = Array.from(product.photos);
    fileArray.splice(id, 1);
    setProduct({ ...product, photos: fileArray });
  };

  //style Image

  const handleAddStyleImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showStyleImages];
    if (imageLists.length > 4 || showStyleImages.length > 3) {
      alert('이미지는 4개 이하로 업로드 해 주세요!');
      return;
    }

    for (let i = 0; i < imageLists.length; i++) {
      if (imageLists[i].type !== 'image/jpeg' && imageLists[i].type !== 'image/jpg' && imageLists[i].type !== 'image/png') {
        alert('이미지 파일만 업로드 해 주세요!');
        return;
      }
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    setShowStyleImages(imageUrlLists);

    setProduct({ ...product, style_photos: imageLists });
  };

  const handleDeleteStyleImage = (id) => {
    setShowStyleImages(showStyleImages.filter((_, index) => index !== id));
    let fileArray = Array.from(product.style_photos);
    fileArray.splice(id, 1);
    setProduct({ ...product, style_photos: fileArray });
  };

  return (
    <div className={styles.wrapUploader}>
      <span>제품사진</span>

      <div className={styles.addPicture}>
        {showProductImages.map((image, id) => (
          <div className={styles.imageContainer} key={id}>
            <img src={image} alt={`${image}-${id}`} />
            <div className={styles.buttonWrap}>
              <PostButton type={'negative'} text={'삭제하기'} onClick={() => handleDeleteProductImage(id)} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.addButton}>
        <label onChange={handleAddProductImages} htmlFor="product_file">
          <input type="file" name="product_file" id="product_file" style={{ display: 'none' }} multiple accept={['.jpg', '.png', '.jpeg']} className={styles.addButton} required />
          제품 사진 업로드
        </label>
      </div>

      <span>착장사진</span>

      <div className={styles.addPicture}>
        {showStyleImages.map((image, id) => (
          <div className={styles.imageContainer} key={id}>
            <img src={image} alt={`${image}-${id}`} />
            <div className={styles.buttonWrap}>
              <PostButton type={'negative'} text={'삭제하기'} onClick={() => handleDeleteStyleImage(id)} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.addButton}>
        <label onChange={handleAddStyleImages} htmlFor="style_file">
          <input type="file" name="style_file" id="style_file" style={{ display: 'none' }} multiple accept={['.jpg', '.png', 'jpeg']} className={styles.addButton} required />
          착장 사진 업로드
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
