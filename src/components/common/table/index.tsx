import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface TableProps {
    className?: string
}
export default class Table extends React.Component<TableProps, {}> {
    public render() {
        const {
            className,
        } = this.props;
        return (<div className={cx('hp-table', className)}>
            1231231323
        </div>);
    }
}
