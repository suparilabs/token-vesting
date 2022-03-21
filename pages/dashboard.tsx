import React, { useRef } from "react";
import Papa from "papaparse";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import BN from "bignumber.js";
import { useStartSale, useEndSale } from "../hooks/useTokenPreSale";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { addresses, desiredChain } from "../constants";
import { toast } from "react-toastify";
import { useCreateBulkVestingSchedule, useSetTimeStamp } from "../hooks/useTokenPreVesting";
import { 
  useBulkDepositTokens, 
  usePreTimelockFetchOwner,
  usePreTimelockToken, 
  useTimestampStatus, 
  useTimestampInitialStatus,
  useTimeperiodValue,
  useSetTimestampPreTimelock,
  useTransferOwnership
 } from "../hooks/useTokenPreTimelock";

import { useTokenBalance } from "../hooks/useTokenBalance";

function Dashboard(): JSX.Element {
  const { chainId, active, account } = useWeb3React();
  const inputRef = useRef<any>();
  const { data: tokenBalance } = useTokenBalance(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    account,
    addresses[chainId == undefined ? desiredChain.chainId : (chainId as number)].ERC20_TOKEN_ADDRESS,
  );
  const [isValidTGE, setIsValidTGE] = React.useState<boolean>(true);
  const [isValidDuration, setIsValidDuration] = React.useState<boolean>(true);
  const [isValidCliff, setIsValidCliff] = React.useState<boolean>(true);
  const [enoughTokenBalance, setEnoughTokenBalance] = React.useState<boolean>(false);
  const [availableTge, setAvailableTge] = React.useState<string>("0");
  const [tges, setTges] = React.useState<any>([]);
  const [duration, setDuration] = React.useState<string>("0");
  const [cliff, setCliff] = React.useState<string>("0");
  const [cliffs, setCliffs] = React.useState<any>([]);
  const [round, setRound] = React.useState<string>();
  const [timePeriod, setTimePeriod] = React.useState<any>();
  const [newOwner, setNewOwner] = React.useState<string>("");
  //hooks for seed round
  const [beneficiaries, setBeneficiaries] = React.useState<any>([]);
  const [totalNonVestingAmt, setTotalNonVestingAmt] = React.useState<string>("0");

  const [totalVestingAmt, setTotalVestingAmt] = React.useState<any>("0");
  const [nonVestingAmt, setNonVestingAmt] = React.useState<any>("0");
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
    cliffs,
    durations,
    slice,
    revocables,
    vestingAmt,
    tges,
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
    cliffs,
    durations,
    slice,
    revocables,
    vestingAmt,
    tges,
  );
  const createBulkDepositForPrivateSale = useBulkDepositTokens(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK,
    beneficiaries,
    nonVestingAmt,
  );
  //contract addresses 
  const seedPreTimelockAddress = addresses[chainId != undefined ? chainId : desiredChain.chainId].SEED_PRE_TIME_LOCK;
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
      pending: `Create token lock schedule on pre time lock for ${roundName} round`,
      success: `Created token lock schedule for pre time lock for ${roundName} round👌`,
      error: `Failed to create token lock schedule for ${roundName} round 🤯"`,
    });
  };

  const notifyBulkVestingSchedule = async (promiseObj, roundName) => {
    await toast.promise(promiseObj, {
      pending: `Creating vesting schedule for ${roundName} round`,
      success: `Created vesting schedule for ${roundName} round👌`,
      error: `Failed to create vesting schedule for ${roundName} round 🤯"`,
    });
  };

  const notifySetTimestamp = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting timestamp...`,
      success: `Timestamp is now SET👌`,
      error: `Failed to set the TIMESTAMP 🤯"`,
    });
  };

  const notifyTransferOwnership = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Transferring Ownership...`,
      success: `Ownership is Successfully Transferred👌`,
      error: `Failed to Transfer Ownership 🤯"`,
    });
  };

  //SEED ROUND _ READ CALLS 
  const {data: ownerAddressSeedPretimelock} = usePreTimelockFetchOwner(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressSeedPretimelock} = usePreTimelockToken(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatus} = useTimestampStatus(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatus} = useTimestampInitialStatus(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timePeriodValue} = useTimeperiodValue(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  

  //SEED ROUND _ WRITE CALLS
  const setPreTimelockTimestamp = useSetTimestampPreTimelock(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number),timePeriod);
  const setTransferOwnership = useTransferOwnership(seedPreTimelockAddress, newOwner, chainId == undefined ? desiredChain.chainId : (chainId as number));


  const setTimestampHandler = async(e) => {
    if(timePeriod != undefined) {
      const txTimestamp =  await setPreTimelockTimestamp();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const transferOwnershipHandler = async(e) => {
    if(newOwner != "" || newOwner != undefined) {
      const txTransferOwnership = await setTransferOwnership();
      await notifyTransferOwnership(txTransferOwnership.wait(1));
    } else { 
      setNewOwner("0x");
    }
  };

  const handleSeedRound = async () => {
    if (BigNumber.from(totalNonVestingAmt).gt("0")) {
      // transfer tokens to pre time lock
      const sendTokenToPreTimeLockForSeedTx = await sendTokenToPreTimeLockForSeed();
      await notifyTransfer(sendTokenToPreTimeLockForSeedTx.wait(1), "Seed TokenPreTimeLock");

      // create bulk deposit transaction
      const bulkDepositForSeedTx = await createBulkDepositForSeed();
      await notifyBulkDepositTokens(bulkDepositForSeedTx.wait(1), "Seed");
    }

    if (BigNumber.from(totalVestingAmt).gt("0")) {
      // transfer tokens to pre vesting
      const sendTokenToPreVestingForSeedTX = await sendTokenToPreVestingForSeed();
      await notifyTransfer(sendTokenToPreVestingForSeedTX.wait(1), "Seed TokenPreVesting");

      // create bulk vesting schedule
      const vestingScheduleForSeedTx = await createBulkVestingScheduleForSeed();
      await notifyBulkVestingSchedule(vestingScheduleForSeedTx.wait(1), "Seed");
    }
  };

  
  const handlePrivateRound = async () => {
    if (BigNumber.from(totalNonVestingAmt).gt("0")) {
      // transfer tokens to pre time lock
      const sendTokenToPreTimeLockForPrivateSaleTx = await sendTokenToPreTimeLockForPrivateSale();
      await notifyTransfer(sendTokenToPreTimeLockForPrivateSaleTx.wait(1), "PrivateSale TokenPreTimeLock");

      // create bulk deposit transaction
      const bulkDepositForPrivateSaleTx = await createBulkDepositForPrivateSale();
      await notifyBulkDepositTokens(bulkDepositForPrivateSaleTx.wait(1), "PrivateSale");
    }
    
    if (BigNumber.from(totalVestingAmt).gt("0")) {
      // transfer tokens to pre vesting
      const sendTokenToPreVestingForPrivateSaleTX = await sendTokenToPreVestingForPrivateSale();
      await notifyTransfer(sendTokenToPreVestingForPrivateSaleTX.wait(1), "PrivateSale TokenPreVesting");

      // create bulk vesting schedule
      const vestingScheduleForPrivateSaleTx = await createBulkVestingScheduleForPrivateSale();
      await notifyBulkVestingSchedule(vestingScheduleForPrivateSaleTx.wait(1), "PrivateSale");
    }
  };

  const handleChange = e => {
    setRound(e.target.value);
  };

  const parseCSV = (data: any) => {
    const amountsArr = Object.values(data.map(d => BigNumber.from(d.amount).mul(BigNumber.from("10").pow("18"))));
    let totalAmount = BigNumber.from("0");
    for (let i = 0; i < amountsArr.length; i++) {
      totalAmount = totalAmount.add(BigNumber.from(amountsArr[i]));
    }
    setEnoughTokenBalance(BigNumber.from(tokenBalance?.raw.toString()).gte(totalAmount));
    const beneficiariesArr = data.map(d => d.beneficiary);
    setBeneficiaries(beneficiariesArr);
    const cliffsArr = new Array(beneficiariesArr.length).fill(cliff);
    setCliffs(cliffsArr);
    const tges = new Array(beneficiariesArr.length).fill(
      BigNumber.from(new BN(availableTge).multipliedBy("100").toString()),
      0,
    );
    setTges(tges);
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
    const input = inputRef ? inputRef.current : 0;
    const reader = new FileReader();
    const [file]: any = input && input.files;
    reader.onloadend = ({ target }) => {
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

  const onChangeCliff = e => {
    e.preventDefault();
    setCliff(e.target.value);
    setIsValidCliff(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeDuration = e => {
    e.preventDefault();
    setDuration(e.target.value);
    setIsValidDuration(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeTGE = e => {
    e.preventDefault();
    setAvailableTge(e.target.value);
    setIsValidTGE(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeTime = e => {
    e.preventDefault();
    setTimePeriod(e.target.value);
    setIsValidDuration(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeNewAddress = e => {
    e.preventDefault();
    setNewOwner(e.target.value);
  };

  // const onChange = e => {
  //   e.preventDefault();
  //   setNewOwner(e.target.value);
  // };

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
                          {/* <div className="row justify-content-end mb-5"> */}
                            {/* <div className="col-lg-12 col-auto "> */}
                              {/* <button
                                type="button"
                                className="btn btn-primary btn-block"
                                disabled={!active}
                                onClick={handleStartSale}
                              >
                                <small className="font-weight-bold">Start</small>
                              </button> */}
                              {/* <button
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={handleEndSale}
                                disabled={!active}
                              >
                                <small className="font-weight-bold">Stop</small>
                              </button> */}
                              {/* <button type="button" className="btn btn-success btn-block">
                                <small className="font-weight-bold">Transfer Ownership</small>
                              </button>
                              <button type="button" className="btn btn-primary btn-block" onClick={dispCsvData}>
                                <small className="font-weight-bold">Display CSV data</small>
                              </button> */}
                            {/* </div> */}
                          {/* </div> */}
                          <div className="card-body inner-card border">
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
                                  onChange={e => onChangeTGE(e)}
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
                                  min={0}
                                  step={1}
                                  onChange={e => onChangeDuration(e) /*setDuration(e.target.value)*/}
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
                            <div className="row justify-content-center text-left">
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Cliff<span className="text-danger"> *(in seconds)</span>
                                </label>
                                <input
                                  type="number"
                                  id="cliff"
                                  name="cliff"
                                  placeholder="cliff"
                                  value={cliff}
                                  min={0}
                                  step={1}
                                  onChange={e => onChangeCliff(e) /*setCliff(e.target.value)*/}
                                />{" "}
                              </div>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files">
                                  <label className="my-auto">Upload private sale or seed round csv file </label>{" "}
                                  <div>
                                    <input
                                      ref={inputRef}
                                      type="file"
                                      disabled={!isValidTGE || !isValidDuration || !isValidCliff}
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
                                      disabled={
                                        !active ||
                                        !enoughTokenBalance ||
                                        !isValidCliff ||
                                        !isValidDuration ||
                                        !isValidTGE
                                      }
                                    >
                                      <small className="font-weight-bold">Send tge tokens now</small>
                                    </button>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">SeedRoundTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : {seedPreTimelockAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressSeedPretimelock}</li>
                            <li className="list-group-item">token : {tokenAddressSeedPretimelock}</li>
                            <li className="list-group-item">timestampset : {timestampStatus}</li>
                            <li className="list-group-item">initialtimestamp : {timestampInitialStatus}</li>
                            <li className="list-group-item">timeperiod : {timePeriodValue}</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTimestampHandler}>
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                  value={newOwner}
                                  onChange={e => onChangeNewAddress(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={transferOwnershipHandler}>
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Accidentally Locked Tokens
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">SeedRoundTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">timestampset : false</li>
                            <li className="list-group-item">initialtimestamp : March 1 , 1970</li>
                            <li className="list-group-item">start : March 1 , 1970</li>
                            <li className="list-group-item">vestingschedulestotalamount : 1234 SERA</li>
                            <li className="list-group-item">vesting schedule count : 12</li>
                            <li className="list-group-item">withdrawable amount : 1200 SERA</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    Withdraw
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">PrivateRoundTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">timestampset : false</li>
                            <li className="list-group-item">initialtimestamp : March 1 , 1970</li>
                            <li className="list-group-item">timeperiod : 1 month</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Accidentally Locked Tokens
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">PrivateRoundTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">timestampset : false</li>
                            <li className="list-group-item">initialtimestamp : March 1 , 1970</li>
                            <li className="list-group-item">start : March 1 , 1970</li>
                            <li className="list-group-item">vestingschedulestotalamount : 1234 SERA</li>
                            <li className="list-group-item">vesting schedule count : 12</li>
                            <li className="list-group-item">withdrawable amount : 1200 SERA</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    Withdraw
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>


                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreSale</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              SaleStatus : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">Vesting : 0x</li>
                            <li className="list-group-item">TimeLock : 0x</li>
                            <li className="list-group-item">USDT : 0x</li>
                            <li className="list-group-item">BUSD : 0x</li>
                            <li className="list-group-item">coinsSold : 1234</li>
                            <li className="list-group-item">exchangePriceUSDT : 120000000000000000</li>
                            <li className="list-group-item">exchangePriceBUSD : 120000000000000000</li>
                            <li className="list-group-item">duration : 3 months</li>
                            <li className="list-group-item">cliff : 3 months</li>
                            <li className="list-group-item">minBuyAmountUSDT : 1 USDT</li>
                            <li className="list-group-item">maxBuyAmountUSDT : 1000 USDT</li>
                            <li className="list-group-item">minBuyAmountBUSD : 1 BUSD</li>
                            <li className="list-group-item">maxBuyAmountBUSD : 1000 BUSD</li>
                            <li className="list-group-item">availableAtTGE : 2%</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="usdt exchange price"
                                  aria-label="usdt exchange price"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET EXCHANGE PRICE USDT
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="busd exchange price"
                                  aria-label="busd exchange price"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Exchange Price BUSD
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="duration in seconds"
                                  aria-label="duration in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET DURATION
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="cliff in seconds"
                                  aria-label="cliff in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET CLIFF
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="time period in seconds"
                                  aria-label="time period in seconds"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET time stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="start or pause"
                                  aria-label="start or pause"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET SALE STATUS
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="pct available at TGE"
                                  aria-label="pct available at TGE"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    SET AVAILABLE AT TGE
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    transfer Accidentally Locked Tokens In TimeLock
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="min busd"
                                  aria-label="min busd"
                                  aria-describedby="basic-addon2"
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="max busd"
                                  aria-label="max busd"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Buy Amount Range BUSD
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="min usdt"
                                  aria-label="min usdt"
                                  aria-describedby="basic-addon2"
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="max usdt"
                                  aria-label="max usdt"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    set Buy Amount Range USDT
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block me-5" type="button">
                                    withdraw busd
                                  </button>
                                  <button className="btn btn-primary btn-block me-5" type="button">
                                    withdraw usdt
                                  </button>
                                  <button className="btn btn-primary btn-block me-5" type="button">
                                    end sale
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    withdraw From Vesting
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button">
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">timestampset : false</li>
                            <li className="list-group-item">initialtimestamp : March 1 , 1970</li>
                            <li className="list-group-item">timeperiod : 1 month</li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Incoming Deposits Allowed : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : 0x</li>
                            <li className="list-group-item">owner : 0x</li>
                            <li className="list-group-item">token : 0x</li>
                            <li className="list-group-item">timestampset : false</li>
                            <li className="list-group-item">initialtimestamp : March 1 , 1970</li>
                            <li className="list-group-item">start : March 1 , 1970</li>
                            <li className="list-group-item">vestingschedulestotalamount : 1234 SERA</li>
                            <li className="list-group-item">vesting schedule count : 12</li>
                            <li className="list-group-item">withdrawable amount : 1200 SERA</li>
                          </ul>
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
