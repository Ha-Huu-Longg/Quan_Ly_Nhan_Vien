import React from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { required } from '../GeneralSettings/constant';

function EndStaffModalSaveRecords({ open, onCancel, form, onOk }) {
    return (
        <Modal centered title="lưu thông tin" open={open} onCancel={onCancel} width={'500'} footer={false}>
            <Form form={form} onFinish={onOk} className="form__end-staff">
                <Form.Item label="Ngày nộp lưu" name="terminatedDate" rules={[required]}>
                    <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Số nộp lưu" name="storedProfileCode" rules={[required]}>
                    <Input />
                </Form.Item>

                <div className="btn-action">
                    <Button className="btn-save" htmlType="submit">
                        LƯU
                    </Button>
                    <Button className="btn-close" onClick={onCancel}>
                        HỦY
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}

export default EndStaffModalSaveRecords;
