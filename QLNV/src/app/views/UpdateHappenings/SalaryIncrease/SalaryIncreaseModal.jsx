import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { formatDate, today } from 'app/views/GeneralSettings/constant';

function SalaryIncreaseModal({ open, onCancel, employeeInfo, staffDataSalary, onSend }) {
    return (
        <Modal
            className="information_modal general___modal"
            centered
            title="Biểu mẫu"
            open={open}
            onCancel={onCancel}
            width={900}
            footer={[
                <Button onClick={onCancel} key="1">
                    Hủy
                </Button>,
                <Button type="primary" onClick={onSend} key="2">
                    Trình lãnh đạo
                </Button>,
                <Button key="3" type="primary" className="btn-save">
                    Lưu
                </Button>,
            ]}
        >
            <Form className="use-font-time">
                <div className="form-information-republic font-z-13">
                    <h4 className="form-information-title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <p>
                        <span>Độc lập - Tự do - Hạnh Phúc</span>
                    </p>
                </div>
                <div className="modal_content">
                    <h3 className="modal_content-title">QUYẾT ĐỊNH</h3>
                    <p className="modal_content-text">Về việc điều chỉnh thăng chức cho Nhân Viên</p>
                    <div>
                        <Form.Item name="regulations" label="- Căn cứ tại quy chế, Điều lệ Công ty: ">
                            <Input defaultValue="OceanTech" />
                        </Form.Item>
                    </div>
                    <p>- Căn cứ vào hợp đồng lao động với người lao động</p>
                    <p>Xét những đóng góp của người lao động và đề nghị của trưởng phòng nhân sự</p>
                    <h3 className="modal_content-title">GIÁM ĐỐC QUYẾT ĐỊNH</h3>
                    <div className="modal_content-body">
                        <Form.Item name="dateSalary" label="Điều 1: kể từ ngày ">
                            <Input defaultValue={formatDate(staffDataSalary?.date)} />
                        </Form.Item>
                        <Form.Item name="fullName" label="Điều chỉnh mức lương của Ông/Bà ">
                            <Input defaultValue={employeeInfo?.fullName} />
                        </Form.Item>
                        <Form.Item name="rank" label="sẽ là bậc ">
                            <Input defaultValue={staffDataSalary?.salaryScale} />
                        </Form.Item>
                    </div>
                    <p>Điều 2: Quyết định này có hiều lực kể từ ngày ký. Các ông Trường Phòng, Phòng Hành Chính - Tổng hợp và các ông có tên trên căn cứ vào quyết định này để thi hành.</p>
                </div>
                <div className="modal_signature">
                    <div className="date-signature font-s-i">Hà nội, ngày {today.getDate()} tháng {today.getMonth() + 1}, {today.getFullYear()}.</div>
                    <p>TỔNG GIÁM ĐỐC</p>
                    <p className="font-s-i font-z-13">Tech</p>
                    <p>OceanTech</p>
                </div>
            </Form>
        </Modal>
    );
}

export default SalaryIncreaseModal;
