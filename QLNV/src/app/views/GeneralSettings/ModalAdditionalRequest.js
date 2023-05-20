import { Modal } from 'antd';
import React from 'react';

const ModalAdditionalRequest = ({ open, onCancel, onOk, employeeInfo }) => {
    return (
        <Modal
            title="Yêu cầu bổ sung"
            centered
            open={open}
            width={500}
            okText="Bổ sung thông tin"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={onOk}
            className="modal-additional-request"
        >
            <p>{employeeInfo?.statusLog}</p>
        </Modal>
    );
};

export default ModalAdditionalRequest;
