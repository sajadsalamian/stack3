import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";
import GamePic from "../../assets/images/game.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, []);

  const PlayGame = () => {
    navigate("/game/play");
  };

  return (
    <Main>
      <HeadMeta title="Welcome to game" />
      <div className="p-2">
        <div className="p-2">
          {user ? (
            <div className="text-center text-gray-200">
              {/* <img
                src={
                  user.photoUrl && user.photoUrl.length > 2
                    ? user.photoUrl
                    : empImage
                }
                alt=""
                className="w-12 h-12 rounded-full mx-auto mb-5"
              /> */}
              {/* <p className="mb-2">username : {user.user_name}</p> */}
              {/* <p className="mb-2">
                first name : {user.firstName} - {user.lastName}
              </p> */}
              <p>Weekly Best Score: {user.score}</p>
              <p>Token: {user.total_token}</p>
            </div>
          ) : (
            <p>not Defined</p>
          )}
          <img
            src={GamePic}
            alt=""
            className="max-w-full w-auto h-auto rounded-full"
          />
        </div>
        <div className="fixed bottom-24 left-4 right-4 flex justify-center items-center">
          <Button
            label={`Play Now`}
            className=" w-full"
            onClick={PlayGame}
          />
        </div>
      </div>
    </Main>
  );
}

export default Index;
