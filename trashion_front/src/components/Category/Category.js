import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const Category = () => {
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
    setOpen1(false);
    setOpen3(false);
    setOpen4(false);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
    setOpen1(false);
    setOpen2(false);
    setOpen4(false);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', mt: '100px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ borderBottom: 1, color: 'black', fontWeight: 'bold' }}>
          카테고리
        </ListSubheader>
      }
    >
      {/* -----------------------------상의----------------------------- */}
      <ListItemButton onClick={handleClick1}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" style={{ color: 'black', fontWeight: 'bold' }}>
              상의
            </Typography>
          }
        />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="반팔 티셔츠" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="긴팔 티셔츠" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="후드 티셔츠" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="셔츠/블라우스" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" />
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
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="청바지" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="반바지" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="슬랙스" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="트레이닝 팬츠" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" />
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
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="후드집업" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="코트" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="가디건" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="패딩" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" />
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
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="전체" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="운동화" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="슬리퍼" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="구두" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="부츠" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="기타" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default Category;
