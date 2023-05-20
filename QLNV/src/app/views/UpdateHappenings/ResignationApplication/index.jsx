import { Form, Input, Modal } from 'antd';
import ModalSendLeader from 'app/views/GeneralSettings/ModalSendLeader';
import { WaitingToFinishStatus, today } from 'app/views/GeneralSettings/constant';
import React, { useState } from 'react';

function ResignationApplicationModal({ open, onCancel, employeeInfo, openUpdateStatus }) {
    const [sendLeader, setSendLeader] = useState(false);
    const [form] = Form.useForm();

    const handleSendLeader = () => {
        setSendLeader(!sendLeader);
    };

    const handleClear = () => {
        onCancel();
        openUpdateStatus();
    };

    return (
        <Modal
            className="information_modal general___modal"
            centered
            okText="Trình lãnh đạo"
            title="Biểu mẫu"
            cancelText="HỦY"
            open={open}
            onOk={handleSendLeader}
            onCancel={onCancel}
            width={'70vw'}
        >
            <Form form={form} className="use-font-time">
                <div className="modal_resignation-top">
                    <h4>Cộng HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <p>Độc lập - Tự do - Hạnh Phúc</p>
                </div>
                <div className="modal_resignation-content">
                    <h4>Đơn xin nghỉ việc</h4>
                    <p className="content-general">Kính gửi: Ban Giám đốc công ty OceanTech</p>

                    <div className="content_top">
                        <Form.Item name="fullName" label="Tôi tên là: ">
                            <Input defaultValue={employeeInfo?.fullName} />
                        </Form.Item>
                    </div>
                    <div className="content_top">
                        <Form.Item label="Hiện đang công tác tại vị trí: ">
                            <Input defaultValue={employeeInfo?.registerPosition} />
                        </Form.Item>
                    </div>

                    <p>
                        Tôi rất lấy làm tiếc vì sẽ không còn làm việc tại Công ty OceanTech trong thời gian săp tới. Tôi
                        quyết đinh nhận vị trí công việc mới để tìm thêm cơ hội phát triển mới, phù hợp vơi chuyên môn
                        và khả nawg làm việc của tôi.
                    </p>
                    <p>
                        Tôi thực sự lấy làm vinh dự lớn được làm việc tại đây trong suốt X năm. Trong quá trình làm việc
                        tại đây, Công ty đã cho tôi có được may mắn làm việc với những đồng nghiệp tốt cùng với một môi
                        trường làm việc tốt. Tôi xin chân thành cảm ơn Công ty đã tin tưởng tôi trong suốt thời gian vừa
                        qua và chúc cho Công ty chúng ta sẽ đạt được những thành công như mong muốn.
                    </p>

                    <p>
                        Vậy tôi làm đơn này xin được nghỉ việc từ ngày 01-05-2023 Tôi sẽ bàn giao công việc của mình một
                        cách đầy đủ và có trách nhiệm.
                    </p>
                    <p>Rất mong được sự giúp đỡ của Ban lãnh đạo Công ty.</p>

                    <div className="content-end">
                        <p>Tôi xin chân thành cảm ơn!</p>
                    </div>
                </div>

                <div className="content_bottom">
                    <p className="font-s-i">Hà nội, ngày {today.getDate()} tháng {today.getMonth() + 1}, {today.getFullYear()}.</p>
                </div>
                <div className="information_modal-bottom">
                    <div className="information_modal-bottom--left">
                        <p>Ý kiến của bộ phận</p>
                        <p className="font-s-i font-z-13">Tech</p>
                        <p>OceanTech</p>
                    </div>
                    <div className="information_modal-bottom--right">
                        <p>Người làm đơn</p>
                        <p className="font-s-i font-z-13">{employeeInfo?.fullName.split(' ').slice(-1).join(' ')}</p>
                        <p>{employeeInfo?.fullName}</p>
                    </div>
                </div>
            </Form>

            {sendLeader && (
                <ModalSendLeader
                    open={sendLeader}
                    onCancel={handleSendLeader}
                    employeeId={employeeInfo?.employeeId}
                    onClose={handleClear}
                    status={WaitingToFinishStatus}
                />
            )}
        </Modal>
    );
}

export default ResignationApplicationModal;
