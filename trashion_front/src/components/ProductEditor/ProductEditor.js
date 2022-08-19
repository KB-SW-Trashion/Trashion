import { ProductDispatchContext } from '../../App';
import { PostButton, PostHeader, ImageUploader } from 'components';
import Navbar from 'components/Navbar/Navbar';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductEditor.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

const ProductEditor = ({ isEdit, originData, isNew }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const periodRef = useRef();
  // date, content, title, price, size, condition, category, period
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState(''); //input
  const [title, setTitle] = useState(''); //input
  const [price, setPrice] = useState(''); //input
  const [size, setSize] = useState(''); //select
  const [condition, setCondition] = useState(''); //input
  const [category, setCategory] = useState(''); //select
  const [period, setPeriod] = useState(''); //input

  const { onCreate, onEdit, onRemove } = useContext(ProductDispatchContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (title.length < 2) {
      titleRef.current.focus();
      return;
    } else if (content.length < 5) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '글을 수정하시겠습니까?' : '새로운 글을 작성하시겠습니까?')) {
      if (!isEdit) {
        onCreate(date, title, content, price, size, condition, category, period);
        navigate('/', { replace: true });
      } else {
        onEdit(originData.id, date, title, content, price, size, condition, category, period);
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

  useEffect(() => {
    if (isEdit) {
      setDate(new Date(parseInt(originData.date)));
      setTitle(originData.title);
      setContent(originData.content);
      setPrice(originData.price);
      setSize(originData.size);
      setCondition(originData.condition);
      setCategory(originData.category);
      setPeriod(originData.period);
    }
  }, [isEdit, originData]);

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
            <div className={styles.input_box}>
              <TextField ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} required id="outlined-required" label="제목" variant="outlined" />
            </div>
            <div className={styles.input_box}>
              <textarea placeholder="Content" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className={styles.input_box}>
              <TextField ref={priceRef} value={price} onChange={(e) => setPrice(e.target.value)} required id="outlined-required" label="가격" variant="outlined" />
            </div>
            <div className={styles.input_box}>
              <TextField ref={periodRef} value={period} onChange={(e) => setPeriod(e.target.value)} required id="outlined-required" label="착용기간" variant="outlined" />
            </div>
            <div className={styles.radio_box}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">상품 컨디션</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <FormControlLabel value="새상품(미개봉)" control={<Radio />} label="새상품(미개봉)" />
                  <FormControlLabel value="거의 새상품" control={<Radio />} label="거의 새상품" />
                  <FormControlLabel value="사용감 있는 깨끗한 상품" control={<Radio />} label="사용감 있는 깨끗한 상품" />
                  <FormControlLabel value="사용 흔적이 많은 상품" control={<Radio />} label="사용 흔적이 많은 상품" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={styles.radio_box}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">상품 사이즈</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={size} onChange={(e) => setSize(e.target.value)}>
                  <FormControlLabel value="FREE" control={<Radio />} label="FREE" />
                  <FormControlLabel value="S" control={<Radio />} label="S" />
                  <FormControlLabel value="M" control={<Radio />} label="M" />
                  <FormControlLabel value="L" control={<Radio />} label="L" />
                  <FormControlLabel value="XL" control={<Radio />} label="XL" />
                </RadioGroup>
              </FormControl>
            </div>
            <ImageUploader />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
