import { default as TokenBscTestnet } from "./deployments/bsctestnet/Token.json";
// import { default as TokenSaleBscTestnet } from "./deployments/bsctestnet/TokenSale.json";
// import { default as TokenBsc } from "./deployments/bsc/Token.json";
// import { default as TokenSaleBsc } from "./deployments/bsc/TokenSale.json";

import { default as IDOTokenPreSaleBscTestnet } from "./deployments/bsctestnet/IDOTokenPreSale.json";
import { default as SeedRoundSalePreTimelockBscTestnet } from "./deployments/bsctestnet/SEEDPreTimeLock.json";
import { default as SeedRoundSalePreVestingBscTestnet } from "./deployments/bsctestnet/SEEDPreVesting.json";
import { default as PrivateSalePreTimeLockBscTestnet } from "./deployments/bsctestnet/PrivateSalePreTimeLock.json";
import { default as PrivateSalePreVestingBscTestnet } from "./deployments/bsctestnet/PrivateSalePreVesting.json";

export enum QueryParameters {
  INPUT = "input",
  OUTPUT = "output",
  CHAIN = "chain",
}

type DeploymentType = {
  address: string;
};

const TypedTokenBscTestnet = TokenBscTestnet as DeploymentType;
// const TypedTokenSaleBscTestnet = TokenSaleBscTestnet as { address: string };
const TypedIDOTokenPreSaleBscTestnet = IDOTokenPreSaleBscTestnet as DeploymentType;
const TypedSeedRoundSalePreTimelockBscTestnet = SeedRoundSalePreTimelockBscTestnet as DeploymentType;
const TypedSeedRoundSalePreVestingBscTestnet = SeedRoundSalePreVestingBscTestnet as DeploymentType;
const TypedPrivateSalePreTimeLockBscTestnet = PrivateSalePreTimeLockBscTestnet as DeploymentType;
const TypedPrivateSalePreVestingBscTestnet = PrivateSalePreVestingBscTestnet as DeploymentType;

// const TypedTokenBsc = TokenBsc as {
//   address: string;
// };
// const TypedTokenSaleBsc = TokenSaleBsc as { address: string };

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

type SaleAddressType = {
  [key: number]: {
    ERC20_TOKEN_ADDRESS: string;
    IDO_TOKEN_PRE_SALE: string;
    SEED_PRE_TIME_LOCK: string;
    SEED_PRE_VESTING: string;
    PRIVATE_SALE_PRE_TIME_LOCK: string;
    PRIVATE_SALE_PRE_VESTING: string;
  };
};

export const addresses: SaleAddressType = {
  97: {
    ERC20_TOKEN_ADDRESS: TypedTokenBscTestnet.address,
    IDO_TOKEN_PRE_SALE: TypedIDOTokenPreSaleBscTestnet.address,
    SEED_PRE_TIME_LOCK: TypedSeedRoundSalePreTimelockBscTestnet.address,
    SEED_PRE_VESTING: TypedSeedRoundSalePreVestingBscTestnet.address,
    PRIVATE_SALE_PRE_TIME_LOCK: TypedPrivateSalePreTimeLockBscTestnet.address,
    PRIVATE_SALE_PRE_VESTING: TypedPrivateSalePreVestingBscTestnet.address,
    // TOKEN_SALE_ADDRESS: TypedTokenSaleBscTestnet.address,
  },
  // ,
  // 56: {
  //   ERC20_TOKEN_ADDRESS: TypedTokenBsc.address,
  //   // TOKEN_SALE_ADDRESS: TypedTokenSaleBsc.address,
  // },
};

export const desiredChain = {
  chainId: 97,
  network: "bsctestnet",
};
