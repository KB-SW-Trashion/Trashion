import React from 'react';
import styles from './Footer.module.css';

const introEx = {
  0: `직원의 출퇴근 시간 기록을 실시간 알림으로 받을 수 있고\n
    과거부터 현재까지 모든 근무기록을 한눈에 확인할 수 있습니다.`,
};

export default function Footer() {
  return (
    <div className={styles.body}>
      <div>
        <p>&nbsp;</p>
        <div className={styles.footer_div_left}>만든사람 : 정지윤 김동윤 강승원 권지아 천성규 김명찬</div>
        <div className={styles.footer_div_right}>{introEx[0]}</div>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
