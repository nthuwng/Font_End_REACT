import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { ArrowRightOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);

    const { email, password } = values;
    const res = await loginUserAPI(email, password);
    console.log("res=>>>", res);
    if (res.data) {
      notification.success({
        message: "Login user",
        description: "Đăng nhập thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error login user",
        description: JSON.stringify(res.message),
      });
    }
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
              <Button onClick={() => form.submit()} type="primary">
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
