import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import { useEffect, useState } from "react";
import { Toast } from "../components/Layouts/Main/Helper";
import Button from "../components/Elements/Button";
import Main, { HeadMeta } from "../components/Layouts/Main/Main";
import {
  retrieveLaunchParams,
  useLaunchParams,
} from "@telegram-apps/sdk-react";
import { p } from "framer-motion/client";

function Index() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [initDataRaw, setInitDataRaw] = useState();
  const [initData, setInitData] = useState(null);
  const [user, setUser] = useState(null);

  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState("");

  const { ethereum } = new WalletTgSdk({
    injected: true, // default: false
    metaData: {
      name: "UXUY Wallet", // if you want to use a custom name
      icon: "https://uxuy.com/logo.png", // if you want to use a custom icon
    },
  });

  useEffect(() => {
    // console.log("is uyux connect?", ethereum.isConnected());
    try {
      setIsTelegram(true);
      const { initDataRaw, initData } = retrieveLaunchParams();
      setInitData(initData);
      setInitDataRaw(initDataRaw);
      setUser(initData?.user);
    } catch (error) {
      setIsTelegram(false);
      console.log("Not Telegram");
    }
  }, []);

  const ToggleConnection = () => {
    ethereum;
    window.ethereum;
    if (!ethereum.isConnected()) {
      ConnectToWallet();
    } else {
      DisconnectWallet();
    }
  };

  const ConnectToWallet = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    console.log("wallet Conn", accounts[0]);
  };

  const DisconnectWallet = () => {
    ethereum.disconnect();
    console.log("wallet Dc");
    console.log(ethereum.isConnected());
  };

  const SignWallet = async () => {
    const signature = await ethereum.request({
      method: "personal_sign",
      params: ["Hello, All!", account],
    });
    console.log(signature);
    setSignature(signature);
  };

  const ChangeChain = async () => {
    console.log("ChangeChain");
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (switchError) {
      console.log("switchError", switchError);
      // Handle the error
    }
  };

  const SendTransactions = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const transactionParameters = {
        to: "0x5CE90260F6c3cf49e6af276727D476D3193397f6",
        from: accounts[0],
        value: 0.001 * 10 ** 18,
        chainId: "0x38",
      };

      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("Transaction sent:", txHash);
      Toast("success", "You Charge Successfully");
    } catch (error) {
      console.log("Failed to send transaction:", error);
      let message = "error on transaction";
      switch (error.code) {
        case 4001:
          message = "Transaction canceled by user.";
          break;
      }
      Toast("error", message);
    }
  };

  return (
    <Main>
      <HeadMeta title="Welcome to game" />
      <div className="p-2 h-[500px] bg-light w-full text-center flex flex-col items-center justify-center">
        <div className="mb-5">
          is Telegram : {isTelegram ? "true" : "false"}
        </div>
        <div className="mb-5">
          <p>User Details:</p>
          {user ? (
            <div>
              <p>user: {JSON.stringify(user)}</p>
              <p>username : {user.username}</p>
              <p>first name : {user.first_name} - {user.last_name}</p>
              <p>id : {user.id}</p>
              <p>is bot : {user.is_bot}</p>
            </div>
          ) : (
            <p>not Defined</p>
          )}
        </div>
        <Button
          label={ethereum.isConnected() ? "Disconnect" : "Connect"}
          onClick={ToggleConnection}
          className="mb-5"
        />
        {ethereum.isConnected() && (
          <>
            <Button
              label="Sign Message"
              onClick={SignWallet}
              className="mb-5"
            />
            <Button
              label="Change Chain"
              onClick={ChangeChain}
              className="mb-5"
            />
            <Button
              label="Send Transaction"
              onClick={SendTransactions}
              className="mb-5"
            />
          </>
        )}
      </div>
    </Main>
  );
}

export default Index;
