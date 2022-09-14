import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { authState, reviewState } from 'store';
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
  margin: '5px',
};

const Review_bad = {
  width: '26px',
  height: '24px',
  bgcolor: '#d9d9d9',
  borderRadius: '100%',
  minWidth: '26px',
  margin: '5px',
};

function Review({ review }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} sx={review.satisfied === 'SF' ? Review_good : Review_bad}></Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h>
              {review.review}
              <br />
              {review.updated_at.slice(0, 10)}
            </h>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default function BasicModal() {
  const userAuth = useRecoilValue(authState);
  const review = useRecoilValue(reviewState);
  const user_id = userAuth.user_id;

  let review_filter = review.filter((i) => i.target === user_id);
  review_filter = review_filter.sort(function (a, b) {
    return b.id - a.id;
  });
  return (
    <div>
      <div>
        {review_filter.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}
