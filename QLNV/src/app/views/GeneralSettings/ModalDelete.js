import { Modal } from 'antd';
import React from 'react';

const ModalDelete = ({ open, onCancel, onOk }) => {
    return (
        <Modal
            title="Xóa bản ghi"
            centered
            open={open}
            width={500}
            okText="Xác nhận"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={onOk}
            className="modal-delete"
        >
            <p>Bạn có chắc chắn muốn xóa?</p>
        </Modal>
    );
};

export default ModalDelete;
