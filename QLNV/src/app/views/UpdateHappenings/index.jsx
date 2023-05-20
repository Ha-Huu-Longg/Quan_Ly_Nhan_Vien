import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeFilled, HomeFilled, InfoCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Table, Tooltip } from 'antd';

import { ListStatus } from '../GeneralSettings/ListStatus';
import AdditionalRequestModal from './AdditionalRequestModal';
import ModalUpdateHappenings from './ModalUpdateHappenings';
import { getListStaff, getPageCreateStaff, getTotalStaff } from 'app/redux/actions/CreateStaffAction';
import { defaultPageSize, formatDate, listGender, pageSizeOptions, rejectedToEndStatus, replenishmentStatus } from '../GeneralSettings/constant';

const UpdateHappenings = () => {
    const [employeeInfo, setEmployeeInfo] = useState({});
    const [shouldOpenModalUpdateHappenings, setShouldOpenModalUpdateHappenings] = useState(false);
    const [shouldOpenAdditionalRequestModal, setShouldOpenAdditionalRequestModal] = useState(false);

    const dispatch = useDispatch()
    const StaffList = useSelector((state) => state.createStaff.StaffList)
    const total = useSelector((state) => state.createStaff.total)
    const reRender = useSelector((state) => state.createStaff.reRender);
    const page = useSelector((state) => state.createStaff.page);
    const pageSize = useSelector((state) => state.createStaff.pageSize);
    const statuses = [5, 8, 9, 11]

    useEffect(() => {
        dispatch(getListStaff(page, pageSize, statuses))
    }, [reRender, page, pageSize])

    useEffect(() => {
        dispatch(getTotalStaff(statuses))
    }, [])

    const handlePaginationChange = (page, pageSize) => {
        dispatch(getPageCreateStaff(page, pageSize))
    };

    const openUpdateStatus = () => {
        setShouldOpenModalUpdateHappenings(!shouldOpenModalUpdateHappenings);
    };

    const openAdditionalRequestModal = () => {
        setShouldOpenAdditionalRequestModal(!shouldOpenAdditionalRequestModal);
    };

    return (
        <div className="m-sm-30 updateHappenings">
            <Breadcrumb className='breadcrumb-body'>
                <Breadcrumb.Item href="/">
                    <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/conclude/manage">
                    <span>Quản lý nhân viên</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
            </Breadcrumb>

            <Table
                size='small'
                columns={[
                    {
                        key: 'action',
                        title: 'Hành động',
                        width: '10%',
                        align: 'center',
                        render: (record) => {

                            return (
                                <div className='list_icon' >
                                    <Tooltip placement="bottom" title="xem thông tin">
                                        <EyeFilled
                                            onClick={() => {
                                                setEmployeeInfo(record);
                                                openUpdateStatus();
                                            }}
                                            className='icon-antd icon-eye'
                                        />
                                    </Tooltip>

                                    {(record?.status === replenishmentStatus || record?.status === rejectedToEndStatus) && <Tooltip placement="bottom" title="bổ sung thông tin">
                                        <InfoCircleFilled onClick={() => {
                                            openAdditionalRequestModal()
                                            setEmployeeInfo(record);

                                        }} className="icon-info" />
                                    </Tooltip>}
                                </div>
                            );

                        },
                    },
                    {
                        key: 'code', title: 'Mã nhân viên', width: '12%',
                        render: (record) => record?.code ? record?.code : null
                    },
                    {
                        key: 'fullName', title: 'Họ và tên', width: '15%',
                        render: (record) => record?.fullName ? record?.fullName : null
                    },
                    {
                        key: 'dateOfBirth', title: 'Ngày sinh', width: '10%',
                        render: (record) => record?.dateOfBirth ? formatDate(record?.dateOfBirth) : null
                    },
                    {
                        key: 'gender', title: 'Giới tính', width: '10%',
                        render: (record) => listGender[record?.gender]?.name
                    },
                    {
                        key: 'address', title: 'Địa chỉ', width: '25%',
                        render: (record) => record?.address ? record?.address : null
                    },
                    {
                        key: 'status',
                        title: 'Trạng thái',
                        render: (record) => <ListStatus record={record} />
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

            {shouldOpenAdditionalRequestModal && (
                <AdditionalRequestModal
                    open={shouldOpenAdditionalRequestModal}
                    openAdditionalRequestModal={openAdditionalRequestModal}
                    employeeInfo={employeeInfo}
                />
            )}

            {shouldOpenModalUpdateHappenings && (
                <ModalUpdateHappenings
                    open={shouldOpenModalUpdateHappenings}
                    employeeInfo={employeeInfo}
                    openUpdateStatus={openUpdateStatus}
                />
            )}
        </div>
    );
};

export default UpdateHappenings;
