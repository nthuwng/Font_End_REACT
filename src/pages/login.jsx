import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const res = await loginUserAPI(email, password);
    if (res.data) {
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Error login user",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
  };
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}>
          <legend>Đăng nhập</legend>
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            style={{ margin: "20px" }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}>
              <Input.Password />
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Button
                onClick={() => form.submit()}
                type="primary"
                loading={loading}>
                Login
              </Button>
              <Link to={"/"}>
                Go to Home <ArrowRightOutlined />{" "}
              </Link>
            </div>
            <Divider />
            <div>
              Chưa có tài khoản <Link to={"/register"}>Đăng kí tại đây</Link>
            </div>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
