import { EyeFilled } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import React from 'react';
import { ListStatus } from '../GeneralSettings/ListStatus';
import { defaultPageSize, formatDate, pageSizeOptions } from '../GeneralSettings/constant';

function EndStaffTable({ handleShowFormInformation, setEmployeeInfo, StaffList, page, pageSize, total, handlePaginationChange }) {
    const ViewEndStaffButton = ({ item, onSelect }) => {
        return (
            <div className="list-work-btn">
                <Tooltip placement="bottom" title="view record">
                    <EyeFilled className="icon-eye" onClick={() => onSelect(item)} />
                </Tooltip>
            </div>
        );
    };

    return (
        <Table
            size="small"
            columns={[
                {
                    key: 'action',
                    title: 'Hành động',
                    align: 'center',
                    width: '10%',
                    render: (record) => {
                        return (
                            <ViewEndStaffButton
                                item={record}
                                onSelect={(record) => {
                                    handleShowFormInformation();
                                    setEmployeeInfo(record);
                                }}
                            />
                        );
                    },
                },
                { key: 'code', title: 'Mã nhân viên', dataIndex: 'code' },
                { key: 'fullName', title: 'Họ và tên', dataIndex: 'fullName' },
                {
                    key: 'terminatedDate',
                    title: 'Ngày nộp lưu',
                    render: (record) => formatDate(record?.terminatedDate)
                },
                {
                    key: 'storedProfileCode',
                    title: 'Số lưu',
                    render: (record) => record?.storedProfileCode ? record?.storedProfileCode : null
                },
                {
                    key: 'status',
                    title: 'Trạng thái',
                    render: (record) => <ListStatus record={record} />,
                },
            ]}
            dataSource={StaffList}
            pagination={{
                current: page,
                pageSize: pageSize,
                total: total,
                onChange: handlePaginationChange,
                showSizeChanger: true,
                defaultPageSize: defaultPageSize,
                pageSizeOptions: pageSizeOptions,
            }}
        />
    );
}

export default EndStaffTable;
