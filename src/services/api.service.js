import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const fetchUserAPI = async (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const updateUserAPI = async (id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};
const deleteUserAPI = async (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

const handleUpdateFile = async (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};
const updateUserAvatarAPI = async (avatar, id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    avatar: avatar,
    _id: id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};
export {
  createUserAPI,
  updateUserAPI,
  fetchUserAPI,
  deleteUserAPI,
  handleUpdateFile,
  updateUserAvatarAPI,
};
