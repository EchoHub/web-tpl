import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface DashboardProps {
    name: string;
    className?: string
}
export default class Dashboard extends React.Component<DashboardProps, {}> {
    static defaultProps: DashboardProps = {
        name: 'Dashboard',
    };
    public render() {
        const { name, className } = this.props;
        return <div className={cx('dashboard', className)}>
            dashboard
        </div>;
    }
}
