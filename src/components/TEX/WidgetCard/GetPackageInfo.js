import React from "react";
import { Divider } from "antd";

export const GetPackageInfo = (props) => {
    const { packageInfo } = props;

    return (
        <div className="gx-form-group package-info">
            <Divider>Packages</Divider>
            {packageInfo !== null ? <p>{packageInfo}</p> : <p className="text-center">-</p>}
        </div>
    );
}

