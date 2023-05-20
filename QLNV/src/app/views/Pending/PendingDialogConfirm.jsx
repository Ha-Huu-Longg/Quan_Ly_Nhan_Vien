import React from "react";
import {
    Modal, Input, Checkbox,
    DatePicker, Space
} from "antd"
import { useState } from "react";
import moment from "moment";
import styled from 'styled-components';
import { LoadingScreen } from "./PendingShare/Component/Loading";
import { TITLE_PENDING } from "./PendingShare/Constant"


function PendingDialogConfirm(props) {

    const { title, open, onOk, onCancel } = props
    const [dateString, setDateString] = useState(moment())
    const [comment, setComment] = useState("")
    const [eligible, setEligible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOnOk = async (dateString, comment, eligible) => {
        setLoading(true)
        await onOk(dateString, comment, eligible)
        setLoading(false)
    }

    return (
        <StyledModal
            title={title}
            centered
            open={open}
            onOk={() => handleOnOk(dateString, comment, eligible)}
            onCancel={onCancel}
            okText="XÁC NHẬN"
            cancelText="HỦY"
            className="modpending-confirm"
        >
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                    padding: "0 20px",
                    height: "fit-content"
                }}
            >
                {(title !== TITLE_PENDING.REQUIRE && title !== TITLE_PENDING.REQUIRE_TERMINATE) && (
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                        format="DD-MM-YYYY"
                        disabledDate={(current) => {
                            return current && current < moment().add(-1, "days")
                        }}
                        onChange={(date, dateString) => {
                            setDateString(moment(dateString, "DD-MM-YYYY").format("YYYY-MM-DD"))
                        }}
                    />
                )}

                {
                    (title === TITLE_PENDING.APPROVE || title === TITLE_PENDING.APPROVE_TERMINATE) ? (
                        <Checkbox
                            checked={eligible}
                            onChange={() => setEligible(!eligible)}
                        >
                            Đã đủ điều kiện phê duyệt
                        </Checkbox>
                    ) : (
                        <Input.TextArea
                            rows={4}
                            placeholder={(title === TITLE_PENDING.REQUIRE || title === TITLE_PENDING.REQUIRE_TERMINATE) ? "Nội dung" : "Lý do"}
                            style={{ resize: 'none' }}
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                        />
                    )
                }

            </Space>
            {
                loading && <LoadingScreen />
            }
        </StyledModal>
    )
}

export default PendingDialogConfirm

const StyledModal = styled(Modal)`

`;
