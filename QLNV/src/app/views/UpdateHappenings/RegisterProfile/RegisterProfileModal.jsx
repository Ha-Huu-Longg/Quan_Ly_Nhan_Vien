import { Button, Form, Input, Modal } from 'antd';
import { today } from 'app/views/GeneralSettings/constant';
import React from 'react';

function RegisterProfileModal({ open, onCancel, employeeInfo, onSend }) {
    return (
        <Modal
            className="information_modal general___modal"
            centered
            title="Biểu mẫu"
            open={open}
            onCancel={onCancel}
            width={'70vw'}
            footer={[
                <Button onClick={onCancel} key="1">
                    Hủy
                </Button>,
                <Button type="primary" onClick={onSend} key="2">
                    Trình lãnh đạo
                </Button>,
                <Button type="primary" className="btn-save" key="3">
                    Lưu
                </Button>,
            ]}
        >
            <Form className="use-font-time">
                <div className="modal_information-header">
                    <h4 className="font-z-18">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <h5>
                        <span className="font-z-18">Độc lập - Tự do - Hạnh Phúc</span>
                    </h5>
                    <h3 className="font-z-22 font-w">ĐĂNG KÝ HỒ SƠ</h3>
                </div>

                <div className="modal_information-body">
                    <p>Kính gửi ban giám đốc công ty OceanTech</p>
                    <div>
                        <Form.Item name="fullName" label="1. Tôi tên là: ">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="profileName" label="2. Tên hồ sơ: ">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="dateRegister" label="3. Ngày đăng ký: ">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="note" label="4. Ghi chú: ">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="content" label="5. Nội dung: ">
                            <Input />
                        </Form.Item>
                    </div>
                    <p>Kính mong Công ty / cá nhân có thẩm quyền xem xét hồ sơ và xét duyệt hồ sơ cho tôi.</p>
                    <p>
                        Tôi xin cam đoan những thông tin trên hoàn toàn đúng sự thật, nếu có gì sai sót tôi xin chịu
                        trách nhiệm trước Công ty và trước pháp luật.
                    </p>
                    <p className="text-ident font-w text-ident">Tôi xin chân thành cảm ơn!</p>
                </div>

                <div>
                    <div className="modal_signature">
                        <div className="date-signature font-s-i">Hà nội, ngày {today.getDate()} tháng {today.getMonth() + 1}, {today.getFullYear()}.</div>
                        <p>Người khai</p>
                        <p className="font-s-i font-w font-z-13">
                            {employeeInfo.fullName.split(' ').slice(-1).join(' ')}
                        </p>
                        <p>{employeeInfo.fullName}</p>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}

export default RegisterProfileModal;
