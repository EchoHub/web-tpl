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
}
export default function Icn(props: IcnProps) {
    const {
        className,
        name,
        size = 14,
        color,
    } = props;
    return <span className={cx('hp-icn', className)}>
        {(Icns[name] as any)({ size, color })}
    </span>;
}
