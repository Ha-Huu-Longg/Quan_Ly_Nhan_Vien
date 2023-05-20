import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";

import ModalDelete from "app/views/GeneralSettings/ModalDelete";
import TableFamilyRelationship from "./TableFamilyRelationship";
import { listGender, maxLength, minLength, number, required, whiteSpace } from "app/views/GeneralSettings/constant";

const TabFamilyRelationShip = (props) => {
    const { listRelationship, setListRelationship } = props;
    const [selectIndex, setSelectIndex] = useState();
    const [relationshipId, setRelationshipId] = useState(0);
    const [shouldOpenDialogDeleteText, setShouldOpenDialogDeleteText] = useState(false)

    const [form] = Form.useForm();

    const onFinish = (value) => {

        if (typeof selectIndex === "number") {
            if (!listRelationship?.familyId) {
                const dataUpdate = listRelationship.map((item, index) => {
                    const itemUpdate = index === selectIndex ? { ...item, ...value } : item
                    return {
                        ...itemUpdate,
                    };
                });
                setListRelationship([...dataUpdate]);
            } else {
                console.error("có lỗi");
            }

        }
        else {
            const newItemWithIndex = { ...value, index: listRelationship.length.toString() };
            setListRelationship([
                ...listRelationship,
                newItemWithIndex
            ]);
        }

        form.resetFields();
        setSelectIndex("")
    };

    const onClickEditFamilyRelationship = (record, index) => {
        form.setFieldsValue({
            name: record?.name,
            dateOfBirth: record?.dateOfBirth?.split(" ")[0],
            gender: record?.gender,
            relation: record?.relation,
            citizenId: record?.citizenId,
            address: record?.address
        });
        setSelectIndex(index);
    }

    const onClickDeleteFamilyRelationship = (index, recordFamilyRelationship) => {
        setRelationshipId(recordFamilyRelationship?.familyId)
        setShouldOpenDialogDeleteText(true)
        setSelectIndex(index)
    }

    const handleDelete = () => {
        if (relationshipId) {
            setListRelationship(listRelationship.filter((item) => item?.familyId !== relationshipId))
        } else {
            setListRelationship(listRelationship.filter((item) => item?.index !== selectIndex));
        }
        handleCloseDialogDelete();
        form.resetFields();
        setSelectIndex("")
    }

    const handleCloseDialogDelete = () => {
        setShouldOpenDialogDeleteText(!shouldOpenDialogDeleteText)
    }

    return (
        <div className="tab__family-content">
            {shouldOpenDialogDeleteText && (
                <ModalDelete
                    open={shouldOpenDialogDeleteText}
                    onOk={handleDelete}
                    onCancel={handleCloseDialogDelete}
                />
            )}

            <Form
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Col span={24} style={{ boxSizing: "border-box" }}>
                    <Row justify="space-between" >
                        <Col className="gutter-row" span={6}>
                            <Form.Item
                                label='Họ và tên người thân'
                                name="name"
                                rules={[required, whiteSpace]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Form.Item
                                label='Số CCCD/CMT'
                                name="citizenId"
                                rules={[required, number, minLength, maxLength]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Form.Item
                                label="Ngày sinh"
                                name="dateOfBirth"
                                rules={[
                                    required
                                ]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Form.Item
                                label='Quan hệ'
                                name="relation"
                                rules={[required]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                rules={[required]}
                            >
                                <Select
                                    placeholder="Giới tính"
                                    fieldNames={{ label: "name", value: "value", options: "options" }}
                                    options={listGender}
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={16}>
                            <Form.Item
                                label='Địa chỉ cụ thể'
                                name="address"
                                rules={[required, whiteSpace]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row btn-form" span={8}>
                            <Form.Item>
                                <div className="btn-family-relationship">
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
                </Col>
            </Form>

            <TableFamilyRelationship
                listGender={listGender}
                listRelationship={listRelationship}
                onClickEditFamilyRelationship={onClickEditFamilyRelationship}
                onClickDeleteFamilyRelationship={onClickDeleteFamilyRelationship}
            />

        </div>
    )
}
export default TabFamilyRelationShip;
