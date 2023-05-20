
import React from "react";
import { Spin } from "antd"
import "../../Pending.css"

export const LoadingScreen = () => {
    return (
        <div className="pen-loadding">
            <Spin size="large" />
        </div>
    );
};