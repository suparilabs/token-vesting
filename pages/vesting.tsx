/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";
import React, { useState } from "react";
import { BigNumber } from "ethers";
import moment from "moment";
import { formatEther } from "@ethersproject/units";
import BN from "bignumber.js";
import Footer from "./Footer";
import ContainerText from "../components/ContainerText";
import Header from "./Header";
import { useAvailableAtTGE, useVestingContractAddress } from "../hooks/useTokenSale";
import { useWeb3React } from "@web3-react/core";
import {
  useComputeReleasableAmount,
  useComputeVestingScheduleIdForAddressAndIndex,
  useRelease,
  useVestingScheduleByAddressAndIndex,
  useVestingScheduleCountBeneficiary,
} from "../hooks/useVesting";
import { secondsToDhms } from "../utils";
import ClaimToken from "../components/ClaimToken";


// const myLoader = ({ src, width, quality }) => {
//   return `https://vesting-bsc.galaxywar.io/images/${src}?w=${width}&q=${quality || 75}`;
// };

function Vesting(): JSX.Element {
  const [claimButtonDisable, setClaimButtonDisable] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();
  const { data: vestingContractAddress } = useVestingContractAddress(chainId == undefined ? 56 : chainId);
  const { data: vestingScheduleCount } = useVestingScheduleCountBeneficiary(vestingContractAddress, account as string);
  const vestingSchedule = useVestingScheduleByAddressAndIndex(account as string, vestingContractAddress, "0");
  const { data: vestingScheduleId } = useComputeVestingScheduleIdForAddressAndIndex(
    account as string,
    vestingContractAddress,
    "0",
  );
  const { data: releasableAmount } = useComputeReleasableAmount(vestingContractAddress, vestingScheduleId);
  const { data: tge } = useAvailableAtTGE(chainId == undefined ? 56 : (chainId as number));
  const claim = useRelease(vestingContractAddress, vestingScheduleId, releasableAmount);
  console.log(vestingScheduleCount);
  const items = [
    // {
    //   title: "Claim IDO Tokens",
    //   unlocked: "23.0540000",
    //   claimable: "0.0000000",
    //   claimingDate: "2 Jan 2022",
    //   unlockingDate: "1 Feb 2022",
    //   splMessage: "Vesting Schedule: 20% TGE then daily linear for 4 months",
    // },
    {
      title: "Claim Private Round Tokens",
      unlocked:
        vestingSchedule !== undefined && releasableAmount
          ? parseFloat(
              formatEther(
                BigNumber.from(vestingSchedule[7]).sub(BigNumber.from(vestingSchedule[8])).sub(releasableAmount),
              ),
            ).toFixed(4)
          : "0",
      claimable: releasableAmount ? parseFloat(formatEther(BigNumber.from(releasableAmount))).toFixed(4) : "0",
      claimingDate: vestingSchedule != undefined ? moment.unix(vestingSchedule[2]).toLocaleString() : "-",
      unlockingDate:
        vestingSchedule != undefined
          ? moment.unix(parseInt(vestingSchedule[4]) + parseInt(vestingSchedule[3])).toLocaleString()
          : "-",
      splMessage: `Vesting Schedule: ${tge ? new BN(tge).div("100") : "-"}% TGE then daily linear for ${
        vestingSchedule && (vestingSchedule[4] as number) > 0 ? secondsToDhms(vestingSchedule[4] as number) : "-"
      }`,
    },
    // {
    //   title: "Claim Seed Round Tokens",
    //   unlocked: "1012.0000000",
    //   claimable: "10.0000000",
    //   claimingDate: "2 Jan 2022",
    //   unlockingDate: "1 Feb 2022",
    //   splMessage: "Vesting Schedule: 5% TGE then daily linear for 1 year",
    // },
  ];

  const handleClaim = async e => {
    e.preventDefault();
    setClaimButtonDisable(true);
    const tx = await claim();
    await tx.wait();
    setClaimButtonDisable(false);
  };

  const itemList = vestingScheduleIndex =>
    items.map((item, index) => {
      return (
        <ContainerText
          key={index}
          unlocked={item.unlocked}
          title_={item.title}
          claimable={item.claimable}
          splMessage={item.splMessage}
          claimingDate={item.claimingDate}
          unlockingDate={item.unlockingDate}
          claim={e => handleClaim(e)}
          claimButtonDisable={
            (releasableAmount !== undefined && !BigNumber.from(releasableAmount).gt("0")) || claimButtonDisable
          }
          vestingScheduleIndex={vestingScheduleIndex}
        />
      );
    });

  return (
  
    <div>
    <Header/>
    {/* SECTION  */}
    <section className="about">
        <div className="container">
            <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div data-aos-delay="300" data-aos="fade-down" className="heading">
                        <h2 className="title">About Vesting Schedule</h2>
                    </div>
                    <div data-aos-delay="400" data-aos="fade-down" className="text">
                        <p>  Daily linear vesting on a block-by-block basis.Please don’t claim too frequently as you have to pay gas fee every time you claim. </p>
                        <p> <h2 className="titlenew2">OEC:0x31640330cd2337e57c9591a2a183ac4e8a754e87</h2></p>
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div data-aos-delay="500" data-aos="flip-right" className="about-image">
                    </div>
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
                <h2 data-aos-delay="300" className="title">Claim Private Round Tokens</h2>
            </div>
            {Array.from(Array(vestingScheduleCount as number), (_, _index) => _index).map(_vestingScheduleIndex => {
              return (
                <ClaimToken
                  key={_vestingScheduleIndex}
                  claim={e => handleClaim(e)}
                  vestingScheduleIndex={_vestingScheduleIndex}
                />
              );
            })}
            </div>
    </div>
</div>
</div>
</div>
</div>
</div>
</section>
   
{/* START SECTION */}
<section className="custom-social2"  id="Socials">
    <div className="container">
        <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="heading">
                    <h2 className="title">
                        Join Sera Community
                    </h2>
                </div>
                <div className="text">

                    <p>

                    </p>
                </div>
                <ul className="social2">
                    <li>
                        <a  target="_blank"  href="https://twitter.com/Project_SERA">
                            <span>
                            <i className="bi bi-twitter"></i>
                            </span>
                            <span>
                                Twitter
                            </span>
                        </a>
                    </li>
                  
                    <li>
                        <a  target="_blank"  href="https://t.me/Sera_Project">
                            <span>
                            <i className="bi bi-telegram"></i>
                            </span>
                            <span>
                                Telegram
                            </span>
                        </a>
                    </li>
                     <li>
                        <a  target="_blank"  href="https://bit.ly/SERA_Project">
                            <span>
                            <i className="bi bi-youtube"></i>
                            </span>
                            <span>
                                Youtube
                            </span>
                        </a>
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
</section>
{/* END SECTION */}
{/* START FOOTER */}

    <footer className="footer" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12">
            <div data-aos-delay="500" data-aos="fade-right" className="text">
            </div>
          </div>
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12">
          </div>
        </div>
        <div className="row">

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="copyrights">
              <p>
              SERA Technologies Ltd. Copyright © 2021-2022. All rights reserved.
              </p>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="copyrights">
                <p>Sera is Beta group company</p>
              </div>
          </div>
        </div>
      </div>
    </footer>
  {/* END FOOTER */}
    </div>
  );
}

export default Vesting;
