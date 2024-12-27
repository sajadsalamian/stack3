import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Elements/Table";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import { RotatingLines } from "react-loader-spinner";

export default function Leaderboard() {
  const headers = ["user_name", "score"];
  const [data, setData]: any = useState([]);
  const [user, setUser] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);

  useEffect(() => {
    setIsLoadingData(true);
    axios({
      method: "get",
      url: import.meta.env.VITE_API_URL + "/leaderboard?limit=10",
    })
      .then((res) => {
        console.log("Axios leaderboard fetch res", res.data);
        res.data.forEach((element: { isSelf: boolean; user_id: any }) => {
          element.isSelf =
            element.user_id && element.user_id == user.user_id ? "1" : "0";
          element.user_name =
            element.user_id && element.user_id == user.user_id
              ? element.user_name + " (YOU)"
              : element.user_name;
        });
        setData(res.data);
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.log("Fetch leaderboard Data Error:", err);
      });
  }, [user]);

  return (
    <Main>
      <HeadMeta title="Leaderboard" />
      <h2 className="text-center my-3 text-white text-2xl uppercase">
        <span className="text-primary">Nitor</span> Leaderboard
      </h2>
      {isLoadingData ? (
        <div className="flex justify-center items-center h-[200px]">
          <RotatingLines
            visible={true}
            width="36"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="yellow"
          />
        </div>
      ) : (
        <div className="p-2 w-full text-center">
          <Table headers={headers} data={data} />
        </div>
      )}
    </Main>
  );
}
