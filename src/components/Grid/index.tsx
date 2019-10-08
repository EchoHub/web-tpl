import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface __Props {
    className?: string
}
export default function __(props: __Props) {
    const {
        className,
    } = props;
    return <div className={cx('__', className)}>
        {name}
    </div>;
}
