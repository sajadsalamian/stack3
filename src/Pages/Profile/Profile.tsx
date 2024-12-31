import { SetStateAction, useEffect, useState } from "react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";
import { Toast } from "../../components/Layouts/Main/Helper";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import Input from "../../components/Elements/Input";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Profile() {
  const [user, setUser]: any = useState({});
  const [account, setAccount] = useState("");
  const [loadUser, setLoadUser] = useState(false);

  const [tokenCount, setTokenCount] = useState(0);
  const [loadingBuy, setLoadingBuy] = useState(false); // duplicate variable

  useEffect(() => {
    console.log("is uyux metamask?", ethereum.isMetaMask);
    if (ethereum.isConnected()) {
      setAccount(ethereum.selectedAddress);
    }
    FetchUser();
  }, []);

  useEffect(() => {
    console.log("user load");
    if (user.user_id != null) {
      setLoadUser(true);
    }
  }, [user]);

  const FetchUser = () => {
    let userInfo1 = JSON.parse(localStorage.getItem("user"));
    let postData = {
      user_id: "" + userInfo1.user_id,
      user_name: userInfo1.user_name,
    };
    axios({
      method: "post",
      url: import.meta.env.VITE_API_URL + "/user",
      data: postData,
    })
      .then((res) => {
        console.log("Axios user fetch res", res);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
        if (err.response) {
          console.log("Fetch user Data Error Response:", err.response);
        }
      });
  };

  const { ethereum } = new WalletTgSdk({
    injected: true, // default: false
  });

  const ConnectToWallet = async () => {
    window.ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    SignWallet();

    let postData = { user_id: user.user_id, wallet_address: accounts[0] };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_wallet", postData)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
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

  const SignWallet = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xcc" }],
      });

      const signature = await ethereum.request({
        method: "personal_sign",
        params: ["Welcome to NITRO W3!", accounts[0]],
      });
      console.log(signature);

      let postData = { user_id: user.user_id, sign: signature };
      axios
        .post(import.meta.env.VITE_API_URL + "/submit_sign", postData)
        .then((res) => {
          console.log(res.data[0]);
          if (!res.data[0].error) {
            setUser({ ...user, sign: signature });
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, sign: signature })
            );
          } else {
            Toast("e", res.data[0].message);
          }
        })
        .catch((err) => {
          console.log("Fetch user Data Error:", err);
        });
    } catch (error: any) {
      console.log("Failed to send transaction:", error);
      let message = "error on Sign";
      switch (error.code) {
        case 4001:
          message = "Sign canceled by user.";
          break;
      }
      Toast("error", message);
    }
  };

  const DisconnectWallet = () => {
    ethereum.disconnect();
    let postData = { user_id: user.user_id, wallet_address: "" };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_wallet", postData)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
          setUser({ ...user, wallet_address: "" });
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          Toast("e", res.data[0].message);
        }
      })
      .catch((err) => {
        console.log("Fetch user Data Error:", err);
      });

    let postData1 = { user_id: user.user_id, sign: "" };
    axios
      .post(import.meta.env.VITE_API_URL + "/submit_sign", postData1)
      .then((res) => {
        console.log(res.data[0]);
        if (!res.data[0].error) {
          setUser({ ...user, sign: null });
          localStorage.setItem("user", JSON.stringify({ ...user, sign: null }));
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

  const BuyToken = async () => {
    if (tokenCount < 1) {
      Toast("w", "Please enter number more than 0");
      return;
    }
    if (user.sign == null) {
      SignWallet();
      return;
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xcc" }],
      });

      const accounts = await ethereum.request({ method: "eth_accounts" });

      // let ABI: [
      //   {
      //     type: "constructor";
      //     inputs: [];
      //     stateMutability: "nonpayable";
      //   },
      //   {
      //     type: "function";
      //     name: "buyGameToken";
      //     inputs: [];
      //     outputs: [];
      //     stateMutability: "payable";
      //   },
      //   {
      //     type: "function";
      //     name: "deployer";
      //     inputs: [];
      //     outputs: [
      //       {
      //         name: "";
      //         type: "address";
      //         internalType: "address";
      //       }
      //     ];
      //     stateMutability: "view";
      //   }
      // ];

      // let gasPrice = await ethereum.request({
      //   method: "eth_gasPrice",
      //   params: [],
      // });

      const transactionParameters = {
        chainId: "0xcc",
        // to: "0xaDDBc186a3902392aa6c19908197BA80F654Adf9",
        to: "0x2862F52E80A1dD47e479A303caB4E2b9eF201aE8",
        // nonce: '0x00',
        from: accounts[0],
        // gas: "0x8",
        // gasPrice: gasPrice,
        value: tokenCount * (0.0001 * 10 ** 18),
        data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
        // data: "0xa9059cbb00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001",

        // data: "0xed60ade600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001",
      };

      // {
      //   "chainId": 57073,
      //   "data": "0xd0e30db0",
      //   "from": "0x5ce90260f6c3cf49e6af276727d476d3193397f6",
      //   "gas": "0x10980",
      //   "gasPrice": "0x1250ae",
      //   "nonce": "0x0",
      //   "to": "0x4200000000000000000000000000000000000006",
      //   "value": "0x5af3107a4000"
      // }

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
          } else {
            Toast("e", res.data[0].message);
          }
        })
        .catch((err) => {
          console.log("Fetch user Data Error:", err);
        });
      setLoadingBuy(false);
      Toast("success", "Tokens Added to Your Profile.");
      FetchUser();
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
  };

  return (
    <Main title="Profile">
      <HeadMeta title="Profile" />
      <div className="mb-5 pt-5">
        <div className="text-center flex flex-col items-center mt-10">
          <div className="h-20 w-36 bg-primary rounded-tl-full rounded-tr-full mb-2 flex justify-center items-center">
            <Icon icon="icon-park-outline:game-ps" width="32" height="32" />
          </div>
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
          <div className="h-20 w-36 bg-primary rounded-bl-full rounded-br-full mt-2 flex justify-center items-center">
            <Icon icon="icon-park-outline:game-ps" width="32" height="32" />
          </div>
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

            {loadUser && (
              <div className="w-40 mx-auto">
                {user.sign != null && user.sign.length > 10 ? (
                  <>
                    <Input
                      onChange={(e: {
                        target: { value: SetStateAction<number> };
                      }) => setTokenCount(e.target.value)}
                      type="number"
                      error={undefined}
                      label="Number of token"
                      value={tokenCount}
                      onBlur={undefined}
                    />
                    {!loadingBuy ? (
                      <Button
                        label="Buy Token"
                        onClick={BuyToken}
                        className="mb-5"
                      />
                    ) : (
                      <div className="flex justify-center items-center">
                        <RotatingLines
                          visible={true}
                          height="24"
                          width="24"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          strokeColor="yellow"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Button label="Sign" onClick={SignWallet} className="mb-5" />
                )}
              </div>
            )}
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
            <p className="text-white mb-2 uppercase">
              Please connect wallet to buy tokens.
            </p>
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
