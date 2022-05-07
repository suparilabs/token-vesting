// bsc testnet
import { default as TokenBscTestnet } from "./deployments/bsctestnet/Token.json";
import { default as IDOTokenPreSaleBscTestnet } from "./deployments/bsctestnet/IDOTokenPreSale.json";
import { default as SeedRoundSalePreTimelockBscTestnet } from "./deployments/bsctestnet/SEEDPreTimeLock.json";
import { default as SeedRoundSalePreVestingBscTestnet } from "./deployments/bsctestnet/SEEDPreVesting.json";
import { default as PrivateSalePreTimeLockBscTestnet } from "./deployments/bsctestnet/PrivateSalePreTimeLock.json";
import { default as PrivateSalePreVestingBscTestnet } from "./deployments/bsctestnet/PrivateSalePreVesting.json";

const TypedTokenBscTestnet = TokenBscTestnet as DeploymentType;
const TypedIDOTokenPreSaleBscTestnet = IDOTokenPreSaleBscTestnet as DeploymentType;
const TypedSeedRoundSalePreTimelockBscTestnet = SeedRoundSalePreTimelockBscTestnet as DeploymentType;
const TypedSeedRoundSalePreVestingBscTestnet = SeedRoundSalePreVestingBscTestnet as DeploymentType;
const TypedPrivateSalePreTimeLockBscTestnet = PrivateSalePreTimeLockBscTestnet as DeploymentType;
const TypedPrivateSalePreVestingBscTestnet = PrivateSalePreVestingBscTestnet as DeploymentType;

// bsc
import { default as IDOTokenPreSaleBsc } from "./deployments/bsc/IDOTokenPreSale.json";
import { default as SeedRoundSalePreTimelockBsc } from "./deployments/bsc/SEEDPreTimeLock.json";
import { default as SeedRoundSalePreVestingBsc } from "./deployments/bsc/SEEDPreVesting.json";
import { default as PrivateSalePreTimeLockBsc } from "./deployments/bsc/PrivateSalePreTimeLock.json";
import { default as PrivateSalePreVestingBsc } from "./deployments/bsc/PrivateSalePreVesting.json";

const TypedIDOTokenPreSaleBsc = IDOTokenPreSaleBsc as DeploymentType;
const TypedSeedRoundSalePreTimelockBsc = SeedRoundSalePreTimelockBsc as DeploymentType;
const TypedSeedRoundSalePreVestingBsc = SeedRoundSalePreVestingBsc as DeploymentType;
const TypedPrivateSalePreTimeLockBsc = PrivateSalePreTimeLockBsc as DeploymentType;
const TypedPrivateSalePreVestingBsc = PrivateSalePreVestingBsc as DeploymentType;

// rinkeby
import { default as TokenRinkeby } from "./deployments/rinkeby/Token.json";
import { default as SeedRoundSalePreTimelockRinkeby } from "./deployments/rinkeby/SEEDPreTimeLock.json";
import { default as SeedRoundSalePreVestingRinkeby } from "./deployments/rinkeby/SEEDPreVesting.json";

const TypedTokenRinkeby = TokenRinkeby as DeploymentType;
const TypedSeedRoundSalePreTimelockRinkeby = SeedRoundSalePreTimelockRinkeby as DeploymentType;
const TypedSeedRoundSalePreVestingRinkeby = SeedRoundSalePreVestingRinkeby as DeploymentType;

// chains
import { chains } from "./chain";

const desiredChainId = 4;

export enum QueryParameters {
  INPUT = "input",
  OUTPUT = "output",
  CHAIN = "chain",
}

type DeploymentType = {
  address: string;
};

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

type SaleAddressType = {
  [key: number]: {
    ERC20_TOKEN_ADDRESS: string;
    IDO_TOKEN_PRE_SALE?: string;
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
  },
  56: {
    ERC20_TOKEN_ADDRESS: "0x31640330CD2337E57C9591A2A183Ac4E8a754E87",
    IDO_TOKEN_PRE_SALE: TypedIDOTokenPreSaleBsc.address,
    SEED_PRE_TIME_LOCK: TypedSeedRoundSalePreTimelockBsc.address,
    SEED_PRE_VESTING: TypedSeedRoundSalePreVestingBsc.address,
    PRIVATE_SALE_PRE_TIME_LOCK: TypedPrivateSalePreTimeLockBsc.address,
    PRIVATE_SALE_PRE_VESTING: TypedPrivateSalePreVestingBsc.address,
  },
  4: {
    ERC20_TOKEN_ADDRESS: TypedTokenRinkeby.address,
    SEED_PRE_TIME_LOCK: TypedSeedRoundSalePreTimelockRinkeby.address,
    SEED_PRE_VESTING: TypedSeedRoundSalePreVestingRinkeby.address,
    PRIVATE_SALE_PRE_TIME_LOCK: TypedSeedRoundSalePreTimelockRinkeby.address,
    PRIVATE_SALE_PRE_VESTING: TypedSeedRoundSalePreVestingRinkeby.address,
  },
};

export const desiredChain = chains[desiredChainId];
