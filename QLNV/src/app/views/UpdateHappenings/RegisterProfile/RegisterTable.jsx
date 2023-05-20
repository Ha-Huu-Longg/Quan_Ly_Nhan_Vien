import { Table } from 'antd';
import { ActionButton } from 'app/views/GeneralSettings/ActionButton';
import { defaultPageSize, formatDate, pageSizeOptions } from 'app/views/GeneralSettings/constant';
import React from 'react';

function RegisterTable({ handleChangeRegister, handleOpenModalDeleteRegister, employeeData }) {
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
                                        handleChangeRegister(record);
                                    } else if (method === 'delete') {
                                        handleOpenModalDeleteRegister(record?.proposalConsultationId);
                                    } else {
                                        alert('Call Selected Here:' + record?.id);
                                    }
                                }}
                            />
                        );
                    },
                },
                { key: '2', title: 'Hồ sơ', dataIndex: 'type' },
                {
                    key: '3',
                    title: 'Ngày đăng kí',
                    render: (record) => {
                        return (
                            <div>
                                <p>{formatDate(record?.date)}</p>
                            </div>
                        );
                    },
                },
                { key: '4', title: 'Nội dung', dataIndex: 'content' },
                { key: '5', title: 'Ghi chú', dataIndex: 'note' },
            ]}
            rowKey="6"
            dataSource={employeeData}
            pagination={{
                defaultPageSize: defaultPageSize,
                showSizeChanger: true,
                pageSizeOptions: pageSizeOptions,
            }}
        />
    );
}

export default RegisterTable;
