import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import splash from "../assets/images/splash.png";
import axios from "axios";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    let userData = {
      user_id: "" + 7543953888,
      user_name: "boobby2",
      initial_token: 3,
    };

    try {
      const { initData } = retrieveLaunchParams();
      console.log("initData", initData?.user);
      userData = {
        user_id: "" + initData?.user.id,
        user_name: initData?.user.username,
        initial_token: 3,
      };
    } catch (error) {
      console.log("Not Telegram");
    }

    axios({
      method: "post",
      responseType: "json",
      url: import.meta.env.VITE_API_URL + "/user",
      data: userData,
    })
      .then((res) => {
        console.log("Axios user fetch res", res);
        // res.data.photo_url = initData?.user.photoUrl;
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/intro");
        return JSON.stringify(res.data);
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
        if (err.response) {
          console.log("Fetch user Data Error Response:", err.response);
        }
        let tempUser = JSON.stringify({
          user_id: 11,
          user_name: "hassdasd",
          total_token: 4,
          score: 0,
          wallet_address: "0x0663C2e350e4531CaC63dEa3692Ee45290EDEBfd",
          is_first_time: false,
          done_tasks: [
            {
              id: 3,
              task_link: "https://",
            },
          ],
          // photo_url: initData?.user.photoUrl,
          available_tasks: [
            {
              id: 1,
              task_link: "https://",
            },
            {
              id: 2,
              task_link: "https://",
            },
          ],
        });
        localStorage.setItem("user", tempUser);
        return tempUser;
      });
  }, []);

  return (
    <div className="w-screen h-screen">
      <img src={splash} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
