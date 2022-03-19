import React from "react";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import BN from "bignumber.js";
import {
  useComputeReleasableAmount,
  useComputeVestingScheduleIdForAddressAndIndex,
  useRelease,
  useVestingScheduleByAddressAndIndex,
  useSetTimeStamp,
} from "../hooks/useTokenPreVesting";
import { secondsToDhms } from "../utils";

const Claim = props => {
  // WEB3 Connection
  const { account } = useWeb3React();
  // Setting up variables to fetch details from hooks
  const vestingSchedule = useVestingScheduleByAddressAndIndex(
    account as string,
    props.vestingContractAddress,
    props.vestingScheduleIndex,
  );
  const { data: vestingScheduleId } = useComputeVestingScheduleIdForAddressAndIndex(
    account as string,
    props.vestingContractAddress,
    props.vestingScheduleIndex,
  );
  const { data: releasableAmount } = useComputeReleasableAmount(props.vestingContractAddress, vestingScheduleId);
  const unlocked =
    vestingSchedule !== undefined && releasableAmount
      ? parseFloat(
          formatEther(BigNumber.from(vestingSchedule[6]).sub(BigNumber.from(vestingSchedule[7])).sub(releasableAmount)),
        ).toFixed(4)
      : "0";
  const claimable = releasableAmount ? parseFloat(formatEther(BigNumber.from(releasableAmount))).toFixed(4) : "0";
  const claim = useRelease(props.vestingContractAddress, vestingScheduleId, releasableAmount);

  const timeStampSet = useSetTimeStamp(props.vestingContractAddress);
  const claimingDate =
    timeStampSet && timeStampSet.data && vestingSchedule != undefined
      ? moment.unix(vestingSchedule[2] * 1000).format("DD MMM YYYY")
      : "-";
  const unlockingDate =
    timeStampSet && timeStampSet.data && vestingSchedule != undefined
      ? moment.unix(parseInt(vestingSchedule[4]) + parseInt(vestingSchedule[3]) * 1000).format("DD MMM YYYY")
      : "-";
  const splMessage = `Vesting Schedule: ${
    vestingSchedule && vestingSchedule[9] ? new BN(vestingSchedule[9]).div("100") : "-"
  }% TGE then daily linear for ${
    vestingSchedule && (vestingSchedule[4] as number) > 0 ? secondsToDhms(vestingSchedule[4] as number) : "-"
  }`;
  return (
    <div>
      {account && (
        <div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <h6 className="mb-0">Sera to be unlocked: </h6>
                <h6 className="mb-0">Sera Claimable: </h6>
              </div>
            </div>
            <div className="badge">
              <span> {unlocked} </span>
              <span className="Claimable"> {claimable} </span>
            </div>
          </div>
          <div className="div-claim_btn">
            <button type="button" className="btn btn-warning" onClick={claim} disabled={props.claimButtonDisable}>
              Claim
            </button>
          </div>
          <div className="mt-5">
            <div className="mt-3">
              {" "}
              <span className="text1">{splMessage}</span>
              <br></br>
              <span className="text2">Claiming date：{claimingDate}</span> <br></br>
              <span className="text2">Unlocking date：{unlockingDate}</span>
            </div>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default Claim;
