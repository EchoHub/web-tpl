import React from 'react';
import styles from './index.css';
import c_styles from '@/public/styles/index.css';
import router from 'umi/router';
export default function() {
  return (
    <div className={styles.house}>
        <div className={styles.house__header}>
            <div className={styles.siteInfo}>哈皮狗</div>
            <div className={styles.house_accountInfo}>哈哈哈，客官来啦</div>
        </div>
    </div>
  );
}
