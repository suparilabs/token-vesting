import { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { Box, Button } from "@chakra-ui/core";
import { Container, Card } from "react-bootstrap";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { TokenAmount } from "@uniswap/sdk";
import { useQueryParameters } from "../hooks/useQueryParameters";
import { QueryParameters } from "../constants";
import { getNetwork, injected } from "../connectors";
import { useETHBalance } from "../hooks/useETHBalance";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { COIN_SYMBOLS } from "../utils";

function ETHBalance(): JSX.Element {
  const { account, chainId } = useWeb3React();
  const { data } = useETHBalance(account, true);
  const { data: data1 } = useTokenBalance(account, true);
  const currencyUnit = chainId && COIN_SYMBOLS[chainId];

  return (
    <Container>
      <Card>
        <Card.Body>
          <h5> Vesting Beneficiary: {account}</h5>
          <h5>
            {" "}
            Balance: {(data as TokenAmount).toSignificant(4, { groupSeparator: "," })} {currencyUnit}
          </h5>
          <h5> Balance: {(data1 as TokenAmount).toSignificant(4, { groupSeparator: "," })} SERA</h5>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default function Account({ triedToEagerConnect }: { triedToEagerConnect: boolean }): JSX.Element | null {
  const { active, error, activate, account, setError } = useWeb3React<Web3Provider>();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();
  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // automatically try connecting network connector where applicable
  const queryParameters = useQueryParameters();
  const requiredChainID = queryParameters[QueryParameters.CHAIN];

  useEffect(() => {
    if (triedToEagerConnect && !active && !error) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      activate(getNetwork(requiredChainID));
    }
  }, [triedToEagerConnect, active, error, requiredChainID, activate]);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return null;
  } else if (!triedToEagerConnect) {
    return null;
  } else if (typeof account !== "string") {
    return (
      <Box>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
            {MetaMaskOnboarding.isMetaMaskInstalled() ? "Connect to MetaMask" : "Connect to Wallet"}
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
