import splash from "../../assets/images/start-banner.png";
import Button from "../../components/Elements/Button";

export default function Intro() {
  return (
    <div className="w-screen h-screen overflow-y-auto bg-[#0b0b0e]">
      <div className="flex flex-col justify-center items-center pb-10 h-full">
        <div className="grow flex flex-col justify-center items-center">
          <img src={splash} alt="" className="" />
          <p className="text-white text-center px-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus,
            consequuntur. Natus porro voluptas quas, debitis reprehenderit ullam
            tenetur similique odio eos, ad in aspernatur obcaecati perferendis
            delectus veniam, vitae asperiores.
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
