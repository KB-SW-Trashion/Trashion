import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Product_detail_img, Img_small, PostButton, PostHeader, LikeButton } from 'components';
import styles from './Product_detail.module.css';
import { useRecoilValue } from 'recoil';
import { productState } from 'store';
import { timeForToday } from 'utils/timeforToday';
import categoryApi from 'api/category';
import locationApi from 'api/locationApi';
import hangjungdong from 'utils/hangjungdong';
import crudApi from 'api/crudApi';

const Product_detail = () => {
  const navigate = useNavigate();
  const product = useRecoilValue(productState);
  const [bigCategory, setBigCateogry] = useState('');
  const [smallCategory, setSmallCategoty] = useState('');
  const [locationId, setLocationId] = useState('');
  const [cityName, setCityName] = useState('');
  const [guName, setGuName] = useState('');
  const [dongName, setDongName] = useState('');
  const [selectImg, setSelectImg] = useState(product.photos[0].photo);
  const { sido, sigugun, dong } = hangjungdong;

  var selected_date = new Date(product.updated_at);
  const updated_time = timeForToday(selected_date);

  if (!product) {
    return <div className={styles.Product_detail}>Loading...</div>;
  }

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      crudApi.delete(product.id);
      navigate('/', { replace: true });
    }
  };

  const handleImageClick = (e) => {
    setSelectImg(e.target.src);
  };

  // 카테고리 id 로 카테고리 value 가져오기
  const getCategory = () => {
    categoryApi.getCategoryName().then((res) => {
      setBigCateogry(res.data[product.category_id - 1].big_category);
      setSmallCategoty(res.data[product.category_id - 1].small_category);
    });
  };

  // product id 로 Location set에 있는 location id 가져오기
  const getLocationId = () => {
    locationApi.getLocationId().then((res) => {
      setLocationId(res.data.results.filter((item) => item.id === product.id)[0].location_id);
    });
  };

  // location id 로 시/동/구 가져오기
  const getLocations = () => {
    locationApi.getLocation(locationId).then((res) => {
      setCityName(sido.filter((el) => el.sido === res.data.city)[0]?.codeNm);
      setGuName(sigugun.filter((el) => el.sido === res.data.city && el.sigugun === res.data.gu)[0]?.codeNm);
      setDongName(dong.filter((el) => el.sido === res.data.city && el.sigugun === res.data.gu && el.dong === res.data.dong)[0]?.codeNm);
    });
  };

  // -----------------수정예정------------------
  useEffect(() => {
    getCategory();
    getLocationId();
  }, []);

  useEffect(() => {
    getLocations();
  }, [locationId]);

  return (
    <>
      <Navbar />
      <div className={styles.detail_wrap}>
        <PostHeader
          leftChild={<PostButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
          rightChild={
            <div className={styles.button_wrap}>
              <div className={styles.button_first}>
                <PostButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />
              </div>
              <div>
                <PostButton text={'수정하기'} type={'positive'} onClick={() => navigate(`/edit/${product.id}`)} />
              </div>
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
              {/* <img src={selectImg} /> */}
            </div>
            <div className={styles.img_small_wrap}>
              {product.photos &&
                product.photos.map((it) => (
                  <div key={it.id} {...it} onClick={handleImageClick}>
                    <Img_small key={it.id} {...it} />
                  </div>
                ))}
            </div>
            <div className={styles.img_small_wrap}>
              {product.style_photos &&
                product.style_photos.map((it) => (
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
                카테고리 : {bigCategory} - {smallCategory}
              </h3>
              <h3>{product.title}</h3>
              <h3>가격 : {product.price}</h3>
              <p>사이즈 : {product.size}</p>
              <p>상태 : {product.condition}</p>
            </div>
            <div className={styles.seller_info}>
              <p className={styles.info}>판매자 정보</p>
              <h2>키 : 204cm</h2>
              <h2>몸무게 : 20kg</h2>
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
