/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface TokenSaleInterface extends utils.Interface {
  contractName: "TokenSale";
  functions: {
    "BUSD()": FunctionFragment;
    "USDT()": FunctionFragment;
    "availableAtTGE()": FunctionFragment;
    "buyTokensUsingBUSD(uint256)": FunctionFragment;
    "buyTokensUsingUSDT(uint256)": FunctionFragment;
    "cliff()": FunctionFragment;
    "coinsSold()": FunctionFragment;
    "computeTokensForBUSD(uint256)": FunctionFragment;
    "computeTokensForUSDT(uint256)": FunctionFragment;
    "createVestingSchedule(address,uint256,uint256,uint256,uint256,bool,uint256,uint256)": FunctionFragment;
    "duration()": FunctionFragment;
    "endSale()": FunctionFragment;
    "exchangePriceBUSD()": FunctionFragment;
    "exchangePriceUSDT()": FunctionFragment;
    "maxBuyAmountBUSD()": FunctionFragment;
    "maxBuyAmountUSDT()": FunctionFragment;
    "minBuyAmountBUSD()": FunctionFragment;
    "minBuyAmountUSDT()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revoke(bytes32)": FunctionFragment;
    "saleStatus()": FunctionFragment;
    "setAvailableAtTGE(uint256)": FunctionFragment;
    "setBuyAmountRangeBUSD(uint256,uint256)": FunctionFragment;
    "setBuyAmountRangeUSDT(uint256,uint256)": FunctionFragment;
    "setCliff(uint256)": FunctionFragment;
    "setDuration(uint256)": FunctionFragment;
    "setExchangePriceBUSD(uint256)": FunctionFragment;
    "setExchangePriceUSDT(uint256)": FunctionFragment;
    "setSaleStatus(uint8)": FunctionFragment;
    "timelock()": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "vesting()": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawBUSD()": FunctionFragment;
    "withdrawUSDT()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BUSD", values?: undefined): string;
  encodeFunctionData(functionFragment: "USDT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "availableAtTGE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyTokensUsingBUSD",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyTokensUsingUSDT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "cliff", values?: undefined): string;
  encodeFunctionData(functionFragment: "coinsSold", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "computeTokensForBUSD",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "computeTokensForUSDT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createVestingSchedule",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      boolean,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "duration", values?: undefined): string;
  encodeFunctionData(functionFragment: "endSale", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "exchangePriceBUSD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangePriceUSDT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxBuyAmountBUSD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxBuyAmountUSDT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minBuyAmountBUSD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minBuyAmountUSDT",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "revoke", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "saleStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAvailableAtTGE",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBuyAmountRangeBUSD",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBuyAmountRangeUSDT",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCliff",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDuration",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setExchangePriceBUSD",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setExchangePriceUSDT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSaleStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "timelock", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "vesting", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBUSD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawUSDT",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "BUSD", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "USDT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "availableAtTGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyTokensUsingBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyTokensUsingUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cliff", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "coinsSold", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "computeTokensForBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "computeTokensForUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createVestingSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "duration", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "endSale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "exchangePriceBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangePriceUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxBuyAmountBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxBuyAmountUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minBuyAmountBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minBuyAmountUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "saleStatus", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAvailableAtTGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBuyAmountRangeBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBuyAmountRangeUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setCliff", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setExchangePriceBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setExchangePriceUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSaleStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "timelock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vesting", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawUSDT",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Sold(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Sold"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type SoldEvent = TypedEvent<
  [string, BigNumber],
  { buyer: string; amount: BigNumber }
>;

export type SoldEventFilter = TypedEventFilter<SoldEvent>;

export interface TokenSale extends BaseContract {
  contractName: "TokenSale";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenSaleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    BUSD(overrides?: CallOverrides): Promise<[string]>;

    USDT(overrides?: CallOverrides): Promise<[string]>;

    availableAtTGE(overrides?: CallOverrides): Promise<[BigNumber]>;

    buyTokensUsingBUSD(
      _busdAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buyTokensUsingUSDT(
      _usdtAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cliff(overrides?: CallOverrides): Promise<[BigNumber]>;

    coinsSold(overrides?: CallOverrides): Promise<[BigNumber]>;

    computeTokensForBUSD(
      _busdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    computeTokensForUSDT(
      _usdtAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createVestingSchedule(
      _beneficiary: string,
      _start: BigNumberish,
      _cliff: BigNumberish,
      _duration: BigNumberish,
      _slicePeriodSeconds: BigNumberish,
      _revocable: boolean,
      _amount: BigNumberish,
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    duration(overrides?: CallOverrides): Promise<[BigNumber]>;

    endSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangePriceBUSD(overrides?: CallOverrides): Promise<[BigNumber]>;

    exchangePriceUSDT(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxBuyAmountBUSD(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxBuyAmountUSDT(overrides?: CallOverrides): Promise<[BigNumber]>;

    minBuyAmountBUSD(overrides?: CallOverrides): Promise<[BigNumber]>;

    minBuyAmountUSDT(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revoke(
      vestingScheduleId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    saleStatus(overrides?: CallOverrides): Promise<[number]>;

    setAvailableAtTGE(
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBuyAmountRangeBUSD(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBuyAmountRangeUSDT(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCliff(
      _cliff: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDuration(
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setExchangePriceBUSD(
      _busdPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setExchangePriceUSDT(
      _usdtPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSaleStatus(
      _saleStatus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    timelock(overrides?: CallOverrides): Promise<[string]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vesting(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawBUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawUSDT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  BUSD(overrides?: CallOverrides): Promise<string>;

  USDT(overrides?: CallOverrides): Promise<string>;

  availableAtTGE(overrides?: CallOverrides): Promise<BigNumber>;

  buyTokensUsingBUSD(
    _busdAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buyTokensUsingUSDT(
    _usdtAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cliff(overrides?: CallOverrides): Promise<BigNumber>;

  coinsSold(overrides?: CallOverrides): Promise<BigNumber>;

  computeTokensForBUSD(
    _busdAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  computeTokensForUSDT(
    _usdtAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createVestingSchedule(
    _beneficiary: string,
    _start: BigNumberish,
    _cliff: BigNumberish,
    _duration: BigNumberish,
    _slicePeriodSeconds: BigNumberish,
    _revocable: boolean,
    _amount: BigNumberish,
    _availableAtTGE: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  duration(overrides?: CallOverrides): Promise<BigNumber>;

  endSale(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangePriceBUSD(overrides?: CallOverrides): Promise<BigNumber>;

  exchangePriceUSDT(overrides?: CallOverrides): Promise<BigNumber>;

  maxBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

  maxBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

  minBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

  minBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revoke(
    vestingScheduleId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  saleStatus(overrides?: CallOverrides): Promise<number>;

  setAvailableAtTGE(
    _availableAtTGE: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBuyAmountRangeBUSD(
    _min: BigNumberish,
    _max: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBuyAmountRangeUSDT(
    _min: BigNumberish,
    _max: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCliff(
    _cliff: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDuration(
    _duration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setExchangePriceBUSD(
    _busdPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setExchangePriceUSDT(
    _usdtPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSaleStatus(
    _saleStatus: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  timelock(overrides?: CallOverrides): Promise<string>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vesting(overrides?: CallOverrides): Promise<string>;

  withdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawBUSD(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawUSDT(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BUSD(overrides?: CallOverrides): Promise<string>;

    USDT(overrides?: CallOverrides): Promise<string>;

    availableAtTGE(overrides?: CallOverrides): Promise<BigNumber>;

    buyTokensUsingBUSD(
      _busdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    buyTokensUsingUSDT(
      _usdtAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    cliff(overrides?: CallOverrides): Promise<BigNumber>;

    coinsSold(overrides?: CallOverrides): Promise<BigNumber>;

    computeTokensForBUSD(
      _busdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeTokensForUSDT(
      _usdtAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createVestingSchedule(
      _beneficiary: string,
      _start: BigNumberish,
      _cliff: BigNumberish,
      _duration: BigNumberish,
      _slicePeriodSeconds: BigNumberish,
      _revocable: boolean,
      _amount: BigNumberish,
      _availableAtTGE: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    duration(overrides?: CallOverrides): Promise<BigNumber>;

    endSale(overrides?: CallOverrides): Promise<void>;

    exchangePriceBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    exchangePriceUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    maxBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    maxBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    minBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    minBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    revoke(
      vestingScheduleId: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    saleStatus(overrides?: CallOverrides): Promise<number>;

    setAvailableAtTGE(
      _availableAtTGE: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setBuyAmountRangeBUSD(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setBuyAmountRangeUSDT(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setCliff(_cliff: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setDuration(
      _duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setExchangePriceBUSD(
      _busdPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setExchangePriceUSDT(
      _usdtPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSaleStatus(
      _saleStatus: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    timelock(overrides?: CallOverrides): Promise<string>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vesting(overrides?: CallOverrides): Promise<string>;

    withdraw(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withdrawBUSD(overrides?: CallOverrides): Promise<void>;

    withdrawUSDT(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Sold(address,uint256)"(buyer?: null, amount?: null): SoldEventFilter;
    Sold(buyer?: null, amount?: null): SoldEventFilter;
  };

  estimateGas: {
    BUSD(overrides?: CallOverrides): Promise<BigNumber>;

    USDT(overrides?: CallOverrides): Promise<BigNumber>;

    availableAtTGE(overrides?: CallOverrides): Promise<BigNumber>;

    buyTokensUsingBUSD(
      _busdAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buyTokensUsingUSDT(
      _usdtAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cliff(overrides?: CallOverrides): Promise<BigNumber>;

    coinsSold(overrides?: CallOverrides): Promise<BigNumber>;

    computeTokensForBUSD(
      _busdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeTokensForUSDT(
      _usdtAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createVestingSchedule(
      _beneficiary: string,
      _start: BigNumberish,
      _cliff: BigNumberish,
      _duration: BigNumberish,
      _slicePeriodSeconds: BigNumberish,
      _revocable: boolean,
      _amount: BigNumberish,
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    duration(overrides?: CallOverrides): Promise<BigNumber>;

    endSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangePriceBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    exchangePriceUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    maxBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    maxBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    minBuyAmountBUSD(overrides?: CallOverrides): Promise<BigNumber>;

    minBuyAmountUSDT(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revoke(
      vestingScheduleId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    saleStatus(overrides?: CallOverrides): Promise<BigNumber>;

    setAvailableAtTGE(
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBuyAmountRangeBUSD(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBuyAmountRangeUSDT(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCliff(
      _cliff: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDuration(
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setExchangePriceBUSD(
      _busdPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setExchangePriceUSDT(
      _usdtPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSaleStatus(
      _saleStatus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    timelock(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vesting(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawBUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawUSDT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    availableAtTGE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyTokensUsingBUSD(
      _busdAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buyTokensUsingUSDT(
      _usdtAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cliff(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    coinsSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    computeTokensForBUSD(
      _busdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeTokensForUSDT(
      _usdtAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createVestingSchedule(
      _beneficiary: string,
      _start: BigNumberish,
      _cliff: BigNumberish,
      _duration: BigNumberish,
      _slicePeriodSeconds: BigNumberish,
      _revocable: boolean,
      _amount: BigNumberish,
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    duration(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    endSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangePriceBUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exchangePriceUSDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxBuyAmountBUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxBuyAmountUSDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minBuyAmountBUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minBuyAmountUSDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revoke(
      vestingScheduleId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    saleStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAvailableAtTGE(
      _availableAtTGE: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBuyAmountRangeBUSD(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBuyAmountRangeUSDT(
      _min: BigNumberish,
      _max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCliff(
      _cliff: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDuration(
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setExchangePriceBUSD(
      _busdPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setExchangePriceUSDT(
      _usdtPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSaleStatus(
      _saleStatus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    timelock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vesting(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawBUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawUSDT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
