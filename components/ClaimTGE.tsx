import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useAlreadyWithdrawn,
  useBalances,
  useInitialTimestamp,
  useTimeperiod,
  useTimestampSet,
  useTransferTimeLockedTokensAfterTimePeriod,
} from "../hooks/useTokenPreTimelock";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import moment from "moment";

const ClaimTGE = props => {
  // WEB3 Connection
  const { account } = useWeb3React();
  const { data: timestampsetForTimelockSeedRound } = useTimestampSet(props.timelockContractAddress);
  const { data: balances } = useBalances(props.timelockContractAddress, account as string);
  const { data: alreadyWithdrawn } = useAlreadyWithdrawn(props.timelockContractAddress, account as string);
  const balancesTobeWithdrawn = balances ? parseFloat(formatEther(BigNumber.from(balances))).toFixed(4) : "0";
  const balancesAlreadyWithdrawn = alreadyWithdrawn
    ? parseFloat(formatEther(BigNumber.from(alreadyWithdrawn))).toFixed(4)
    : "0";
  const { data: startTime } = useInitialTimestamp(props.timelockContractAddress);
  const { data: timePeriod } = useTimeperiod(props.timelockContractAddress);
  const lockStartDate =
    startTime != undefined && parseInt(startTime.toString()) > 0
      ? moment.unix(parseInt(startTime.toString())).format("DD MMM YYYY, hh:mm:ss a")
      : "-";
  const lockEndDate =
    timePeriod != undefined && parseInt(timePeriod.toString()) > 0
      ? moment.unix(parseInt(timePeriod.toString())).format("DD MMM YYYY, hh:mm:ss a")
      : "-";
  const transferTGE = useTransferTimeLockedTokensAfterTimePeriod(
    props.timelockContractAddress,
    props.token,
    account as string,
    balances as BigNumber,
  );

  const handleClaimTGE = async e => {
    e.preventDefault();
    await transferTGE();
  };
  return (
    <div>
      {account && balances && (BigNumber.from(balances).gt(0) || alreadyWithdrawn?.gt(0)) && (
        <div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <h6 className="mb-0">Sera to be withdrawn: </h6>
                <h6 className="mb-0">Sera already withdrawn : </h6>
              </div>
            </div>
            <div className="badge">
              <span> {balancesTobeWithdrawn} </span>
              <span className="Claimable"> {balancesAlreadyWithdrawn} </span>
            </div>
          </div>
          <div className="div-claim_btn mt-2">
            <button
              type="button"
              className="btn btn-warning"
              onClick={e => handleClaimTGE(e)}
              disabled={!timestampsetForTimelockSeedRound || balances?.eq("0")}
            >
              Claim TGE
            </button>
          </div>
          <div className="mt-2">
            <span className="text2">Lock start：{lockStartDate}</span> <br></br>
            <span className="text2">Lock end ：{lockEndDate}</span>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default ClaimTGE;
