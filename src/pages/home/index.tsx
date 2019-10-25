import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { NavBar, SideBar } from '@/components/common';
import { Route } from 'react-router-dom';
import { HomeRouters } from '@/pages/routers';
export interface HomeProps {
    className?: string
}
export default class Home extends React.Component<HomeProps, {}> {
    readonly state = {
        sideBarCollapsable: true,
        menus: [
            {
                icon: 'dashboard',
                label: '个人大盘',
                href: '/home/dashboard',
            },
            {
                icon: 'folder',
                label: '开源项目',
                children: [
                    {
                        label: 'Hapi UI',
                        children: [
                            {
                                label: 'Table',
                                href: '/home/open/hapi_ui/table'
                            }
                        ]
                    },
                    {
                        label: '详情页',
                        href: '/home/pages/detail'
                    },
                    {
                        label: '404页',
                        href: '/home/pages/404'
                    },
                    {
                        label: '空白页',
                        href: '/home/pages/blank'
                    },
                ]
            }, {
                icon: 'chart',
                label: 'Charts'
            },
        ],
    }

    handleSetSideBarCollapse = () => {
        this.setState({
            sideBarCollapsable: !this.state.sideBarCollapsable
        })
    }
    public render() {
        const { className } = this.props;
        const { menus, sideBarCollapsable } = this.state;
        return <div className={cx('home', className)}>
            <NavBar onSetSideBarCollapse={this.handleSetSideBarCollapse} />
            <div className={'home-container'}>
                <SideBar collapsable={sideBarCollapsable} menus={menus as any} />
                <div className="home-wrapper p-20">
                    {
                        HomeRouters.map((conf, index) =>
                            <Route key={`home_route-${index}`} path={conf.path} component={conf.component} />
                        )
                    }
                </div>
            </div>
        </div>;
    }
}