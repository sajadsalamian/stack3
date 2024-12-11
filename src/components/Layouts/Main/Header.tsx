import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import React, { useEffect, useRef, useState } from "react";
import { EraseCookie, GetCookie, SetCookie } from "./Helper";
import { Link } from "@inertiajs/react";
import { useSignMessage, useAccount, useConnect, useDisconnect } from "wagmi";
import { recoverMessageAddress } from "viem";

export default function Header() {
    const { address, isConnected, caipAddress, status } = useAppKitAccount();
    const [walletAddress, setWalletAddress] = useState("");
    const { open, close } = useAppKit();

    // const { isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();
    const { disconnect } = useDisconnect();
    const {
        data: signMessageData,
        error: signError,
        isLoading: signIsLoading,
        signMessage,
        variables,
    } = useSignMessage();

    useEffect(() => {
        if (signMessageData) {
            SetCookie("SignatureString", signMessageData, 1);
            const recoveredAddress = recoverMessageAddress({
                message: variables?.message,
                signature: signMessageData,
            });
        }
        if (!GetCookie("SignatureString") && !signMessageData) {
            ShowSignMessage();
        }
    }, [isConnected, signMessageData, variables?.message]);

    useEffect(() => {
        console.log("isConnected::::", address);
        if (isConnected) {
            setWalletAddress(
                address.substring(0, 3) +
                    "..." +
                    address.substring(address.length - 4, address.length)
            );
        } else {
            // EraseCookie("SignatureString");
            console.log("erase Cookoe");
        }
    }, [isConnected, address]);

    const ShowSignMessage = async () => {
        signMessage({
            message: "hello world",
        });

        // await verifyMessage(config, {
        //     address: address,
        //     message: "hello world",
        //     signature:
        //         "0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c",
        // });
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex p-4 gap-x-4 z-50 bg-dark w-full">
                <ul className="flex gap-x-4 text-white w-full items-center">
                    <li>
                        <Link href={route("index")}>Home</Link>
                    </li>
                    <li>
                        <Link href={route("wagmi")}>Wagmi</Link>
                    </li>
                    <li>
                        <Link href={route("uyux")}>UYUX</Link>
                    </li>

                    <li className="ml-auto">
                        <button
                            className="text-white bg-cyan-600 p-2 rounded-md flex"
                            onClick={() => open()}
                        >
                            {isConnected ? walletAddress : "Connect Wallet"}
                        </button>
                    </li>
                </ul>
            </header>
        </>
    );
}
