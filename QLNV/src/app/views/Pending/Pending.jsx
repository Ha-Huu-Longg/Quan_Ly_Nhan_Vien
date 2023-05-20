import React, { useEffect, useState } from "react";
import {
    Row, Input, Breadcrumb, Table
} from "antd"
import { HomeFilled } from "@ant-design/icons"
import PendingDialog from "./PendingDialog"
import { HeaderStyled } from "./PendingStyled"
import { useDispatch, useSelector } from "react-redux";
import { getListPendingAction } from "../../redux/actions/LeaderAction"
import { LoadingScreen } from "./PendingShare/Component/Loading"
import { Columns } from "./PendingShare/Colum"

function Pending() {

    const listPendingSaga = useSelector((state) => state.leaderReducer.listPending)
    const loadding = useSelector((state) => state.leaderReducer.loadPending)
    const [listSearch, setListSearch] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [shouldOpenPendingDialog, setShouldOpenPendingDialog] = useState(false)
    const [item, setItem] = useState()
    const dispatch = useDispatch()

    const handleClickSearch = () => {
        if (textSearch === "") {
            setListSearch(listPendingSaga)
        } else {
            const newList = [...listPendingSaga]
            const list = newList.filter(item => item.fullName.toLowerCase().includes(textSearch.toLowerCase()))
            setListSearch(list)
        }
    }

    const openPendingDialog = (rowData) => {
        setItem(rowData)
        setShouldOpenPendingDialog(true)
    }

    const onCancelPendingDialog = () => {
        setItem({})
        setShouldOpenPendingDialog(false)
        dispatch(getListPendingAction())
    }

    const columns = Columns(openPendingDialog)

    useEffect(() => {
        dispatch(getListPendingAction())
    }, [])

    useEffect(() => {
        if (!loadding) {
            handleClickSearch()
        }
    }, [loadding])

    return (
        <div className="m-sm-30 p-relative" >
            <Breadcrumb className='breadcrumb-body'>
                <Breadcrumb.Item href="/">
                    <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/conclude/manage">
                    <span>Lãnh đạo</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chờ duyệt</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="end" style={{ marginBottom: 20 }}>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search"
                    onSearch={handleClickSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                >
                </Input.Search>
            </Row>

            <div>
                {shouldOpenPendingDialog && (
                    <PendingDialog
                        open={shouldOpenPendingDialog}
                        item={item}
                        // onOk={onOk}
                        onCancel={onCancelPendingDialog}
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
                    scroll={{ y: 350, }}
                />
            </HeaderStyled>

        </div>
    )
}

export default Pending