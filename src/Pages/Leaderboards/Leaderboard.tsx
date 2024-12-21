import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Elements/Table";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";

export default function Leaderboard() {
  const headers = ["user_name", "score"];
  const [data, setData]: any = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: import.meta.env.VITE_API_URL + "/leaderboard?limit=10",
    })
      .then((res) => {
        console.log("Axios leaderboard fetch res", res.data);
        res.data.forEach((element: { isSelf: boolean; user_id: any; }) => {
          element.isSelf = (element.user_id == user.user_id )?  true : false;
        });
        setData(res.data);
      })
      .catch((err) => {
        console.log("Fetch leaderboard Data Error:", err);
      });
  }, [user]);

  return (
    <Main>
      <HeadMeta title="Leaderboard" />
      <div className="p-2 w-full text-center">
        <Table headers={headers} data={data} />
      </div>
    </Main>
  );
}
