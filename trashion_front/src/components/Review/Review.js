import React, { useState, useCallback } from 'react';
import styles from './Review.module.css';
import BasicModal from '../Modal/Modal';

// import Modal from './components/Modal';

// import Button from '@mui/material/Button';

export default function Review() {
  //   const [isOpenModal, setOpenModal] = useState < boolean > false;

  //   const onClickToggleModal = useCallback(() => {
  //     setOpenModal(!isOpenModal);
  //   }, [isOpenModal]);

  return <BasicModal good={true}></BasicModal>;

  //   const [modalOpen, setModalOpen] = useState(false);
  //   const modalClose = useCallback(() => {
  //     {
  //       modalOpen;
  //     }
  //   }, [setModalOpen(!modalOpen)]);

  // <div className={styles.Review_good_box}>
  //   {modalOpen && <Modal onClickToggleModal={modalClose}>children</Modal>}
  //   <button onClick={modalClose}>오프으은</button>
  // </div>
}
