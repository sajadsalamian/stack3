import splash from "../../assets/images/start-banner.png";
import Button from "../../components/Elements/Button";

export default function Intro() {
  return (
    <div className="w-screen h-screen overflow-y-auto bg-[#0b0b0e]">
      <div className="flex flex-col justify-center items-center pb-10 h-full">
        <div className="grow flex flex-col justify-center items-center">
          <img src={splash} alt="" className="" />
          <p className="text-white text-center px-2 text-2xl">
            Players purchase tokens to join the game. Campaigns start every
            Saturday at 12:00 UTC, and at the end of each cycle, the total token
            revenue is distributed: 1st rank gets 50%, 2nd rank gets 30%, and
            3rd rank gets 20%. Compete, rank up, and earn rewards!
          </p>
        </div>
        <div className="w-full flex justify-center items-center grow-0 px-4">
          <Button
            label="Start"
            className="w-full text-center"
            link="/index"
            type="l"
          />
        </div>
      </div>
    </div>
  );
}
