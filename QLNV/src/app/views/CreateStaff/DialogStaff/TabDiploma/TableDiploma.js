import React from 'react';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { formatDate } from 'app/views/GeneralSettings/constant';

function TableDiploma({ listDiploma, onClickEditTextInfo, onClickDeleteTextInfo }) {
    const columns = [
        {
            key: 'action',
            title: 'Thao tác',
            dataIndex: 'action',
            width: '10%',
            render: (rowDataTextInfo, recordTextInfo, index) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <Tooltip placement="bottom" title="chỉnh sửa">
                            <EditFilled className="icon-antd icon-edit" onClick={() => onClickEditTextInfo(recordTextInfo, index)} />
                        </Tooltip>
                        <Tooltip placement="bottom" title="xóa">
                            <DeleteFilled className="icon-antd icon-delete" onClick={() => onClickDeleteTextInfo(recordTextInfo, index)} />
                        </Tooltip>
                    </div>
                );
            },
        },
        { key: 'name', title: 'Tên văn bằng', dataIndex: 'name', width: '20%' },
        { key: 'content', title: 'Nội dung văn bằng', dataIndex: 'content', width: '20%' },
        { key: 'educationalOrg', title: 'Nơi cấp', dataIndex: 'educationalOrg', width: '20%' },
        {
            key: 'issuanceDate',
            title: 'Ngày cấp',
            dataIndex: 'issuanceDate',
            width: '15%',
            render: (rowData) => {
                return <>{formatDate(rowData)}</>;
            },
        },
        { key: 'field', title: 'Lĩnh vực', dataIndex: 'field', width: '15%' },
    ];

    return <Table size="small" rowKey="index" dataSource={listDiploma} columns={columns} pagination={false}></Table>;
}

export default TableDiploma;
