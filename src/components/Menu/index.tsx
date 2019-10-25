import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import Icn from '@/components/Icn';
import { IcnType } from '../Icn/types';
import { Link } from 'react-router-dom';
import { history } from '@/pages/routers';
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

    readonly state = {
        activeIndex: -1,
        activeParentIndex: -1,
    }

    handleSetActiveItem = (activeIndex: number, activeParentIndex?: number) => {
        this.setState({
            activeIndex,
            activeParentIndex
        })
    }

    createMenus(menus: MenuItemType[]) {
        let menuNodes = [], index = 0;
        const { activeIndex, activeParentIndex } = this.state;
        for (const menu of menus) {
            menuNodes.push(<MenuItem
                key={`menuitem-${index++}`}
                itemIndex={index}
                activeIndex={activeIndex}
                activeParentIndex={activeParentIndex}
                menu={menu}
                onSetActiveItem={this.handleSetActiveItem}
            />);
        }
        return menuNodes;
    }

    render() {
        const {
            className,
            menus
        } = this.props;
        return (<div className={cx('hp-menu', className)}>
            {this.createMenus(menus)}
        </div>);
    }

}

export interface MenuItemProps {
    className?: string,
    menu: MenuItemType,
    parentIndex?: number,
    activeParentIndex?: number,
    itemIndex: number,
    activeIndex: number,
    onSetActiveItem: (index: number) => void,
    onSetParentCollapse?: (collapsable: boolean) => void
}

interface MenuItemState extends MenuItemType {
    isActive: boolean,
    collapsable: boolean,
}
export class MenuItem extends React.Component<MenuItemProps, {}> {

    readonly state: MenuItemState = {
        isActive: false,
        collapsable: false,
        children: [],
        label: '',
        href: '',
    }
    componentDidMount() {
        const { pathname } = history.location;
        const { href, } = this.state;
        const { onSetParentCollapse } = this.props;
        let isActive = new RegExp(`^${href}`).test(pathname);
        if (onSetParentCollapse && isActive) onSetParentCollapse(true)
        this.setState({
            isActive
        })
    }
    static getDerivedStateFromProps(nextProps: MenuItemProps, preState: MenuItemState) {
        const { menu, activeIndex, itemIndex } = nextProps;
        const { children, icon, label, href } = menu;
        return {
            children,
            icon,
            label,
            href,
            isActive: (activeIndex == -1 && preState.isActive) || activeIndex === itemIndex,
        };
    }

    handleSetParentCollapse = (collapsable: boolean) => {
        const { onSetParentCollapse } = this.props;
        if (onSetParentCollapse && collapsable) onSetParentCollapse(collapsable)
        this.setState({ collapsable })
    }

    handleToggleMenu = () => {
        const { children } = this.state;
        if (!children || !children.length) return;
        this.setState({
            collapsable: !this.state.collapsable
        })
    }

    public render() {
        const {
            className,
            itemIndex,
            activeIndex,
            parentIndex,
            onSetActiveItem,
        } = this.props;
        const { isActive,
            collapsable,
            children,
            icon,
            label,
            href,
        } = this.state;
        const hasChildren = children && children.length;
        return (<div className={cx('hp-menuitem', className)}>
            <div className={cx('hp-menuitem_content',
                {
                    [`hp-menuitem-title`]: hasChildren,
                    [`hp-menuitem-active`]: isActive,
                    [`hp-menuitem-title_collapsable`]: collapsable,
                    [`hp-menuitem-title_collapsed`]: hasChildren && !collapsable,
                }
            )}>
                {icon && <Icn name={icon} size={16} />}
                {hasChildren || !href ?
                    <span className='hp-menuitem_label' onClick={this.handleToggleMenu}>{label}</span> :
                    <Link className='hp-menuitem_label' to={href} onClick={onSetActiveItem.bind(null, itemIndex, parentIndex)}>{label}</Link>
                }
            </div>
            {
                hasChildren && <ul className='hp-menu hp-menu-sub'>
                    {
                        children.map((child: MenuItemType, index: number) =>
                            <MenuItem
                                className={'ml-10'}
                                key={`menuitem-${itemIndex}-${index++}`}
                                parentIndex={itemIndex}
                                itemIndex={Number(itemIndex + '' + index)}
                                activeIndex={activeIndex}
                                menu={child}
                                onSetParentCollapse={this.handleSetParentCollapse}
                                onSetActiveItem={onSetActiveItem}
                            />
                        )
                    }
                </ul>
            }
        </div>)
    }
}

