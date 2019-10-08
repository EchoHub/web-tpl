import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import './index.scss';
export interface TextBoxProps {
    className?: string,
    defaultValue?: string,
    name?: string,
    placeholder?: string,
}
export default class TextBox extends React.Component<TextBoxProps, {}> {
    static defaultProps = {
        type: 'text'
    }
    render() {
        const { className } = this.props;
        const otherProps = omit(this.props, ['defaultValue']);
        return (<input className={cx('hp-textbox', className)} {...otherProps}/>);
    }
}
