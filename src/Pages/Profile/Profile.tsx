import { SetStateAction, useEffect, useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";
import { Toast } from "../../components/Layouts/Main/Helper";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import Input from "../../components/Elements/Input";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import empImage from "../../assets/images/user_profile_white.png";
import { div, p } from "framer-motion/client";

export default function Profile() {
  const [user, setUser]: any = useState({});
  const [account, setAccount] = useState("");
  const [, setSignature] = useState("");

  const [tokenCount, setTokenCount] = useState(0);
  const [loadingBuy, setLoadingBuy] = useState(false); // duplicate variable

  useEffect(() => {
    console.log("is uyux metamask?", ethereum.isMetaMask);
    if (ethereum.isConnected()) {
      setAccount(ethereum.selectedAddress);
    }
    setUser(JSON.parse(localStorage.getItem("user")!));
    console.log(JSON.parse(localStorage.getItem("user")!));
  }, []);

  const { ethereum } = new WalletTgSdk({
    injected: true, // default: false
  });

  const ConnectToWallet = async () => {
    window.ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);

    let postData = { user_id: user.user_id, wallet_address: accounts[0] };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_wallet", postData)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
          Toast("s", "Wallet Address Update Successfully.");
          setUser({ ...user, wallet_address: accounts[0] });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, wallet_address: accounts[0] })
          );
        } else {
          Toast("e", res.data[0].message);
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });
  };

  const DisconnectWallet = () => {
    ethereum.disconnect();
    let postData = { user_id: user.user_id, wallet_address: "" };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_wallet", postData)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
          Toast("w", "Wallet Disconnected.");
          setUser({ ...user, wallet_address: "" });
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          Toast("e", res.data[0].message);
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });
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
        params: [{ chainId: "0xcc" }],
      });
    } catch (switchError) {
      console.log("switchError", switchError);
    }
  };

  const BuyToken = async () => {
    if (tokenCount < 1) {
      Toast("w", "Please enter number more than 0");
      return;
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xcc" }],
      });

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const transactionParameters = {
        to: "0xaddbc186a3902392aa6c19908197ba80f654adf9",
        from: accounts[0],
        value: tokenCount * (0.001 * 10 ** 18),
        chainId: "0xcc",
      };

      setLoadingBuy(true);
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction sent:", txHash);

      let postData = {
        user_id: user.user_id,
        token_amount: Number(tokenCount),
        hash: txHash,
      };
      axios
        .post(import.meta.env.VITE_API_URL + "/buy_token", postData)
        .then((res) => {
          console.log(res.data[0]);
          if (!res.data[0].error) {
            Toast("s", "Wallet Address Update Successfully.");
            setUser({ ...user, total_token: user.total_token + tokenCount });
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...user,
                total_token: Number(user.total_token) + Number(tokenCount),
              })
            );
          } else {
            Toast("e", res.data[0].message);
          }
        })
        .catch((err) => {
          console.log("Fetch user Data Error:", err);
        });
      setLoadingBuy(false);
      Toast("success", "You Charge Successfully");

      user.total_token = +user.total_token + +tokenCount;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
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

    let postData = {
      user_id: user.user_id,
      token_amount: Number(tokenCount),
      hash: "",
    };
    axios
      .post(import.meta.env.VITE_API_URL + "/buy_token", postData)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
          Toast("s", "Transaction Successfully.");
          setUser({ ...user, total_token: user.total_token + tokenCount });
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              total_token: +user.total_token + +tokenCount,
            })
          );
        } else {
          Toast("e", res.data[0].message);
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });
  };

  return (
    <Main title="Profile">
      <HeadMeta title="Profile" />
      <div className="mb-5 pt-5">
        <div className="text-center flex flex-col items-center">
          <img
            src={
              user.photoUrl && user.photoUrl.length > 2
                ? user.photoUrl
                : empImage
            }
            alt=""
            className="w-20 h-20 rounded-full mx-auto mb-5 bg-primary p-2"
          />
          <div className="h-20 w-36 bg-primary rounded-tl-full rounded-tr-full mb-2"></div>
          <div className="mb-2 bg-primary w-36 text-2xl rounded-lg">
            {user.user_name}
          </div>
          <div className="grid grid-cols-2 w-36 gap-x-2">
            <div className="bg-primary text-black py-3 rounded-2xl w-full text-center">
              <div>TOKEN</div>
              <div>{user?.total_token}</div>
            </div>
            <div className="bg-primary text-black py-3 rounded w-full text-center">
              <div>SCORE</div>
              <div>{user?.score}</div>
            </div>
          </div>
          <div className="h-20 w-36 bg-primary rounded-bl-full rounded-br-full mt-2"></div>
        </div>
      </div>
      <div className="p-2  text-center  overflow-hidden mb-10">
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
            <div className="mb-10 flex gap-4 justify-center">
              <Button
                label="Disconnect Wallet"
                onClick={DisconnectWallet}
                className="mb-5"
              />
            </div>
          </>
        ) : (
          <div>
            <p className="text-white mb-1 uppercase">Please connect wallet to buy tokens.</p>
            <Button
              label="Connect Wallet"
              onClick={ConnectToWallet}
              className="mb-5"
            />
          </div>
        )}
      </div>
    </Main>
  );
}
