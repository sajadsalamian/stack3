import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import gameIcn from "../../../assets/images/menu/game.png";
import gameActIcn from "../../../assets/images/menu/game-selected.png";
import earnIcn from "../../../assets/images/menu/ticket.png";
import earnActIcn from "../../../assets/images/menu/ticket-selected.png";
import leaderIcn from "../../../assets/images/menu/leader.png";
import leaderActIcn from "../../../assets/images/menu/leader-selected.png";
import profileIcn from "../../../assets/images/menu/profile.png";
import profileActIcn from "../../../assets/images/menu/profile-selected.png";

export default function Header() {
  const items = [
    { route: "/index", label: "Game", icon: gameIcn, iconAc: gameActIcn },
    { route: "/earn", label: "Earn", icon: earnIcn, iconAc: earnActIcn },
    {
      route: "/leaderboard",
      label: "Leaderboard",
      icon: leaderIcn,
      iconAc: leaderActIcn,
    },
    {
      route: "/profile",
      label: "Profile",
      icon: profileIcn,
      iconAc: profileActIcn,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location) {
      location.pathname.includes("/example-details");
    }
  }, [location]);

  return (
    <>
      <header className="fixed z-1000 bottom-0 left-0 right-0 flex p-4 gap-x-4 z-50 bg-dark-black border-t border-primary w-full">
        <ul className="grid grid-cols-4 text-center gap-x-1 text-white w-full">
          {items.map((item, index) => (
            <li key={index} className="text-sm flex items-center justify-center">
              <Link to={item.route}>
                <img
                  src={location.pathname.includes(item.route) ? item.iconAc : item.icon}
                  width="58"
                  height="58"
                />
              </Link>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}
