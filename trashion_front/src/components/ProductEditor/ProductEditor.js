import { ProductDispatchContext } from '../../App';
import { PostButton, PostHeader, ImageUploader, SelectBox } from 'components';
import Navbar from 'components/Navbar/Navbar';
import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styles from './ProductEditor.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { radioSX, labelSX, CssTextField } from './CssInput';
import productState from 'store/productState';

const ProductEditor = ({ isEdit, originData, isNew }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const periodRef = useRef();
  // date, title, content, price, size, condition, category, period
  // const [date, setDate] = useState(new Date());
  // const [content, setContent] = useState(''); //input
  // const [title, setTitle] = useState(''); //input
  // const [price, setPrice] = useState(''); //input
  // const [size, setSize] = useState(''); //select
  // const [condition, setCondition] = useState(''); //input
  // const [category, setCategory] = useState(''); //select
  // const [period, setPeriod] = useState(''); //input
  // const [post_type, setPostType] = useState(''); //radio

  const [product, setProduct] = useRecoilState(productState);

  const IsPrice = (e) => {
    const curValue = e.currentTarget.value;
    const notNum = /[^0-9]/g;
    setProduct({ ...product, price: curValue.replace(notNum, '') });
  };

  const IsPeriod = (e) => {
    const curValue = e.currentTarget.value;
    const notNum = /[^0-9]/g;

    setProduct({ ...product, period: curValue.replace(notNum, '') });
  };

  const { onCreate, onEdit, onRemove } = useContext(ProductDispatchContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (product.title.length < 2) {
      titleRef.current.focus();
      return;
    } else if (product.content.length < 5) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '글을 수정하시겠습니까?' : '새로운 글을 작성하시겠습니까?')) {
      if (!isEdit) {
        onCreate(product.date, product.title, product.content, product.price, product.size, product.condition, product.big_category, product.small_category, product.period, product.post_type);
        navigate('/', { replace: true });
      } else {
        onEdit(
          originData.id,
          originData.date,
          originData.title,
          originData.content,
          originData.price,
          originData.size,
          originData.condition,
          originData.big_category,
          originData.small_category,
          originData.period,
          originData.post_type,
        );
        navigate('/', { replace: true });
      }
    }
  };

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  // useEffect(() => {
  //   if (isEdit) {
  //     setProduct({
  //       date: new Date(parseInt(originData.date)),
  //       title: originData.title,
  //       content: originData.content,
  //       price: originData.price,
  //       size: originData.size,
  //       condition: originData.condition,
  //       category: originData.category,
  //       period: originData.period,
  //       post_type: originData.post_type,
  //     });
  //     // setDate(new Date(parseInt(originData.date)));
  //     // setTitle(originData.title);
  //     // setContent(originData.content);
  //     // setPrice(originData.price);
  //     // setSize(originData.size);
  //     // setCondition(originData.condition);
  //     // setCategory(originData.category);
  //     // setPeriod(originData.period);
  //     // setPostType(originData.post_type);
  //   }
  // }, [isEdit, originData]);
  return (
    <div className={styles.ProductEditor}>
      <Navbar />
      <div className={styles.main}>
        <PostHeader
          postText={'글작성'}
          leftChild={<PostButton text={'취소하기'} type={''} onClick={() => navigate(-1)} />}
          rightChild={
            isEdit ? (
              <PostButton text={'수정하기'} type={'positive'} onClick={handleSubmit} />
            ) : (
              <PostButton onClick={isNew ? handleSubmit : handleRemove} text={isNew ? '작성하기' : '삭제하기'} type={isNew ? 'positive' : 'negative'} />
            )
          }
        />
        <div className={styles.input_wrap}>
          <section>
            <SelectBox />

            <div className={styles.radio_box}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={labelSX}>
                  게시물 타입
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={product.post_type}
                  onChange={(e) => setProduct({ ...product, post_type: e.target.value })}
                >
                  <FormControlLabel value="product" control={<Radio sx={radioSX} />} label="옷" />
                  <FormControlLabel value="style" control={<Radio sx={radioSX} />} label="스타일" />
                </RadioGroup>
              </FormControl>
            </div>
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
                ref={priceRef}
                value={product.price + '원'}
                onChange={IsPrice}
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
                ref={periodRef}
                value={product.period + '개월'}
                inputProps={{ maxLength: 5 }}
                onChange={IsPeriod}
                focusColor="#f8bbd0"
                required
                id="outlined-required"
                label="착용기간"
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

            <ImageUploader />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
