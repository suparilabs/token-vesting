/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";
import React, { useState } from "react";
import { useVestingContractAddress } from "../hooks/useTokenSale";
import { useWeb3React } from "@web3-react/core";
import {
  useComputeReleasableAmount,
  useComputeVestingScheduleIdForAddressAndIndex,
  useRelease,
  useVestingScheduleCountBeneficiary,
} from "../hooks/useVesting";
import ClaimToken from "../components/ClaimToken";

function Vesting(): JSX.Element {
  const [claimButtonDisable, setClaimButtonDisable] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();
  const { data: vestingContractAddress } = useVestingContractAddress(chainId == undefined ? 56 : chainId);
  const { data: vestingScheduleCount } = useVestingScheduleCountBeneficiary(vestingContractAddress, account as string);
  const { data: vestingScheduleId } = useComputeVestingScheduleIdForAddressAndIndex(
    account as string,
    vestingContractAddress,
    "0",
  );
  const { data: releasableAmount } = useComputeReleasableAmount(vestingContractAddress, vestingScheduleId);
  const claim = useRelease(vestingContractAddress, vestingScheduleId, releasableAmount);
  console.log(vestingScheduleCount);
  console.log(claimButtonDisable);

  const handleClaim = async e => {
    e.preventDefault();
    setClaimButtonDisable(true);
    const tx = await claim();
    await tx.wait();
    setClaimButtonDisable(false);
  };

  return (
    <div className="light">
      {/* SECTION  */}
      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="heading">
                <h2 className="title">About Vesting Schedule</h2>
              </div>
              <div className="text">
                <p>
                  {" "}
                  Daily linear vesting on a block-by-block basis.Please don’t claim too frequently as you have to pay
                  gas fee every time you claim.{" "}
                </p>
                <p>
                  {" "}
                  <h2 className="titlenew2">Vesting Contract Address {vestingContractAddress}</h2>
                </p>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="about-image"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="about-page" className="page">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-xs-12">
              {/* STYLES   */}
              <div className="container mt-5 mb-3">
                <div className="row">
                  {/* <div className="col-md-4">
        </div> */}
                  <div className="col-md-4"></div>
                  {/* SECTION FOR DISPLAYING SERA TOKEN VESTING INFORMATION */}
                  <div className="col-md-4">
                    <div className="card p-3 mb-2">
                      <div className="heading newhead">
                        <h2 className="title">Claim Private Round Tokens</h2>
                      </div>
                      {Array.from(Array(vestingScheduleCount as number), (_, _index) => _index).map(
                        _vestingScheduleIndex => {
                          return (
                            <ClaimToken
                              key={_vestingScheduleIndex}
                              claim={e => handleClaim(e)}
                              vestingScheduleIndex={_vestingScheduleIndex}
                            />
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vesting;
