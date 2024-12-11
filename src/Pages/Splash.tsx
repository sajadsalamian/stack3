import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/index");
    }, 2000);
  }, []);

  return (
    <div className="w-screen h-screen">
      <img
        src="/public/images/splash.jpg"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
