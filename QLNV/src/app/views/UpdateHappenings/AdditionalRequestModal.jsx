import { Modal } from 'antd';
import React from 'react';

function AdditionalRequestModal({ open, openAdditionalRequestModal, employeeInfo }) {
    const onOk = () => {
        console.log('ok');
    };
    return (
        <Modal
            centered
            okText="Chỉnh sửa"
            title="Yêu cầu bổ sung"
            cancelText="HỦY"
            open={open}
            onOk={onOk}
            onCancel={openAdditionalRequestModal}
            width={'50vw'}
            className="modal-delete"
        >
            <div>
                <p>{employeeInfo?.statusLog}</p>
            </div>
        </Modal>
    );
}

export default AdditionalRequestModal;
