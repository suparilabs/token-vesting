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
import { useTotalAmount } from "../hooks/usePrivateSale";
import moment from "moment";
import { ethers } from "ethers";

function ETHBalance(): JSX.Element {
  const { account } = useWeb3React();
  const { data } = useTotalAmount(account, true);
  const totalTokens = ethers.utils.formatEther(data);
  return (
    <Container>
     <Card>          
            <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th colSpan={2}>Private Sale</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <th>Price</th>
                    <td>$0.50</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <th>Tokens</th>
                    <td>{totalTokens} SERA TOKENS</td>
                  </tr>
    </tbody>
  </Table>
  </Card.Body>
  </Card>
    </Container>
  );
}

export default function PrivateSale(/*{
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
            {MetaMaskOnboarding.isMetaMaskInstalled() ? "Private Sale" : "Private Sale"}
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
