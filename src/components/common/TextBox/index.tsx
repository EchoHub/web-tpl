import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import Input, { InputProps, ExcludeInputProps } from './../Input';
import './index.scss';
export interface TextBoxProps extends InputProps {
    type: 'text'
}
export default class TextBox extends Input {

    static defaultProps: Partial<TextBoxProps> = {
        type: 'text'
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
            className={cx('hp-textbox',
                className,
                { [`hp-input-error`]: isError })}
            onInput={this.handleInput}
        />
        );
    }
}
