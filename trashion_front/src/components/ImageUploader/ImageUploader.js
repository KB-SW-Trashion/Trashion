import React, { useState } from 'react';
import { PostButton } from 'components';
import { productState } from 'store';
import { useRecoilState } from 'recoil';
// import axios from 'axios';
import styles from './ImageUploader.module.css';

const ImageUploader = () => {
  const [showProductImages, setShowProductImages] = useState([]);
  const [showStyleImages, setShowStyleImages] = useState([]);
  const [product, setProduct] = useRecoilState(productState);

  // 이미지 상대경로 저장
  const handleAddProductImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showProductImages];
    // base64 저장
    let imageBases = [];
    let imagefile;

    for (let i = 0; i < imageLists.length; i++) {
      if (imageLists[i].type !== 'image/jpeg' && imageLists[i].type !== 'image/jpg' && imageLists[i].type !== 'image/png') {
        alert('이미지 파일만 업로드 해주세요!');
        return;
      }
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      // 이미지 base64형식으로 전환 후 product에 저장
      let reader = new FileReader();
      imagefile = imageLists[i];
      reader.onload = () => {
        imageBases[i] = reader.result;
        setProduct({ ...product, photos_data: product.photos_data.concat(imageBases) });
      };
      reader.readAsDataURL(imagefile);
    }

    // 이미지 미리보기
    setShowProductImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteProductImage = (id) => {
    setShowProductImages(showProductImages.filter((_, index) => index !== id));
    setProduct({ ...product, photos_data: product.photos_data.filter((_, index) => index !== id) });
  };

  //style Image

  const handleAddStyleImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showStyleImages];
    // base64 저장
    let imageBases = [];
    let imagefile;

    for (let i = 0; i < imageLists.length; i++) {
      if (imageLists[i].type !== 'image/jpeg' && imageLists[i].type !== 'image/jpg' && imageLists[i].type !== 'image/png') {
        alert('이미지 파일만 업로드 해주세요!');
        return;
      }
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      let reader = new FileReader();

      imagefile = imageLists[i];
      reader.onload = () => {
        imageBases[i] = reader.result;
        setProduct({ ...product, style_photos_data: product.style_photos_data.concat(imageBases) });
      };
      reader.readAsDataURL(imagefile);
    }

    setShowStyleImages(imageUrlLists);
  };

  const handleDeleteStyleImage = (id) => {
    setShowStyleImages(showStyleImages.filter((_, index) => index !== id));
    setProduct({ ...product, style_photos_data: product.style_photos_data.filter((_, index) => index !== id) });
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
          <input type="file" name="product_file" id="product_file" style={{ display: 'none' }} multiple accept={['.jpg', '.png']} className={styles.addButton} required />
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
          <input type="file" name="style_file" id="style_file" style={{ display: 'none' }} multiple accept={['.jpg', '.png']} className={styles.addButton} required />
          착장 사진 업로드
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
