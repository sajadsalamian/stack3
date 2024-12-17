import React, { useEffect, useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../components/Elements/Button";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

export default function Earn() {
  const [user, setUser] = useState({});
  const [availableTask, setAvailableTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);

  // const [earns, setEarns] = useState([
  //   {
  //     icon: "line-md:twitter-x",
  //     label: "Follow Official Binance Twitter",
  //     type: "binanceFollow",
  //     bLabel: "Follow",
  //     url: "https://x.com/intent/user?screen_name=binance",
  //     isDone: true,
  //     isLoading: false,
  //   },
  // ]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
    let avt = JSON.parse(localStorage.getItem("user")).available_tasks;
    avt.forEach(
      (element: { isDone: boolean; isLoading: boolean; icon: string }) => {
        element.isDone = false;
        element.isLoading = false;
        element.icon = "line-md:twitter-x";
      }
    );
    setAvailableTask(avt);

    let dt = JSON.parse(localStorage.getItem("user")).done_tasks;
    dt.forEach(
      (element: { isDone: boolean; isLoading: boolean; icon: string }) => {
        element.isDone = true;
        element.isLoading = false;
        element.icon = "line-md:twitter-x";
      }
    );
    setDoneTask(dt);
  }, []);

  const EarnClick = (item: never) => {
    console.log("EarnClick", item.type);
    window.open(item.url, "_blank").focus();
    setAvailableTask(
      availableTask.map((earn) => {
        if (earn.id === item.id) {
          return { ...earn, isLoading: true };
        } else {
          return earn;
        }
      })
    );

    const taskData = {
      user_id: user.id,
      task_id: item.id,
    };
    axios
      .post(import.meta.env.VITE_API_UR + "task/done", taskData)
      .then((res) => {
        console.log("user fetch res", res);
        const done = availableTask.filter((x) => (x.id = item.id));
        setAvailableTask(
          availableTask.map((earn) => {
            if (earn.id !== item.id) {
              return earn;
            }
          })
        );
        setDoneTask([...doneTask, done[0]]);
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });

    setTimeout(() => {
      const done = availableTask.filter((x) => x.id == item.id);
      const available = availableTask.filter((x) => x.id != item.id);
      setAvailableTask(available);
      setDoneTask([...doneTask, done[0]]);
    }, 2000);
  };

  return (
    <Main>
      <HeadMeta title="Earn more token" />
      <div className=" p-2">
        {availableTask.map((item, index) => (
          <div
            className="flex gap-x-3 bg-gray-200 py-3 px-4 items-center mb-2"
            key={index}
          >
            <Icon
              icon={item.icon}
              width="20"
              height="20"
              className="text-gray-600"
            />
            <p className="text-gray-600 text-[14px]">{item.label}</p>
            <div className="ml-auto">
              {!item.isLoading ? (
                <Button
                  onClick={() => EarnClick(item)}
                  label="Start"
                  className=""
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
        {doneTask.map((item, index) => (
          <div
            className="flex gap-x-3 bg-gray-200 py-3 px-4 items-center mb-2"
            key={index}
          >
            <Icon
              icon={item.icon}
              width="20"
              height="20"
              className="text-gray-600"
            />
            <p className="text-gray-600 text-[14px]">{item.label}</p>
            <div className="ml-auto">
              <Button
                onClick={() => EarnClick(item)}
                label="Claimed"
                className=""
                disabled={true}
              />
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}
