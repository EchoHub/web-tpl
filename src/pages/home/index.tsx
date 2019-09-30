import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface HomeProps {
    className?: string
}
export default class Home extends React.Component<HomeProps, {}> {

    public render() {
        const { className } = this.props;
        return <div className={cx('home', className)}>
            1
        </div>;
    }
}
