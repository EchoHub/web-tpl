import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface TooltipProps {
    className?: string
}
export default function Tooltip(props: TooltipProps) {
    const {
        className,
    } = props;
    return <div className={cx('hp-tooltip', className)}>
        {name}
    </div>;
}
