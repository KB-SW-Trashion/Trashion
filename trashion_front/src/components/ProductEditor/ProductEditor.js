import { PostButton, PostHeader, ImageUploader, SelectBox, LocationCategory, Navbar } from 'components';
import React, { useRef, useEffect } from 'react';
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
import crudApi from 'api/crudApi';

const ProductEditor = ({ isEdit, isNew }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const navigate = useNavigate();

  const editId = useParams().id;
  const [product, setProduct] = useRecoilState(productState);
  const resetProduct = useResetRecoilState(productState);

  // 새 글 작성시 productstate 초기화
  useEffect(() => {
    isNew && resetProduct();
  }, []);

  const onCreate = (product) => {
    console.log(product);
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
        const category = res.data;
        const category_filter = category.filter((i) => i.small_category === product.small_category);
        const id = category_filter[0].id;
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
          ? crudApi.editProduct(editId, formData)
          : axios
              .post('/item_post/item/', formData, tokenConfig())
              .then((res) => {
                if (res.data) {
                  console.log(res);
                  setProduct({ ...product, id: res.data.id });
                  resetProduct();
                  navigate('/', { replace: true });
                }
              })
              .catch((err) => {
                console.log('error:', err);
                console.log('data:', formData);
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
  };

  const handleSubmit = () => {
    if (product.title.length < 2) {
      titleRef.current.focus();
      return;
    } else if (product.content.length < 5) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '글을 수정하시겠습니까?' : '새로운 글을 작성하시겠습니까?')) {
      onCreate(product);
    }
  };

  return (
    <div className={styles.ProductEditor}>
      <Navbar />
      <div className={styles.main}>
        <PostHeader
          postText={'글작성'}
          leftChild={<PostButton text={'취소하기'} type={''} onClick={() => navigate(-1)} />}
          rightChild={isEdit ? <PostButton text={'수정하기'} type={'positive'} onClick={handleSubmit} /> : <PostButton onClick={handleSubmit} text={'작성하기'} type={'positive'} />}
        />
        <div className={styles.input_wrap}>
          <section>
            <LocationCategory />

            <SelectBox />

            <div className={styles.input_box}>
              <CssTextField
                ref={titleRef}
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
                ref={priceRef}
                value={product.price + '원'}
                onChange={isNum}
                inputProps={{ maxLength: 10 }}
                focusColor="#f8bbd0"
                required
                id="outlined-required"
                label="가격"
                variant="outlined"
              />
            </div>

            <div className={styles.input_box}>
              <CssTextField
                name="height"
                value={product.height + 'cm'}
                inputProps={{ maxLength: 5 }}
                onChange={isNum}
                focusColor="#f8bbd0"
                required
                id="outlined-required"
                label="키"
                variant="outlined"
              />
            </div>
            <div className={styles.input_box}>
              <CssTextField
                name="weight"
                value={product.weight + 'kg'}
                inputProps={{ maxLength: 5 }}
                onChange={isNum}
                focusColor="#f8bbd0"
                required
                id="outlined-required"
                label="몸무게"
                variant="outlined"
              />
            </div>
            <div className={styles.radio_box}>
              <FormControl>
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
                  <FormControlLabel value="새상품(미개봉)" control={<Radio sx={radioSX} />} label="새상품(미개봉)" />
                  <FormControlLabel value="거의 새상품" control={<Radio sx={radioSX} />} label="거의 새상품" />
                  <FormControlLabel value="사용감 있는 깨끗한 상품" control={<Radio sx={radioSX} />} label="사용감 있는 깨끗한 상품" />
                  <FormControlLabel value="사용 흔적이 많은 상품" control={<Radio sx={radioSX} />} label="사용 흔적이 많은 상품" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={styles.radio_box}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={labelSX}>
                  상품 사이즈
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={product.size}
                  onChange={(e) => setProduct({ ...product, size: e.target.value })}
                >
                  <FormControlLabel value="FREE" control={<Radio sx={radioSX} />} label="FREE" />
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
                ref={contentRef}
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

            <ImageUploader isEdit={isEdit} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
