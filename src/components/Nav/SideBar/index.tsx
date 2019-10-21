import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { Menu, Icn } from '@/components/common';
import { MenuItemType } from '@/components/Menu';
export interface SideBarProps {
    className?: string,
    menus?: MenuItemType[],
    collapsable?: boolean
}
export default class SideBar extends React.Component<SideBarProps, {}> {
    render() {
        const {
            className,
            menus,
            collapsable,
        } = this.props;
        return <div className={cx('hp-sidebar', className, {
            [`hp-sidebar-collapsable`]: collapsable
        })}>
            {
                collapsable ? <Menu menus={menus} />: this.renderMenuThumbnails(menus)
            }
        </div>;
    }

    renderMenuThumbnails = (menus: MenuItemType[]) => {
        if(!menus || !menus.length) return null
        let thunmbs: any[] = [];
        for(const menu of menus) {
            const { icon } = menu;
            thunmbs.push(<li><Icn name={icon} size={28} color={'rgba(0, 0, 0, .65)'}/></li>)
        }
        return <ul className='hp-sidebar-thumbs'>{thunmbs}</ul>
    }
}
