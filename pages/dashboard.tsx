import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {useStartSale, useEndSale} from "../hooks/useTokenPreSale";

function Dashboard() {
  const { account, chainId } = useWeb3React();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<any>();
  const [availableTge, setAvailableTge] = React.useState<string>();
  const [cliffPeriod, setCliffPeriod] = React.useState<string>();
  const [duration, setDuration] = React.useState<string>();
  
  // const { data: endSaleStatus } = useStartSale(chainId == undefined ? 56 : chainId);

  //web3
  
 
  const handleUploadCSV = () => {
    setUploading(true);
    const input = inputRef ? inputRef.current : 0;
    const reader = new FileReader();
    const [file]: any = input && input.files;
    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target?.result, { header: true });
      console.log("Data", csv);
    };
    reader.readAsText(file);
  };

  const approveUser = (e) => {
    e.preventDefault();
    console.log("hello there");
  };

  const handleStartSale = useStartSale(chainId == undefined ? 56 : chainId as number);
  const handleEndSale = useEndSale(chainId == undefined ? 56 : chainId as number)
 

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
                              <button type="button" className="btn btn-success btn-block" >
                                <small className="font-weight-bold">Approve the user For admin</small>
                              </button>
                              
                            </div>
                          </div>
                          <div className="card-body inner-card">
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
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="row justify-content-end mb-5">
                                  <div className="col-lg-4 col-auto ">
                                    <button type="button" className="btn btn-primary btn-block" onClick={handleUploadCSV} disabled={uploading}>
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
};

Dashboard.propTypes = {};

export default Dashboard;
