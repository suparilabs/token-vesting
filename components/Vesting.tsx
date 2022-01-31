import { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { Box,Button } from "@chakra-ui/core";
import { Container, Card, Table } from "react-bootstrap";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
// import { useQueryParameters } from "../hooks/useQueryParameters";
// import { QueryParameters } from "../constants";
import { injected } from "../connectors";
import { useVestingSchedule } from "../hooks/usePrivateSale";
import moment from "moment";
import { ethers } from "ethers";

function ETHBalance(): JSX.Element {
  const { account } = useWeb3React();
  const { data } = useVestingSchedule(account, true);
  const detailsArray = data.split(',');
  const cliff = moment.unix(detailsArray[2]).format("dddd, MMMM Do, YYYY h:mm:ss A");
  const start = moment.unix(detailsArray[3]).format("dddd, MMMM Do, YYYY h:mm:ss A");
  const duration = moment.unix(detailsArray[4]).format("dddd, MMMM Do, YYYY h:mm:ss A");
  const totalAmount = ethers.utils.formatEther(detailsArray[7]);
  return (
    <>
    <Container>
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
                    <td>{totalAmount} sera tokens  <Button> Release</Button></td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <th>Already Released</th>
                    <td>{detailsArray[8]} sera tokens</td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <th>Revocable</th>
                    <td>{detailsArray[9]}</td>
                  </tr>
    </tbody>
  </Table>
  </Card.Body>
  </Card>
  </Container>
  </>
  )};

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
          >
            {MetaMaskOnboarding.isMetaMaskInstalled() ? "Vesting Details" : "Vesting Details"}
          </Button>
        ) : (
          <Button leftIcon={"metamask" as "edit"} onClick={() => onboarding.current?.startOnboarding()}>
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
