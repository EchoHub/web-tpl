import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { NavBar, SideBar } from '@/components/common';
export interface HomeProps {
    className?: string
}
export default class Home extends React.Component<HomeProps, {}> {
    readonly state = {
        menus: [
            {
                icon: 'dashboard',
                label: 'Dashboard',
                href: '#/dashboard',
            },
            {
                icon: 'folder',
                label: 'Pages',
                children: [
                    {
                        label: '列表页',
                        href: '#/pages/tables'
                    },
                    {
                        label: '详情页',
                        href: '#/pages/detail'
                    },
                    {
                        label: '404页',
                        href: '#/pages/404'
                    },
                    {
                        label: '空白页',
                        href: '#/pages/blank'
                    },
                ]
            },{
                icon: 'chart',
                label: 'Charts',
                children: [
                    {
                        label: '',
                        href: ''
                    },
                ]
            },
        ]
    }
    public render() {
        const { className } = this.props;
        const { menus } = this.state;
        return <div className={cx('home', className)}>
            <NavBar />
            <div className={'home-container'}>
                <SideBar menus={menus as any} />
                <div className="home-wrapper">

                </div>
            </div>
        </div>;
    }
}
