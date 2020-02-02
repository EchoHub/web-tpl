import React, { useEffect, useState } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './index.css';

type MenuType = {
  label: string,
  value: string,
  icon: string,
  href?: string,
  children?: MenuType[]
}
const { SubMenu } = Menu;

const Sider: React.FC<any> = ({ defaultOpenKeys, defaultSelectedKeys, isCollapsed, menus, dispatch }) => {
  useEffect(() => {
    fetchMenus();
  }, [fetchMenus])

  /**
   * 获取菜单配置
   * @param e 
   */
  const fetchMenus = () => {
    return dispatch({
      type: 'global/fetchMenus',
    })
  }

  /**
   * 菜单渲染函数
   * @param menus 
   */
  const renderMenus = (menus: MenuType[]) => {
    return menus!.map((menu: MenuType, index: number) => {
      const { label, value, icon, href, children } = menu;
      return (
        children && children.length ?
          <SubMenu
            key={value}
            title={
              <span>
                {icon && <Icon type={icon} />}
                <span>{label}</span>
              </span>
            }
          >
            {renderMenus(children)}
          </SubMenu>
          : <Menu.Item key={value} onClick={() => href && router.push(href)}>
            {icon && <Icon type={icon} />}
            <span>{label}</span>
          </Menu.Item>
      );
    })
  }

  const handleClick = e => {
    // console.log('click ', e);
  };
  return (
    <div className={styles.sider}>
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        className={styles['menu-inline']}
        onClick={handleClick}
        theme={'light'}
        mode='inline'
        inlineCollapsed={isCollapsed}
      >
        {renderMenus(menus)}
      </Menu>
    </div>
  );
}

export default connect((state: any) => {
  return {
    menus: state.global.menus,
    defaultOpenKeys: state.global.defaultOpenKeys,
    defaultSelectedKeys: state.global.defaultSelectedKeys,
  }
})(Sider)