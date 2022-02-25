import React, { useState } from "react";
import Highcharts from "highcharts";
import Header from "./Header";
import Footer from "./Footer";
import { useWeb3React } from "@web3-react/core";
import { useSetAvailableAtTGE, useVestingContractAddress, useSetCliffPeriod, useSetDuration, useCreateVestingSchedule } from "../hooks/useTokenSale";
import moment from "moment";
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
  import BN from "bignumber.js";
  import Account from "../components/AccountK";
  import { useEagerConnect } from "../hooks/useEagerConnect";
  import { useTokenBalance } from "../hooks/useTokenBalance";
  import { TokenAmount } from "@uniswap/sdk";
import { resolve } from "path/posix";
import { reject } from "lodash";
import * as XLSX from "xlsx";
import { stringOrNumber } from "@chakra-ui/core";


function Dashboard():JSX.Element {
  const { account, chainId } = useWeb3React();
  var beneficiary:string = "";
  var start:number, amount:number = 0;
    // const triedToEagerConnect = useEagerConnect();
    const { data: balance } = useTokenBalance(chainId !== undefined ? (chainId as number) : 56, account as string, null);
    // Setting up variables to fetch details from hooks
    const { data: vestingContractAddress } = useVestingContractAddress(chainId == undefined ? 56 : chainId);
    const [mockData, setMockData] = useState([]);
    const [availableTge, setAvailableTge] = React.useState<Number>();
    const [cliffPeriod, setCliffPeriod] = React.useState<Number>();
    const [duration, setDuration] = React.useState<Number>();
    const cliff_period:number = cliffPeriod * 30 * 86400; //in months
    const duration_period:number = duration * 30 * 86400; //in months
    const { data: tge } = useSetAvailableAtTGE(chainId == undefined ? 56 : (chainId as number), availableTge as number);
    const { data: cliff } = useSetCliffPeriod(chainId == undefined ? 56 : (chainId as number), cliff_period as number);
    const { data: Duration } = useSetDuration(chainId == undefined ? 56 : (chainId as number), duration as number);
    const { data: Vesting } = useCreateVestingSchedule(chainId == undefined ? 56 : (chainId as number), beneficiary as string, start as number, cliffPeriod as number, duration as number, amount as number, availableTge as number );

    const handleClick = async(e) => {
      if(mockData.length > 0 || mockData !== undefined){
        for(var i=0; i<mockData.length; i++) {
          beneficiary = "0x" + mockData[i].User_Address;
          start = Date.parse(mockData[i].BlockTime_UTC);
          amount = parseInt(mockData[i].Tx_Amount + '000000000000000000');
          console.log("Cliff (in months): ", cliff_period);
          console.log("Duration (in months): ", duration_period);
      
        }
      } else {
        console.log("error");
      }
    }
    const readExcel = (file:any) => {
      const promise = new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)
        fileReader.onload=(e) => {
          const bufferArray = e.target?.result;
          const wb = XLSX.read(bufferArray, {type:'buffer'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);

        };
        fileReader.onerror = ((error) => {
          reject(error);
        });
      });
      promise.then((d) => {
        setMockData(d as any);
        console.log("data", d);
      });
    };
  return (
  <div>
    <Header/>
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
                   <p className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Send Sera PreSale Setting.</p>
                </div>
        </div>
        <div className="row justify-content-center round">
            <div className="col-lg-10 col-md-12 ">
                	 <form className="sign-up-form form-1 fadeInUp wow" id="myForm"  method="post" action="#"  encType="multipart/form-data" data-wow-duration="2s">
				
                <div className="card shadow-lg card-1">
                    <div className="row justify-content-end mb-5">
                      <div className="col-lg-12 col-auto "><button type="button" className="btn btn-primary btn-block"><small className="font-weight-bold">Start</small></button> 
                      <button type="button" className="btn btn-danger btn-block"><small className="font-weight-bold">Stop</small></button>
                      </div>
                    </div>
                    <div className="card-body inner-card">
                      <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Available on tge
                        <span className="text-danger"> *</span></label> <input type="number" id="availableontge" name="availableontge" placeholder="Available on tge" value={availableTge} onChange={e => setAvailableTge(e.target.value)}/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Cliff period<span className="text-danger"> *</span></label> 
                        <input type="number" id="Cliffperiod" name="Cliffperiod" placeholder="Cliff period" value={cliffPeriod} onChange={e => setCliffPeriod(e.target.value)}/> </div>
                    </div>
                    <div className="row justify-content-center text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Duration<span className="text-danger"> *</span></label> 
                        <input type="number" id="Duration" name="Duration" placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} /> </div>
                    </div>
                         <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files"><label className="my-auto">Upload private sale or seed round manually </label> <input type="file" className="form-control" id="fileUpload" onChange={(e) => { const file = e.target.files[0]; readExcel(file); }}/></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                                <div className="row justify-content-end mb-5">
                                    <div className="col-lg-4 col-auto "><button type="button" className="btn btn-primary btn-block" onClick={(e) => handleClick(e)}><small className="font-weight-bold">Send tge tokens now</small></button> </div>
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
{/* <!-- Footer --> */}
<Footer/>
</div>
  );
}

export default Dashboard;
