import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useAvailableAtTGE, useVestingContractAddress } from "../hooks/useTokenSale";
import {
    useComputeReleasableAmount,
    useComputeVestingScheduleIdForAddressAndIndex,
    useRelease,
    useVestingScheduleByAddressAndIndex,
    useVestingScheduleCountBeneficiary,
  } from "../hooks/useVesting";
  import { formatEther } from "@ethersproject/units";
  import { BigNumber } from "ethers";
  import { secondsToDhms } from "../utils";

const ClaimToken = props => {
    const [claimButtonDisable, setClaimButtonDisable] = useState<boolean>(false);
    const { account, chainId } = useWeb3React();
    const { data: vestingContractAddress } = useVestingContractAddress(chainId == undefined ? 56 : chainId);
    const vestingSchedule = useVestingScheduleByAddressAndIndex(account as string, vestingContractAddress, props.vestingScheduleIndex);
    const { data: vestingScheduleId } = useComputeVestingScheduleIdForAddressAndIndex(
        account as string,
        vestingContractAddress,
        props.vestingScheduleIndex,
      );
    console.log("Vesting Schedule", vestingSchedule);

    const { data: releasableAmount } = useComputeReleasableAmount(vestingContractAddress, vestingScheduleId);
    
    
    // const { data: tge } = useAvailableAtTGE(chainId == undefined ? 56 : (chainId as number));
    // const claim = useRelease(vestingContractAddress, vestingScheduleId, releasableAmount);


  return (

    <div>
        <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        
                        <div className="ms-2 c-details">
                            <h6 className="mb-0">Sera to be unlocked: {releasableAmount}</h6>  
                            <h6 className="mb-0">Sera Claimable: {props.claimable}</h6>  
                        </div>
                       
                        
                    </div>
                      <div className="badge"> <span>0.000000</span>  
                       <span className="Claimable">{props.claimable}</span> </div>
                   
                </div>
                <div className="">
                    <button type="button" className="btn btn-warning" onClick={props.claim} disabled={props.claimButtonDisable}>
                        {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}
                        Claim
                    </button>
                </div>
                <div className="mt-5">
                  <div className="mt-3"> <span className="text1">Vesting Schedule: 5% TGE then daily linear for 1 year
                  </span> <span className="text2">Claiming date：{props.claimingDate}</span>
                        <span className="text2">Unlocking date：{props.unlockingDate}</span>
                        </div>
                </div>
            </div>


    // <div className="h-60 w-96">
    //   <div className="w-full bg-black h-10 opacity-100 text-white text-xl">
    //     <div className="py-2 px-10"></div>
    //   </div>

    //   <div className="h-60 w-full bg-zinc-800 px-3 py-3 text-slate-300">
    //     <div className="flex flex-row flex-wrap justify-between ">
    //       <div>SERA to be unlocked:</div>
    //       <div className="text-yellow-300"></div>
    //     </div>
    //     <div className="flex flex-row flex-wrap justify-between">
    //       <div>SERA Claimable:</div>
    //       <div className="text-white">{props.claimable}</div>
    //     </div>
    //     <div className="flex flex-wrap justify-end">
    //       <div className="bg-yellow-500 w-16">
    //         <button className="text-white" onClick={props.claim} disabled={props.claimButtonDisable}>
    //           {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}
    //           Claim
    //         </button>
    //       </div>
    //     </div>
    //     <div className="text-left	text-white text-xs py-5">
    //       <div className="mb-2">{props.splMessage}</div>
    //       <div className="text-xs">
    //         Claiming Date:{"   "}
    //         {props.claimingDate}
    //       </div>
    //       <div className="text-xs">
    //         Unlocking Date:{"  "}
    //         {props.unlockingDate}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ClaimToken;