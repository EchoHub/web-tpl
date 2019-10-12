import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { IcnType } from './types';
import * as Icns from './icons';
export interface IcnProps {
    className?: string,
    name: IcnType,
    size?: number,
    color?: string,
    onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}
export default function Icn(props: IcnProps) {
    const {
        className,
        name,
        size = 14,
        color,
        onClick = () => { }
    } = props;
    return <span className={cx('hp-icn', className)} onClick={onClick}>
        {(Icns[name] as any)({ size, color })}
    </span>;
}
