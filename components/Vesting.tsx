import { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { Box, Button } from "@chakra-ui/core";
import { Container, Card, Table } from "react-bootstrap";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
// import { useQueryParameters } from "../hooks/useQueryParameters";
// import { QueryParameters } from "../constants";
import { injected } from "../connectors";
import { useVestingSchedule, useVestingScheduleCountByBeneficiary } from "../hooks/usePrivateSale";
import moment from "moment";
import { ethers } from "ethers";

function ETHBalance(): JSX.Element {
  const { account } = useWeb3React();
  const { data: vestingScheduleCount } = useVestingScheduleCountByBeneficiary(account, true);
  const { data } = useVestingSchedule(vestingScheduleCount, account, true);
  console.log(data);
  const detailsArray = data && data.split(",");
  const cliff =
    detailsArray && detailsArray[2]
      ? moment.unix(detailsArray[2]).format("dddd, MMMM Do, YYYY h:mm:ss A")
      : "loading cliff time...";
  const start =
    detailsArray && detailsArray[3]
      ? moment.unix(detailsArray[3]).format("dddd, MMMM Do, YYYY h:mm:ss A")
      : "loading start time...";
  const duration =
    detailsArray && detailsArray[4]
      ? moment.unix(detailsArray[4]).format("dddd, MMMM Do, YYYY h:mm:ss A")
      : "loading duration...";
  const totalAmount =
    detailsArray && detailsArray[7] ? `${ethers.utils.formatEther(detailsArray[7])} SERA` : "loading totalAmount...";
  const balance =
    detailsArray && detailsArray[8] ? `${ethers.utils.formatEther(detailsArray[8])} SERA` : "loading balance...";
  const isRevocable =
    detailsArray && detailsArray[9] ? ethers.utils.formatEther(detailsArray[9]) : "loading isRevocable...";
  return (
    <>
      <Container>
        {data && (
          <Card>
            <Card.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th colSpan={2}>Vesting Schedules</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <th>Beneficiary</th>
                    <td>{account}</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <th>Start Date</th>
                    <td>{start}</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <th>Cliff</th>
                    <td>{cliff}</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <th>Duration</th>
                    <td>{duration}</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <th>Already Vested</th>
                    <td>
                      {totalAmount}
                      <Button style={{ height: "20px" }}> Release</Button>
                    </td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <th>Already Released</th>
                    <td>{balance}</td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <th>Revocable</th>
                    <td>{isRevocable}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}{" "}
        {data == undefined && <div>You do not have vesting schedule</div>}
      </Container>
    </>
  );
}

export default function Vesting(/*{
  triedToEagerConnect,
}: {
  triedToEagerConnect: boolean;
}*/): JSX.Element | null {
  const { active, error, activate, account, setError } = useWeb3React<Web3Provider>();

  // initialize metamask onboarding
  // const onboarding = useRef<MetaMaskOnboarding>();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();
  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // const queryParameters = useQueryParameters();
  // const requiredChainID = queryParameters[QueryParameters.CHAIN];

  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return null;
  } else if (typeof account !== "string") {
    return (
      <Box>
        {typeof window !== "undefined" &&
        (MetaMaskOnboarding.isMetaMaskInstalled() || (window as any)?.ethereum || (window as any)?.web3) ? (
          <Button
            isLoading={connecting}
            leftIcon={MetaMaskOnboarding.isMetaMaskInstalled() ? ("metamask" as "edit") : undefined}
            onClick={(): void => {
              setConnecting(true);
              activate(injected, undefined, true).catch(error => {
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
            style={{
              height: "20px",
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled() ? "Vesting Details" : "Vesting Details"}
          </Button>
        ) : (
          <Button
            leftIcon={"metamask" as "edit"}
            onClick={() => onboarding.current?.startOnboarding()}
            style={{
              height: "20px",
            }}
          >
            Install Metamask
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Suspense
      fallback={
        <Button
          variant="outline"
          isLoading
          cursor="default !important"
          _hover={{}}
          _active={{}}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: "none",
            height: "20px",
          }}
        >
          {null}
        </Button>
      }
    >
      <ETHBalance />
    </Suspense>
  );
}
