import React, { useState } from 'react';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import c_styles from '@/public/styles/index.css';
import styles from './index.css';
import router from 'umi/router';
import { Link } from 'umi';
import Sider from '@/components/Grid/Sider';
const { Header, Content } = Layout;
export default function ({ children }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const droplist = (<Menu>
    <Menu.Item>
      <Link to='/login'>
        退出
      </Link>
    </Menu.Item>
  </Menu>);

  return (
    <Layout className={styles.house}>
      <Header className={styles.house__header}>
        <div className={classnames(styles.siteInfo, isCollapsed ? styles['site-collapsed'] : {})}>
          <img className={styles.logo} src={require('@/assets/hapi.jpg')} />
          Hapi Pro
        </div>
        <div className={styles['house__header-rightbar']}>
          <Icon type={isCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => setIsCollapsed(!isCollapsed)}></Icon>
          <div className={styles.house_accountInfo}>
            <Dropdown overlay={droplist} trigger={['click']}>
              <span>哈哈哈，客官来啦 <Icon type='down' /></span>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content className={styles.house_container}>
        <Sider isCollapsed={isCollapsed}></Sider>
        <Content>{children}</Content>
      </Content>
    </Layout>
  );
}
