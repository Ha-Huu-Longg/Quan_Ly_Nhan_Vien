import React from "react";
import { Row, Col, Table, Image } from "antd"
import moment from "moment";
import { ColumFamilyRelations } from "../Colum"

import "../../Pending.css"
import { formatDate } from "app/views/GeneralSettings/constant";

export function RenderCurriculumVitae(props) {
    const { data, dataForm } = props
    const employeeInfo = data?.employeeInfo
    const familyRelations = data?.familyRelations
    const resume = dataForm?.resume

    const columns = ColumFamilyRelations()

    if (!employeeInfo) {
        return <h1>No data</h1>
    } else {
        return (
            <div className="family">
                <div>
                    <div className="family-brand">
                        <h4 className="family-brand-c">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                        <div className="flex-jcenter">
                            <h5 className="family-brand-d">Độc lập - Tự do - Hạnh Phúc</h5>
                        </div>
                    </div>

                    <Row>
                        <Col span={6}>
                            <Image
                                style={{ width: 150, height: 200 }}
                                src={employeeInfo?.photoUrl ? employeeInfo.photoUrl : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                            />
                        </Col>

                        <Col span={12}>
                            <div className="font-times" style={{ paddingTop: 100 }}>
                                <h3 className="tcenter" style={{ fontSize: 20 }}>SƠ YẾU LÝ LỊCH</h3>
                                <h3 className="text-narrative" style={{ fontSize: 16 }}>TỰ THUẬT</h3>
                            </div>
                        </Col>
                    </Row>

                    {/* thông tin cá nhân */}
                    <div className="mt-20">
                        <h4>I. THÔNG TIN BẢN THÂN</h4>
                        <div style={{ paddingLeft: 15 }}>
                            <p>
                                <span className="label-name">1. Họ và tên: {employeeInfo.fullName}</span>
                                <span>Nam, nữ: {employeeInfo.gender === 0 ? "Nam" : "Nữ"}</span>
                            </p>
                            <p>2. Sinh ngày: {employeeInfo.dateOfBirth ? formatDate(employeeInfo.dateOfBirth) : "Null"}</p>
                            <p>3. Nguyên quán: {employeeInfo.address ? employeeInfo.address : "Null"}</p>
                            <p>
                                <span className="label-citizenship">4. Số CCCD: {resume?.citizenId ? resume.citizenId : "Null"}</span>
                                <span className="label-citizenship">Cấp ngày: {resume.citizenIdIssuanceDate ? formatDate(resume.citizenIdIssuanceDate) : "Null"}</span>
                                <span>Nơi cấp: {resume?.citizenIdIssuingAuthority ? resume.citizenIdIssuingAuthority : "Null"}</span>
                            </p>
                            <p>5. Số điện thoại liên hệ: {employeeInfo.phone}</p>
                            <p>6. Email: {employeeInfo.email}</p>
                            <p>
                                <span className="label-citizenship">7. Dân tộc: {resume?.ethnicity ? resume.ethnicity : "Null"}</span>
                                <span>Tôn giáo: {resume?.religion ? resume.relation : "Null"}</span>
                            </p>
                        </div>
                    </div>

                    {/* thông tin gia đình */}
                    <div style={{ padding: "0 20px 20px 0" }}>
                        <h4>II. QUAN HỆ GIA ĐÌNH</h4>
                        <p style={{ margin: 0, textIndent: '30px' }}>Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ(hoặc chồng), con</p>
                        <Table
                            size="small"
                            bordered
                            className="table-information"
                            dataSource={familyRelations || []}
                            columns={columns}
                            pagination={false}
                        />

                    </div>

                    <div>
                        <p style={{ textIndent: '30px' }}>
                            Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách
                            nhiệm trước pháp luật về lời khai của mình.
                        </p>
                        <div className="modal_signature" style={{ paddingBottom: 70 }}>
                            <p style={{ fontStyle: "italic" }}>
                                <span>Hà nội, </span>
                                <span> ngày {moment(employeeInfo.createTime).format("DD")} </span>
                                <span> tháng {moment(employeeInfo.createTime).format("MM")} </span>
                                <span> năm {moment(employeeInfo.createTime).format("YYYY")} </span>
                            </p>
                            <p>Người khai</p>
                            <p>{resume.commonName}</p>
                            <p>{employeeInfo.fullName}</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
