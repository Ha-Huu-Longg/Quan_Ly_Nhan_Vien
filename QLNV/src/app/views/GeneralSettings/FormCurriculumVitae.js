import React from 'react';
import { Form, Image, Input, Table } from 'antd';
import moment from 'moment';
import { formatDate, listGender, today } from './constant';

function FormCurriculumVitae(props) {
    const { data, familyRelations, disabled } = props;

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => index + 1,
            width: '5%',
            align: 'center',
        },
        {
            title: 'Quan hệ',
            dataIndex: 'relation',
            width: '9%',
            align: 'center',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Ngày sinh',
            render: (rowData) => formatDate(rowData.dateOfBirth),
            width: '12%',
            align: 'center',
        },
        {
            title: 'Giới tính',
            render: (record) => listGender[record?.gender].name,
            width: '10%',
            align: 'center',
        },
        {
            title: 'Số CCCD/CMT',
            dataIndex: 'citizenId',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '24%',
            align: 'center',
        },
    ];

    return (
        <div className="curriculum_vitae use-font-time">
            <div className="curriculum_vitae-top">
                <div className="curriculum-image">
                    <Image
                        src={data?.photoUrl ? data?.photoUrl : 'error'}
                        fallback="data:image/png;base64,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"
                    />
                </div>

                <div>
                    <div className="flexCenter">
                        <h4 className="font-z-18">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                        <h5>
                            <span className="font-z-18 border-bt">Độc lập - Tự do - Hạnh Phúc</span>
                        </h5>
                        <h3 className="font-z-22 font-w mt-40">SƠ YẾU LÝ LỊCH</h3>
                        <h3 className="font-z-16 font-w">TỰ THUẬT</h3>
                    </div>
                </div>
            </div>

            <div className="mt-30">
                <h4 className="font-z-18">I. THÔNG TIN BẢN THÂN</h4>
                <div className="pl-15">
                    <div className="curriculum_vitae-info">
                        <div className="flex-1">
                            <Form.Item label="1. Họ và tên: ">
                                <Input disabled defaultValue={data?.fullName} />
                            </Form.Item>
                        </div>
                        <div className="w-25">
                            <Form.Item label="Nam, nữ: ">
                                <Input disabled defaultValue={listGender[data?.gender].name} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="curriculum_vitae-info">
                        <div className="w-16">
                            <Form.Item label="2. Sinh ngày: ">
                                <Input disabled defaultValue={moment(data?.dateOfBirth).format('DD')} />
                            </Form.Item>
                        </div>
                        <div className="w-12">
                            <Form.Item label="tháng ">
                                <Input disabled defaultValue={moment(data?.dateOfBirth).format('MM')} />
                            </Form.Item>
                        </div>
                        <div className="w-12">
                            <Form.Item label="năm ">
                                <Input disabled defaultValue={moment(data?.dateOfBirth).format('YYYY')} />
                            </Form.Item>
                        </div>
                        <div className="flex-1">
                            <Form.Item label="Nơi sinh: ">
                                <Input disabled defaultValue={data?.address} />
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <Form.Item name="currentAddress" label="3. Nguyên quán: ">
                            <Input disabled={disabled} defaultValue={data?.currentAddress} />
                        </Form.Item>
                    </div>

                    <div className="curriculum_vitae-info">
                        <div className="w-25">
                            <Form.Item label="4. Số CCCD: ">
                                <Input disabled defaultValue={data?.citizenId} />
                            </Form.Item>
                        </div>
                        <div className="w-25">
                            <Form.Item name="citizenIdIssuanceDate" label="Cấp ngày: ">
                                <Input disabled={disabled} />
                            </Form.Item>
                        </div>
                        <div className="flex-1">
                            <Form.Item name="citizenIdIssuingAuthority" label="Nơi cấp: ">
                                <Input disabled={disabled} defaultValue={data?.citizenIdIssuingAuthority} />
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <Form.Item label="5. Số điện thoại liên hệ: ">
                            <Input disabled defaultValue={data?.phone} />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item label="6. Email: ">
                            <Input disabled defaultValue={data?.email} />
                        </Form.Item>
                    </div>
                    <div className="curriculum_vitae-religion">
                        <div className="w-50">
                            <Form.Item name="ethnicity" label="7. Dân tộc: ">
                                <Input disabled={disabled} defaultValue={data?.ethnicity} />
                            </Form.Item>
                        </div>

                        <div className="w-50">
                            <Form.Item name="religion" label="8. Tôn giáo: ">
                                <Input disabled={disabled} defaultValue={data?.religion} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h4 className="mb-15 font-z-18">II. QUAN HỆ GIA ĐÌNH</h4>
                <p className="m-0 text-ident-30 font-s-i">Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ(hoặc chồng), con</p>

                <Table dataSource={familyRelations} className="table-information table-family" bordered size="small" columns={columns} pagination={false} />
            </div>

            <div>
                <p className="text-ident-30">Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.</p>
                <div className="modal_signature">
                    <p className="date-signature font-s-i">
                        Hà nội, ngày {today.getDate()} tháng {today.getMonth() + 1}, {today.getFullYear()}.
                    </p>
                    <p>Người khai</p>
                    <Form.Item name="commonName">
                        <Input disabled={disabled} placeholder="nhập chữ ký" defaultValue={data?.commonName} className="curriculum_vitae-common" />
                    </Form.Item>
                    <Form.Item>
                        <Input disabled className="modal_signature-fullName" defaultValue={data?.fullName} />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
}

export default FormCurriculumVitae;
