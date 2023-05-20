import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import RegisterProfileModal from './RegisterProfileModal';
import { addProposed, deleteProposed, getListProposed, updateProposed } from 'app/redux/actions/UpdateHappeningsActions';
import { useDispatch, useSelector } from 'react-redux';
import RegisterTable from './RegisterTable';
import ModalDelete from 'app/views/GeneralSettings/ModalDelete';
import ModalSendLeader from 'app/views/GeneralSettings/ModalSendLeader';
import { required, whiteSpace } from 'app/views/GeneralSettings/constant';

const { TextArea } = Input;

function RegisterCollapse({ formRef, employeeInfo }) {
    const [registerForm, setRegisterForm] = useState(false);
    const [proposalConsultationId, setProposalConsultationId] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [sendLeader, setSendLeader] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.updateEmployee.ProposedList);
    const ProposedRender = useSelector((state) => state.updateEmployee.ProposedRender);

    useEffect(() => {
        dispatch(getListProposed(employeeInfo));
    }, [ProposedRender]);

    const handleChangeRegister = (record) => {
        setProposalConsultationId({
            action: 'update',
            id: record?.proposalConsultationId,
        });

        form.setFieldsValue({
            type: record?.type,
            content: record?.content,
            note: record?.note,
            date: moment(record?.date),
        });
    };

    const addProfileList = async (values) => {
        const staffData = {
            employeeId: employeeInfo?.employeeId,
            ...employeeData,
            ...values,
        };

        if (!proposalConsultationId?.id) {
            dispatch(addProposed(staffData));
            form.resetFields();
            handleShowRegisterForm();
        } else {
            dispatch(updateProposed({ ...staffData, proposalConsultationId: proposalConsultationId?.id }));
            handleShowRegisterForm();
            form.resetFields();
        }
    };

    const handleOpenModalDeleteRegister = (id) => {
        setModalDelete(!modalDelete);
        setProposalConsultationId({
            action: '',
            id,
        });
    };

    const handleDelete = async () => {
        dispatch(deleteProposed(proposalConsultationId?.id));
        setModalDelete(!modalDelete);
        form.resetFields();
    };

    const onReset = () => {
        form.resetFields();
        setProposalConsultationId(null);
    };

    const handleShowRegisterForm = () => {
        setRegisterForm(!registerForm);
    };

    const handleSendLeader = () => {
        setSendLeader(!sendLeader);
    };

    const handleClear = () => {
        setProposalConsultationId(null);
        setRegisterForm(false);
        setSendLeader(false);
    };

    return (
        <div className="content-form-layout">
            <Form onFinish={addProfileList} ref={formRef} form={form}>
                <Row>
                    <Col span={24} md={24} xl={8}>
                        <Form.Item name="type" label="Hồ sơ" rules={[required, whiteSpace]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={5}>
                        <Form.Item name="date" label="Ngày đăng kí" rules={[required]}>
                            <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={11}>
                        <Form.Item name="note" label="Ghi chú" rules={[required, whiteSpace]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={13}>
                        <Form.Item name="content" label="Nội dung" rules={[required, whiteSpace]}>
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={24} xl={11} className="btn-form">
                        <Form.Item>
                            <Button className="add-form" type="primary" htmlType="submit">
                                {proposalConsultationId?.action === 'update' ? 'LƯU' : 'THÊM'}
                            </Button>
                            <Button className="cancel-form" htmlType="button" onClick={onReset} type="primary">
                                HỦY
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <RegisterTable handleChangeRegister={handleChangeRegister} handleOpenModalDeleteRegister={handleOpenModalDeleteRegister} employeeData={employeeData} />

            {registerForm && <RegisterProfileModal open={registerForm} onSend={handleSendLeader} onCancel={handleClear} employeeInfo={employeeInfo} />}

            {modalDelete && <ModalDelete open={modalDelete} onCancel={handleOpenModalDeleteRegister} onOk={handleDelete} />}

            {sendLeader && <ModalSendLeader open={sendLeader} onCancel={handleSendLeader} employeeId={employeeInfo?.employeeId} onClose={handleClear} status={16} />}
        </div>
    );
}

export default RegisterCollapse;
