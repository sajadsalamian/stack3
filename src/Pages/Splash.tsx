import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import splash from "../assets/images/splash.png";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export default function Splash() {
  const [user, setUser] = useState({});
  const [initDataRaw, setInitDataRaw] = useState();
  const [isTelegram, setIsTelegram] = useState(false);
  const [initData, setInitData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = { user_id: 15, user_name: "new Sajad" };

    try {
      setIsTelegram(true);
      const { initDataRaw, initData } = retrieveLaunchParams();
      setInitData(initData);
      setInitDataRaw(initDataRaw);
      setUser(initData?.user);
      userData = {
        user_id: initData?.user.id,
        user_name: initData?.user.username,
      };
    } catch (error) {
      setIsTelegram(false);
      console.log("Not Telegram");
      // setUser({ photoUrl: splash, firstName: "SaJaD", username: "sir_boobby" });
    }

    axios({
      method: "post",
      url: import.meta.env.VITE_API_URL + "/user",
      data: userData,
    })
      .then((res) => {
        console.log("Axios user fetch res", res);
        res.data.photo_url = initData?.user.photoUrl;
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        if (!res.data.is_first_time) {
          navigate("/intro");
        } else {
          navigate("/index");
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
        localStorage.setItem(
          "user",
          JSON.stringify({
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
            photo_url: initData?.user.photoUrl,
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
          })
        );
        // navigate("/index");
      });
  }, []);

  return (
    <div className="w-screen h-screen">
      <img src={splash} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
