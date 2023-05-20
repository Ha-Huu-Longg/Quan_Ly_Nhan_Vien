import { Table } from 'antd';
import { ActionButton } from 'app/views/GeneralSettings/ActionButton';
import { ListStatus } from 'app/views/GeneralSettings/ListStatus';
import { defaultPageSize, formatDate, pageSizeOptions } from 'app/views/GeneralSettings/constant';
import React from 'react';

function ProposedTable({ handleChangeProposed, handleOpenModalDeleteProposed, ProposedList }) {
    return (
        <Table
            className="table-collapse"
            size="small"
            columns={[
                {
                    key: '1',
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
                                        handleChangeProposed(record);
                                    } else if (method === 'delete') {
                                        handleOpenModalDeleteProposed(record.proposalConsultationId);
                                    } else {
                                        alert('Call Selected Here:' + record.id);
                                    }
                                }}
                            />
                        );
                    },
                },
                { key: '2', title: 'Loại', dataIndex: 'type' },
                {
                    key: '3',
                    title: 'Ngày',
                    render: (record) => formatDate(record?.date)
                },
                { key: '4', title: 'Nội dung', dataIndex: 'content' },
                { key: '5', title: 'Ghi chú', dataIndex: 'note' },
                { key: '6', title: 'Trạng thái', render: (record) => <ListStatus record={record} /> },
            ]}
            rowKey="studentId"
            dataSource={ProposedList}
            pagination={{
                defaultPageSize: defaultPageSize,
                showSizeChanger: true,
                pageSizeOptions: pageSizeOptions,
            }}
        />
    );
}

export default ProposedTable;
