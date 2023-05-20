import React from 'react';
import { Tooltip } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, InfoCircleFilled } from '@ant-design/icons';

// update: (method = 0), deleted: 1, info: 2, view: 3
export const ActionButton = ({ item, onSelect, info, view, deleted, update }) => {
    return (
        <div className="list_icon">
            {update && (
                <Tooltip placement="bottom" title="chỉnh sửa">
                    <EditFilled className="icon-antd icon-edit" onClick={() => onSelect(item, 'update')} />
                </Tooltip>
            )}

            {deleted && (
                <Tooltip placement="bottom" title="xóa">
                    <DeleteFilled className="icon-antd icon-delete" onClick={() => onSelect(item, 'delete')} />
                </Tooltip>
            )}

            {info && (
                <Tooltip placement="bottom" title="bổ sung thông tin">
                    <InfoCircleFilled onClick={() => onSelect(item, 'info')} className="icon-info" />
                </Tooltip>
            )}

            {view && (
                <Tooltip placement="bottom" title="xem thông tin">
                    <EyeFilled className="icon-antd icon-eye" onClick={() => onSelect(item, 'view')} />
                </Tooltip>
            )}
        </div>
    );
};
