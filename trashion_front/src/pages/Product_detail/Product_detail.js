import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Product_detail_img, Img_small, PostButton, PostHeader, LikeButton } from 'components';
import styles from './Product_detail.module.css';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import { productState } from 'store';
import { timeForToday } from 'utils/timeforToday';
import hangjungdong from 'utils/hangjungdong';
import itemApi from 'api/itemApi';
import userInfo from 'api/userInfo';
import { authState } from 'store';

const Product_detail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useRecoilState(productState);
  const user = useRecoilValue(authState);

  const [cityName, setCityName] = useState('');
  const [guName, setGuName] = useState('');
  const [dongName, setDongName] = useState('');
  const [selectImg, setSelectImg] = useState(product.photos[0] && product.photos[0].photo);
  const [userHeight, setUserHeight] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const { sido, sigugun, dong } = hangjungdong;

  var selected_date = new Date(product.updated_at);
  const updated_time = timeForToday(selected_date);

  if (!product) {
    return <div className={styles.Product_detail}>Loading...</div>;
  }

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      itemApi.delete(product.id);
      navigate('/', { replace: true });
    }
  };

  const handleImageClick = (e) => {
    setSelectImg(e.target.src);
  };

  const getProduct = () => {
    itemApi.getProductInfo(product.id).then((res) => {
      setProduct({
        ...product,
        big_category: res.data.category.big_category,
        small_category: res.data.category.small_category,
        seller_height: res.data.seller_height,
        seller_weight: res.data.seller_weight,
      });

      setCityName(sido.filter((el) => el.sido === res.data.locationSet[0].location.city)[0]?.codeNm);
      setGuName(sigugun.filter((el) => el.sido === res.data.locationSet[0].location.city && el.sigugun === res.data.locationSet[0].location.gu)[0]?.codeNm);
      setDongName(
        dong.filter((el) => el.sido === res.data.locationSet[0].location.city && el.sigugun === res.data.locationSet[0].location.gu && el.dong === res.data.locationSet[0].location.dong)[0]?.codeNm,
      );
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.detail_wrap}>
        <PostHeader
          leftChild={<PostButton text={'< 뒤로가기'} onClick={() => navigate('/')} />}
          rightChild={
            <div className={styles.button_wrap}>
              <div className={styles.button_first}>{user.user_id === product.user_id && <PostButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />}</div>
              <div>{user.user_id === product.user_id && <PostButton text={'수정하기'} type={'positive'} onClick={() => navigate(`/edit/${product.id}`)} />}</div>
            </div>
          }
        />
        <div className={styles.profile_wrap}>
          <div className={styles.profile_picture_wrap}></div>
          <span className={styles.user_profile}>profile</span>
          <span className={styles.location}>
            {cityName} {guName} {dongName}
          </span>
          <span className={styles.post_date}>{updated_time} 작성</span>
        </div>

        <div className={styles.detail_box}>
          <div className={styles.product_img_box}>
            <div className={styles.img_big}>
              <Product_detail_img selectImg={selectImg} />
            </div>
            <div className={styles.img_small_wrap}>
              {product.photos.map((it) => (
                <div key={it.id} {...it} onClick={handleImageClick}>
                  <Img_small key={it.id} {...it} />
                </div>
              ))}
            </div>
            <div className={styles.img_small_wrap}>
              {product.style_photos.map((it) => (
                <div key={it.id} {...it} onClick={handleImageClick}>
                  <Img_small key={it.id} {...it} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.discription_box}>
            <div className={styles.product_info}>
              <p className={styles.info}>물품 정보</p>
              <h3 className={styles.category}>
                카테고리 : {product.big_category} - {product.small_category}
              </h3>
              <h3>{product.title}</h3>
              <h3>가격 : {product.price}</h3>
              <p>사이즈 : {product.size}</p>
              <p>상태 : {product.condition}</p>
            </div>
            <div className={styles.seller_info}>
              <p className={styles.info}>판매자 정보</p>
              <h2>키 : {product.seller_height}cm</h2>
              <h2>몸무게 : {product.seller_weight}kg</h2>
              <p>사이즈 : {product.size}</p>
            </div>
            <LikeButton />
          </div>
        </div>

        <hr />

        <div className={styles.contents_wrap}>
          <div className={styles.img_wrap}>
            <div className={styles.text_wrap}>
              <p>{product.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_detail;
