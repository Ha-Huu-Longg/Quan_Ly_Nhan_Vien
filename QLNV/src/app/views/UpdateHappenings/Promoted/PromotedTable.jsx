import { Table } from 'antd';
import { ActionButton } from 'app/views/GeneralSettings/ActionButton';
import { ListStatus } from 'app/views/GeneralSettings/ListStatus';
import { defaultPageSize, formatDate, pageSizeOptions } from 'app/views/GeneralSettings/constant';
import React from 'react';

function PromotedTable({ handleChangePromoted, handleOpenModalDeletePromoted, listPromoted }) {
    return (
        <Table
            size="small"
            className="table-collapse"
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
                                        handleChangePromoted(record);
                                    } else if (method === 'delete') {
                                        handleOpenModalDeletePromoted(record?.promotionId);
                                    } else {
                                        alert('Call Selected Here:' + record?.id);
                                    }
                                }}
                            />
                        );
                    },
                },
                { key: '2', title: 'Lần', dataIndex: 'count' },
                { key: '3', title: 'Chức vụ cũ', dataIndex: 'oldPosition' },
                { key: '4', title: 'Chức vụ hiện tại', dataIndex: 'newPosition' },
                {
                    key: '5',
                    title: 'Ngày',
                    render: (record) => formatDate(record?.date)
                },
                { key: '6', title: 'Lý do', dataIndex: 'reason' },
                { key: '7', title: 'Ghi chú', dataIndex: 'note' },
                { key: '8', title: 'Trạng thái', render: (record) => <ListStatus record={record} /> },
            ]}
            rowKey="studentId"
            dataSource={listPromoted}
            pagination={{
                defaultPageSize: defaultPageSize,
                showSizeChanger: true,
                pageSizeOptions: pageSizeOptions,
            }}
        />
    );
}

export default PromotedTable;
