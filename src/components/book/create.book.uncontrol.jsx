import { useState } from "react";
import { createBookAPI, handleUpdateFile } from "../../services/api.service";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from "antd";

const CreateBookUnControl = (props) => {
  const [form] = Form.useForm();
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async (values) => {
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
      const { mainText, author, price, quantity, category } = values;
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
    form.resetFields();
    setIsCreateOpen(false);
    setSelectedFile(null);
    setPreview(null);
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
        form.submit();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText="CREATE">
      <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
        <div>
          <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[
              {
                required: true,
                message: "Tiêu đề không được để trống",
              },
            ]}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[
              {
                required: true,
                message: "Tác giả không được để trống",
              },
            ]}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "Giá tiền không được để trống",
              },
            ]}>
            <InputNumber addonAfter={" đ"} style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Số lượng không được để trống",
              },
            ]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Thể loại"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thể loại",
              },
            ]}>
            <Select
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
          </Form.Item>
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
              style={{ display: "none" }}
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
      </Form>
    </Modal>
  );
};

export default CreateBookUnControl;
