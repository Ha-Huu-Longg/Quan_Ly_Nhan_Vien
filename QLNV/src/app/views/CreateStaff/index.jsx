import {
    DeleteFilled,
    EditFilled,
    EyeFilled,
    HomeFilled,
    InfoCircleFilled,
} from '@ant-design/icons';
import { Breadcrumb, Button, Form, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import DialogStaff from './DialogStaff';
import DialogStaffInfo from './DialogStaffInfo';

import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff, getListStaff, getPageCreateStaff, getTotalStaff, resetForm } from 'app/redux/actions/CreateStaffAction';
import ModalDelete from '../GeneralSettings/ModalDelete';
import ModalAdditionalRequest from '../GeneralSettings/ModalAdditionalRequest';
import { ListStatus } from '../GeneralSettings/ListStatus';
import { additionalStatus, defaultPageSize, newStatus, pageSizeOptions, rejectedStatus, waitingStatus } from '../GeneralSettings/constant';

const CreateStaff = () => {
    const [shouldOpenCreateStaffDialog, setShouldOpenCreateStaffDialog] = useState(false);
    const [shouldOpenStaffInfoDialog, setShouldOpenStaffInfoDialog] = useState(false);
    const [shouldOpenModalDelete, setShouldOpenModalDelete] = useState(false);
    const [shouldOpenModalAdditionalRequest, setShouldOpenModalAdditionalRequest] = useState(false);
    const [employeeId, setEmployeeId] = useState(0);
    const [employeeInfo, setEmployeeInfo] = useState(0);

    const dispatch = useDispatch()
    const StaffList = useSelector((state) => state.createStaff.StaffList)
    const total = useSelector((state) => state.createStaff.total)
    const reRender = useSelector((state) => state.createStaff.reRender);
    const page = useSelector((state) => state.createStaff.page);
    const pageSize = useSelector((state) => state.createStaff.pageSize);
    const statuses = [1, 3, 4, 6]

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getListStaff(page, pageSize, statuses))
    }, [reRender, page, pageSize])

    useEffect(() => {
        dispatch(getTotalStaff(statuses))
    }, [])

    const handlePaginationChange = (page, pageSize) => {
        dispatch(getPageCreateStaff(page, pageSize))
    };

    const openCreateStaffDialog = () => {
        setShouldOpenCreateStaffDialog(true);
    };

    const handleDetailStaff = (record) => {
        setEmployeeInfo(record);
        setShouldOpenStaffInfoDialog(true);
    };

    const handleClose = () => {
        setShouldOpenModalDelete(false);
        setShouldOpenCreateStaffDialog(false);
        setShouldOpenStaffInfoDialog(false);
        setShouldOpenModalAdditionalRequest(false);
        form.resetFields();
        setEmployeeId(0)
    }

    const handleEditStaff = (record) => {
        setEmployeeId(record.employeeId);
        setEmployeeInfo(record);
        setShouldOpenCreateStaffDialog(true);
    };

    const handleShowAdditionalRequest = (record) => {
        setEmployeeInfo(record);
        setShouldOpenModalAdditionalRequest(true);
    }

    const handleShowDialogDelete = (record) => {
        setEmployeeId(record.employeeId);
        setShouldOpenModalDelete(true);
    }

    const handleDelete = () => {
        dispatch(deleteStaff({ employeeId }))
        setShouldOpenModalDelete(false);
    }

    return (
        <div className="m-sm-30">
            <Breadcrumb className='breadcrumb-body'>
                <Breadcrumb.Item href="/">
                    <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/conclude/manage">
                    <span>Quản lý nhân viên</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
            </Breadcrumb>

            <div className='set-space-between'>
                <Button size="middle" onClick={openCreateStaffDialog} className="btn-add-new">TẠO MỚI</Button>
            </div>

            {shouldOpenCreateStaffDialog && (
                <DialogStaff
                    open={shouldOpenCreateStaffDialog}
                    handleClose={handleClose}
                    employeeId={employeeId}
                    setEmployeeId={setEmployeeId}
                    employeeInfo={employeeInfo}
                />
            )}

            {shouldOpenStaffInfoDialog && (
                <DialogStaffInfo
                    open={shouldOpenStaffInfoDialog}
                    handleClose={handleClose}
                    employeeInfo={employeeInfo}
                />
            )}

            {shouldOpenModalDelete && (
                <ModalDelete
                    onOk={handleDelete}
                    open={shouldOpenModalDelete}
                    onCancel={handleClose}
                />
            )}

            {shouldOpenModalAdditionalRequest && (
                <ModalAdditionalRequest
                    onOk={handleEditStaff}
                    open={shouldOpenModalAdditionalRequest}
                    onCancel={handleClose}
                    employeeInfo={employeeInfo}

                />
            )}

            <Table
                dataSource={StaffList}
                size='small'
                columns={[
                    {
                        key: 'action',
                        title: 'Hành động',
                        dataIndex: 'action',
                        align: 'center',
                        width: '10%',
                        render: (text, record) => {
                            return (
                                <div className='list_icon' >
                                    {(record.status === newStatus || record.status === additionalStatus || record.status === rejectedStatus) &&
                                        <Tooltip placement="bottom" title="chỉnh sửa">
                                            <EditFilled
                                                onClick={() => handleEditStaff(record)}
                                                className="icon-antd icon-edit"
                                            />
                                        </Tooltip>}

                                    {record.status === additionalStatus && <Tooltip placement="bottom" title="bổ sung thông tin">
                                        <InfoCircleFilled onClick={() => handleShowAdditionalRequest(record)} className="icon-info" />
                                    </Tooltip>
                                    }

                                    {record.status === waitingStatus && <Tooltip placement="bottom" title="xem thông tin">
                                        <EyeFilled
                                            onClick={() => handleDetailStaff(record)}
                                            className='icon-antd icon-eye'
                                        />
                                    </Tooltip>
                                    }

                                    {record.status === newStatus && <Tooltip placement="bottom" title="xóa">
                                        <DeleteFilled
                                            onClick={() => handleShowDialogDelete(record)}
                                            className='icon-antd icon-delete'
                                        />
                                    </Tooltip>}
                                </div>
                            );
                        },
                    },
                    { key: 'code', title: 'Mã nhân viên', dataIndex: 'code', width: '12%' },
                    { key: 'fullName', title: 'Tên nhân viên', dataIndex: 'fullName', width: '16%' },
                    { key: 'email', title: 'Email', dataIndex: 'email', width: '16%' },
                    { key: 'phone', title: 'Số điện thoại', dataIndex: 'phone', width: '16%' },
                    { key: 'citizenId', title: 'Mã CCCD/CMT', dataIndex: 'citizenId', width: '16%' },
                    {
                        key: 'status',
                        title: 'Trạng thái',
                        width: '14%',
                        render: (record) => <ListStatus record={record} />
                    },
                ]}
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
        </div>
    );
};

export default CreateStaff;
