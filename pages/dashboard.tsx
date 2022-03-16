import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import BN from "bignumber.js";
import { useStartSale, useEndSale, useCreateVestingSchedule } from "../hooks/useTokenPreSale";
import {
  useCreateVestingScheduleSeed,
  useCreateVestingSchedulePrivate,
  useTransferTokenPreVestingSeed,
  useTransferTokenPreVestingPrivate,
} from "../hooks/useTokenPreVesting";
import { 
  useTransferTokenPreTimelockSeed, 
  useTransferTokenPreTimelockPrivate, 
  useBulkDepositTokensSeed, 
  useBulkDepositTokensPrivate
 } from "../hooks/useTokenPreTimelock";

function Dashboard() {
  const { account, chainId } = useWeb3React();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<any>();
  const desiredChainId: number = 97; //chain id for bsc testnet
  const [availableTge, setAvailableTge] = React.useState<string>("0");
  const [cliffPeriod, setCliffPeriod] = React.useState<string>();
  const [duration, setDuration] = React.useState<string>("0");
  const [round, setRound] = React.useState<string>();
  //hooks for seed round
  const [beneficiaries, setBeneficiaries] = React.useState<any>([]);
  const [totalNonVestingAmt, setTotalNonVestingAmt] = React.useState<string>("");
  
  const [totalVestingAmt, setTotalVestingAmt] = React.useState<any>();
  const [amt, setAmt] = React.useState<any>([]);
  const [nonVestingAmt, setNonVestingAmt] = React.useState<any>();
  const [vestingAmt, setVestingAmt] = React.useState<any>([]);
  const [durations, setDurations] = React.useState<any>([]);
  const [revocables, setRevocables] = React.useState<any>([]);
  const [slice, setSlice] = React.useState<any>([]);
  //start and end sale
  const handleStartSale = useStartSale(chainId == undefined ? desiredChainId : (chainId as number));
  const handleEndSale = useEndSale(chainId == undefined ? desiredChainId : (chainId as number));
  //FOR SEED ROUND 
  const preTimelockSeed = useTransferTokenPreTimelockSeed(totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt), chainId == undefined ? 97 : chainId);
  const preVestingSeed = useTransferTokenPreVestingSeed(totalVestingAmt == undefined ? BigNumber.from("0") : totalVestingAmt, chainId == undefined ? 97 : chainId);
  const createVestingScheduleSeed = useCreateVestingScheduleSeed(chainId == undefined ? 97 : chainId, beneficiaries, durations, revocables, amt);
  const createBulkDepositSeed = useBulkDepositTokensSeed(beneficiaries, amt, chainId == undefined ? 97 : chainId);
  //FOR PRIVATE ROUND
  const preTimelockPrivate = useTransferTokenPreTimelockPrivate(totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt), chainId == undefined ? 97 : chainId);
  const preVestingPrivate = useTransferTokenPreVestingPrivate(totalVestingAmt == undefined ? BigNumber.from("0") : totalVestingAmt, chainId == undefined ? 97 : chainId);
  const createVestingSchedulePrivate = useCreateVestingSchedulePrivate(chainId == undefined ? 97 : chainId, beneficiaries, durations, revocables, amt);
  const createBulkDepositPrivate = useBulkDepositTokensPrivate(beneficiaries, amt, chainId == undefined ? 97 : chainId);
  
  //web3
  const handleUploadCSV = async e => {
    e.preventDefault();
    setUploading(true);
    const input = inputRef ? inputRef.current : 0;
    const reader = new FileReader();
    const [file]: any = input && input.files;
    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target?.result, { header: true });
      if (chainId !== undefined) {
        console.log(csv?.data)
        handleRounds(csv?.data);
      } else {
        console.log("Please connect to web3");
      }
    };
    reader.readAsText(file);
  };

  const handleRounds = (data: any) => {
    if(chainId !== undefined) {
      if (data !== undefined) {
        // array of beneficiaries
        const beneficiariesArr = Object.values(data.map(d => d.beneficiary));
        console.log(typeof(beneficiariesArr));
        console.log("79",beneficiariesArr);

        setBeneficiaries(beneficiariesArr);

        const amountsArr = Object.values(data.map(d => BigNumber.from(d.amount).mul(BigNumber.from("10").pow("18"))));
        setAmt(amountsArr);

        const nonVestingAmountsArr = Object.values(amountsArr.map(x =>
          BigNumber.from(x)
            .mul(BigNumber.from(new BN(availableTge.toString()).multipliedBy("100").toString()))
            .div("10000"),
        ));
        setNonVestingAmt(nonVestingAmountsArr);

        const vestingAmountsArr = Object.values(amountsArr.map((x, i) => BigNumber.from(x).sub(nonVestingAmountsArr[i])));
        setVestingAmt(vestingAmountsArr);

        let nonVestingAmountTotal:BigNumber=BigNumber.from(0);
        let vestingAmountTotal:BigNumber=BigNumber.from(0);
        for(let i=0;i<vestingAmountsArr.length;i++) {
            nonVestingAmountTotal.add(nonVestingAmountsArr[i]);
            vestingAmountTotal.add(vestingAmountsArr[i]);
        }
        // const nonVestingAmountTotal = nonVestingAmountsArr.reduce((pv, cv) => BigNumber.from(pv).add(BigNumber.from(cv)), 0);
         setTotalNonVestingAmt(nonVestingAmountTotal.toString());
        
        // const vestingAmountTotal = vestingAmountsArr.reduce((pv, cv) => BigNumber.from(pv).add(BigNumber.from(cv)), 0);
         setTotalVestingAmt(vestingAmountTotal.toString());

        const durationArr = new Array(amountsArr.length).fill(BigNumber.from(duration),0,);
        setDurations(durationArr);
        
        const slicesPerSecondsArr = new Array(amountsArr.length).fill(BigNumber.from("1"),0,)
        setSlice(slicesPerSecondsArr);

        const revocablesArr = new Array(amountsArr.length).fill(false,0,)
        setRevocables(revocablesArr);

        if(round == 'seed'){
          handleSeedRound();
        } else if (round == 'private'){
          handlePrivateRound();
        } else {
          console.log("ERROR: PLEASE SELECT A ROUND IN THE FORM");
        }
  
      }
    }      
  };

  const handleSeedRound = async () => {
    if(chainId !== undefined) {
      console.log("state", beneficiaries);
      console.log("132",totalNonVestingAmt);
      await preTimelockSeed();
      // createBulkDepositSeed();
      // preVestingSeed();
      //createVestingScheduleSeed(); 
    }
  };
  const handlePrivateRound = () => {
    if(chainId !== undefined) {
      console.log("state", beneficiaries);
      preTimelockPrivate();
      createBulkDepositPrivate();
      preVestingPrivate();
      createVestingSchedulePrivate();
    }
  };

  const handleChange = e => {
    setRound(e.target.value);
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
                                  <span className="text-danger"> *</span>
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
                              </div>
                            </div>
                            <div className="row justify-content-center text-left">
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Duration<span className="text-danger"> *</span>
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
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files">
                                  <label className="my-auto">Upload private sale or seed round manually </label>{" "}
                                  <div>
                                    <input ref={inputRef} disabled={uploading} type="file" className="form-control" />
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
                                      onClick={e => handleUploadCSV(e)}
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
