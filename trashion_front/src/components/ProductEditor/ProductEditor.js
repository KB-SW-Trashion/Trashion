import { PostButton, PostHeader, ImageUploader, SelectBox, LocationCategory, Navbar } from 'components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styles from './ProductEditor.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { radioSX, labelSX, CssTextField } from './CssInput';
import productState from 'store/productState';
import axios from 'axios';
import tokenConfig from 'api/tokenConfig';
import category from 'api/category';
import itemApi from 'api/itemApi';

const ProductEditor = ({ isEdit, isNew }) => {
  const navigate = useNavigate();

  const editId = useParams().id;

  const [product, setProduct] = useRecoilState(productState);

  const [preProductImages] = useState(product.photos);
  const [preStyleImages] = useState(product.style_photos);
  const resetProduct = useResetRecoilState(productState);

  const resetProductImgList = () => {
    setProduct({ ...product, photos: [], style_photos: [] });
  };
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
    if (window.confirm(isEdit ? '글 수정을 취소하시겠습니까?' : '글 작성을 취소하시겠습니까?')) {
      setProduct({ ...product, photos: preProductImages, style_photos: preStyleImages });
      isEdit && navigate(`/product_detail/${product.id}`, { replace: true });
      isNew && navigate('/', { replace: true });
    }
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', preventGoBack);
    })();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  // 새 글 작성시 productstate 초기화

  useEffect(() => {
    isNew && resetProduct();
    isEdit && resetProductImgList();
  }, []);

  const onCreate = (product) => {
    if (product.photos.length < 1) {
      alert('제품 사진을 한장 이상 올려주세요!');
      return;
    }
    const category_data = {
      big_category: product.big_category,
      small_category: product.small_category,
    };
    category.postCategory(category_data).then(() => {
      category.getCategoryId().then((res) => {
        console.log(product);
        const category = res.data;
        const category_filter = category.filter((i) => i.small_category === product.small_category);
        const id = category_filter[0].id;
        product.purchaser = 1;
        product.category_id = id;
        const formData = new FormData();
        if (product.photos.length >= 1) {
          for (var i = 0; i < product.photos.length; i++) {
            formData.append('photos_data', product.photos[i]);
          }
        }
        if (product.style_photos.length >= 1) {
          for (var j = 0; j < product.style_photos.length; j++) {
            formData.append('style_photos_data', product.style_photos[j]);
          }
        }
        Object.keys(product).forEach((key) => formData.append(key, product[key]));

        isEdit
          ? itemApi.editProduct(editId, formData)
          : axios
              .post('/item_post/item/', formData, tokenConfig())
              .then((res) => {
                if (res.data) {
                  setProduct({ ...product, id: res.data.id });
                  resetProduct();
                  navigate('/', { replace: true });
                }
              })
              .catch((err) => {
                console.log('error:', err);

                alert('글을 작성 할 수 없습니다.');
              });
        navigate('/', { replace: true });
      });
    });
  };

  const isNum = (e) => {
    const curValue = e.currentTarget.value;
    const notNum = /[^0-9]/g;
    setProduct({ ...product, [e.target.name]: curValue.replace(notNum, '') });
    console.log(product);
  };

  const handleCancel = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = () => {
    // 글 작성시 required info 가 입력 안 됐을 시 글 작성 & 수정 방지
    if (
      !product.city ||
      !product.gu ||
      !product.dong ||
      !product.title ||
      !product.content ||
      !product.price ||
      !product.size ||
      !product.condition ||
      !product.big_category ||
      !product.small_category
    )
      return;
    if (window.confirm(isEdit ? '글을 수정하시겠습니까?' : '새로운 글을 작성하시겠습니까?')) {
      onCreate(product);
    }
  };

  return (
    <div>
      <div className={styles.ProductEditor}>
        <Navbar />
        <div className={styles.main}>
          <PostHeader
            postText={'글작성'}
            leftChild={<PostButton text={'취소하기'} type={''} onClick={handleCancel} />}
            rightChild={isEdit ? <PostButton text={'수정하기'} type={'positive'} onClick={handleSubmit} /> : <PostButton onClick={handleSubmit} text={'작성하기'} type={'positive'} />}
          />
          <div className={styles.input_wrap}>
            <section>
              <LocationCategory />
              <SelectBox />
              <div className={styles.text_wrap}>
                <div className={styles.input_box}>
                  <CssTextField
                    sx={{ minWidth: 223 }}
                    value={product.title}
                    inputProps={{ maxLength: 20 }}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    focusColor="#f8bbd0"
                    required
                    id="outlined-required"
                    label="제목"
                    variant="outlined"
                  />
                </div>

                <div className={styles.input_box}>
                  <CssTextField
                    name="price"
                    sx={{ minWidth: 223 }}
                    value={product.price}
                    onChange={isNum}
                    inputProps={{ maxLength: 8 }}
                    focusColor="#f8bbd0"
                    required
                    id="outlined-required"
                    label="가격 (원)"
                    variant="outlined"
                  />
                </div>

                <div className={styles.input_box}>
                  <CssTextField
                    name="height"
                    value={product.height}
                    inputProps={{ maxLength: 3 }}
                    sx={{ minWidth: 223 }}
                    onChange={isNum}
                    focusColor="#f8bbd0"
                    id="outlined-required"
                    label="키 (cm)"
                    variant="outlined"
                  />
                </div>
                <div className={styles.input_box}>
                  <CssTextField
                    name="weight"
                    value={product.weight}
                    inputProps={{ maxLength: 3 }}
                    sx={{ minWidth: 223 }}
                    onChange={isNum}
                    focusColor="#f8bbd0"
                    id="outlined-required"
                    label="몸무게 (kg)"
                    variant="outlined"
                  />
                </div>
              </div>

              <div className={styles.radio_box}>
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label" sx={labelSX}>
                    상품 컨디션
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={product.condition}
                    onChange={(e) => setProduct({ ...product, condition: e.target.value })}
                  >
                    <FormControlLabel value="새상품(미개봉)" control={<Radio required={true} sx={radioSX} />} label="새상품(미개봉)" />
                    <FormControlLabel value="거의 새상품" control={<Radio sx={radioSX} />} label="거의 새상품" />
                    <FormControlLabel value="사용감 있는 깨끗한 상품" control={<Radio sx={radioSX} />} label="사용감 있는 깨끗한 상품" />
                    <FormControlLabel value="사용 흔적이 많은 상품" control={<Radio sx={radioSX} />} label="사용 흔적이 많은 상품" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={styles.radio_box}>
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label" sx={labelSX}>
                    상품 사이즈
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group2"
                    value={product.size}
                    required
                    onChange={(e) => setProduct({ ...product, size: e.target.value })}
                  >
                    <FormControlLabel value="FREE" control={<Radio required={true} sx={radioSX} />} label="FREE" />
                    <FormControlLabel value="SS" control={<Radio sx={radioSX} />} label="SS" />
                    <FormControlLabel value="S" control={<Radio sx={radioSX} />} label="S" />
                    <FormControlLabel value="M" control={<Radio sx={radioSX} />} label="M" />
                    <FormControlLabel value="L" control={<Radio sx={radioSX} />} label="L" />
                    <FormControlLabel value="XL" control={<Radio sx={radioSX} />} label="XL" />
                    <FormControlLabel value="XXL" control={<Radio sx={radioSX} />} label="XXL" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={styles.input_box}>
                <CssTextField
                  value={product.content}
                  onChange={(e) => setProduct({ ...product, content: e.target.value })}
                  multiline
                  minRows={20}
                  focusColor="#f8bbd0"
                  required
                  id="outlined-required"
                  label="내용"
                  variant="outlined"
                  style={{ width: '950px' }}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <ImageUploader isEdit={isEdit} />
    </div>
  );
};

export default ProductEditor;
