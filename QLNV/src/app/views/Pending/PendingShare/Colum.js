import React from 'react';
import { Tooltip } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import moment from 'moment';

export const ColumFamilyRelations = () => [
    { title: 'Quan hệ', dataIndex: 'relation' },
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'Giới tính', render: (rowData) => (rowData.gender === 0 ? 'Nam' : 'Nữ') },
    { title: 'Ngày sinh', render: (rowData) => moment(rowData.dateOfBirth, 'YYYY-MM-DD').format('DD-MM-YYY') },
    { title: 'CCCD', dataIndex: 'citizenId' },
    { title: 'Địa chỉ', dataIndex: 'address' },
];

export const Columns = (openDialog) => [
    {
        title: 'Hành động',
        dataIndex: '',
        width: 110,
        align: 'center',
        render: (rowData) => (
            <Tooltip
                title="Chi tiết"
                type="primary"
                size="small"
                placement="bottom"
                onClick={() => openDialog(rowData)}
            >
                <EyeFilled style={{ color: '#289928' }} />
            </Tooltip>
        ),
    },
    {
        title: 'Họ Tên',
        dataIndex: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Trạng thái',
        render: (rowData) => (rowData?.status === 3 ? 'Chờ xử lý' : 'Chờ duyệt kết thúc'),
    },
];
