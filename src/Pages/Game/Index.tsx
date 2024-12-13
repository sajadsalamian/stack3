import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import Main, { HeadMeta } from "../../components/Layouts/Main/Main";
import Button from "../../components/Elements/Button";

function Index() {
 

  return (
    <Main>
      <HeadMeta title="Welcome to game" />

    </Main>
  );
}

export default Index;
