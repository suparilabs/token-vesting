import React from "react";
import Account from "../components/AccountK";
import { useEagerConnect } from "../hooks/useEagerConnect";

const ContainerText = props => {
  const triedToEagerConnect = useEagerConnect();
  // function connect() {
  //   console.log('clicked')
  // }
  // const { account, library } = useWeb3React();

  // const triedToEagerConnect = useEagerConnect();
  // const isConnected = typeof account === "string" && !!library;
  return (
    <div className="h-60 w-96">
      <div className="w-full bg-black h-10 opacity-100 text-white text-xl">
        <div className="py-2 px-10">{props.title_}</div>
      </div>

      <div className="h-60 w-full bg-zinc-800 px-3 py-3 text-slate-300">
        <div className="flex flex-row flex-wrap justify-between ">
          <div>SERA to be unlocked:</div>
          <div className="text-yellow-300">{props.unlocked}</div>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          <div>SERA Claimable:</div>
          <div className="text-white">{props.claimable}</div>
        </div>
        <div className="flex flex-wrap justify-end">
          <div className="bg-yellow-500 w-16">
            <button className="text-white" onClick={props.claim} disabled={props.claimButtonDisable}>
              {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}
              Claim
            </button>
          </div>
        </div>
        <div className="text-left	text-white text-xs py-5">
          <div className="mb-2">{props.splMessage}</div>
          <div className="text-xs">
            Claiming Date:{"   "}
            {props.claimingDate}
          </div>
          <div className="text-xs">
            Unlocking Date:{"  "}
            {props.unlockingDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerText;
