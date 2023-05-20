import React from "react";
import { Button, Form, Modal } from 'antd';
import moment from "moment";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import TabStaffInformation from "./TabStaffInformation";
import TabDiploma from "./TabDiploma";
import TabFamilyRelationShip from "./TabFamilyRelationship";
import { useEffect } from "react";
import DialogRegister from "./DialogRegister";
import { addNewStaff, getStaffById, updateStaff } from "../CreateStaffService";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { getFormStaff } from "app/redux/actions/CreateStaffAction";
import { resCode } from "app/views/GeneralSettings/constant";

const TabPane = Tabs.TabPane

toast.configure({
    autoClose: 500,
    draggable: false,
    limit: 3
});

const DialogStaff = ({ open, handleClose, employeeId, setEmployeeId, employeeInfo }) => {
    const [listRelationship, setListRelationship] = useState([]);
    const [listDiploma, setListDiploma] = useState([]);
    const [staffInfo, setStaffInfo] = useState({});
    const [currentTab, setCurrentTab] = useState('1');
    const [fileImage, setFileImage] = useState("");
    const [shouldOpenDialogRegister, setShouldOpenDialogRegister] = useState(false)
    const [isCheckDisableRegister, setIsCheckDisableRegister] = useState(!employeeId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFormStaff(employeeInfo))
    }, [])

    const [form] = Form.useForm();

    const handleTabChange = (tab) => {
        form.validateFields().then((values) => {
            setCurrentTab(tab);
        }).catch((errorInfo) => {
            console.error('Validate Failed:', errorInfo);
        });
    };

    const handleGetStaffById = async (employeeId) => {
        const res = await getStaffById({ employeeId })

        setStaffInfo(res?.data?.data)
        setFileImage(res?.data?.data?.employeeInfo?.photoUrl);
        setListRelationship(res?.data?.data?.familyRelations);
        setListDiploma(res?.data?.data?.certificates)
        const employeeInfo = res?.data?.data?.employeeInfo

        form.setFieldsValue({
            address: employeeInfo?.address,
            code: employeeInfo?.code,
            citizenId: employeeInfo?.citizenId,
            dateOfBirth: employeeInfo?.dateOfBirth?.split(" ")[0],
            email: employeeInfo?.email,
            fullName: employeeInfo?.fullName,
            gender: employeeInfo?.gender,
            phone: employeeInfo?.phone,
            photoUrl: employeeInfo?.photoUrl,
            teamId: employeeInfo?.teamId,
        });
    }

    useEffect(() => {
        if (employeeId) {
            handleGetStaffById(employeeId)
        }
    }, [])
    const handleSubmitStaff = async (values) => {
        const staffData = {
            ...values,
            photoUrl: fileImage,
            teamId: values.teamId.toString(),
        }

        const certificates = listDiploma;
        const familyRelations = listRelationship

        if (familyRelations?.length === 0) {
            toast.warning('Thiếu quan hệ gia đình')
        } else if (certificates?.length === 0) {
            toast.warning('Thiếu thông tin văn bằng')
        } else if (!employeeId) {
            const res = await addNewStaff({ employeeInfo: staffData, certificates, familyRelations })
            if (res?.data?.code === resCode.success) {
                setIsCheckDisableRegister(false);
                setStaffInfo(res?.data?.data);
                setEmployeeId(res?.data?.data?.employeeInfo?.employeeId)
                toast.success('Thêm thành công')
            } else {
                toast.warning(res?.data?.message)
            }

        } else {
            const res = await updateStaff({
                employeeId: employeeId,
                employeeInfo: staffData,
                certificates: certificates.map((item) => {
                    return {
                        content: item?.content,
                        educationalOrg: item?.educationalOrg,
                        field: item?.field,
                        issuanceDate: moment(item?.issuanceDate).format("YYYY-MM-DD"),
                        name: item?.name,
                        certificateId: item?.certificateId
                    }
                }),
                familyRelations: familyRelations.map((item => {
                    return {
                        familyRelationId: item?.familyId,
                        name: item?.name,
                        gender: item?.gender,
                        phone: item?.phone,
                        dateOfBirth: moment(item?.dateOfBirth).format("YYYY-MM-DD"),
                        citizenId: item?.citizenId,
                        relation: item?.relation,
                        address: item?.address
                    }
                }))
            })
            if (res?.data?.code === resCode.success) {
                setStaffInfo(res?.data?.data)
                toast.success('Sửa thành công')
            } else {
                toast.warning(res?.data?.message)
            }
        }
    };

    const handleRegister = () => {
        setShouldOpenDialogRegister(true)
    };

    const handleCloseDialogRegister = () => {
        setShouldOpenDialogRegister(false)
    }

    return (
        <Modal
            title={!isEmpty(staffInfo) ? "Chỉnh sửa nhân viên" : "Tạo mới nhân viên"}
            centered
            open={open}
            width={1000}
            onCancel={handleClose}
            footer={null}
            className="modal-staff-info"
        >
            <Form
                form={form}
                onFinish={handleSubmitStaff}
                layout="vertical"
            >
                <div className="set-scroll">
                    <Tabs activeKey={currentTab} onChange={handleTabChange}>
                        <TabPane tab="THÔNG TIN NHÂN VIÊN" key="1">
                            <TabStaffInformation
                                staffInfo={staffInfo}
                                setStaffInfo={setStaffInfo}
                                form={form}
                                fileImage={fileImage}
                                setFileImage={setFileImage}
                            />
                        </TabPane>
                        <TabPane tab="QUAN HỆ GIA ĐÌNH" key="2">
                            <TabFamilyRelationShip
                                listRelationship={listRelationship}
                                setListRelationship={setListRelationship}
                            />
                        </TabPane>
                        <TabPane tab="THÔNG TIN VĂN BẰNG" key="3">
                            <TabDiploma
                                listDiploma={listDiploma}
                                setListDiploma={setListDiploma}
                            />
                        </TabPane>
                    </Tabs>
                </div>

                <div className="btn-action">
                    <Button className="btn-close" onClick={handleClose}>
                        HỦY
                    </Button>
                    <Button disabled={isCheckDisableRegister} className="btn-register" onClick={() => handleRegister()}>
                        ĐĂNG KÝ
                    </Button>
                    <Button className="btn-save" htmlType="submit">
                        LƯU
                    </Button>
                    {shouldOpenDialogRegister && (
                        <DialogRegister
                            open={shouldOpenDialogRegister}
                            handleCloseDialogRegister={handleCloseDialogRegister}
                            employeeId={employeeId}
                            handleClose={handleClose}
                            staffInfo={staffInfo}
                        />
                    )}
                </div>
            </Form>
        </Modal>
    );
}


export default DialogStaff;