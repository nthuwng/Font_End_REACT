import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchUserAPI } from "../services/api.services";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [dataUsers, setdateUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchUserAPI();
    setdateUsers(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable dataUsers={dataUsers} loadUser={loadUser} />
    </div>
  );
};

export default UserPage;
