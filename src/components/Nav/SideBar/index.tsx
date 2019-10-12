import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { Menu } from '@/components/common';
import { MenuItemType } from '@/components/Menu';
export interface SideBarProps {
    className?: string,
    menus?: MenuItemType[]
}
export default class SideBar extends React.Component<SideBarProps, {}> {
    render() {
        const {
            className,
            menus
        } = this.props;
        return <div className={cx('hp-sidebar', className)}>
            <Menu menus={menus} />
        </div>;
    }
}
