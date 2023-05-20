import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormProfile from '../GeneralSettings/FormProfile';
import FormCurriculumVitae from '../GeneralSettings/FormCurriculumVitae';
import { getFormStaff, getStaffById } from 'app/redux/actions/CreateStaffAction';
import { recordedStatus } from '../GeneralSettings/constant';

function EndStaffModalFormInformation({ open, onOk, onCancel, employeeInfo }) {
    const dispatch = useDispatch();
    const dataForm = useSelector((state) => state.createStaff.dataForm);
    const dataStaffById = useSelector((state) => state.createStaff.dataStaffById);
    useEffect(() => {
        dispatch(getFormStaff(employeeInfo));
    }, []);

    useEffect(() => {
        dispatch(getStaffById(employeeInfo));
    }, []);

    return (
        <Modal
            className="modal__information"
            centered
            okText="Nộp lưu hồ sơ"
            title="Thông tin nhân viên"
            cancelText="HỦY"
            open={open}
            onOk={onOk}
            okButtonProps={
                employeeInfo?.status === recordedStatus && {
                    style: {
                        display: 'none',
                    },
                }
            }
            onCancel={onCancel}
            width={'70vw'}
        >
            <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                tabBarStyle={{ width: 180, whiteSpace: 'break-spaces' }}
                items={[
                    {
                        label: 'Hồ sơ',
                        key: 2,
                        children: <FormProfile data={dataForm} employeeInfo={employeeInfo} />,
                    },
                    {
                        label: 'Sơ yếu lí lịch',
                        key: 1,
                        children: (
                            <FormCurriculumVitae
                                data={dataForm?.resume}
                                familyRelations={dataStaffById?.familyRelations}
                            />
                        ),
                    },
                ]}
            />
        </Modal>
    );
}

export default EndStaffModalFormInformation;
