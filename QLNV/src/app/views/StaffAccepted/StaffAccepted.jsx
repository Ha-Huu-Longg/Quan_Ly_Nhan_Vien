import React, { useState, useEffect } from "react";
import {
    Row, Input, Breadcrumb, Table
} from "antd"
import { HomeFilled } from "@ant-design/icons"
import StaffAcceptedDialog from "./StaffAcceptedDialog"
import { HeaderStyled } from "./StaffAcceptedStyled"
import { useDispatch, useSelector } from "react-redux";
import { getListAcceptedAction } from "../../redux/actions/LeaderAction"
import { Columns } from "../Pending/PendingShare/Colum"
import { LoadingScreen } from "../Pending/PendingShare/Component/Loading"

function StaffAccepted() {

    const [shouldOpenStaffAcceptedDialog, setShouldOpenStaffAcceptedDialog] = useState(false)
    const [item, setItem] = useState()
    const dispatch = useDispatch()
    const listAccepted1Saga = useSelector((state) => state.leaderReducer.listAccepted1)
    const listAccepted2Saga = useSelector((state) => state.leaderReducer.listAccepted2)
    const loadding = useSelector((state) => state.leaderReducer.loadAccepting)
    const [listSearch, setListSearch] = useState([])
    const [textSearch, setTextSearch] = useState("")

    const handleClickSearch = () => {
        if (textSearch === "") {
            const newList = [...listAccepted1Saga, ...listAccepted2Saga]
            setListSearch(newList)
        } else {
            const newList = [...listAccepted1Saga, ...listAccepted2Saga]
            const list = newList.filter(item => item.fullName.toLowerCase().includes(textSearch.toLowerCase()))
            setListSearch(list)
        }
    }

    const openStaffAcceptedDialog = (rowData) => {
        setItem(rowData)
        setShouldOpenStaffAcceptedDialog(true)
    }

    const onCancelStaffAcceptedDialog = () => {
        setShouldOpenStaffAcceptedDialog(false)
        dispatch(getListAcceptedAction())
    }

    const columns = Columns(openStaffAcceptedDialog)

    useEffect(() => {
        dispatch(getListAcceptedAction())
    }, [])

    useEffect(() => {
        if (!loadding) {
            handleClickSearch()
        }
    }, [loadding])

    return (
        <div className="m-sm-30">
            <Breadcrumb className='breadcrumb-body'>
                <Breadcrumb.Item href="/">
                    <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/conclude/manage">
                    <span>Lãnh đạo</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Đã duyệt</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="end" style={{ marginBottom: 20 }}>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search"
                    onSearch={handleClickSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                />

            </Row>

            <div>
                {shouldOpenStaffAcceptedDialog && (
                    <StaffAcceptedDialog
                        open={shouldOpenStaffAcceptedDialog}
                        // onOk={onOk}
                        onCancel={onCancelStaffAcceptedDialog}
                        item={item}
                    />
                )}
            </div>

            <div>
                {
                    loadding && <LoadingScreen />
                }
            </div>

            <HeaderStyled>
                <Table
                    columns={columns}
                    dataSource={listSearch}
                    pagination={{ defaultPageSize: 10 }}
                    scroll={{ y: 350 }}
                />
            </HeaderStyled>

        </div>
    )
}

export default StaffAccepted