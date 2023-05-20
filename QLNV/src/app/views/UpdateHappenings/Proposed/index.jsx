import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import ProposedModal from './ProposedModal';
import { useDispatch, useSelector } from 'react-redux';
import { addProposed, deleteProposed, getListProposed, updateProposed } from 'app/redux/actions/UpdateHappeningsActions';
import ProposedTable from './ProposedTable';
import ModalDelete from 'app/views/GeneralSettings/ModalDelete';
import ModalSendLeader from 'app/views/GeneralSettings/ModalSendLeader';
import { required, whiteSpace } from 'app/views/GeneralSettings/constant';
const { TextArea } = Input;

function ProposedCollapse({ formRef, employeeInfo }) {
    const [proposedForm, setProposedForm] = useState(false);
    const [proposalConsultationId, setProposalConsultationId] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [sendLeader, setSendLeader] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const ProposedList = useSelector((state) => state.updateEmployee.ProposedList);
    const ProposedRender = useSelector((state) => state.updateEmployee.ProposedRender);

    useEffect(() => {
        dispatch(getListProposed(employeeInfo));
    }, [ProposedRender]);

    const handleChangeProposed = (record) => {
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

    const addProposeList = async (values) => {
        const staffData = {
            employeeId: employeeInfo?.employeeId,
            ...ProposedList,
            ...values,
        };

        if (!proposalConsultationId?.id) {
            dispatch(addProposed(staffData));
            form.resetFields();
            handleShowProposedForm();
        } else {
            dispatch(updateProposed({ ...staffData, proposalConsultationId: proposalConsultationId?.id }));
            handleShowProposedForm();
            form.resetFields();
        }
    };

    const handleOpenModalDeleteProposed = (id) => {
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

    const handleShowProposedForm = () => {
        setProposedForm(!proposedForm);
    };

    const handleSendLeader = () => {
        setSendLeader(!sendLeader);
    };

    const handleClear = () => {
        setProposalConsultationId(null);
        setProposedForm(false);
        setSendLeader(false);
    };

    return (
        <div className="content-form-layout">
            <Form onFinish={addProposeList} ref={formRef} form={form}>
                <Row>
                    <Col span={24} md={5}>
                        <Form.Item name="date" label="Ngày đăng kí" rules={[required]}>
                            <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={7}>
                        <Form.Item name="type" label="Loại" rules={[required, whiteSpace]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                        <Form.Item name="note" label="Ghi chú" rules={[required, whiteSpace]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                        <Form.Item name="content" label="Nội dung" rules={[required, whiteSpace]}>
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col className="btn-form" span={24} md={12}>
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

            <ProposedTable handleChangeProposed={handleChangeProposed} handleOpenModalDeleteProposed={handleOpenModalDeleteProposed} ProposedList={ProposedList} />

            {proposedForm && <ProposedModal open={proposedForm} onCancel={handleClear} employeeInfo={employeeInfo} ProposedList={ProposedList} onSend={handleSendLeader} />}
            {modalDelete && <ModalDelete open={modalDelete} onCancel={handleOpenModalDeleteProposed} onOk={handleDelete} />}

            {sendLeader && <ModalSendLeader open={sendLeader} onCancel={handleSendLeader} employeeId={employeeInfo?.employeeId} onClose={handleClear} status={16} />}
        </div>
    );
}

export default ProposedCollapse;
