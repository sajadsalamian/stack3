import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex p-4 gap-x-4 z-50 bg-dark w-full">
        <ul className="flex gap-x-4 text-white w-full items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">leaderboard</Link>
          </li>

          <li className="ml-auto"></li>
        </ul>
      </header>
    </>
  );
}
