import { Button, Form, Input, Modal } from 'antd';
import { today } from 'app/views/GeneralSettings/constant';
import React from 'react';
import { useState } from 'react';

function ProposedModal({ open, onCancel, employeeInfo, ProposedList, onSend }) {
    const [dataForm, setDataForm] = useState({
        fullName: employeeInfo?.fullName || '',
    });

    const onChangeValue = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.defaultValue });
    };

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
                <Button key="3" className="btn-save" type="primary">
                    Lưu
                </Button>,
            ]}
        >
            <div className="use-font-time">
                <div className="form-information-header font-z-13">
                    <h4>Cộng HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <p>
                        <span>Độc lập - Tự do - Hạnh Phúc</span>
                    </p>
                </div>
                <div className="modal_content">
                    <h4 className="modal_content-title title-proposed">ĐƠN ĐỀ XUẤT Ý KIẾN THAM MƯU</h4>
                    <p>Kính gửi: Ban Giám đốc công ty OceanTech</p>

                    <Form.Item name="name" onChange={onChangeValue} label="Tôi tên là: ">
                        <Input defaultValue={employeeInfo.fullName} />
                    </Form.Item>
                    <Form.Item name="location" onChange={onChangeValue} label="Hiện đang công tác tại vị trí: ">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="problem"
                        onChange={onChangeValue}
                        label="Tôi viết đơn này đề nghị  Công ty xem xét và giải quyết vấn đề: "
                    >
                        <Input defaultValue={ProposedList?.type} />
                    </Form.Item>
                    <Form.Item name="date" onChange={onChangeValue} label="Kể từ ngày: ">
                        <Input defaultValue={ProposedList?.date} />
                    </Form.Item>
                    <div className="form_block">
                        <Form.Item name="reason" onChange={onChangeValue} label="Nội dung như sau: ">
                            <Input defaultValue={ProposedList?.content} />
                        </Form.Item>
                    </div>

                    <p>
                        Kính mong Công ty / cá nhân có thẩm quyền xem xét đơn đề nghị và giải quyết vấn đề mà tôi đã nêu
                        ở trên.
                    </p>
                    <p>
                        Tôi xin cam đoan những thông tin trên hoàn toàn đúng sự thật, nếu có gì sai sót tôi xin chịu
                        trách nhiệm trước Công ty và trước pháp luật.
                    </p>
                    <p className="text-ident font-w">Tôi xin chân thành cảm ơn!</p>
                </div>
                <div className="modal_signature">
                    <div className="date-signature font-s-i">Hà nội, ngày {today.getDate()} tháng {today.getMonth() + 1}, {today.getFullYear()}.</div>
                    <p>Người làm đơn</p>
                    <p className="font-s-i font-z-13">{employeeInfo.fullName.split(' ').slice(-1).join(' ')}</p>
                    <p>{employeeInfo.fullName}</p>
                </div>
            </div>
        </Modal>
    );
}

export default ProposedModal;
