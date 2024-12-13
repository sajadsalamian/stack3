import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="fixed z-1000 bottom-0 left-0 right-0 flex p-4 gap-x-4 z-50 bg-dark w-full">
        <ul className="flex justify-between gap-x-4 text-white w-full items-center">
          <li>
            <Link
              to="/index"
              className="flex justify-center items-center flex-col"
            >
              <Icon icon="tabler:device-gamepad-3" width="24" height="24" />
              Game
            </Link>
          </li>
          <li>
            <Link
              to="/earn"
              className="flex justify-center items-center flex-col"
            >
              <Icon icon="ph:coins" width="24" height="24" />
              Earn
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="flex justify-center items-center flex-col"
            >
              <Icon icon="mingcute:list-check-line" width="24" height="24" />
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex justify-center items-center flex-col"
            >
              <Icon icon="gg:profile" width="24" height="24" />
              Profile
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}
