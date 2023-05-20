import React from 'react';
import { Table } from 'antd';
import { formatDate } from './constant';

function FormDiploma(props) {
    const { data } = props;

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => index + 1,
            width: '5%',
            align: 'center',
        },
        {
            key: 'name',
            title: 'Tên văn bằng',
            dataIndex: 'name',
            width: '15%',
            align: 'center',
        },
        {
            key: 'educationalOrg',
            title: 'Nơi cấp',
            dataIndex: 'educationalOrg',
            width: '15%',
            align: 'center',
        },
        {
            key: 'issuanceDate',
            title: 'Ngày cấp',
            render: (rowData) => formatDate(rowData.issuanceDate),
            width: '15%',
            align: 'center',
        },
        {
            key: 'field',
            title: 'Lĩnh vực',
            dataIndex: 'field',
            width: '20%',
            align: 'center',
        },
        {
            key: 'content',
            title: 'Nội dung văn bằng',
            dataIndex: 'content',
            width: '30%',
            align: 'center',
        },
    ];

    return <Table dataSource={data} columns={columns} pagination={false} className="table-information table-diploma pr-24" bordered size="small"></Table>;
}

export default FormDiploma;
