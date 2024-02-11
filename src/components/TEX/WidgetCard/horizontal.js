import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { Col, Row, Empty, Button, Form } from "antd";
import Widget from "../../Widget";
import Auxiliary from "../../../util/Auxiliary";
import { objectKeyFormat } from "../../../util/Helper";
import { unLinkAccount } from "../../../appRedux/actions/UlmUnlinking";

const WidgetCardHorizontal = (props) => {
  const { data, title, widgetClass } = props;
  const dispatch = useDispatch();

  const portalAccountDetails = useSelector(
    (state) => state.portalAccount.portalAccountDetails
  );

  const currentUser = useSelector(({ auth }) => auth);

  const [show, setShow] = useState(false);
  const [isLinked, setLinkState] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const isUnLinked = useSelector((state) => state.ulmUnlinking.isUnLinked);

  useEffect(() => {
      "linkedAccountID" in portalAccountDetails
        ? setLinkState(false)
        : setLinkState(true);
  }, [portalAccountDetails]);

  // dispatch functionality for unLinking account
  const confirmAction = () => {
    const ulmLinkData = {
      account_number: `${portalAccountDetails.linkedAccountID}`,
      puid: `${portalAccountDetails.PUID}`,
      current_user: currentUser,
    };
    dispatch(unLinkAccount(ulmLinkData));
    handleClose();
  };

  const onCancelAction = () => {
    handleClose();
  };
  const username = useSelector((state) => state.auth.authUser.username);
  const unLink = () => {
    handleShow();
  };

  return (
    <Widget
      className="gx-card"
      styleName={`gx-card-full gx-dot-arrow-hover ${widgetClass}`}
      title={title}
    >
      <Auxiliary>
        <Form name="basic" className="gx-signin-form gx-form-row0">
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="gx-form-group border-box">
                <div
                  className="sub-head"
                  style={{ fontWeight: "500", marginBottom: "10px" }}
                >
                  Web Login Details
                </div>
                <div className="gx-form-row0 data-view">
                  {data && !("message" in data) && Object.keys(data).length > 0 ? (
                    Object.keys(data).map((key, i) => (
                      <div className="gx-form-group" key={i}>
                        <label className="ant-col-md-12" name="Key">
                          {objectKeyFormat(key)}
                        </label>
                        <label name="divider"> : </label>
                        <label name="Value">{data[key]}</label>
                      </div>
                    ))
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </div>
              <Form.Item className="gx-text-center">
                <Button
                  type="primary"
                  className="gx-mb-0 ant-btn-md"
                  size="small"
                  htmlType="submit"
                  disabled={isLinked || isUnLinked}
                  onClick={() => unLink()}
                >
                  Unlink Account
                </Button>
              </Form.Item>

              <SweetAlert
                show={show}
                onHide={handleClose}
                warning
                showCancel
                confirmBtnText={"Yes, Unlink it"}
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title={"Are you sure to Unlink the account ?"}
                onConfirm={confirmAction}
                onCancel={onCancelAction}
              ></SweetAlert>
            </Col>
          </Row>
        </Form>
      </Auxiliary>
    </Widget>
  );
};
export default WidgetCardHorizontal;
