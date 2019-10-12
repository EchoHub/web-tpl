import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import Input, { InputProps, ExcludeInputProps } from './../Input';
import './index.scss';
export interface PasswordProps extends InputProps {
    type: 'password'
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
        const { isError } = this.state;
        const otherProps = omit(this.props, ExcludeInputProps as any);
        return (<input
            {...otherProps}
            className={cx('hp-textbox hp-password',
                className,
                { [`hp-input-error`]: isError })}
            onInput={this.handleInput}
        />);
    }
}
