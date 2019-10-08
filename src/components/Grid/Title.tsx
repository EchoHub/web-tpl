import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface TitleProps {
    className?: string;
    size?: number;
    color?: string;
    context?: string;
    fontWeight?: number,
    children?: React.ReactNode | React.ReactNodeArray
}
export default function Title(props: TitleProps) {
    const {
        className,
        size = 36,
        color = '#000000',
        children,
        fontWeight = 600,
    } = props;
    return (<div className={cx('title', className)} style={{
        fontSize: size + 'px',
        fontWeight: fontWeight,
        color
    }}>
        {children}
    </div>);
}