import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Product_detail_img, Img_small, PostButton, PostHeader, LikeButton } from 'components';
import styles from './Product_detail.module.css';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import { productState } from 'store';
import { timeForToday } from 'utils/timeforToday';
import hangjungdong from 'utils/hangjungdong';
import itemApi from 'api/itemApi';
import chatApi from 'api/chatApi';
import userInfo from 'api/userInfo';

import { authState } from 'store';

const Product_detail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useRecoilState(productState);
  const user = useRecoilValue(authState);
  const [user_info, setUserInfo] = useState({});

  const [cityName, setCityName] = useState('');
  const [guName, setGuName] = useState('');
  const [dongName, setDongName] = useState('');
  const [selectImg, setSelectImg] = useState(product.photos[0] && product.photos[0].photo);
  const { sido, sigugun, dong } = hangjungdong;
  const [likes, setLikes] = useState(0);
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
      userInfo.getUserInfo(res.data.user_id).then((res) => {
        setUserInfo({ nickname: res.data.nickname, profile_image: res.data.profile_image.photo });
      });

      setProduct({
        ...product,
        big_category: res.data.category.big_category,
        small_category: res.data.category.small_category,
        seller_height: res.data.seller_height,
        seller_weight: res.data.seller_weight,
      });
      setLikes(res.data.total_likes);
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
  console.log(user, '응 보안좆까');
  const handlingChatList = async () => {
    if (!user.access_token) {
      alert('로그인을 해야 이용할 수 있습니다.');
      navigate('/login');
      return;
    }
    if (user.user_id === product.user_id) {
      await chatApi
        .getSellerChatting()
        .then((res) => {
          navigate('/Chat', {
            state: res.data,
          });
        })
        .catch((err) => console.log('get sellerchatting error', err));
    } else {
      await chatApi
        .getCustomerChatting()
        .then((res) => {
          let result = res.data.find((i) => i.user == user.user_id && i.item == product.id);
          console.log('시발', res, result, user.user_id, product.id);
          if (result) {
            navigate('/Chat', {
              state: res.data,
            });
          } else {
            chatApi
              .createChatRoom({
                item_id: product.id,
              })
              .then((response) => {
                navigate('/Chat', {
                  state: response.data,
                });
              })
              .catch((err) => console.log('create chat room error', err));
          }
        })
        .catch((err) => console.log('get customer chatting error', err));
    }
  };

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
              <div>{user.user_id !== product.user_id && <PostButton text={'구매하기'} />}</div>
            </div>
          }
        />
        <div className={styles.profile_wrap}>
          <div className={styles.profile_picture_wrap}>
            <img src={user_info.profile_image} />
          </div>
          <span className={styles.user_profile}>닉네임: {user_info.nickname}</span>
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
              {product.height && <p>키 : {product.height}cm</p>}
              {product.wegiht && <p>몸무게 : {product.weight}kg</p>}
            </div>
            <div className={styles.seller_info}>
              <p className={styles.info}>판매자 정보</p>
              <h2>키 : {product.seller_height}cm</h2>
              <h2>몸무게 : {product.seller_weight}kg</h2>
              <p>사이즈 : {product.size}</p>
            </div>
            <LikeButton likes={likes} setLikes={setLikes} />
            <PostButton text={user.user_id === product.user_id ? '목록보기' : '구매하기'} onClick={handlingChatList} />
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
