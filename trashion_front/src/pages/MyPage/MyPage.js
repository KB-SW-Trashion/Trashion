import React from 'react';
import { Navbar, Footer } from 'components';
import img_example from '../../img/img_example.jpg';

import './MyPage.module.css';

export default function MyPage() {
  return (
    <div>
      <Navbar />

      <div className="MyPage_bodybox">
        <div className="MyPage_bodyleft">
          <img className="productImg" src={img_example} />
        </div>
        <div className="MyPage_bodyright">
          <p>이름:나는지윤이다 이거는 예시</p>
          <p>사이즈:나는 이거이거이거이거다</p>
        </div>
      </div>
      <div className="MyPage_list">
        <p>내가 쓴 글</p>
      </div>

      <div className="MyPage_footerbox">
        <Footer />
      </div>
    </div>
  );
}
