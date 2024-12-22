import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import gameIcn from "../../../assets/images/menu/game.svg";
import gameActIcn from "../../../assets/images/menu/game-selected.svg";
import earnIcn from "../../../assets/images/menu/ticket.svg";
import earnActIcn from "../../../assets/images/menu/ticket-selected.svg";
import leaderIcn from "../../../assets/images/menu/leader.svg";
import leaderActIcn from "../../../assets/images/menu/leader-selected.svg";
import profileIcn from "../../../assets/images/menu/profile.svg";
import profileActIcn from "../../../assets/images/menu/profile-selected.svg";

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
            <li key={index} className="text-sm">
              <Link to={item.route}>
                {/* <item.icon /> */}
                {location.pathname.includes(item.route) ? (
                  <img
                    src={item.iconAc}
                    alt={item.label}
                    width="34"
                    height="34"
                  />
                ) : (
                  <img
                    src={item.icon}
                    alt={item.label}
                    width="34"
                    height="34"
                  />
                )}
                {/* <Icon icon={item.icon} width="24" height="24" /> */}
                {/* {item.label} */}
              </Link>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}
