import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import * as CRC from '@/public/utils/context';
export interface FormItemPropsType {
    className?: string,
}
export type FormItemReport = {
    // valid: boolean,
    // report: {
    name: string,
    msg: string,
    // }
}
export default class FormItem extends React.Component<FormItemPropsType, {}> {

    private getFormItemRefs() {
        let refs_: React.ReactInstance[] = [];
        const refs = this.refs;
        for (const ref in refs) {
            const regExp = /^input-/;
            if (regExp.test(ref)) {
                const formItemRef = refs[ref];
                refs_.push(formItemRef)
            }
        }
        return refs_;
    }

    public getReportValidity() {
        let valid: boolean = true, reports: FormItemReport[] = [];
        const refs = this.getFormItemRefs();
        for (const ref of refs) {
            const report = (ref as any).getReportValidity();
            reports.push(report.report);
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
            // @ts-ignore
            const { name } = ref.props;
            value[name] = (ref as any).value !== undefined ? (ref as any).value : '';
        }
        this.$value = value;
        return this.$value;
    }

    set value(value) {
        this.$value = value;
    }

    public render() {
        const {
            className,
            children,
        } = this.props;
        return (<div className={cx('hp-formitem', className)}>
            {CRC.create(children)}
        </div>);
    }
}