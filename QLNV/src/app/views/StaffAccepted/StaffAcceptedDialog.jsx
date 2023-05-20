import React from "react";
import { Button, Tabs } from "antd"
import { useState, useEffect } from "react";
import { getById, getForm } from "./StaffAcceptedService";
import { StyledModal } from "../Pending/PendingStyled"
import { RenderCurriculumVitae } from "../Pending/PendingShare/Component/CurriculumVitae"
import FormProfile from "../GeneralSettings/FormProfile"
import FormDiploma from "../GeneralSettings/FormDiploma"
import "../Pending/Pending.css"

function StaffAcceptedDialog(props) {

    const { open, item, onOk, onCancel } = props
    const [employee, setEmployee] = useState()
    const [employeeForm, setemployeeForm] = useState()

    useEffect(() => {
        const getInfo = async () => {
            const res = await getById(item.employeeId)
            setEmployee(res.data.data)
        }
        const getInfoForm = async () => {
            const res = await getForm(item.employeeId)
            setemployeeForm(res.data.data)
        }
        getInfo()
        getInfoForm()
    }, [])

    return (
        <div>
            <StyledModal
                centered
                title="Hồ sơ nhân viên"
                width={1000}
                open={open}
                // onOk={onOk}
                onCancel={onCancel}
                footer={
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button key="cancel" type="primary" onClick={onCancel}
                            style={{ backgroundColor: "orange", color: "white" }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div>
                    <Tabs

                        defaultActiveKey="1"
                        tabPosition="left"
                        tabBarStyle={{ width: 200, whiteSpace: "break-spaces" }}
                        items={[
                            {
                                label: "HỒ SƠ",
                                key: 1,
                                children: <div style={{ height: 440 }}>
                                    <FormProfile data={employeeForm} />
                                </div>
                            },
                            {
                                label: "SƠ YẾU LÝ LỊCH",
                                key: 2,
                                children: <RenderCurriculumVitae data={employee} dataForm={employeeForm} />
                            },
                            {
                                label: "DANH SÁCH VĂN BẰNG",
                                key: 3,
                                children: <div style={{ height: 440 }}>
                                    <FormDiploma data={employee?.certificates} />
                                </div>
                            },
                        ]}
                    />
                </div>
            </StyledModal>
        </div>
    )
}

export default StaffAcceptedDialog
