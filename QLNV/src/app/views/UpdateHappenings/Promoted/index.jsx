import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PromotedModal from './PromotedModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPromoted,
    deletePromoted,
    getListPromoted,
    updatePromoted,
} from 'app/redux/actions/UpdateHappeningsActions';
import PromotedTable from './PromotedTable';
import PromotedForm from './PromotedForm';
import ModalDelete from 'app/views/GeneralSettings/ModalDelete';
import ModalSendLeader from 'app/views/GeneralSettings/ModalSendLeader';

function PromotedCollapse({ formRef, employeeInfo }) {
    const [promotedForm, setPromotedForm] = useState(false);
    const [promotionId, setPromotionId] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [promoteRecord, setPromoteRecord] = useState({});
    const [sendLeader, setSendLeader] = useState(false);

    const listPromoted = useSelector((state) => state.updateEmployee.PromotedList);
    const PromotedRender = useSelector((state) => state.updateEmployee.PromotedRender);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getListPromoted(employeeInfo));
    }, [PromotedRender]);

    const handleChangePromoted = (record) => {
        setPromoteRecord(record);
        setPromotionId({
            action: 'update',
            id: record.promotionId,
        });

        form.setFieldsValue({
            newPosition: record?.newPosition,
            oldPosition: record?.oldPosition,
            count: record?.count,
            reason: record?.reason,
            note: record?.note,
            date: moment(record?.date),
        });
    };

    const submitFormPromoted = async (values) => {
        const staffData = {
            employeeId: employeeInfo?.employeeId,
            ...listPromoted,
            ...values,
        };

        if (!promotionId?.id) {
            dispatch(addPromoted(staffData));
            form.resetFields();
            handleShowPromotedForm();
        } else {
            dispatch(updatePromoted({ ...staffData, promotionId: promotionId?.id }));
            handleShowPromotedForm();
            form.resetFields();
        }
    };

    const handleOpenModalDeletePromoted = (id) => {
        setModalDelete(!modalDelete);
        setPromotionId({
            action: '',
            id,
        });
    };

    const handleDelete = async () => {
        dispatch(deletePromoted(promotionId?.id));
        setModalDelete(!modalDelete);
        form.resetFields();
    };

    const onReset = () => {
        form.resetFields();
        setPromotionId(null);
    };

    const handleShowPromotedForm = () => {
        setPromotedForm(!promotedForm);
    };

    const handleSendLeader = () => {
        setSendLeader(!sendLeader);
    };

    const handleClear = () => {
        setPromotionId(null);
        setPromotedForm(false);
        setSendLeader(false);
    };

    return (
        <div className="content-form-layout">
            <PromotedForm
                promotionId={promotionId}
                submitFormPromoted={submitFormPromoted}
                formRef={formRef}
                form={form}
                onReset={onReset}
            />

            <PromotedTable
                handleChangePromoted={handleChangePromoted}
                handleOpenModalDeletePromoted={handleOpenModalDeletePromoted}
                listPromoted={listPromoted}
            />

            {promotedForm && (
                <PromotedModal
                    open={promotedForm}
                    onCancel={handleClear}
                    employeeInfo={employeeInfo}
                    promoteRecord={promoteRecord}
                    onSend={handleSendLeader}
                />
            )}

            {modalDelete && (
                <ModalDelete open={modalDelete} onCancel={handleOpenModalDeletePromoted} onOk={handleDelete} />
            )}

            {sendLeader && (
                <ModalSendLeader
                    open={sendLeader}
                    onCancel={handleSendLeader}
                    employeeId={employeeInfo?.employeeId}
                    onClose={handleClear}
                    status={16}
                />
            )}
        </div>
    );
}

export default PromotedCollapse;
