import React, { useEffect } from "react";
import { Button, Modal, Tabs } from 'antd';
import FormDiploma from "app/views/GeneralSettings/FormDiploma";
import FormProfile from "app/views/GeneralSettings/FormProfile";
import FormCurriculumVitae from "app/views/GeneralSettings/FormCurriculumVitae";
import { useDispatch, useSelector } from "react-redux";
import { getFormStaff, getStaffById } from "app/redux/actions/CreateStaffAction";

const TabPane = Tabs.TabPane

const DialogStaffInfo = ({ open, handleClose, employeeInfo }) => {
    const dispatch = useDispatch()
    const dataForm = useSelector((state) => state.createStaff.dataForm)
    const dataStaffById = useSelector((state) => state.createStaff.dataStaffById)

    useEffect(() => {
        dispatch(getFormStaff(employeeInfo))
    }, [])

    useEffect(() => {
        dispatch(getStaffById(employeeInfo))
    }, [])

    return (
        <Modal
            className="modal__information"
            title="Hồ sơ nhân viên"
            centered
            open={open}
            width={1000}
            onCancel={handleClose}
            footer={null}
        >
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="HỒ SƠ" key="profile">
                    <FormProfile
                        data={dataForm}
                        employeeInfo={employeeInfo}
                    />
                </TabPane>
                <TabPane tab="SƠ YẾU LÝ LỊCH" key="vitae">
                    <FormCurriculumVitae
                        data={dataForm?.resume}
                        familyRelations={dataStaffById?.familyRelations}
                        disabled={true}
                    />
                </TabPane>
                <TabPane tab="DANH SÁCH VĂN BẰNG" key="diploma">
                    <FormDiploma
                        data={dataStaffById?.certificates}
                    />
                </TabPane>
            </Tabs>
            <div className="btn-dialog-register">
                <Button className="btn-close" onClick={handleClose}>
                    HỦY
                </Button>
            </div>
        </Modal>
    );
}


export default DialogStaffInfo;