import React, { useEffect } from 'react'
import { Button } from 'antd';
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDownloadUsersList, clearDownloadUsersList } from "../../../appRedux/actions/Authorization";

const DownloadUserList = (props) => {
    const dispatch = useDispatch();

    const roleId = useSelector(({ auth }) => auth?.authUser?.roleId);
    const currentUser = useSelector(({ auth }) => auth);
    const downloadUsersListData = useSelector((state) => state.authorization.downloadUsersList);

    useEffect(() => {
        if (downloadUsersListData !== '') {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([downloadUsersListData], { type: "text/csv" }));
            a.download = 'User List.csv';
            a.click();

            dispatch(clearDownloadUsersList());
        }
    }, [dispatch, downloadUsersListData]);

    const handleDownloadUserList = () => {
        dispatch(
            fetchDownloadUsersList({
                roleId,
                currentUser
            })
        );
    }

    return (
        <Button
            type="primary"
            size="small"
            icon={<DownloadOutlined />}
            onClick={handleDownloadUserList}
            disabled={false}
        >
            Download All
        </Button>
    );
}

export default DownloadUserList;