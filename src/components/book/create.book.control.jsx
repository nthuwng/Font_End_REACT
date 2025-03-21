import { useState } from "react";
import { createBookAPI, handleUpdateFile } from "../../services/api.service";
import { Button, Input, InputNumber, Modal, Select, notification } from "antd";

const CreateBookControl = (props) => {
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }

    //step 1: upload file
    const resUpload = await handleUpdateFile(selectedFile, "book");
    if (resUpload.data) {
      //success
      const newThumbnail = resUpload.data.fileUploaded;
      //step 2: create book
      const resBook = await createBookAPI(
        newThumbnail,
        mainText,
        author,
        price,
        quantity,
        category
      );

      if (resBook.data) {
        resetAndCloseModal();
        await loadBook();
        notification.success({
          message: "Create book",
          description: "Tạo mới book thành công",
        });
      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(resBook.message),
        });
      }
    } else {
      //failed
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsCreateOpen(false);
    setSelectedFile(null);
    setPreview(null);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
  };

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

  return (
    <Modal
      title="Create Book"
      open={isCreateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText="CREATE">
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Tiêu đề</span>
          <Input
            value={mainText}
            onChange={(Event) => {
              setMainText(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Tác giả</span>
          <Input
            value={author}
            onChange={(Event) => {
              setAuthor(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Giá tiền</span>
          <InputNumber
            style={{ width: "100%" }}
            addonAfter={" đ"}
            value={price}
            onChange={(event) => {
              setPrice(event);
            }}
          />
        </div>
        <div>
          <div>Số lượng</div>
          <InputNumber
            style={{ width: "100%" }}
            value={quantity}
            onChange={(event) => {
              setQuantity(event);
            }}
          />
        </div>

        <div>
          <span>Thể loại</span>
          <Select
            style={{ width: "100%" }}
            value={category}
            onChange={(value) => {
              setCategory(value);
            }}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </div>
        <div>
          <span>Ảnh thumbnail</span>
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
              onClick={(event) => {
                event.target.value = null;
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
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateBookControl;
