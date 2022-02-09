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
// import { useETHBalance } from "../hooks/useETHBalance";
// import { useTokenBalance } from "../hooks/useTokenBalance";
import { useStart } from "../hooks/useScheduleDates";
import { useVestingScheduleCountBeneficiary } from "../hooks/useVesting";
import { useVestingContractAddress } from "../hooks/useTokenSale";

function ETHBalance(): JSX.Element {
  const { account } = useWeb3React();
  // const { data } = useETHBalance(account, true);
  // const { data: data1 } = useTokenBalance(account, true);
  const {data:vesting} = useVestingContractAddress();
  const { data: data2 } = useVestingScheduleCountBeneficiary(vesting,account, true);
  const { data: startDate } = useStart(vesting,account, true);
  // const { data: data4 } = useCliff(account, true);
  // const { data: data5 } = useDuration(account, true);

  return (
    <Container>
      <Card>
        <Card.Body>
          {data2 as any}
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
                <td>{startDate}</td>
              </tr>
              <tr>
                <th>3</th>
                <th>Cliff</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>4</th>
                <th>Duration</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>5</th>
                <th>Total Vesting</th>
                <td>{} SERA</td>
              </tr>
              <tr>
                <th>6</th>
                <th>Already Vested</th>
                <td>{} sera tokens</td>
              </tr>
              <tr>
                <th>7</th>
                <th>Already Released</th>
                <td>0</td>
              </tr>
              <tr>
                <th>8</th>
                <th>Releaseable</th>
                <td></td>
              </tr>
              <tr>
                <th>9</th>
                <th>Revocable</th>
                <td>false</td>
              </tr>
              <tr>
                <th>10</th>
                <th>Total Vesting Schedules</th>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
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
