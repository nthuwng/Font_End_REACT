import { Button, Input } from "antd";
const UserForm = () => {
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Full Name</span>
          <Input />
        </div>
        <div>
          <span>Email</span>
          <Input />
        </div>
        <div>
          <span>Password</span>
          <Input.Password />
        </div>
        <div>
          <span>Phone Number</span>
          <Input />
        </div>
        <div>
          <Button type="primary">Create a user</Button>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
