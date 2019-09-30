import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface __Props {
    name: string;
    className?: string
}
export default class __ extends React.Component<__Props, {}> {
    static defaultProps: __Props = {
        name: '__',
    };
    public render() {
        const { name, className } = this.props;
        return <div className={cx('__', className)}>
            {name} 
        </div>;
    }
}
