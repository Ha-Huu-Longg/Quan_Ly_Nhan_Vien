import React from "react";
import { Button, Modal, Tabs } from "antd"
import { useState } from "react";
import PendingDialogConfirm from "./PendingDialogConfirm"
import { useEffect } from "react";
import {
    getById, getForm, update
} from "./PendingService";
import { toast } from "react-toastify";
import {
    StyleButton, StyledModal
} from "./PendingStyled"
import { TITLE_PENDING } from "./PendingShare/Constant"
import { RenderCurriculumVitae } from "./PendingShare/Component/CurriculumVitae"
import FormProfile from "../GeneralSettings/FormProfile"
import FormDiploma from "../GeneralSettings/FormDiploma"

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function PendingDialog(props) {

    const { open, item, onOk, onCancel } = props
    const [employee, setEmployee] = useState()
    const [employeeForm, setemployeeForm] = useState()
    const [shouldOpenPendingDialogConfirm, setShouldOpenPendingDialogConfirm] = useState(false)
    const [titlePendingDialogConfirm, setTitlePendingDialogConfirm] = useState("")

    const showDialogConfirm = (key) => {
        switch (key) {
            case 1: {
                employee.employeeInfo.status === 3 ? setTitlePendingDialogConfirm("Xác nhận phê duyệt") :
                    setTitlePendingDialogConfirm("Xác nhận phê duyệt kết thúc")
                setShouldOpenPendingDialogConfirm(true)
                break
            }
            case 2: {
                employee.employeeInfo.status === 3 ? setTitlePendingDialogConfirm("Yêu cầu bổ sung") :
                    setTitlePendingDialogConfirm("Yêu cầu bổ sung kết thúc")
                setShouldOpenPendingDialogConfirm(true)
                break
            }
            case 3: {
                employee.employeeInfo.status === 3 ? setTitlePendingDialogConfirm("Từ chối phê duyệt") :
                    setTitlePendingDialogConfirm("Từ chối phê duyệt kết thúc")
                setShouldOpenPendingDialogConfirm(true)
                break
            }
            default: {
                toast.error("Error button !!!")
            }
        }
    }

    const hidenPendingDialogConfirm = () => {
        setTitlePendingDialogConfirm("")
        setShouldOpenPendingDialogConfirm(false)
    }

    const rejectTerminate = async (item) => {
        const resDeleteTerminate = await (update({
            employeeId: item.employeeId,
            status: 11,
        }))
        if (resDeleteTerminate.status === 200) {
            toast.success("Từ chối phê duyệt kết thúc thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const reject = async (item, comment) => {
        const resDelete = await (update({
            employeeId: item.employeeId,
            status: 6,
            rejectedReason: comment
        }))
        if (resDelete.status === 200) {
            toast.success("Từ chối phê duyệt thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const approveTerminate = async (item, date) => {
        const resApproveTerminate = await (update({
            employeeId: item.employeeId,
            status: 10,
            terminatedDate: date,
            terminatedReason: "ko thay duoc"
        }))
        if (resApproveTerminate.status === 200) {
            toast.success("Phê duyệt kết thúc thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const approve = async (item) => {
        const resApprove = await (update({
            employeeId: item.employeeId,
            status: 5
        }))
        if (resApprove.status === 200) {
            toast.success("Phê duyệt thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const requireTerminate = async (item, comment) => {
        const resRequiredTerminate = await (update({
            employeeId: item.employeeId,
            status: 9,
            statusLog: comment
        }))
        if (resRequiredTerminate.status === 200) {
            toast.success("Yêu cầu bổ sung kết thúc thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const require = async (item, comment) => {
        const resRequired = await (update({
            employeeId: item.employeeId,
            status: 4,
            statusLog: comment
        }))
        if (resRequired.status === 200) {
            toast.success("Yêu cầu bổ sung thành công")
        } else {
            toast.error("Lỗi !!!")
        }
    }

    const okPendingDialogConfirm = async (date, comment, eligible) => {
        switch (titlePendingDialogConfirm) {
            case TITLE_PENDING.REJECT_TERMINATE:
                if (date === "" || comment === "") {
                    alert("Nhập đủ các trường")
                    return
                }
                await rejectTerminate(item)
                break

            case TITLE_PENDING.REJECT:
                if (date === "" || comment === "") {
                    alert("Nhập đủ các trường")
                    return
                }
                await reject(item, comment)
                break

            case TITLE_PENDING.APPROVE_TERMINATE:
                if (date === "" || eligible === false) {
                    alert("Nhập đủ các trường")
                    return
                }
                await approveTerminate(item, date)
                break

            case TITLE_PENDING.APPROVE:
                if (date === "" || eligible === false) {
                    alert("Nhập đủ các trường")
                    return
                }
                await approve(item)
                break

            case TITLE_PENDING.REJECT_TERMINATE:
                if (comment === "") {
                    alert("Nhập đủ các trường")
                    return
                }
                await requireTerminate(item, comment)
                break

            case TITLE_PENDING.REQUIRE:
                if (comment === "") {
                    alert("Nhập đủ các trường")
                    return
                }
                await require(item, comment)
                break
            default:
                console.log("Loi dau do")
                break
        }
        hidenPendingDialogConfirm()
        onCancel()
    }

    useEffect(() => {
        const getInfo = async () => {
            const res = await getById(item.employeeId)
            setEmployee(res.data.data)
            console.log(res)
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
            {shouldOpenPendingDialogConfirm && (
                <PendingDialogConfirm
                    open={shouldOpenPendingDialogConfirm}
                    title={titlePendingDialogConfirm}
                    onCancel={hidenPendingDialogConfirm}
                    onOk={okPendingDialogConfirm}
                />
            )}

            <Modal
                centered
                className="modal__information"
                title="Hồ sơ nhân viên"
                width={1000}
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                footer={
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "0 10px" }}
                    >
                        <Button key="accept" type="primary" style={StyleButton("green")}
                            onClick={() => showDialogConfirm(1)}
                        >
                            Duyệt
                        </Button>
                        <Button key="submit" type="primary" style={StyleButton("blue",)}
                            onClick={() => showDialogConfirm(2)}
                        >
                            Yêu cầu bổ sung
                        </Button>
                        <Button key="notAgreed" type="primary" danger style={StyleButton("red")}
                            onClick={() => showDialogConfirm(3)}
                        >
                            Từ Chối
                        </Button>
                        <Button key="cancel" type="primary" style={StyleButton("orange")}
                            onClick={onCancel}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div className="p-relative">
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
            </Modal>

        </div>
    )
}

export default PendingDialog

