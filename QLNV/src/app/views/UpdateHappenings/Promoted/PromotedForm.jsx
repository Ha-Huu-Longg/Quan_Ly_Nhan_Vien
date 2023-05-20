import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { number, required } from 'app/views/GeneralSettings/constant';
import React from 'react';

const { TextArea } = Input;

function PromotedForm({ promotionId, submitFormPromoted, formRef, form, onReset }) {
    return (
        <Form onFinish={submitFormPromoted} ref={formRef} form={form}>
            <Row>
                <Col span={24} md={8} xl={5}>
                    <Form.Item name="date" label="Ngày thăng chức" rules={[required]}>
                        <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>

                <Col span={24} md={8} xl={3}>
                    <Form.Item name="count" label="Lần thứ" rules={[required, number]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} md={8} xl={8}>
                    <Form.Item name="oldPosition" label="Chức vụ cũ" rules={[required]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} md={8} xl={8}>
                    <Form.Item name="newPosition" label="Chức vụ hiện tại" rules={[required]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} md={8} xl={8}>
                    <Form.Item name="reason" label="Lý do" rules={[required]}>
                        <TextArea
                            autoSize={{
                                minRows: 1,
                                maxRows: 3,
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={24} md={8} xl={8}>
                    <Form.Item name="note" label="Ghi chú" rules={[required]}>
                        <TextArea
                            autoSize={{
                                minRows: 1,
                                maxRows: 3,
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={24} md={24} xl={8} className="btn-form">
                    <Form.Item>
                        <Button className="add-form" type="primary" htmlType="submit">
                            {promotionId?.action === 'update' ? 'LƯU' : 'THÊM'}
                        </Button>
                        <Button className="cancel-form" htmlType="button" onClick={onReset} type="primary">
                            HỦY
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default PromotedForm;
