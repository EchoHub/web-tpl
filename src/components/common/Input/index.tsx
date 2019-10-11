import * as React from 'react';
const _ = require('lodash');
import './index.scss';

export const ExcludeInputProps = ['defaultValue', 'requiredPatternMessage', 'pattern', 'patternMessage']
export interface InputProps {
    required?: boolean,
    pattern?: string | RegExp | ((value: any) => boolean),
    patternMessage?: string,
    requiredPatternMessage?: string,
    name?: string,
    placeholder?: string,
    className?: string,
    defaultValue?: string | number | boolean,
    onInput?: (e?: React.FormEvent<HTMLInputElement>) => void
}

export default class Input extends React.Component<InputProps, {}> {
    prefixCls = 'hp-input'

    readonly state = {
        isError: false,
    };

    private value__: string | number;

    private validate() {
        let valid: boolean = true, report = { name: '', msg: '' };
        const { name, required, pattern, requiredPatternMessage, patternMessage } = this.props;
        const value = this.value__;
        const isEmpty = (_.isNil(value) || value === '');
        if (required && (_.isNil(value) || value === '')) {
            valid = false;
            report.name = name;
            report.msg = requiredPatternMessage || '该项不能为空';
        } else if (!isEmpty && pattern) {
            if (typeof pattern === 'function') {
                valid = pattern(value);
            }else {
                valid = (pattern as RegExp).test(value.toString());
            }
            if(!valid) {
                report.name = name;
                report.msg = patternMessage || '格式校验不通过';
            }
        }
        this.setState({ isError: !valid })
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
