import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";
import GamePic from "../../assets/images/game.jpg";
import { useEffect, useState } from "react";
import { Toast } from "../../components/Layouts/Main/Helper";
import { useNavigate } from "react-router-dom";

function Index() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, []);
  const navigate = useNavigate();

  const PlayGame = () => {
    if (user.total_token < 1) {
      Toast("error", "You don't have enough token to play game");
      return;
    }
    navigate("/game/play");
  };

  return (
    <Main>
      <HeadMeta title="Welcome to game" />
      <div className="p-2">
        <div className="p-2">
          <img
            src={GamePic}
            alt=""
            className="max-w-full w-auto h-auto rounded-full"
          />
        </div>
        <div className="fixed bottom-24 left-4 right-4 flex justify-center items-center">
          <Button
            label={`Play Now (${user.total_token})`}
            className=" w-full"
            onClick={PlayGame}
          />
        </div>
      </div>
    </Main>
  );
}

export default Index;
