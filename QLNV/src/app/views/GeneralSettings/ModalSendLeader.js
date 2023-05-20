import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendLeader } from 'app/redux/actions/CreateStaffAction';
import { required } from './constant';

const { TextArea } = Input;

const ModalSendLeader = ({ open, status, employeeId, onCancel, onClose }) => {
    const [position, setPosition] = useState('Giam doc');

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleSubmitRegister = async (value) => {
        const data = {
            employeeId,
            ...value,
            registerPosition: position,
            status,
        };

        dispatch(sendLeader(data, onClose));
    };

    const handleChange = (value) => {
        switch (value) {
            case 1: {
                setPosition('Giám Đốc');
                break;
            }
            case 2: {
                setPosition('Phó Giám Đốc');
                break;
            }
            case 3: {
                setPosition('Quan Lý');
                break;
            }
            case 4: {
                setPosition('Trưởng Phòng');
                break;
            }
            default:
        }
    };

    return (
        <Modal title="Trình lãnh đạo" centered open={open} width={700} onCancel={onCancel} footer={null} className="modal-sendleader">
            <Form form={form} onFinish={handleSubmitRegister} layout="vertical">
                <Row className="form-sendleader">
                    <Col span={8}>
                        <Form.Item label="Ngày trình" name="registerDate" rules={[required]}>
                            <Input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Tên lãnh đạo" name="registerName" className="list__leader-name">
                            <Select
                                defaultValue="Jame"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 1,
                                        label: 'Jack',
                                    },
                                    {
                                        value: 2,
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 3,
                                        label: 'yiminghe',
                                    },
                                    {
                                        value: 4,
                                        label: 'Jame',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} className="leader-position">
                        <Form.Item label="Chức vụ" name="registerPosition">
                            <p>{position}</p>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Nội dung trình lãnh đạo" name="registerContent" rules={[required]}>
                            <TextArea
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 6,
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="btn-end-position">
                    <Button className="btn-register" htmlType="submit">
                        TRÌNH LÃNH ĐẠO
                    </Button>
                    <Button className="btn-close" onClick={onCancel}>
                        HỦY
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalSendLeader;
