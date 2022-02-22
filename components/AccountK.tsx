/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
// import { useVestingScheduleBeneficiary } from "../hooks/useVesting";
// import { useTokenBalance } from "../hooks/useTokenBalance";
// import { TokenAmount } from "@uniswap/sdk";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const AccountK = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, account, setError } = useWeb3React();
  const { isMetaMaskInstalled, isWeb3Available, startOnboarding, stopOnboarding } = useMetaMaskOnboarding();
  const [connecting, setConnecting] = useState(false);
  //   const {data} = useTokenBalance(account,true);
  //   const {data: claimable} = useVestingScheduleBeneficiary(account as string);
  //   console.log("SERA:", (data as any));
  //   console.log("Claimable:", (claimable as any));

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch(error => {
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? <button type="button" className="btn btn-warning">Connect</button> : "Connect to Wallet"}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }

  return (
   
      <button type="button" className="btn btn-warning"/*onClick={(e) => handleClick(e)}*/>Claim</button>
    
  );
};

export default AccountK;
