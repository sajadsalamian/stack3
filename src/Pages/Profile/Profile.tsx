import { SetStateAction, useEffect, useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";
import { Toast } from "../../components/Layouts/Main/Helper";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import Input from "../../components/Elements/Input";
import { RotatingLines } from "react-loader-spinner";

export default function Profile() {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState("");
  const [signature, setSignature] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [loadingBuy, setLoadingBuy] = useState(false); // duplicate variable

  useEffect(() => {
    console.log("is uyux metamask?", ethereum.isMetaMask);
    if (ethereum.isConnected()) {
      setAccount(ethereum.selectedAddress);
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { ethereum } = new WalletTgSdk({
    injected: true, // default: false
    metaData: {
      name: "UXUY Wallet", // if you want to use a custom name
      icon: "https://uxuy.com/logo.png", // if you want to use a custom icon
    },
  });

  const ConnectToWallet = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    user.wallet_address = accounts[0];
    localStorage.setItem("user", JSON.stringify(user));
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
    }
  };

  const BuyToken = async () => {
    if (tokenCount < 1) {
      Toast("success", "Please enter number more than 0");
      return;
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const transactionParameters = {
        to: "0xaddbc186a3902392aa6c19908197ba80f654adf9",
        from: accounts[0],
        value: tokenCount * (0.001 * 10 ** 18),
        chainId: "0x38",
      };

      setLoadingBuy(true);
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("Transaction sent:", txHash);
      setLoadingBuy(false);
      Toast("success", "You Charge Successfully");
    } catch (error) {
      console.log("Failed to send transaction:", error);
      let message = "error on transaction";
      switch (error.code) {
        case 4001:
          message = "Transaction canceled by user.";
          break;
      }
      setLoadingBuy(false);
      Toast("error", message);
    }

    user.total_token = Number(user.total_token) + Number(tokenCount);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Main title="Profile">
      <HeadMeta title="Profile" />
      <div className="mb-5 pt-5">
        {user ? (
          <div className="text-center text-gray-200">
            <img
              src={user.photoUrl}
              alt=""
              className="w-12 h-12 rounded-full mx-auto mb-5"
            />
            <p className="mb-2">username : {user.user_name}</p>
            <p className="mb-2">
              first name : {user.firstName} - {user.lastName}
            </p>
            <p>Best Score: {user.score}</p>
            <p>Token: {user.total_token}</p>
          </div>
        ) : (
          <p>not Defined</p>
        )}
      </div>
      <div className="p-2  text-center  overflow-hidden">
        {ethereum.isConnected() ? (
          <>
            {user.wallet_address && (
              <p className="mb-2 text-gray-200">
                Wallet Address:
                {user.wallet_address.substring(0, 4) +
                  "..." +
                  user.wallet_address.substring(
                    account.length - 5,
                    account.length - 1
                  )}
              </p>
            )}
            <div className="mb-10 flex gap-4 justify-center">
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
                label="Disconnect Wallet"
                onClick={DisconnectWallet}
                className="mb-5"
              />
            </div>
            <div className="w-40 mx-auto">
              <Input
                onChange={(e: { target: { value: SetStateAction<number> } }) =>
                  setTokenCount(e.target.value)
                }
                error={undefined}
                label="Number of token"
                value={tokenCount}
                onBlur={undefined}
              />
              {!loadingBuy ? (
                <Button label="Buy Token" onClick={BuyToken} className="mb-5" />
              ) : (
                <div className="flex justify-center items-center">
                  <RotatingLines
                    visible={true}
                    height="24"
                    width="24"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <Button
            label="Connect Wallet"
            onClick={ConnectToWallet}
            className="mb-5"
          />
        )}
      </div>
    </Main>
  );
}
