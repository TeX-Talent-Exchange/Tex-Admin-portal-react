import React from 'react'
import { Card, Button, Table, Input, Select } from "antd"
import { Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import DownloadUserList from "../../../pages/AdminPages/Users/DownloadUserList";

const TableList = ({ title, tableData, createLink, createTitle, columns, path, searchList, searchColumn, scroll }) => {

    const Search = Input.Search;
    const Option = Select.Option;

    const onSearch = (value) => {
        searchList(value)
    }
    //const pageSize = 10;
    function handleChange({ value }) {
        searchColumn(value)
    }

    const winleadAdminLink = `${createLink}`
    const adminLink = `/admin/${createLink}`

    return (
        <Card title={title} bordered={false}>
            {/* <Link to={`/admin/${createLink}`} style={{paddingLeft:"0px"}}> */}
            {/* {roleType?.includes(constRoleType.DCA_AGENCY) && tableData?.length > 0 && <div style={{ margin: "0px 0px 15px", backgroundColor: "#dcf4ff", padding: "10px" }}>
                <Badge dot>
                    <NotificationOutlined />
                </Badge>
                <Badge>
                    <span>Your active agent limit is <b>{agencyLimit}</b>. Total enabled agent is <b>{tableData.filter(user => user.enabled).length}</b>.</span>
                </Badge>
            </div>} */}

            <Link to={`${(createTitle === 'Create Campaign' || createTitle === 'Create Alert') ? winleadAdminLink : adminLink}`} style={{ paddingLeft: "0px" }}>
                <Button type="primary" className="ant-btn-md" icon={<PlusOutlined />}>
                    <span>{createTitle}</span>
                </Button>
            </Link>
            {createTitle === 'Create Agency' && <DownloadUserList />}
            {path.includes("users") && <div style={{ display: 'inline' }}>
                <Search
                    onSearch={onSearch}
                    placeholder="Input Search Text"
                    enterButton style={{ width: 200, float: 'right', backgroundColor: '#fff' }}
                />
                <Select
                    style={{ width: 200, float: 'right', marginRight: '8px' }}
                    labelInValue
                    defaultValue={{ key: 'username' }}
                    optionFilterProp="children"
                    onChange={handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="username">User Name</Option>
                    <Option value="given_name">First Name</Option>
                    <Option value="family_name">Last Name</Option>
                    <Option value="email">Email</Option>
                </Select>
            </div>
            }

            <Table dataSource={tableData} columns={columns}
                //pagination={tableData.length > pageSize && { pageSize }} 
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }}
                bordered scroll={scroll} />
        </Card>
    )
}

export default TableList