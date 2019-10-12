import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import Icn from '@/components/Icn';
import { IcnType } from '../Icn/types';
export type MenuItemType = {
    icon?: IcnType,
    label: string,
    href?: string,
    children?: any
}
export interface MenuProps {
    className?: string,
    menus: MenuItemType[]
}
export default class Menu extends React.Component<MenuProps, {}> {
    render() {
        const {
            className,
            menus
        } = this.props;
        return (<div className={cx('hp-menu', className)}>
            {this.createMenus(menus)}
        </div>);
    }

    createMenus(menus: MenuItemType[]) {
        let menuNodes = [], index = 0;
        for (const menu of menus) {
            menuNodes.push(<MenuItem key={`menuitem-${index++}`} menu={menu} />);
        }
        return menuNodes;
    }
}

export interface MenuItemProps {
    className?: string,
    menu: MenuItemType,
}
export function MenuItem(props: MenuItemProps) {
    const {
        className,
        menu
    } = props;
    const { icon, label, href, children } = menu;
    return (<div className={cx('hp-menuitem', className)}>
        <div className="hp-menuitem_content">
            {icon && <Icn name={icon} size={16} />}
            <span className="hp-menuitem_label">{label}</span>
        </div>
    </div>)
}
