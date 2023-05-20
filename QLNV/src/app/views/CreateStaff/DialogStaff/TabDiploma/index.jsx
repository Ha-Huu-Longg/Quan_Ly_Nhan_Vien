
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import ModalDelete from "app/views/GeneralSettings/ModalDelete";
import TableDiploma from "./TableDiploma";
import { required, whiteSpace } from "app/views/GeneralSettings/constant";

const TabDiploma = (props) => {
    const { listDiploma, setListDiploma } = props;
    const [diplomaId, setDiplomaId] = useState(0);
    const [selectIndex, setSelectIndex] = useState();
    const [shouldOpenDialogDeleteText, setShouldOpenDialogDeleteText] = useState(false);

    const [form] = Form.useForm();

    const onFinish = (value) => {
        if (typeof selectIndex === "number") {
            const dataUpdate = listDiploma.map((item, index) => {
                const itemUpdate = index === selectIndex ? { ...item, ...value } : item
                return {
                    ...itemUpdate,
                };
            });
            setListDiploma([...dataUpdate]);
        }
        else {
            const newItemWithIndex = { ...value, index: listDiploma.length.toString() };
            setListDiploma([
                ...listDiploma,
                newItemWithIndex
            ]);
        }

        form.resetFields();
        setSelectIndex("")
    };

    const onClickEditTextInfo = (record, index) => {
        form.setFieldsValue({
            name: record?.name,
            content: record?.content,
            educationalOrg: record?.educationalOrg,
            issuanceDate: record?.issuanceDate?.split(" ")[0],
            field: record?.field
        });
        setSelectIndex(index);
    };

    const onClickDeleteTextInfo = (recordTextInfo, index) => {
        setDiplomaId(recordTextInfo?.certificateId)
        handleCloseDialogDeleteText()
        setSelectIndex(index);
    }

    const handleCloseDialogDeleteText = () => {
        setShouldOpenDialogDeleteText(!shouldOpenDialogDeleteText)
    }

    const handleDelete = () => {
        if (diplomaId) {
            setListDiploma(listDiploma.filter((item) => item?.certificateId !== diplomaId))
        } else {
            setListDiploma(listDiploma.filter((item) => item?.index !== selectIndex));
        }
        handleCloseDialogDeleteText();
        form.resetFields();
        setSelectIndex();
    }

    return (
        <div className="tab__diploma-content">
            {shouldOpenDialogDeleteText && (
                <ModalDelete
                    open={shouldOpenDialogDeleteText}
                    onCancel={handleCloseDialogDeleteText}
                    onOk={handleDelete}
                />
            )}

            <Form
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label='Tên văn bằng'
                            name="name"
                            rules={[required, whiteSpace]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label='Nơi cấp'
                            name="educationalOrg"
                            rules={[required, whiteSpace]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Ngày cấp"
                            name="issuanceDate"
                            rules={[
                                required
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label='Lĩnh vực'
                            name="field"
                            rules={[required, whiteSpace]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Form.Item
                            label='Nội dung văn bằng'
                            name="content"
                            rules={[required, whiteSpace]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row btn-form" span={6}>
                        <Form.Item>
                            <div className="btn-text-info">
                                <Button className="btn-add" htmlType="submit">
                                    THÊM
                                </Button>
                                <Button className="btn-reset" onClick={() => form.resetFields()}>
                                    LÀM MỚI
                                </Button>
                            </div>

                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <TableDiploma
                listDiploma={listDiploma}
                onClickEditTextInfo={onClickEditTextInfo}
                onClickDeleteTextInfo={onClickDeleteTextInfo}
            />
        </div>
    )
}
export default TabDiploma;