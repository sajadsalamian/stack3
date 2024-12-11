import Main, { HeadMeta } from "../components/Layouts/Main/Main";

export default function Leaderboard() {
  return (
    <Main>
      <HeadMeta title="Leaderboard" />
      <div className="p-2 h-[500px] bg-light w-full text-center flex flex-col items-center justify-center">
        Leaderboard
      </div>
    </Main>
  );
}
