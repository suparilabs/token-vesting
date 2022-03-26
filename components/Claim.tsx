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
  useStart,
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
  const { data: startTimeInSeconds } = useStart(props.vestingContractAddress);
  const toBeUnlockedAmount =
    vestingSchedule !== undefined && releasableAmount
      ? BigNumber.from(vestingSchedule[6]).sub(BigNumber.from(vestingSchedule[7])).sub(releasableAmount)
      : BigNumber.from("0");
  const toBeUnlocked =
    vestingSchedule !== undefined && releasableAmount ? parseFloat(formatEther(toBeUnlockedAmount)).toFixed(4) : "0";
  const claimable = releasableAmount ? parseFloat(formatEther(BigNumber.from(releasableAmount))).toFixed(4) : "0";
  const claim = useRelease(props.vestingContractAddress, vestingScheduleId, releasableAmount);
  const { data: timeStampSet } = useSetTimeStamp(props.vestingContractAddress);
  const claimingDate =
    timeStampSet && vestingSchedule != undefined && startTimeInSeconds && startTimeInSeconds != undefined
      ? moment
          .unix(parseInt(vestingSchedule[2]) + parseInt(startTimeInSeconds.toString()))
          .format("DD MMM YYYY, hh:mm:ss a")
      : "-";
  const unlockingDate =
    timeStampSet && vestingSchedule != undefined && startTimeInSeconds != undefined
      ? moment
          .unix(parseInt(vestingSchedule[3]) + parseInt(startTimeInSeconds.toString()))
          .format("DD MMM YYYY, hh:mm:ss a")
      : "-";
  const splMessage = `Vesting Schedule: ${
    vestingSchedule && vestingSchedule[9] ? new BN(vestingSchedule[9]).div("100") : "-"
  }% TGE then daily linear for ${
    vestingSchedule && (vestingSchedule[3] as number) > 0 ? secondsToDhms(vestingSchedule[3] as number) : "-"
  }`;
  return (
    <div>
      {account && releasableAmount && (BigNumber.from(releasableAmount).gt("0") || toBeUnlockedAmount.gt("0")) && (
        <div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <h6 className="mb-0">Sera to be unlocked: </h6>
                <h6 className="mb-0">Sera Claimable: </h6>
              </div>
            </div>
            <div className="badge">
              <span> {toBeUnlocked} </span>
              <span className="Claimable"> {claimable} </span>
            </div>
          </div>
          <div className="div-claim_btn">
            <button
              type="button"
              className="btn btn-warning"
              onClick={claim}
              disabled={!BigNumber.from(releasableAmount).gt(0)}
            >
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
