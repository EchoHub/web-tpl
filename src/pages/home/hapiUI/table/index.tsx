import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { Table, Title } from '@/components/common';
type TableDataType = {
    key: string,
    name: string,
    age: number,
    address: string,
    tags?: string[],
}
export interface tablePageProps {
    name: string;
    className?: string,
}
export default class TablePage extends React.Component<tablePageProps, {}> {
    static defaultProps: tablePageProps = {
        name: 'tablePage',
    };

    readonly state = {
        dataSource: [
            {
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ]
    }

    private tableColumns = [
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: 'Tags',
            key: 'tags'
        },
        {
            title: 'Action',
            render: (row: TableDataType) => {
                return 1
            }
        }
    ]

    public render() {
        const { className } = this.props;
        const { dataSource } = this.state;
        return <div className={cx('tablePage', className)}>
            <Title size={28}>Table 表格</Title>
            <Table className={'mt-20'} columns={this.tableColumns} dataSource={dataSource} />
        </div>;
    }
}
