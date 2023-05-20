import React, { useState } from 'react';
import { Form, Image, Input, List, Space, Button } from 'antd';
import { CalendarOutlined, HeatMapOutlined, MailOutlined, PhoneOutlined, UserOutlined, PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TbHeart, TbTargetArrow } from 'react-icons/tb';
import { MdBusinessCenter, MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import { formatDate, listTeam } from './constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

const { TextArea } = Input;

function FormProfile(props) {
    const { data, employeeInfo, workExperiencesList, setWorkExperiencesList, profileInfo } = props;
    const employeeCv = data?.cv;
    const resume = data?.resume;

    const [workData, setWorkData] = useState(workExperiencesList);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAdd = () => {
        let newData;
        if (workData) {
            newData = [{ company: '', position: '', detail: '', startDate: '', endDate: '' }, ...workData];
        } else {
            newData = [{ company: '', position: '', detail: '', startDate: '', endDate: '' }];
        }
        setWorkData(newData);
        setWorkExperiencesList(newData);
        setEditingIndex(0);
    };

    const handleDelete = (index) => {
        const newData = [...workData];
        newData.splice(index, 1);
        setWorkData(newData);
        setWorkExperiencesList(newData);
    };

    const handleEdit = (index) => {
        if (editingIndex > -1) {
            if (!workData[editingIndex]?.company || !workData[editingIndex]?.position || !workData[editingIndex]?.detail || !workData[editingIndex]?.startDate || !workData[editingIndex]?.endDate) {
                toast.warning('Nhập đủ thông tin');
                return;
            }
        }
        setEditingIndex(index);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newData = [...workData];
        newData[index][name] = value;
        setWorkData(newData);
        setWorkExperiencesList(newData);
    };

    const handleSave = (index) => {
        if (!workData[editingIndex].company || !workData[editingIndex].position || !workData[editingIndex].detail || !workData[editingIndex].startDate || !workData[editingIndex].endDate) {
            toast.warning('Nhập đủ thông tin');
            return;
        }
        setEditingIndex(-1);
    };
    return (
        <div className="profile">
            <div className="profile-left">
                <div className="profile-left-info">
                    <Image
                        className="profile-img"
                        src={employeeInfo?.photoUrl ? employeeInfo?.photoUrl : 'error'}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58
                                +NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    />

                    <h3>{employeeInfo?.fullName || resume?.fullName}</h3>
                    <p>{listTeam[employeeInfo?.teamId - 1]?.name}</p>
                </div>

                <div className="profile-left-bottom">
                    <p>
                        <CalendarOutlined /> {formatDate(employeeInfo?.dateOfBirth || resume?.dateOfBirth)}
                    </p>

                    <p>
                        <UserOutlined /> {employeeInfo?.gender === 0 || resume?.gender === 0 ? 'Nam' : 'Nữ'}
                    </p>

                    <p>
                        <PhoneOutlined /> {employeeInfo?.phone || resume?.phone}
                    </p>

                    <p>
                        <MailOutlined /> {employeeInfo?.email || resume?.email}
                    </p>

                    <p>
                        <HeatMapOutlined /> {employeeInfo?.address || resume?.address}
                    </p>
                </div>
            </div>
            {profileInfo ? (
                <div className="profile-right curriculum_vitae">
                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <TbTargetArrow />
                            </div>
                            <h4>Mục tiêu</h4>
                        </div>
                        <Form.Item name="careerGoal">
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                            />
                        </Form.Item>
                    </div>

                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <MdVerified />
                            </div>
                            <h4>Các kỹ năng</h4>
                        </div>
                        <p>
                            <Form.Item name="skill">
                                <TextArea
                                    autoSize={{
                                        minRows: 1,
                                        maxRows: 3,
                                    }}
                                />
                            </Form.Item>
                        </p>
                    </div>

                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <TbHeart />
                            </div>
                            <h4>Sở thích</h4>
                        </div>
                        <p>
                            <Form.Item name="hobby">
                                <TextArea
                                    autoSize={{
                                        minRows: 1,
                                        maxRows: 3,
                                    }}
                                />
                            </Form.Item>
                        </p>
                    </div>

                    <div className="profile-right-general flex j-between">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <MdBusinessCenter />
                            </div>
                            <h4>Kinh nghiệm làm việc</h4>
                        </div>

                        <div>
                            <button type="button" className="btn-hiden" onClick={handleAdd}>
                                <PlusCircleOutlined />
                            </button>
                        </div>
                    </div>

                    <div className="list-work-experiences">
                        <List
                            bordered
                            dataSource={workData}
                            renderItem={(item, index) => (
                                <List.Item>
                                    {editingIndex === index ? (
                                        <Space>
                                            <div className="profile-form">
                                                <div className="list-work-info">
                                                    <div>
                                                        <Form.Item label="Công ty: ">
                                                            <Input name="company" value={item.company} onChange={(e) => handleInputChange(e, index)} />
                                                        </Form.Item>
                                                    </div>
                                                    <div>
                                                        <Form.Item label="Vị trí: ">
                                                            <Input name="position" value={item.position} onChange={(e) => handleInputChange(e, index)} />
                                                        </Form.Item>
                                                    </div>
                                                    <div>
                                                        <Form.Item label="Mô tả: ">
                                                            <TextArea
                                                                name="detail"
                                                                autoSize={{
                                                                    minRows: 1,
                                                                    maxRows: 2,
                                                                }}
                                                                value={item.detail}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="profile-date">
                                                        <Form.Item label="Ngày bắt đầu">
                                                            <Input name="startDate" value={item.startDate} type="date" onChange={(e) => handleInputChange(e, index)} />
                                                        </Form.Item>
                                                        <Form.Item label="Ngày kết thúc">
                                                            <Input name="endDate" value={item.endDate} type="date" onChange={(e) => handleInputChange(e, index)} />
                                                        </Form.Item>
                                                    </div>
                                                </div>

                                                <div className="list-work-btn">
                                                    <Button onClick={() => handleSave(index)}>Save</Button>
                                                </div>
                                            </div>
                                        </Space>
                                    ) : (
                                        <Space>
                                            <div>
                                                <div>
                                                    <div className="list-work-show">
                                                        <p>
                                                            Công ty: <span>{item?.company}</span>{' '}
                                                        </p>
                                                        <div>
                                                            <span>{formatDate(item?.startDate)}</span>
                                                            <span>{formatDate(item?.endDate)}</span>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        Vị trí: <span>{item?.position}</span>
                                                    </p>
                                                    <p>
                                                        Mô tả: <span>{item?.detail}</span>
                                                    </p>
                                                </div>
                                                <div className="list-work-show-btn">
                                                    <Button onClick={() => handleEdit(index)}>
                                                        <EditOutlined />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(index)}>
                                                        <CloseCircleOutlined />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Space>
                                    )}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            ) : (
                <div className="profile-right">
                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <TbTargetArrow />
                            </div>
                            <h4>Mục tiêu</h4>
                        </div>
                        <p>{employeeCv?.careerGoal}</p>
                    </div>

                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <MdVerified />
                            </div>
                            <h4>Các kỹ năng</h4>
                        </div>
                        <p>{employeeCv?.skill}</p>
                    </div>

                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <TbHeart />
                            </div>
                            <h4>Sở thích</h4>
                        </div>
                        <p>{employeeCv?.hobby}</p>
                    </div>

                    <div className="profile-right-general">
                        <div className="profile-right-title">
                            <div className="icon-profile">
                                <MdBusinessCenter />
                            </div>
                            <h4>Kinh nghiệm làm việc</h4>
                        </div>

                        <div>
                            {employeeCv?.workExperiences.map((item, index) => (
                                <div key={index} className="profile-right-experience">
                                    <div className="profile-right-experience-title">
                                        <p>{item.company}</p>
                                        <p>
                                            <span>{formatDate(item?.startDate)} - </span>
                                            <span>{formatDate(item?.endDate)}</span>
                                        </p>
                                    </div>
                                    <p className="position">{item.position}</p>
                                    <p className="detail">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormProfile;
