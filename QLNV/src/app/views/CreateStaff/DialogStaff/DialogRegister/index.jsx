import React, { useState } from "react";
import { Button, Form, Modal, Tabs } from 'antd';
import { useEffect } from "react";
import ModalSendLeader from "app/views/GeneralSettings/ModalSendLeader";
import FormDiploma from "app/views/GeneralSettings/FormDiploma";
import FormCurriculumVitae from "app/views/GeneralSettings/FormCurriculumVitae";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateFormStaff } from "app/redux/actions/CreateStaffAction";
import FormProfile from "app/views/GeneralSettings/FormProfile";
import { formatDate } from "app/views/GeneralSettings/constant";

const TabPane = Tabs.TabPane

const DialogRegister = ({ open, staffInfo, employeeId, handleClose, handleCloseDialogRegister }) => {
    const dataForm = useSelector((state) => state.createStaff.dataForm)
    const [shouldBtnSendLeader, setShouldBtnSendLeader] = useState(false)
    const [shouldOpenPopupSendLeader, setShouldOpenPopupSendLeader] = useState(false)
    const [workExperiencesList, setWorkExperiencesList] = useState(dataForm?.cv?.workExperiences)

    const [form] = Form.useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue({
            careerGoal: dataForm?.cv?.careerGoal,
            skill: dataForm?.cv?.skill,
            hobby: dataForm?.cv?.hobby,
            commonName: dataForm?.resume?.commonName,
            currentAddress: dataForm?.resume?.currentAddress,
            citizenIdIssuanceDate: dataForm?.resume?.citizenIdIssuanceDate ? formatDate(dataForm?.resume?.citizenIdIssuanceDate) : "",
            citizenIdIssuingAuthority: dataForm?.resume?.citizenIdIssuingAuthority,
            ethnicity: dataForm?.resume?.ethnicity,
            religion: dataForm?.resume?.religion,
        });
    }, [])


    const onChange = (key) => { };

    const openPopupSendLeader = () => {
        setShouldOpenPopupSendLeader(true)
    }

    const handleClosePopupSendLeader = () => {
        setShouldOpenPopupSendLeader(false)
    }

    const handleSubmitStaffRegister = (values) => {
        const staffData = {
            employeeId,
            cv: {
                careerGoal: values.careerGoal,
                skill: values.skill,
                hobby: values.hobby,
                workExperiences: workExperiencesList.map((data, index) => {
                    return {
                        ...data,
                        startDate: moment(data.startDate).format('YYYY-MM-DD'),
                        endDate: moment(data.endDate).format('YYYY-MM-DD'),
                    }
                })

            },
            resume: {
                commonName: values.commonName,
                currentAddress: values.currentAddress,
                citizenIdIssuanceDate: moment(values.citizenIdIssuanceDate).format('YYYY-MM-DD'),
                citizenIdIssuingAuthority: values.citizenIdIssuingAuthority,
                ethnicity: values.ethnicity,
                religion: values.religion,
            },
        }

        dispatch(updateFormStaff(staffData, setShouldBtnSendLeader))
    };

    const onClearModal = () => {
        handleClose()
        handleCloseDialogRegister()
    }

    return (
        <Modal
            title="Thông tin hồ sơ"
            centered
            open={open}
            width={1000}
            onCancel={handleCloseDialogRegister}
            footer={null}
            className="modal-dialog-register"
        >
            <Form
                form={form}
                onFinish={handleSubmitStaffRegister}
                layout="vertical"
            >
                <Tabs className="tab-information" defaultActiveKey="1" tabPosition="left" onChange={onChange}>
                    <TabPane tab="HỒ SƠ" key="profile">
                        <FormProfile
                            employeeInfo={staffInfo?.employeeInfo}
                            workExperiencesList={workExperiencesList}
                            setWorkExperiencesList={setWorkExperiencesList}
                            profileInfo
                        />
                    </TabPane>
                    <TabPane tab="SƠ YẾU LÝ LỊCH" key="vitae">
                        <FormCurriculumVitae
                            data={staffInfo?.employeeInfo}
                            familyRelations={staffInfo?.familyRelations}
                            disabled={false}
                        />
                    </TabPane>
                    <TabPane tab="DANH SÁCH VĂN BẰNG" key="diploma">
                        <FormDiploma data={staffInfo?.certificates} />
                    </TabPane>
                </Tabs>
                <div className="btn-dialog-register">
                    <Button className="btn-save" htmlType="submit">
                        LƯU
                    </Button>
                    {shouldBtnSendLeader && <Button className="btn-register" onClick={() => openPopupSendLeader()} >
                        TRÌNH LÃNH ĐẠO
                    </Button>}
                    <Button className="btn-close" onClick={handleCloseDialogRegister}>
                        HỦY
                    </Button>
                </div>

                {shouldOpenPopupSendLeader && (
                    <ModalSendLeader
                        open={shouldOpenPopupSendLeader}
                        employeeId={employeeId}
                        onCancel={handleClosePopupSendLeader}
                        onClose={onClearModal}
                        status={3}
                    />
                )}
            </Form>
        </Modal>
    );
}

export default DialogRegister;