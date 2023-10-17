/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import RoomTypeTable from "./RoomTypeTable";

function RoomType() {
  const [roomtypes, setRoomTypes] = useState([]);
  const [reload, setReload] = useState(false);
  const fetchData = async () => {
    const res = await privateAxios.get(`room-type`);
    if (res && res.data) {
      console.log(res.data);
      setRoomTypes(res.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
      <RoomTypeTable roomtypes={roomtypes} reload={reload} setReload={setReload} />
    </>
  );
}

export default RoomType;
