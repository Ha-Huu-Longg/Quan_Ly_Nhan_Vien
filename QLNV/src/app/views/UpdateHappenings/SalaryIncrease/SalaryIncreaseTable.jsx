import { Table } from 'antd';
import { ActionButton } from 'app/views/GeneralSettings/ActionButton';
import { ListStatus } from 'app/views/GeneralSettings/ListStatus';
import { formatDate, defaultPageSize, pageSizeOptions } from 'app/views/GeneralSettings/constant';
import React from 'react';

function SalaryIncreaseTable({ handleChangeIncreaseSalary, handleOpenModalDeleteSalary, SalaryList }) {
    return (
        <Table
            size="small"
            className="table-collapse"
            columns={[
                {
                    key: 'action',
                    title: 'Hành động',
                    width: '12%',
                    align: 'center',
                    render: (record) => {
                        return (
                            <ActionButton
                                update
                                deleted
                                item={record}
                                onSelect={(record, method) => {
                                    if (method === 'update') {
                                        handleChangeIncreaseSalary(record);
                                    } else if (method === 'delete') {
                                        handleOpenModalDeleteSalary(record?.salaryId);
                                    } else {
                                        alert('Call Selected Here:' + record?.id);
                                    }
                                }}
                            />
                        );
                    },
                },
                { key: 'count', title: 'Lần', dataIndex: 'count' },
                { key: 'salaryScale', title: 'Bậc', dataIndex: 'salaryScale' },
                {
                    key: 'date',
                    title: 'Ngày tăng lương',
                    render: (record) => {
                        return <div>{formatDate(record?.date)}</div>;
                    },
                },
                { key: 'reason', title: 'Lý do', dataIndex: 'reason' },
                { key: 'note', title: 'Ghi chú', dataIndex: 'note' },
                { key: 'status', title: 'Trạng thái', render: (record) => <ListStatus record={record} /> },
            ]}
            rowKey="studentId"
            dataSource={SalaryList}
            pagination={{
                defaultPageSize: defaultPageSize,
                showSizeChanger: true,
                pageSizeOptions: pageSizeOptions,
            }}
        />
    );
}

export default SalaryIncreaseTable;
