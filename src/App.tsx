import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Elements/Button";
import { Toast } from "./components/Layouts/Main/Helper";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";

function App() {
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState("");

  const { ethereum } = new WalletTgSdk({
    injected: true, // Whether ethereum is injected into the window; if MetaMask is present, it will not be injected.
  });
  ethereum;
  window.ethereum;

  // const { connect, isConnected, disconnect } = useUyuxConnect();
  // useEffect(() => {
  //     if (isConnected) {
  //         console.log("Connected to MetaMask!");
  //     }
  // }, [isConnected]);

  useEffect(() => {
    console.log("is uyux connect?", ethereum.isConnected());
  }, []);

  const ToggleConnection = () => {
    if (!ethereum.isConnected()) {
      ConnectToWallet();
      console.log(signature);
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
    <>
      <div className="p-2 h-[500px] bg-light w-full text-center flex flex-col items-center justify-center">
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
    </>
  );
}

export default App;
