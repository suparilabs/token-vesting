/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";
import React /*useState*/ from "react";
import { /*useTimeLockContractAddress,*/ useVestingContractAddress } from "../hooks/useTokenPreSale";
import { useWeb3React } from "@web3-react/core";
import {
  // useComputeReleasableAmount,
  // useComputeVestingScheduleIdForAddressAndIndex,
  // useRelease,
  useVestingScheduleCountBeneficiary,
} from "../hooks/useTokenPreVesting";
import { addresses, desiredChain } from "../constants";
import Claim from "../components/Claim";

function Vesting(): JSX.Element {
  // const [claimButtonDisableIDO, setClaimButtonDisableIDO] = useState<boolean>(false);
  // const [claimButtonDisableSeedRound, setClaimButtonDisableSeedRound] = useState<boolean>(false);
  // const [claimButtonDisablePrivateRound, setClaimButtonDisablePrivateRound] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();
  // IDO
  const { data: vestingContractAddressForIDO } = useVestingContractAddress(
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  // const { data: timelockContractAddressForIDO } = useTimeLockContractAddress(
  //   chainId == undefined ? desiredChain.chainId : chainId,
  // );
  const { data: vestingScheduleCountForIDO } = useVestingScheduleCountBeneficiary(
    vestingContractAddressForIDO,
    account as string,
  );
  // const { data: releasableAmountForIDO } = useComputeReleasableAmount(
  //   vestingContractAddressForIDO,
  //   vestingScheduleIdForIDO,
  // );
  // const claimIDO = useRelease(vestingContractAddressForIDO, vestingScheduleIdForIDO, releasableAmountForIDO);

  // const handleClaimIDO = async e => {
  // e.preventDefault();
  // setClaimButtonDisableIDO(true);
  // const tx = await claimIDO();
  // await tx.wait();
  // setClaimButtonDisableIDO(false);
  // };

  // Seed
  const vestingContractAddressForSeedRound =
    addresses[chainId == undefined ? desiredChain.chainId : chainId].SEED_PRE_VESTING;
  // const timelockAddressForSeedRound =
  //   addresses[chainId == undefined ? desiredChain.chainId : chainId].SEED_PRE_TIME_LOCK;
  const { data: vestingScheduleCountForSeedRound } = useVestingScheduleCountBeneficiary(
    vestingContractAddressForSeedRound,
    account as string,
  );

  // const { data: releasableAmountForSeedRound } = useComputeReleasableAmount(
  //   vestingContractAddressForSeedRound,
  //   vestingScheduleIdForSeedRound,
  // );
  // const claimSeedRound = useRelease(
  //   vestingContractAddressForSeedRound,
  //   vestingScheduleIdForSeedRound,
  //   releasableAmountForSeedRound,
  // );

  // const handleClaimSeedRound = async e => {
    // e.preventDefault();
    // setClaimButtonDisableSeedRound(true);
    // const tx = await claimSeedRound();
    // await tx.wait();
    // setClaimButtonDisableSeedRound(false);
  // };

  // Private
  const vestingContractAddressForPrivateRound =
    addresses[chainId == undefined ? desiredChain.chainId : chainId].PRIVATE_SALE_PRE_VESTING;
  // const timelockAddressForPrivateRound =
  //   addresses[chainId == undefined ? desiredChain.chainId : chainId].PRIVATE_SALE_PRE_TIME_LOCK;

  const { data: vestingScheduleCountForPrivateRound } = useVestingScheduleCountBeneficiary(
    vestingContractAddressForPrivateRound,
    account as string,
  );

  // const { data: releasableAmountForPrivateRound } = useComputeReleasableAmount(
  //   vestingContractAddressForPrivateRound,
  //   vestingScheduleIdForPrivateRound,
  // );
  // const claimPrivateRound = useRelease(
  //   vestingContractAddressForPrivateRound,
  //   vestingScheduleIdForPrivateRound,
  //   releasableAmountForPrivateRound,
  // );

  // const handleClaimPrivateRound = async e => {
    // e.preventDefault();
    // setClaimButtonDisablePrivateRound(true);
    // const tx = await claimPrivateRound();
    // await tx.wait();
    // setClaimButtonDisablePrivateRound(false);
  // };

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
                  <h2 className="titlenew2">
                    SERA :{" "}
                    {addresses[chainId !== undefined ? (chainId as number) : desiredChain.chainId].ERC20_TOKEN_ADDRESS}
                  </h2>
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
                  <div className="col-md-4">
                    <div className="card p-3 mb-2">
                      <div className="heading newhead">
                        <h2 className="title">Seed Round Tokens</h2>
                      </div>
                      <div>
                        {vestingScheduleCountForSeedRound &&
                          vestingScheduleCountForSeedRound > 0 &&
                          Array.from({ length: vestingScheduleCountForSeedRound }, (_, index) => index).map(
                            _vestingScheduleIndex => (
                              <Claim
                                vestingContractAddress={vestingContractAddressForSeedRound}
                                key={_vestingScheduleIndex}
                                // claim={e => handleClaimSeedRound(e)}
                                vestingScheduleIndex={_vestingScheduleIndex}
                              />
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                  {/* SECTION FOR DISPLAYING SERA TOKEN VESTING INFORMATION */}
                  <div className="col-md-4">
                    <div className="card p-3 mb-2">
                      <div className="heading newhead">
                        <h2 className="title">IDO ROUND</h2>
                      </div>
                      <div>
                        {vestingScheduleCountForIDO &&
                          vestingScheduleCountForIDO > 0 &&
                          Array.from({ length: vestingScheduleCountForIDO }, (_, index) => index).map(
                            _vestingScheduleIndex => (
                              <Claim
                                vestingContractAddress={vestingContractAddressForIDO}
                                key={_vestingScheduleIndex}
                                // claim={e => handleClaimPrivateRound(e)}
                                vestingScheduleIndex={_vestingScheduleIndex}
                              />
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card p-3 mb-2">
                      <div className="heading newhead">
                        <h2 className="title">Private Round tokens</h2>
                      </div>
                      <div>
                        {vestingScheduleCountForPrivateRound &&
                          vestingScheduleCountForPrivateRound > 0 &&
                          Array.from({ length: vestingScheduleCountForPrivateRound }, (_, index) => index).map(
                            _vestingScheduleIndex => (
                              <Claim
                                vestingContractAddress={vestingContractAddressForPrivateRound}
                                key={_vestingScheduleIndex}
                                // claim={e => handleClaimPrivateRound(e)}
                                vestingScheduleIndex={_vestingScheduleIndex}
                              />
                            ),
                          )}
                      </div>
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

Vesting.propTypes = {};
export default Vesting;
