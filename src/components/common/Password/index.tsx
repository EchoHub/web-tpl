import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import Input, { InputProps } from './../Input';
import './index.scss';
export interface PasswordProps extends InputProps {
    className?: string,
    defaultValue?: string,
    name?: string,
    placeholder?: string,
}
export default class Password extends Input {
    static defaultProps: Partial<PasswordProps> = {
        type: 'password'
    }

    public getReportValidity() {
        return super.getReportValidity();
    }

    get value() {
        return super.value;
    }

    set value(value: string | number) {
        super.value = value;
    }

    render() {
        const { className } = this.props;
        const otherProps = omit(this.props, ['defaultValue']);
        return (<input className={cx('hp-textbox hp-password', className)} {...otherProps} onInput={this.handleInput}/>);
    }
}
