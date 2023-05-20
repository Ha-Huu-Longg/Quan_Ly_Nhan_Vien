import { HomeFilled } from '@ant-design/icons';
import { Breadcrumb, Form } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusEndStaff } from 'app/redux/actions/EndStaffActions';
import EndStaffModal from './EndStaffModal';
import EndStaffModalSaveRecords from './EndStaffModalSaveRecords';
import EndStaffTable from './EndStaffTable';
import { getListStaff, getPageCreateStaff, getTotalStaff } from 'app/redux/actions/CreateStaffAction';
import { recordedStatus } from '../GeneralSettings/constant';

const EndStaff = () => {
    const [employeeInfo, setEmployeeInfo] = useState({});
    const [informationForm, setInformationForm] = useState(false);
    const [openModalSaveRecords, setOpenModalSaveRecords] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const StaffList = useSelector((state) => state.createStaff.StaffList)
    const total = useSelector((state) => state.createStaff.total)
    const reRender = useSelector((state) => state.createStaff.reRender);
    const page = useSelector((state) => state.createStaff.page);
    const pageSize = useSelector((state) => state.createStaff.pageSize);
    const statuses = [10, 13]

    useEffect(() => {
        dispatch(getListStaff(page, pageSize, statuses))
    }, [reRender, page, pageSize])

    useEffect(() => {
        dispatch(getTotalStaff(statuses))
    }, [])

    const handlePaginationChange = (page, pageSize) => {
        dispatch(getPageCreateStaff(page, pageSize))
    };

    const handleSubmitProfile = async (value) => {
        const data = {
            employeeId: employeeInfo?.employeeId,
            ...value,
            status: recordedStatus,
        };

        dispatch(updateStatusEndStaff(data, handleClose))
    };

    const handleShowFormInformation = () => {
        setInformationForm(!informationForm);
    };

    const handleOpenModalSaveRecords = () => {
        setOpenModalSaveRecords(!openModalSaveRecords)
        form.resetFields();
    };

    const handleClose = () => {
        handleShowFormInformation()
        handleOpenModalSaveRecords()
    }

    return (
        <div className="m-sm-30 approved_staff">
            <Breadcrumb className='breadcrumb-body'>
                <Breadcrumb.Item href="/">
                    <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/endStaff/manage">
                    <span>Quản lý nhân viên</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Kết thúc</Breadcrumb.Item>
            </Breadcrumb>

            <EndStaffTable
                page={page}
                total={total}
                pageSize={pageSize}
                StaffList={StaffList}
                setEmployeeInfo={setEmployeeInfo}
                handlePaginationChange={handlePaginationChange}
                handleShowFormInformation={handleShowFormInformation}
            />

            {
                informationForm && <EndStaffModal
                    open={informationForm}
                    employeeInfo={employeeInfo}
                    onOk={handleOpenModalSaveRecords}
                    onCancel={handleShowFormInformation}
                />
            }

            {
                openModalSaveRecords && <EndStaffModalSaveRecords
                    form={form}
                    onOk={handleSubmitProfile}
                    open={openModalSaveRecords}
                    onCancel={handleOpenModalSaveRecords}
                />
            }
        </div>
    );
};

export default EndStaff;
