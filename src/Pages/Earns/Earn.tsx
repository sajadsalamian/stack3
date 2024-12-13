import React, { useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../components/Elements/Button";
import { RotatingLines } from "react-loader-spinner";

export default function Earn() {
  const [earns, setEarns] = useState([
    {
      icon: "line-md:twitter-x",
      label: "Follow Official Binance Twitter",
      type: "binanceFollow",
      bLabel: "Follow",
      url: "https://x.com/intent/user?screen_name=binance",
      isDone: true,
      isLoading: false,
    },
    {
      icon: "line-md:twitter-x",
      label: "Follow Official Developer Twitter",
      type: "developerFollow",
      bLabel: "Follow",
      url: "https://x.com/intent/user?screen_name=binance",
      isDone: false,
      isLoading: false,
    },
    {
      icon: "ic:baseline-telegram",
      label: "Join Stack3 Channel",
      type: "developerTelegram",
      bLabel: "Follow",
      url: "https://x.com/intent/user?screen_name=binance",
      isDone: false,
      isLoading: false,
    },
  ]);

  const EarnClick = (item: { icon?: string; label?: string; type?: any }) => {
    console.log("EarnClick", item.type);
    window.open(item.url, "_blank").focus();
    setEarns(
      earns.map((earn) => {
        if (earn.type === item.type) {
          return { ...earn, isLoading: true };
        } else {
          return earn;
        }
      })
    );
    setTimeout(() => {
      setEarns(
        earns.map((earn) => {
          if (earn.type === item.type) {
            return { ...earn, isDone: true, isLoading: false };
          } else {
            return earn;
          }
        })
      );
    }, 5000);
  };

  return (
    <Main>
      <HeadMeta title="Earn more token" />
      <div className=" p-2">
        {earns.map((item, index) => (
          <div
            className="flex gap-x-3 bg-primary py-3 px-4 items-center mb-2"
            key={index}
          >
            <Icon
              icon={item.icon}
              width="20"
              height="20"
              className="text-white"
            />
            <p className="text-white text-[14px]">{item.label}</p>
            <div className="ml-auto">
              {!item.isLoading ? (
                <Button
                  onClick={() => EarnClick(item)}
                  label={!item.isDone ? item.bLabel : "Claimed"}
                  className="bg-white text-primary"
                  disabled={item.isDone}
                />
              ) : (
                <RotatingLines
                  visible={true}
                  height="24"
                  width="24"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperClass="ml-5"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}
