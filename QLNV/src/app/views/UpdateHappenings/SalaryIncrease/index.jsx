import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import SalaryIncreaseModal from './SalaryIncreaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSalary, deleteSalary, getListSalary, updateSalary } from 'app/redux/actions/UpdateHappeningsActions';
import SalaryIncreaseTable from './SalaryIncreaseTable';
import ModalDelete from 'app/views/GeneralSettings/ModalDelete';
import ModalSendLeader from 'app/views/GeneralSettings/ModalSendLeader';
import { number, required } from 'app/views/GeneralSettings/constant';

const { TextArea } = Input;

function SalaryIncreaseCollapse({ formRef, employeeInfo }) {
    const [salaryForm, setSalaryForm] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [salaryId, setSalaryId] = useState(null);
    const [staffDataSalary, setStaffDataSalary] = useState({});
    const [sendLeader, setSendLeader] = useState(false);

    const [form] = Form.useForm();
    const SalaryList = useSelector((state) => state.updateEmployee.SalaryList);
    const salaryRender = useSelector((state) => state.updateEmployee.salaryRender);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListSalary(employeeInfo));
    }, [salaryRender]);

    const handleChangeIncreaseSalary = (record) => {
        setSalaryId({
            action: 'update',
            id: record.salaryId,
        });

        form.setFieldsValue({
            salaryScale: record?.salaryScale,
            reason: record?.reason,
            note: record?.note,
            count: record?.count,
            date: moment(record?.date),
        });
    };

    const submitFormSalary = (values) => {
        const staffData = {
            employeeId: employeeInfo?.employeeId,
            ...SalaryList,
            ...values,
        };

        setStaffDataSalary(staffData);
        if (!salaryId?.id) {
            dispatch(addSalary(staffData));
            handleShowSalaryForm();
            form.resetFields();
        } else {
            dispatch(updateSalary({ ...staffData, salaryId: salaryId?.id }));
            handleShowSalaryForm();
            form.resetFields();
        }
    };

    const handleOpenModalDeleteSalary = (id) => {
        setModalDelete(!modalDelete);
        setSalaryId({
            action: '',
            id,
        });
    };

    const handleDelete = () => {
        dispatch(deleteSalary(salaryId?.id));
        setModalDelete(!modalDelete);
        form.resetFields();
    };

    const onReset = () => {
        form.resetFields();
        setSalaryId(null);
    };

    const handleShowSalaryForm = () => {
        setSalaryForm(!salaryForm);
    };

    const handleSendLeader = () => {
        setSendLeader(!sendLeader);
    };

    const handleClear = () => {
        setSalaryForm(false);
        setSendLeader(false);
        setSalaryId(null);
    };
    return (
        <div className="content-form-layout">
            <Form onFinish={submitFormSalary} ref={formRef} form={form}>
                <Row>
                    <Col span={24} md={12} xl={3}>
                        <Form.Item name="count" label="Lần thứ" rules={[required, number]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={4}>
                        <Form.Item name="salaryScale" label="Bậc" rules={[required]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={5}>
                        <Form.Item name="date" label="Ngày tăng lương" rules={[required]}>
                            <DatePicker
                                disabledDate={(current) => {
                                    return current && current.valueOf() === Date.now();
                                }}
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={12}>
                        <Form.Item name="note" label="Ghi chú" rules={[required]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={12}>
                        <Form.Item name="reason" label="Lý do tăng lương" rules={[required]}>
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24} md={12} xl={12} className="flexEnd mt-10">
                        <Form.Item>
                            <Button className="add-form" type="primary" htmlType="submit">
                                {salaryId?.action === 'update' ? 'LƯU' : 'THÊM'}
                            </Button>
                            <Button className="cancel-form" htmlType="button" onClick={onReset} type="primary">
                                HỦY
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <SalaryIncreaseTable handleChangeIncreaseSalary={handleChangeIncreaseSalary} handleOpenModalDeleteSalary={handleOpenModalDeleteSalary} SalaryList={SalaryList} />

            {salaryForm && <SalaryIncreaseModal open={salaryForm} onCancel={handleClear} employeeInfo={employeeInfo} staffDataSalary={staffDataSalary} onSend={handleSendLeader} />}

            {modalDelete && <ModalDelete open={modalDelete} onCancel={handleOpenModalDeleteSalary} onOk={handleDelete} />}

            {sendLeader && <ModalSendLeader open={sendLeader} onCancel={handleSendLeader} employeeId={employeeInfo?.employeeId} onClose={handleClear} status={16} />}
        </div>
    );
}

export default SalaryIncreaseCollapse;
