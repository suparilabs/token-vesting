import { useState, useEffect, useRef, Suspense } from "react";
import { Box } from "@chakra-ui/core";
import { Container, Button, Card, Table } from "react-bootstrap";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { TokenAmount } from "@uniswap/sdk";
import { useQueryParameters } from "../hooks/useQueryParameters";
import { QueryParameters } from "../constants";
import { injected } from "../connectors";
import { useETHBalance } from "../hooks/useETHBalance";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useVestingScheduleCountBeneficiary } from "../hooks/usePrivateSale";
import { useStart } from "../hooks/useScheduleDates";

function ETHBalance(): JSX.Element {
  const { account } = useWeb3React();
  const { data } = useETHBalance(account, true);
  const { data:data1 } = useTokenBalance(account, true);
 //const { data:data2 } = useVestingScheduleCountBeneficiary(account, true);
  const { data:data2 } = useStart(account, true);
  //const { data:data4 } = useCliff(account, true);
  //const { data:data5 } = useDuration(account, true);
  
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
                    <td>{}</td>
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
  const onboarding = useRef<MetaMaskOnboarding>();

  const queryParameters = useQueryParameters();
  const requiredChainID = queryParameters[QueryParameters.CHAIN];


  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return null;
  }
  
  else if (typeof account !== "string") {
    return (
      <Box>
        {MetaMaskOnboarding.isMetaMaskInstalled() ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)?.ethereum ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)?.web3 ? (
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
