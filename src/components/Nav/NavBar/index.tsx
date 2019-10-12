import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { Button, Icn, Form, TextBox } from '@/components/common';
export interface NavBarProps {
    className?: string
}
export default function NavBar(props: NavBarProps) {
    const {
        className,
    } = props;

    return <nav className={cx('hp-navbar', className)}>
        <div className="hp-navbar_header">
            <Icn name={'hapi'} size={24} onClick={() => { location.href = "#/home" }} />
            <Button className="navbar-brand" type={'text'} onClick={() => { location.href = "#/home" }}>Hapi Design</Button>
            <Icn className={'ml-10'} name={'menu'} size={20} />
        </div>
        <div className="hp-navbar_nav">
            <Form className='search'>
                <Form.Item>
                    <TextBox className={'search-input'} name={'search'} placeholder={'搜索'} required requiredPatternMessage={'搜索内容不可为空'} />
                    <Icn className={'search-btn'} name={'search'} size={18} color={'rgba(0, 0, 0, .65)'} />
                </Form.Item>
            </Form>
            <Icn className={'ml-20'} name={'bell'} size={18} />
            <Icn className={'ml-20'} name={'mail'} size={18} />
            <Icn className={'ml-20'} name={'setting'} size={18} />
        </div>
    </nav>;
}
