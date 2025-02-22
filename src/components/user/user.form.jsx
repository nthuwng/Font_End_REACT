import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.services";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo mới user thành công",
      });
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <div className="user-form" style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table User</h3>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}>
          Create a user
        </Button>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => {
          handleSubmitBtn();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        maskClosable={false}
        okText="CREATE">
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(Event) => {
                setFullName(Event.target.value);
              }}
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={email}
              onChange={(Event) => {
                setEmail(Event.target.value);
              }}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(Event) => {
                setPassword(Event.target.value);
              }}
            />
          </div>
          <div>
            <span>Phone Number</span>
            <Input
              value={phone}
              onChange={(Event) => {
                setPhone(Event.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UserForm;
