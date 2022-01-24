import { NetworkConnector } from "@web3-react/network-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { INFURA_PREFIXES } from "./utils";

export function getNetwork(defaultChainId = 1): NetworkConnector {
  return new NetworkConnector({
    urls: [1, 3, 4, 5, 42, 31337, 1337].reduce((urls, chainId) => {
      return Object.assign(urls, {
        [chainId]:
          chainId == 31337 || chainId == 1337
            ? `http://localhost:8545`
            : `https://${INFURA_PREFIXES[chainId]}.infura.io/v3/79afc96778564bdf97fc989ed9310e32`,
      });
    }, {}),
    defaultChainId,
  });
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337, 31337] });
