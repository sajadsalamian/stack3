import { useEffect, useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../components/Elements/Button";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

export default function Earn() {
  const [user, setUser] = useState({});
  const [availableTask, setAvailableTask]: any[] = useState([]);
  const [doneTask, setDoneTask]: any[] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
    console.log(JSON.parse(localStorage.getItem("user")!));
    let avt = JSON.parse(localStorage.getItem("user")!).available_tasks;
    avt.forEach(
      (element: {
        isDone: boolean;
        isLoading: boolean;
        icon: string;
        isClaim: boolean;
      }) => {
        element.isDone = false;
        element.isClaim = false;
        element.isLoading = false;
        element.icon = "line-md:twitter-x";
      }
    );
    setAvailableTask(avt);

    let dt = JSON.parse(localStorage.getItem("user")!).done_tasks;
    if (dt != null) {
      dt.forEach(
        (element: {
          isDone: boolean;
          isLoading: boolean;
          icon: string;
          isClaim: boolean;
        }) => {
          element.isDone = true;
          element.isLoading = false;
          element.isClaim = false;
          element.icon = "line-md:twitter-x";
        }
      );
    }
    setDoneTask(dt);
  }, []);

  const EarnClick = (item: any) => {
    !item.isClaim ? OpenUrl(item) : ClaimTask();
  };

  const OpenUrl = (item: any) => {
    console.log("EarnClick", item.type);
    try {
      window.open(item.task_link, "_blank").focus();
    } catch (err) {}

    setAvailableTask(
      availableTask.map((task: { id: any }) => {
        if (task.id === item.id) {
          return { ...task, isLoading: true };
        }
        return task;
      })
    );
    setTimeout(() => {
      setAvailableTask(
        availableTask.map((task: { id: any }) => {
          if (task.id === item.id) {
            return { ...task, isLoading: false, isClaim: true };
          }
          return task;
        })
      );
    }, 5000);
  };

  const ClaimTask = (item: any) => {
    console.log("claim Task");
    let postData = { user_id: 11, task_id: item.id };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_task", postData)
      .then((res) => {
        console.log("!res.data[0]", res.data[0]);
        if (!res.data[0].error) {
          const done = availableTask.filter((x: any) => x.id == item.id);
          const available = availableTask.filter((x: any) => x.id != item.id);
          setAvailableTask(available);
          setDoneTask([...doneTask, done[0]]);
          let userInfo = {
            ...user,
            available_tasks: available,
            done_tasks: [...doneTask, done[0]],
          };
          setUser(userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });
  };

  return (
    <Main>
      <HeadMeta title="Earn more token" />
      <div className=" p-2">
        {availableTask.map((item: any, index: number) => (
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
            <p className="text-gray-600 text-[14px]">{item.title}</p>
            <div className="ml-auto">
              {!item.isLoading ? (
                <Button
                  onClick={() =>
                    item.isClaim ? ClaimTask(item) : EarnClick(item)
                  }
                  label={item.isClaim ? "Claim" : "Start"}
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
        {doneTask != null &&
          doneTask.map((item: any, index: number) => (
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
              <p className="text-gray-600 text-[14px]">{item.title}</p>
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
