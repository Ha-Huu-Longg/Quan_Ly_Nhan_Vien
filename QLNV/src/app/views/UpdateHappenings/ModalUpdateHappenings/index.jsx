import React, { useState } from 'react';
import { Col, Collapse, Form, Image, Input, Modal, Row, Space, Typography } from 'antd';
import RegisterCollapse from '../RegisterProfile';
import SalaryIncreaseCollapse from '../SalaryIncrease';
import PromotedCollapse from '../Promoted';
import ProposedCollapse from '../Proposed';
import moment from 'moment';
import ResignationApplicationModal from '../ResignationApplication';
import { listGender, listTeam } from 'app/views/GeneralSettings/constant';

const { Panel } = Collapse;

function ModalUpdateHappenings({ open, openUpdateStatus, employeeInfo }) {
    const [formResignationApplication, setFormResignationApplication] = useState(false);

    const handleOpenFormResignationApplication = () => {
        setFormResignationApplication(!formResignationApplication);
    };

    return (
        <>
            <Modal
                okText="KẾT THÚC"
                centered
                cancelText="HỦY"
                title="Cập nhật diễn biến"
                open={open}
                onOk={handleOpenFormResignationApplication}
                onCancel={openUpdateStatus}
                className="conclude_modal"
                width={'70vw'}
            >
                <Row justify="space-between" gutter={[16, 16]}>
                    <Col span={8} >
                        <div>
                            <div className="avatar">
                                <Image src={employeeInfo?.photoUrl || `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`} />
                            </div>
                            <div className="upload-image"></div>

                            <div className="name-user">
                                <Typography.Title level={4} className='mb-5 text-uppercase'>
                                    {employeeInfo?.fullName}
                                </Typography.Title>
                                <Typography.Title level={5} className='m-0'>
                                    {listTeam[employeeInfo?.teamId - 1]?.name}
                                </Typography.Title>
                            </div>
                        </div>
                    </Col>
                    <Col span={16} >
                        <div className="account-information">
                            <div className="top-form">
                                <Typography>Thông tin cơ bản</Typography>
                            </div>
                            <div className="content-form">
                                <Row>
                                    <Col span={8}>
                                        <Form.Item name='name' label="Họ và tên">
                                            <Input defaultValue={employeeInfo?.fullName} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item name='code' label="Mã nhân viên">
                                            <Input defaultValue={employeeInfo?.code} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={5}>
                                        <Form.Item name="phone" label="Số điện thoại">
                                            <Input defaultValue={employeeInfo?.phone} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={5}>
                                        <Form.Item name="date" label="Ngày sinh">
                                            <Input defaultValue={moment(employeeInfo?.dateOfBirth).format("DD-MM-YYYY")} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item name="date" label="Email">
                                            <Input defaultValue={employeeInfo?.email} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item name="citizenId" label="CCCD">
                                            <Input defaultValue={employeeInfo?.citizenId} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={5}>
                                        <Form.Item name="gender" label="Giới tính">
                                            <Input defaultValue={listGender[employeeInfo?.gender]?.name} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={5}>
                                        <Form.Item name="registerPosition" label="Vị trí">
                                            <Input defaultValue={employeeInfo?.registerPosition ? employeeInfo?.registerPosition : 'null'} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item name='address' label="Địa chỉ">
                                            <Input defaultValue={employeeInfo?.address} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Space direction="vertical" className='list-collapse'>
                        <Collapse expandIconPosition="end">
                            <Panel header="Đăng kí hồ sơ" key="register">
                                <RegisterCollapse
                                    employeeInfo={employeeInfo}
                                />
                            </Panel>

                            <Panel header="Tăng lương" key="salaryIncrease">
                                <SalaryIncreaseCollapse
                                    employeeInfo={employeeInfo}
                                />
                            </Panel>

                            <Panel header="Thăng chức" key="promoted">
                                <PromotedCollapse
                                    employeeInfo={employeeInfo}
                                />
                            </Panel>

                            <Panel header="Đề xuất tham mưu" key="proposed">
                                <ProposedCollapse
                                    employeeInfo={employeeInfo}
                                />
                            </Panel>
                        </Collapse>
                    </Space>
                </Row>
            </Modal>

            {formResignationApplication && (
                <ResignationApplicationModal
                    open={formResignationApplication}
                    onCancel={handleOpenFormResignationApplication}
                    employeeInfo={employeeInfo}
                    openUpdateStatus={openUpdateStatus}
                />
            )}
        </>
    );
}

export default ModalUpdateHappenings;
