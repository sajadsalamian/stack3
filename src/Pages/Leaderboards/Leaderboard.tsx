import { initData } from "@telegram-apps/sdk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Elements/Table";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";

export default function Leaderboard() {
  const headers = ["user_name", "score"];
  const [data, setData]: any = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: import.meta.env.VITE_API_URL + "/leaderboard?limit=10",
    })
      .then((res) => {
        console.log("Axios leaderboard fetch res", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Fetch leaderboard Data Error:", err);
      });
  }, []);

  return (
    <Main>
      <HeadMeta title="Leaderboard" />
      <div className="p-2 w-full text-center">
        <Table headers={headers} data={data} />
      </div>
    </Main>
  );
}
