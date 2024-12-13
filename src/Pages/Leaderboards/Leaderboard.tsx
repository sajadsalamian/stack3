import Table from "../../components/Elements/Table";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";

export default function Leaderboard() {
  const headers = ["name", "score"];
  const data = [
    { name: "Sajad", score: "50" },
    { name: "Saeed", score: "20" },
    { name: "Hossein", score: "100" },
    { name: "Nasran", score: "78" },
  ];
  return (
    <Main>
      <HeadMeta title="Leaderboard" />
      <div className="p-2 w-full text-center">
        <Table headers={headers} data={data} />
      </div>
    </Main>
  );
}
