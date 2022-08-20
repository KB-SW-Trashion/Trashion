import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductStateContext, ProductDispatchContext } from '../../App';
import { Navbar, Product_img, Img_small, PostButton, PostHeader, LikeButton } from 'components';
import styles from './Product_detail.module.css';
import { timeForToday } from '../../utils/timeforToday';

const Product_detail = () => {
  const { id } = useParams();
  const productList = useContext(ProductStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { onRemove } = useContext(ProductDispatchContext);

  useEffect(() => {
    if (productList.length >= 1) {
      const targetProduct = productList.find((it) => parseInt(it.id) === parseInt(id));
      if (targetProduct) {
        setData(targetProduct);
      } else {
        alert('존재하지 않는 상품입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, productList]);

  if (!data) {
    return <div className={styles.Product_detail}>Loading...</div>;
  }

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(data.id);
      navigate('/', { replace: true });
    }
  };

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
                <PostButton text={'수정하기'} type={'positive'} onClick={() => navigate(`/edit/${data.id}`)} />
              </div>
            </div>
          }
        />
        <div className={styles.profile_wrap}>
          <div className={styles.profile_picture_wrap}></div>
          <span className={styles.user_profile}>profile</span>
          <span className={styles.post_date}>{timeForToday(data.date)} 작성</span>
        </div>

        <div className={styles.detail_box}>
          <div className={styles.product_img_box}>
            <div className={styles.img_big}>
              <Product_img />
            </div>
            <div className={styles.img_small_wrap}>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
            </div>
          </div>

          <div className={styles.discription_box}>
            <div className={styles.product_info}>
              <p className={styles.info}>물품 정보</p>
              <h2>[{data.title}]</h2>
              <h3>[{data.price}]</h3>
              <p>착용 기간 : {data.period}</p>
              <p>사이즈 : {data.size}</p>
              <p>상태 : {data.condition}</p>
            </div>
            <div className={styles.seller_info}>
              <p className={styles.info}>판매자 정보</p>
              <h2>키 : 204cm</h2>
              <h2>몸무게 : 20kg</h2>
              <p>사이즈 : 1020</p>
            </div>
            <LikeButton />
          </div>
        </div>

        <hr />

        <div className={styles.contents_wrap}>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>{data.content}</p>
            </div>
          </div>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>
                얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라 얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라
              </p>
            </div>
          </div>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>
                얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라 얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_detail;
