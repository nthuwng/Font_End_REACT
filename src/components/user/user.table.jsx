import { Space, Table, Tag } from "antd";
import { fetchUserAPI } from "../../services/api.services";
import { useEffect, useState } from "react";
const UserTable = () => {
  const [dataUsers, setdateUsers] = useState([
    {
      _id: "John Brown",
      fullName: 32,
      email: "xyz",
    },
    {
      _id: "Jim Green",
      fullName: 42,
      email: "abc",
    },
  ]);
  useEffect(() => {
    console.log("render 111");
    loadUser();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const loadUser = async () => { 
    const res = await fetchUserAPI();
    setdateUsers(res.data);
  };
  console.log("render 000");
  return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};
export default UserTable;
