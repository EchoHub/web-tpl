import * as React from 'react';
import cx from 'classnames';
import omit from 'omit.js';
import Input, { InputProps } from './../Input';
import './index.scss';
export interface TextBoxProps extends InputProps {
    name?: string,
    placeholder?: string,
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
        const otherProps = omit(this.props, ['defaultValue']);
        return (<input className={cx('hp-textbox', className)} {...otherProps} onInput={this.handleInput}/>);
    }
}
