import * as React from 'react';
const _ = require('lodash/core');
import './index.scss';
export interface InputProps {
    required?: boolean,
    pattern: string | RegExp | (() => boolean),
    patternMessage?: string,
    type?: 'text' | 'password' | 'textarea',
    className?: string,
    defaultValue?: string | number | boolean,
    onInput?: (e?: React.FormEvent<HTMLInputElement>) => void
}

export default class Input extends React.Component<InputProps, {}> {
    prefixCls = 'hp-input'

    private value__: string | number;

    private validate() {
        let valid: boolean, report = { msg: '' };
        const { required, pattern, patternMessage } = this.props;
        const value = this.value__;
        if(required && (_.isNil(value) || value === '')) {
            valid = false;
            report.msg = patternMessage || '该项不能为空';
        } 
        return { valid, report }
    }

    public getReportValidity() {
        const { valid, report } = this.validate();
        return {
            valid,
            report
        }
    }

    get value() {
        return this.value__;
    }

    set value(value: string | number) {
        this.value__ = value;
    }

    protected handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { onInput } = this.props;
        this.value__ = (e.target as HTMLInputElement).value;
        onInput && onInput();
    }
}
