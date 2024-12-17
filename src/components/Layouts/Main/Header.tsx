import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const items = [
    { route: "/index", label: "Game", icon: "tabler:device-gamepad-3" },
    { route: "/earn", label: "Earn", icon: "ph:coins" },
    {
      route: "/leaderboard",
      label: "Leaderboard",
      icon: "mingcute:list-check-line",
    },
    { route: "/profile", label: "Profile", icon: "gg:profile" },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location) {
      location.pathname.includes("/example-details");
    }
  }, [location]);

  return (
    <>
      <header className="fixed z-1000 bottom-0 left-0 right-0 flex p-4 gap-x-4 z-50 bg-dark w-full">
        <ul className="flex justify-between gap-x-4 text-white w-full items-center">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                to={item.route}
                className={twMerge(
                  "flex justify-center items-center flex-col",
                  location.pathname.includes(item.route) && "text-primary"
                )}
              >
                <Icon icon={item.icon} width="24" height="24" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}
