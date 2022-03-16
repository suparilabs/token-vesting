import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import BN from "bignumber.js";
import { useStartSale, useEndSale } from "../hooks/useTokenPreSale";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { addresses, desiredChain } from "../constants";
import { toast } from "react-toastify";
import { useCreateBulkVestingSchedule } from "../hooks/useTokenPreVesting";
import { useBulkDepositTokens } from "../hooks/useTokenPreTimelock";

function Dashboard():JSX.Element {
  const { chainId } = useWeb3React();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<any>();
  const [availableTge, setAvailableTge] = React.useState<string>("0");
  const [duration, setDuration] = React.useState<string>("0");
  const [round, setRound] = React.useState<string>();
  //hooks for seed round
  const [beneficiaries, setBeneficiaries] = React.useState<any>([]);
  const [totalNonVestingAmt, setTotalNonVestingAmt] = React.useState<string>("");

  const [totalVestingAmt, setTotalVestingAmt] = React.useState<any>("");
  const [nonVestingAmt, setNonVestingAmt] = React.useState<any>();
  const [vestingAmt, setVestingAmt] = React.useState<any>([]);
  const [durations, setDurations] = React.useState<any>([]);
  const [revocables, setRevocables] = React.useState<any>([]);
  const [slice, setSlice] = React.useState<any>([]);
  //start and end sale
  const handleStartSale = useStartSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const handleEndSale = useEndSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  //FOR SEED ROUND
  const sendTokenToPreTimeLockForSeed = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].SEED_PRE_TIME_LOCK,
    totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const sendTokenToPreVestingForSeed = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_VESTING
      : addresses[desiredChain.chainId].SEED_PRE_VESTING,
    totalVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const createBulkVestingScheduleForSeed = useCreateBulkVestingSchedule(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_VESTING
      : addresses[desiredChain.chainId].SEED_PRE_VESTING,
    beneficiaries,
    slice,
    durations,
    revocables,
    vestingAmt,
  );
  const createBulkDepositForSeed = useBulkDepositTokens(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].SEED_PRE_TIME_LOCK,
    beneficiaries,
    nonVestingAmt,
  );
  //FOR PRIVATE ROUND
  const sendTokenToPreTimeLockForPrivateSale = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK,
    totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const sendTokenToPreVestingForPrivateSale = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_VESTING
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_VESTING,
    totalVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const createBulkVestingScheduleForPrivateSale = useCreateBulkVestingSchedule(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_VESTING
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_VESTING,
    beneficiaries,
    slice,
    durations,
    revocables,
    vestingAmt,
  );
  const createBulkDepositForPrivateSale = useBulkDepositTokens(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK,
    beneficiaries,
    nonVestingAmt,
  );

  //web3
  const handleSendTGETokensNow = async e => {
    e.preventDefault();
    if (chainId !== undefined) {
      if (round == "seed") {
        await handleSeedRound();
      } else if (round == "private") {
        await handlePrivateRound();
      } else {
        console.log("ERROR: PLEASE SELECT A ROUND IN THE FORM");
      }
    }
  };

  const notifyTransfer = async (promiseObj, recipientContractName) => {
    await toast.promise(promiseObj, {
      pending: `Sending $SERA -> ${recipientContractName}`,
      success: `Sent $SERA -> ${recipientContractName}👌`,
      error: `Failed sending $SERA -> ${recipientContractName} 🤯"`,
    });
  };

  const notifyBulkDepositTokens = async (promiseObj, roundName) => {
    await toast.promise(promiseObj, {
      pending: `Depositing tokens to pre time lock for ${roundName} round`,
      success: `Deposited tokens for pre time lock for ${roundName} round👌`,
      error: `Failed to deposit tokens for ${roundName} round 🤯"`,
    });
  };

  const notifyBulkVestingSchedule = async (promiseObj, roundName) => {
    await toast.promise(promiseObj, {
      pending: `Creating vesting schedule for ${roundName} round`,
      success: `Created vesting schedule for ${roundName} round👌`,
      error: `Failed to create vesting schedule for ${roundName} round 🤯"`,
    });
  };

  const handleSeedRound = async () => {
    // transfer tokens to pre time lock
    const sendTokenToPreTimeLockForSeedTx = await sendTokenToPreTimeLockForSeed();
    await notifyTransfer(sendTokenToPreTimeLockForSeedTx.wait(1), "Seed TokenPreTimeLock");

    // create bulk deposit transaction
    const bulkDepositForSeedTx = await createBulkDepositForSeed();
    await notifyBulkDepositTokens(bulkDepositForSeedTx.wait(1), "Seed");

    // transfer tokens to pre vesting
    const sendTokenToPreVestingForSeedTX = await sendTokenToPreVestingForSeed();
    await notifyTransfer(sendTokenToPreVestingForSeedTX.wait(1), "Seed TokenPreVesting");

    // create bulk vesting schedule
    const vestingScheduleForSeedTx = await createBulkVestingScheduleForSeed();
    await notifyBulkVestingSchedule(vestingScheduleForSeedTx.wait(1), "Seed");
  };

  const handlePrivateRound = async () => {
    // transfer tokens to pre time lock
    const sendTokenToPreTimeLockForPrivateSaleTx = await sendTokenToPreTimeLockForPrivateSale();
    await notifyTransfer(sendTokenToPreTimeLockForPrivateSaleTx.wait(1), "PrivateSale TokenPreTimeLock");

    // create bulk deposit transaction
    const bulkDepositForPrivateSaleTx = await createBulkDepositForPrivateSale();
    await notifyBulkDepositTokens(bulkDepositForPrivateSaleTx.wait(1), "PrivateSale");

    // transfer tokens to pre vesting
    const sendTokenToPreVestingForPrivateSaleTX = await sendTokenToPreVestingForPrivateSale();
    await notifyTransfer(sendTokenToPreVestingForPrivateSaleTX.wait(1), "PrivateSale TokenPreVesting");

    // create bulk vesting schedule
    const vestingScheduleForPrivateSaleTx = await createBulkVestingScheduleForPrivateSale();
    await notifyBulkVestingSchedule(vestingScheduleForPrivateSaleTx.wait(1), "PrivateSale");
  };

  const handleChange = e => {
    setRound(e.target.value);
  };

  const parseCSV = (data: any) => {
    const beneficiariesArr = data.map(d => d.beneficiary);
    setBeneficiaries(beneficiariesArr);
    const amountsArr = Object.values(data.map(d => BigNumber.from(d.amount).mul(BigNumber.from("10").pow("18"))));
    const nonVestingAmountsArr = Object.values(
      amountsArr.map(x =>
        BigNumber.from(x)
          .mul(BigNumber.from(new BN(availableTge.toString()).multipliedBy("100").toString()))
          .div("10000"),
      ),
    );
    setNonVestingAmt(nonVestingAmountsArr);
    const vestingAmountsArr = Object.values(amountsArr.map((x, i) => BigNumber.from(x).sub(nonVestingAmountsArr[i])));
    setVestingAmt(vestingAmountsArr);
    let nonVestingAmountTotal: BigNumber = BigNumber.from(0);
    let vestingAmountTotal: BigNumber = BigNumber.from(0);
    for (let i = 0; i < vestingAmountsArr.length; i++) {
      nonVestingAmountTotal = nonVestingAmountTotal.add(nonVestingAmountsArr[i]);
      vestingAmountTotal = vestingAmountTotal.add(vestingAmountsArr[i]);
    }
    setTotalNonVestingAmt(nonVestingAmountTotal.toString());
    setTotalVestingAmt(vestingAmountTotal.toString());
    const durationArr = new Array(amountsArr.length).fill(BigNumber.from(duration), 0);
    setDurations(durationArr);
    const slicesPerSecondsArr = new Array(amountsArr.length).fill(BigNumber.from("1"), 0);
    setSlice(slicesPerSecondsArr);
    const revocablesArr = new Array(amountsArr.length).fill(false, 0);
    setRevocables(revocablesArr);
  };

  const onFileUpload = () => {
    setUploading(true);
    const input = inputRef ? inputRef.current : 0;
    const reader = new FileReader();
    const [file]: any = input && input.files;
    reader.onloadend = ({ target }) => {
      setUploading(false);
      const csv = Papa.parse(target?.result, { header: true });
      if (chainId !== undefined) {
        console.log(csv?.data);
        if (chainId !== undefined) {
          if (csv && csv.data) {
            parseCSV(csv.data);
          }
        }
      } else {
        console.log("Please connect to web3");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {/* <!-- Section --> */}
      <div id="about-page" className="page">
        <div className="container">
          <div className="row">
            <div className="text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="container card-0 justify-content-center ">
                <div className="card-body px-sm-4 px-0">
                  <div className="row justify-content-center mb-5">
                    <div className="col-md-10 col">
                      <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> PreSale Dashboard</h3>
                      <p className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left">
                        {" "}
                        Send Sera PreSale Setting.
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center round">
                    <div className="col-lg-10 col-md-12 ">
                      <form
                        className="sign-up-form form-1 fadeInUp wow"
                        id="myForm"
                        method="post"
                        action="#"
                        encType="multipart/form-data"
                        data-wow-duration="2s"
                      >
                        <div className="card shadow-lg card-1">
                          <div className="row justify-content-end mb-5">
                            <div className="col-lg-12 col-auto ">
                              <button type="button" className="btn btn-primary btn-block" onClick={handleStartSale}>
                                <small className="font-weight-bold">Start</small>
                              </button>
                              <button type="button" className="btn btn-danger btn-block" onClick={handleEndSale}>
                                <small className="font-weight-bold">Stop</small>
                              </button>
                              {/* <button type="button" className="btn btn-success btn-block">
                                <small className="font-weight-bold">Transfer Ownership</small>
                              </button>
                              <button type="button" className="btn btn-primary btn-block" onClick={dispCsvData}>
                                <small className="font-weight-bold">Display CSV data</small>
                              </button> */}
                            </div>
                          </div>
                          <div className="card-body inner-card ">
                            <div className="row justify-content-between text-left">
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Available on tge 
                                  <span className="text-danger"> *(in %)</span>
                                </label>{" "}
                                <input
                                  type="number"
                                  id="availableontge"
                                  name="availableontge"
                                  placeholder="Available on tge"
                                  value={availableTge}
                                  onChange={e => setAvailableTge(e.target.value)}
                                />{" "}
                              </div>
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Duration<span className="text-danger"> *(in seconds)</span>
                                </label>
                                <input
                                  type="number"
                                  id="Duration"
                                  name="Duration"
                                  placeholder="Duration"
                                  value={duration}
                                  onChange={e => setDuration(e.target.value)}
                                />{" "}
                              </div>
                              {/* <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Cliff period<span className="text-danger"> *</span>
                                </label>
                                <input
                                  type="number"
                                  id="Cliffperiod"
                                  name="Cliffperiod"
                                  placeholder="Cliff period"
                                  value={cliffPeriod}
                                  onChange={e => setCliffPeriod(e.target.value)}
                                />{" "}
                              </div> */}
                            </div>
                            {/* <div className="row justify-content-center text-left"> */}
                              {/* <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Duration<span className="text-danger"> *(in seconds)</span>
                                </label>
                                <input
                                  type="number"
                                  id="Duration"
                                  name="Duration"
                                  placeholder="Duration"
                                  value={duration}
                                  onChange={e => setDuration(e.target.value)}
                                />{" "}
                              </div> */}
                            {/* </div> */}
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files">
                                  <label className="my-auto">Upload private sale or seed round csv file </label>{" "}
                                  <div>
                                    <input
                                      ref={inputRef}
                                      disabled={uploading}
                                      type="file"
                                      className="form-control"
                                      onChange={() => onFileUpload()}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="seed"
                                value="seed"
                                checked={round === "seed"}
                                onChange={e => handleChange(e)}
                              />
                              <label className="form-check-label ms-3" htmlFor="seed">
                                SEED Round
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="private"
                                value="private"
                                checked={round === "private"}
                                onChange={e => handleChange(e)}
                              />
                              <label className="form-check-label  ms-3" htmlFor="private">
                                Private Round
                              </label>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="row justify-content-end mb-5">
                                  <div className="col-lg-4 col-auto ">
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-block"
                                      onClick={e => handleSendTGETokensNow(e)}
                                      disabled={uploading}
                                    >
                                      <small className="font-weight-bold">Send tge tokens now</small>
                                    </button>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
