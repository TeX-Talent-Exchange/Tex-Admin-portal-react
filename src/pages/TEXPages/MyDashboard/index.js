import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Tabs, Select } from "antd";

import Auxiliary from "util/Auxiliary";
import CIPSearch from "../../../widgets/CIPSearch";
import Account from "../../../widgets/Account";
import Subscription from "../../../widgets/Subscription";
import ContactData from "../../../widgets/Contact";
import Billing from "../../../widgets/Billing";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const billingInfo = {};

const Customer360 = () => {
  const [newTabIndex, setNewTabIndex] = useState(0);
  const [panes, setPanes] = useState([{ title: "Dashboard", content: "Content of Tab Pane 1", key: "1" }, { title: "Click on widget", content: "Content of Tab Pane 2", key: "2" },]);
  const [activeKey, setActiveKey] = useState(panes[0].key);
  const subscriptionDetails = useSelector(state => state.subscription.subscriptionDetails);
  const accountDetails = useSelector(state => state.account.accountDetails);
  const contactDetails = useSelector(state => state.contact.contactDetails);
  // const billingDetails = useSelector((state) => state.billing.billingDetails);

  const add = () => {
    const p = panes;
    const a = `newTab${newTabIndex + 1}`;
    p.push({ title: "New Tab", content: "New Tab Pane", key: a });
    setNewTabIndex(newTabIndex + 1);
    setPanes(p);
    setActiveKey(a);
  };

  const remove = (targetKey) => {
    let a = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const p = panes.filter((pane) => pane.key !== targetKey);
    if (lastIndex >= 0 && a === targetKey) {
      a = p[lastIndex].key;
    }
    setPanes(p);
    setActiveKey(a);
  };

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") remove(targetKey);
  };

  return (
    <Auxiliary>
      {/* <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.customer360"/></h2>
                        </Col>
                    </Row> */}
      <Row>
        <Col span={24}>
          <div className="dashboard360">
            <Row className="ant-col-data">
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <CIPSearch />
              </Col>
            </Row>
            <Row className="ant-col-data">
              {/* <Card className="gx-card" title="Customize Trigger">
                                    <div className="gx-mb-3">
                                    <Button onClick={this.add}>ADD</Button>
                                    </div> */}
              
              <Tabs
                hideAdd
                onChange={(activeKey) => onChange(activeKey)}
                activeKey={activeKey}
                type="editable-card"
                onEdit={(targetKey, action) => onEdit(targetKey, action)}
              >
                {panes.map((pane) => (
                  <TabPane tab={pane.title} key={pane.key}>
                    {
                      <Row className="ant-col-data">
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                          {/* <NoOfActiveCases />
                                                        <LongPendingCasesInformation /> */}
                          {/* <AccountInformation />*/}
                          <div onClick={() => add()}>
                            <Account accountInfo={accountDetails} title={"Test"} />
                          </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                          <div onClick={() => add()}>
                            <Subscription
                              SubscriptionInfo={subscriptionDetails}
                            />
                          </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                          <div onClick={() => add()}>
                            <ContactData contactInfo={contactDetails} />
                          </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                          <div onClick={() => add()}>
                            <Billing billingInfo={billingInfo} />
                          </div>
                        </Col>
                      </Row>
                    }
                  </TabPane>
                ))}
              </Tabs>              
              <div id="tab-right-col">
                <div className="icons">
                  <PriceCalculator />
                </div>
                <div className="existing-account">
                  <ExistingAccount />
                </div>
              </div>
              
            </Row>
            <Row className="ant-col-data">
              <Col xl={6} lg={6} md={6} sm={12} xs={24}></Col>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}></Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Auxiliary >
  );
}
const ExistingAccount = () => {
  return (
    <Select placeholder="12345678" size="small">
      <Option value="12345678" selected>12345678</Option>
        <Option value="123456" selected>12345678</Option>
        <Option value="xxxxxxxx">xxxxxxxx</Option>
    </Select>
  );
}

export default Customer360;
