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
    let userInfo1 = JSON.parse(localStorage.getItem("user"));
    let postData = {
      user_id: "" + userInfo1.user_id,
      user_name: userInfo1.user_name,
    };
    axios({
      method: "post",
      url: import.meta.env.VITE_API_URL + "/user",
      data: postData,
    })
      .then((res) => {
        console.log("Axios user fetch res", res);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
        if (err.response) {
          console.log("Fetch user Data Error Response:", err.response);
        }
      });
  }, []);

  useEffect(() => {
    if (user == null || user.user_id == null) {
      return;
    }
    console.log("user", user);
    let avt = user.available_tasks;
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
        switch (element.task_type) {
          case "binance":
            element.icon = "token:binance-smart-chain";
            break;
          case "telegram":
            element.icon = "ic:baseline-telegram";
            break;
          case "uxuy":
            element.icon = "tabler:ux-circle";
            break;
          default:
            element.icon = "line-md:twitter-x";
            break;
        }
      }
    );
    setAvailableTask(avt);

    let dt = user.done_tasks;
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
          switch (element.task_type) {
            case "binance":
              element.icon = "token:binance-smart-chain";
              break;
            case "telegram":
              element.icon = "ic:baseline-telegram";
              break;
            case "uxuy":
              element.icon = "tabler:ux-circle";
              break;
            default:
              element.icon = "line-md:twitter-x";
              break;
          }
        }
      );
    }
    setDoneTask(dt);
  }, [user]);

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
    let postData = { user_id: user.user_id, task_id: item.id };
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
      <h2 className="text-white font-bold text-center my-2 mx-8">
        Complete the below task to get free tokens
      </h2>
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
            <div className="ml-auto flex gap-x-2 items-center">
              {!item.isLoading ? (
                <>
                  <span className="text-gray-600 text-[14px] bg-primary px-2 py-2 rounded-md">
                    +3
                  </span>
                  <Button
                    onClick={() =>
                      item.isClaim ? ClaimTask(item) : EarnClick(item)
                    }
                    label={item.isClaim ? "Claim" : "Start"}
                    className="text-sm"
                  />
                </>
              ) : (
                <RotatingLines
                  visible={true}
                  height="24"
                  width="24"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperClass="ml-5"
                  strokeColor="yellow"
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
              <div className="ml-auto flex gap-x-2">
                <span className="bg-gray-700 text-gray-500 text-[14px] px-2 py-2 rounded-md">
                  0
                </span>
                <Button
                  onClick={() => EarnClick(item)}
                  label="Claimed"
                  className="text-sm"
                  disabled={true}
                />
              </div>
            </div>
          ))}
      </div>
    </Main>
  );
}
