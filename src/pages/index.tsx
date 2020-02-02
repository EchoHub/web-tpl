import React from 'react';
import { Button } from 'antd';
import styles from './index.css';
import c_styles from '@/public/styles/index.css';
import router from 'umi/router';
export default function() {
  const linkToHouse = () => router.push('/house');
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Button className={c_styles['mt-16']} type={'primary'} onClick={linkToHouse}>创建一个工程试试</Button>
    </div>
  );
}
