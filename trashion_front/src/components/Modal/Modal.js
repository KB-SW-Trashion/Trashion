import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import reviewApi from 'api/reviewApi';
import { authState } from 'store';
const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Review_good = {
  width: '26px',
  height: '24px',
  bgcolor: '#f8bbd0',
  borderRadius: '100%',
  minWidth: '26px',
};

const Review_bad = {
  width: '26px',
  height: '24px',
  bgcolor: '#d9d9d9',
  borderRadius: '100%',
  minWidth: '26px',
};

export default function BasicModal({ good }) {
  const userAuth = useRecoilValue(authState);
  const user_id = userAuth.user_id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [review, setReview] = useState([]);

  useEffect(() => {
    reviewApi.getReview().then((res) => {
      setReview([res.data]);
      console.log(review);
    });
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} sx={good ? Review_good : Review_bad}></Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            여기다가 쓰면 됩니당 근디 이거 뜨는 위치는 조정을 해야하긴함 하 눈물나네
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
