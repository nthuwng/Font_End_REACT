import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUpdateFile,
  updateUserAvatarAPI,
} from "../../services/api.service";

const ViewUserDetail = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } =
    props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  console.log(dataDetail);

  const handleOnChangeFile = (Event) => {
    if (!Event.target.files || Event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = Event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    const resUpload = await handleUpdateFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateAvatar = await updateUserAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        notification.success({
          message: "Update user avatar",
          description: "Cập nhật avatar thành công",
        });
        await loadUser();
      } else {
        notification.error({
          error: "Error update avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        error: "Error update avatar",
        description: JSON.stringify(resUpload.message),
      });
    }
  };
  return (
    <>
      <Drawer
        width={"40vw"}
        title="Basic Drawer"
        onClose={() => {
          setDataDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}>
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p>
            <br />
            <p>Full Name: {dataDetail.fullName}</p>
            <br />
            <p>Email: {dataDetail.email}</p>
            <br />
            <p>Phone: {dataDetail.phone}</p>
            <br />
            <p>Avatar:</p>
            <div
              style={{
                marginTop: "10px",
                height: "100px",
                width: "150px",
                border: "1px solid #ccc",
              }}>
              <img
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
                alt=""
              />
            </div>
            <div>
              <label
                htmlFor="BtnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}>
                Upload Avatar
              </label>
              <input
                type="file"
                id="BtnUpload"
                hidden
                onChange={(Event) => {
                  handleOnChangeFile(Event);
                }}
              />
            </div>
            {preview && (
              <>
                <div
                  style={{
                    marginTop: "10px",
                    height: "100px",
                    width: "150px",
                    border: "1px solid #ccc",
                  }}>
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src={preview}
                    alt=""
                  />
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    handleUpdateUserAvatar();
                  }}>
                  Save
                </Button>
              </>
            )}
          </>
        ) : (
          <p>No data</p>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
