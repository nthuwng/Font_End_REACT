import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.services";

const UpdateUserModal = (props) => {
  const { loadUser } = props;
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } =
    props;
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    const res = await updateUserAPI(id,fullName,phone);
    if (res.data) {
      notification.success({
        message: "Update a user",
        description: "Cập nhật user thành công",
      });
      setIsModalUpdateOpen(false);
        await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update A User"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText="SAVE">
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <div>
            <span>Id</span>
            <Input value={id} disabled={true} />
          </div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(Event) => {
              setFullName(Event.target.value);
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
  );
};

export default UpdateUserModal;
