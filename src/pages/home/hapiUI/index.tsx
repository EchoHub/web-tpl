import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface HapiUIProps {
    name: string;
    className?: string
}
export default class HapiUI extends React.Component<HapiUIProps, {}> {
    static defaultProps: HapiUIProps = {
        name: 'HapiUI',
    };
    public render() {
        const { name, className } = this.props;
        return <div className={cx('hapiUI', className)}>
            hapiUI
        </div>;
    }
}
