import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import FromItem from './FormItem';
import * as CRC from '@/public/utils/context';
export interface FormPropsType {
    className?: string,
    layout?: 'flex' | 'inline'
}
export default class Form extends React.Component<FormPropsType, {}> {

    static Item = FromItem;

    componentDidMount() {
        console.log(this.refs)
    }

    public render() {
        const {
            className,
            children,
            layout = 'inline',
        } = this.props;
        return (<div className={cx('hp-form', className, {
            [`hp-form-${layout}`] : layout
        })}>
            {CRC.create(children)}
        </div>);
    }
}