import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [dataUsers, setdateUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await fetchUserAPI(current, pageSize);
    if (res.data) {
      setdateUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUsers={dataUsers}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UserPage;
