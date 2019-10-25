import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface tablePageProps {
    name: string;
    className?: string
}
export default class TablePage extends React.Component<tablePageProps, {}> {
    static defaultProps: tablePageProps = {
        name: 'tablePage',
    };
    public render() {
        const { name, className } = this.props;
        return <div className={cx('tablePage', className)}>
            table 
        </div>;
    }
}
