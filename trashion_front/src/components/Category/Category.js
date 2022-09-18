import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import categoryState from 'store/categoryState';
import category from 'api/category';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useRecoilState(categoryState);
  const [categoryId, setCategoryId] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleSmallCategory = (e) => {
    e.target.innerText === '전체' ? setCategoryFilter({ ...categoryFilter, smallCategory: '' }) : setCategoryFilter({ ...categoryFilter, smallCategory: e.target.innerText });
  };

  const handleClick0 = (e) => {
    setCategoryFilter({});
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
  };

  const handleClick1 = (e) => {
    setCategoryFilter({ bigCategory: e.target.innerText });
    setOpen1(!open1);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
  };
  const handleClick2 = (e) => {
    setCategoryFilter({ bigCategory: e.target.innerText });
    setOpen2(!open2);
    setOpen1(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
  };
  const handleClick3 = (e) => {
    setCategoryFilter({ bigCategory: e.target.innerText });
    setOpen3(!open3);
    setOpen1(false);
    setOpen2(false);
    setOpen4(false);
    setOpen5(false);
  };
  const handleClick4 = (e) => {
    setCategoryFilter({ bigCategory: e.target.innerText });
    setOpen4(!open4);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen5(false);
  };
  const handleClick5 = (e) => {
    setCategoryFilter({ bigCategory: e.target.innerText });
    setOpen5(!open4);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 250, mt: '100px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ borderBottom: 1, color: 'black', fontWeight: 'bold' }}>
          카테고리
        </ListSubheader>
      }
    >
      {/* -----------------------------상의----------------------------- */}
      <ListItemButton onClick={handleClick0}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              전체
            </Typography>
          }
        />
      </ListItemButton>
      <ListItemButton onClick={handleClick1}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              상의
            </Typography>
          }
        />
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" onClick={handleSmallCategory} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="반팔 티셔츠" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="긴팔 티셔츠" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="후드 티셔츠" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="셔츠 / 블라우스" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
      </Collapse>
      {/* --------------------------------바지------------------ */}
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              하의
            </Typography>
          }
        />
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="청바지" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="반바지" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="슬랙스" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="트레이닝팬츠" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
      </Collapse>

      {/* ------------------------아우터------------------------ */}

      <ListItemButton onClick={handleClick3}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              아우터
            </Typography>
          }
        />
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="후드집업" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="코트" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="가디건" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="패딩" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
      </Collapse>

      {/* ----------------------신발----------------- */}
      <ListItemButton onClick={handleClick4}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              신발
            </Typography>
          }
        />
      </ListItemButton>

      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="운동화" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="슬리퍼" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="구두" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="부츠" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick5}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              원피스
            </Typography>
          }
        />
      </ListItemButton>

      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="미니원피스" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="롱원피스" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" onClick={handleSmallCategory} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default Category;
