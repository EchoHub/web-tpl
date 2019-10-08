import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import * as CRC from '@/public/utils/context';
export interface FormItemPropsType {
    className?: string,
}
export default class FormItem extends React.Component<FormItemPropsType, {}> {
    public render() {
        const {
            className,
            children,
        } = this.props;
        return (<div className={cx('hp-formitem', className)}>
            {CRC.create(children)}
        </div>);
    }
}