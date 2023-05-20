import React from 'react';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { formatDate } from 'app/views/GeneralSettings/constant';

function TableFamilyRelationship({ listGender, listRelationship, onClickEditFamilyRelationship, onClickDeleteFamilyRelationship }) {
    const columns = [
        {
            key: 'action',
            title: 'Thao tác',
            dataIndex: 'action',
            width: '10%',

            render: (rowDataFamilyRelationship, recordFamilyRelationship, index) => {
                return (
                    <div>
                        <Tooltip placement="bottom" title="chỉnh sửa">
                            <EditFilled className="icon-antd icon-edit" onClick={() => onClickEditFamilyRelationship(recordFamilyRelationship, index)} />
                        </Tooltip>
                        <Tooltip placement="bottom" title="xóa">
                            <DeleteFilled className="icon-antd icon-delete" onClick={() => onClickDeleteFamilyRelationship(index, recordFamilyRelationship)} />
                        </Tooltip>
                    </div>
                );
            },
        },
        { key: 'name', title: 'Họ và tên', dataIndex: 'name', width: '17%' },
        {
            key: 'dateOfBirth',
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            width: '14%',
            render: (rowData) => {
                return <>{formatDate(rowData)}</>;
            },
        },
        {
            key: 'gender',
            title: 'Giới tính',
            dataIndex: 'gender',
            width: '12%',
            render: (gender) => listGender[gender]?.name,
        },
        { key: 'relation', title: 'Quan hệ', dataIndex: 'relation', width: '12%' },
        { key: 'citizenId', title: 'Số CCCD/CMT', dataIndex: 'citizenId', width: '15%' },
        { key: 'address', title: 'Địa chỉ', dataIndex: 'address', width: '20%' },
    ];

    return <Table rowKey="index" dataSource={listRelationship} columns={columns} pagination={false} size="small"></Table>;
}

export default TableFamilyRelationship;
