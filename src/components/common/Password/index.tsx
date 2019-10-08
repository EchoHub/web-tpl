import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import './index.scss';
export interface PasswordProps {
    className?: string,
    defaultValue?: string,
    name?: string,
    placeholder?: string,
}
export default class Password extends React.Component<PasswordProps, {}> {
    static defaultProps = {
        type: 'password'
    }
    render() {
        const { className } = this.props;
        const otherProps = omit(this.props, ['defaultValue']);
        return (<input className={cx('hp-textbox hp-password', className)} {...otherProps}/>);
    }
}
