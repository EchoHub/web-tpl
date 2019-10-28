import * as React from 'react';
import cx from 'classnames';
import './index.scss';
type ObjectType = {
    [key: string]: any
}
export type ColumnConfigType = {
    title: string,
    key?: string | number,
    render?: (row: any) => React.ReactNode,
}
export interface TableProps {
    className?: string,
    columns?: ColumnConfigType[],
    dataSource?: ObjectType[]
}
export default class Table extends React.Component<TableProps, {}> {

    private renderHeader(columns: ColumnConfigType[]) {
        let thead = [] as React.ReactNode[], index = 0;
        for (const item of columns) {
            thead.push(<th className={'hp-table_th'} key={index}>{item.title}</th>);
            index++;
        }
        return <thead className={'hp-table_header'}><tr>{thead}</tr></thead>;
    }

    private renderBody(columns: ColumnConfigType[], dataSource: ObjectType[]) {
        let tbody = [] as React.ReactNode[], i = 0;
        for (const data of dataSource) {
            let trs = [] as React.ReactNode[], index = 0;
            for (const column of columns) {
                trs.push(<Column key={`${column.key}_${index}`} value={data[column.key]} />);
                index++;
            }
            tbody.push(<tr key={`tr_${i}`}>{trs}</tr>);
            i++;
        }

        return <tbody>{tbody}</tbody>;
    }

    public render() {
        const {
            className,
            columns,
            dataSource
        } = this.props;
        return (<table className={cx('hp-table', className)}>
            {this.renderHeader(columns)}
            {this.renderBody(columns, dataSource)}
        </table>);
    }
}


export interface ColumnProps {
    className?: string,
    value?: any,
}
export function Column(props: ColumnProps) {
    const {
        className,
        value
    } = props;
    return (<td className={cx('hp-table_column', className)}>
        {value}
    </td>);
}