/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import UserTable from "./UserTable";

function User() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const fetchData = async () => {
    const res = await privateAxios.get(`user`);
    if (res && res.data) {
      console.log(res.data);
      setUsers(res.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
      <UserTable users={users} reload={reload} setReload={setReload} />
    </>
  );
}

export default User;
