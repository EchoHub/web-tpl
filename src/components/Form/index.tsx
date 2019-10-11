import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import FormItem, { FormItemReport } from './FormItem';
import * as CRC from '@/public/utils/context';
export interface FormPropsType {
    className?: string,
    layout?: 'flex' | 'inline'
}

type ReportsType = FormItemReport[]
export default class Form extends React.Component<FormPropsType, {}> {

    static Item = FormItem;

    componentDidMount() { }

    private getFormItemRefs() {
        let refs_: React.ReactInstance[] = [];
        const refs = this.refs;
        for (const ref in refs) {
            const regExp = /^formitem-/;
            if (regExp.test(ref)) {
                const formItemRef = refs[ref];
                refs_.push(formItemRef)
            }
        }
        return refs_;
    }

    public getReportValidity() {
        let valid: boolean = true, reports: ReportsType = [];
        const refs = this.getFormItemRefs();
        for (const ref of refs) {
            const report = (ref as FormItem).getReportValidity();
            if(!report.valid) {
                for(const rp of report.reports) {
                    reports.push(rp as FormItemReport);
                }
            }
            if (valid) valid = report.valid;
        }
        return {
            valid,
            reports
        };
    }

    private $value: { [key: string]: any };

    get value() {
        let value: { [key: string]: any } = {};
        const refs = this.getFormItemRefs();
        for (const ref of refs) {
            Object.assign(value, (ref as FormItem).value);
        }
        this.$value = value;
        return this.$value;
    }

    set value(value: { [key: string]: any }) {
        this.$value = value;
    }

    public render() {
        const {
            className,
            children,
            layout = 'inline',
        } = this.props;
        return (<div className={cx('hp-form', className, {
            [`hp-form-${layout}`]: layout
        })}>
            {CRC.create(children)}
        </div>);
    }
}