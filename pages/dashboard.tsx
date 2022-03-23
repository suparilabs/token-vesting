import React, { useRef } from "react";
import Papa from "papaparse";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import BN from "bignumber.js";
import { 
  useUSDT,
  useBUSD,
  useCliff,
  useDuration,
  useStartSale, 
  useEndSale,
  useAvailableAtTGE,
  useTokenPreSaleAddress,
  usePreSaleFetchOwner,
  useVestingContractAddress,
  useTimeLockContractAddress,
  usePreSaleCoinsSoldInfo,
  useExchangePriceUsdt,
  useExchangePriceBusd,
  useMinBuyAmountUSDT,
  useMaxBuyAmountUSDT,
  useMinBuyAmountBusd,
  useMaxBuyAmountBusd,
  useSetExchangePriceUsdt,
  useSetExchangePriceBusd,
  useSetDuration,
  useSetCliffPeriod,
  useSetAvailableAtTGE,
  useSetBuyAmountRangeBUSD,
  useSetBuyAmountRangeUSDT,
  useWithdrawBUSD,
  useWithdrawUSDT,
  useWithdrawFromVesting,
  useRevokePreSale
 } from "../hooks/useTokenPreSale";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { addresses, desiredChain } from "../constants";
import { toast } from "react-toastify";
import { 
  useCreateBulkVestingSchedule, 
  useSetTimeStamp,
  useTimestampInitialStatusVesting,
  useTimestampStatusVesting,
  usePreVestingToken,
  usePreVestingFetchOwner,
  useStartPreVesting,
  useVestingScheduleTotalAmt,
  useVestingScheduleTotalCount,
  useWithdrawableAmt,
  useSetTimestampPreVesting, 
  useTransferOwnershipVesting,
  useVestingWithdraw,
  useRevoke,
  useIncomingDepositsFinalised
 } from "../hooks/useTokenPreVesting";
import { 
  useBulkDepositTokens, 
  usePreTimelockFetchOwner,
  usePreTimelockToken, 
  useTimestampStatus, 
  useTimestampInitialStatus,
  useTimeperiodValue,
  useSetTimestampPreTimelock,
  useTransferOwnershipTimelock,
  useTransferAccidentallyLockedTokens
 } from "../hooks/useTokenPreTimelock";

import { useTokenBalance } from "../hooks/useTokenBalance";

function Dashboard(): JSX.Element {
  const { chainId, active, account } = useWeb3React();
  const inputRef = useRef<any>();
  const { data: tokenBalance } = useTokenBalance(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    account,
    addresses[chainId == undefined ? desiredChain.chainId : (chainId as number)].ERC20_TOKEN_ADDRESS,
  );
  const [isValidTGE, setIsValidTGE] = React.useState<boolean>(true);
  const [isValidDuration, setIsValidDuration] = React.useState<boolean>(true);
  const [isValidCliff, setIsValidCliff] = React.useState<boolean>(true);
  const [isValidAmount, setIsValidAmount] = React.useState<boolean>(true);
  const [enoughTokenBalance, setEnoughTokenBalance] = React.useState<boolean>(false);

  const [availableTge, setAvailableTge] = React.useState<string>("0");
  const [tges, setTges] = React.useState<any>([]);
  const [duration, setDuration] = React.useState<string>("0");
  const [cliff, setCliff] = React.useState<string>("0");
  const [preSaleCliff, setPreSaleCliff] = React.useState<any>();
  const [preSaleDuration, setPreSaleDuration] = React.useState<any>();
  const [cliffs, setCliffs] = React.useState<any>([]);
  const [round, setRound] = React.useState<string>();
  const [timePeriod, setTimePeriod] = React.useState<any>();
  const [newOwner, setNewOwner] = React.useState<string>("");
  const [withdrawAmt, setWithdrawAmt] = React.useState<any>();
  const [isValidAmt, setIsValidAmt] = React.useState<boolean>(true);
  const [tokenAmt, setTokenAmt] = React.useState<any>();
  const [tokenAddress, setTokenAddress] = React.useState<any>(); 
  const [priceUsdt, setPriceUsdt] = React.useState<any>();
  const [priceBusd, setPriceBusd] = React.useState<any>();
  const [tgeValue, setTgeValue] = React.useState<any>();
  const [saleStatus, setSaleStatus] = React.useState<any>();
  const [minBusdValue, setMinBusdValue] = React.useState<any>();
  const [maxBusdValue, setMaxBusdValue] = React.useState<any>();
  const [minUsdtValue, setMinUsdtValue] = React.useState<any>();
  const [maxUsdtValue, setMaxUsdtValue] = React.useState<any>();
  const [tokenAmtWithdraw, setTokenAmtWithdraw] = React.useState<any>();
  //hooks for seed round
  const [beneficiaries, setBeneficiaries] = React.useState<any>([]);
  const [totalNonVestingAmt, setTotalNonVestingAmt] = React.useState<string>("0");
  const [scheduleID, setScheduleID] = React.useState<any>();
  const [totalVestingAmt, setTotalVestingAmt] = React.useState<any>("0");
  const [nonVestingAmt, setNonVestingAmt] = React.useState<any>("0");
  const [vestingAmt, setVestingAmt] = React.useState<any>([]);
  const [durations, setDurations] = React.useState<any>([]);
  const [revocables, setRevocables] = React.useState<any>([]);
  const [slice, setSlice] = React.useState<any>([]);

  //FOR SEED ROUND
  const sendTokenToPreTimeLockForSeed = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].SEED_PRE_TIME_LOCK,
    totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const sendTokenToPreVestingForSeed = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_VESTING
      : addresses[desiredChain.chainId].SEED_PRE_VESTING,
    totalVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const createBulkVestingScheduleForSeed = useCreateBulkVestingSchedule(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_VESTING
      : addresses[desiredChain.chainId].SEED_PRE_VESTING,
    beneficiaries,
    cliffs,
    durations,
    slice,
    revocables,
    vestingAmt,
    tges,
  );
  const createBulkDepositForSeed = useBulkDepositTokens(
    chainId != undefined
      ? addresses[chainId as number].SEED_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].SEED_PRE_TIME_LOCK,
    beneficiaries,
    nonVestingAmt,
  );
  //FOR PRIVATE ROUND
  const sendTokenToPreTimeLockForPrivateSale = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK,
    totalNonVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalNonVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const sendTokenToPreVestingForPrivateSale = useTokenTransfer(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_VESTING
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_VESTING,
    totalVestingAmt == "" ? BigNumber.from("0") : BigNumber.from(totalVestingAmt),
    chainId == undefined ? desiredChain.chainId : chainId,
  );
  const createBulkVestingScheduleForPrivateSale = useCreateBulkVestingSchedule(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_VESTING
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_VESTING,
    beneficiaries,
    cliffs,
    durations,
    slice,
    revocables,
    vestingAmt,
    tges,
  );
  const createBulkDepositForPrivateSale = useBulkDepositTokens(
    chainId != undefined
      ? addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK
      : addresses[desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK,
    beneficiaries,
    nonVestingAmt,
  );
  //contract addresses 
  const seedPreTimelockAddress = addresses[chainId != undefined ? chainId : desiredChain.chainId].SEED_PRE_TIME_LOCK;
  const seedTokenPreVesting = addresses[chainId != undefined ? chainId : desiredChain.chainId].SEED_PRE_VESTING;
  const privatePreTimelockAddress = addresses[chainId != undefined ? chainId : desiredChain.chainId].PRIVATE_SALE_PRE_TIME_LOCK;
  const privateTokenPreVesting = addresses[chainId != undefined ? chainId : desiredChain.chainId].PRIVATE_SALE_PRE_VESTING;
  const idoTokenPreSaleAddress = addresses[chainId != undefined ? chainId : desiredChain.chainId].IDO_TOKEN_PRE_SALE;
  //web3
  const handleSendTGETokensNow = async e => {
    e.preventDefault();
    if (chainId !== undefined) {
      if (round == "seed") {
        await handleSeedRound();
      } else if (round == "private") {
        await handlePrivateRound();
      } else {
        console.log("ERROR: PLEASE SELECT A ROUND IN THE FORM");
      }
    }
  };

  const notifyTransfer = async (promiseObj, recipientContractName) => {
    await toast.promise(promiseObj, {
      pending: `Sending $SERA -> ${recipientContractName}`,
      success: `Sent $SERA -> ${recipientContractName}👌`,
      error: `Failed sending $SERA -> ${recipientContractName} 🤯"`,
    });
  };

  const notifySaleStatus = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Sale status getting updated`,
      success: `Sale status updated👌`,
      error: `Failed to update the sale status 🤯"`,
    });
  };

  const notifyBulkDepositTokens = async (promiseObj, roundName) => {
    await toast.promise(promiseObj, {
      pending: `Create token lock schedule on pre time lock for ${roundName} round`,
      success: `Created token lock schedule for pre time lock for ${roundName} round👌`,
      error: `Failed to create token lock schedule for ${roundName} round 🤯"`,
    });
  };

  const notifyBulkVestingSchedule = async (promiseObj, roundName) => {
    await toast.promise(promiseObj, {
      pending: `Creating vesting schedule for ${roundName} round`,
      success: `Created vesting schedule for ${roundName} round👌`,
      error: `Failed to create vesting schedule for ${roundName} round 🤯"`,
    });
  };

  const notifySetTimestamp = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting timestamp...`,
      success: `Timestamp is now SET👌`,
      error: `Failed to set the TIMESTAMP 🤯"`,
    });
  };

  const notifySetExchangePrice = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting Exchange Price...`,
      success: `Exchange Price is now SET👌`,
      error: `Failed to set the Exchange Price 🤯"`,
    });
  };

  const notifySetEndSale = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Ending Sale...`,
      success: `Sale has ENDED👌`,
      error: `Failed to end the sale 🤯"`,
    });
  };

  const notifyTransferOwnership = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Transferring Ownership...`,
      success: `Ownership is Successfully Transferred👌`,
      error: `Failed to Transfer Ownership 🤯"`,
    });
  };

  const notifySetBuyAmountBusd = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting Busd`,
      success: `BUSD is successfully SET👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifySetBuyAmountUsdt = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting Busd`,
      success: `TGE value is successfully set👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifySetAvailableAtTge = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Setting TGE Value...`,
      success: `TGE value is successfully set👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifyWhenWithdraw = async (promiseObj) => {
    await toast.promise(promiseObj, {
      pending: `Withdraw in progress...`,
      success: `Withdraw has successfully being made👌`,
      error: `Failed to withdraw 🤯"`,
    });
  };
  //SEED ROUND _ READ CALLS: PRETIMELOCK 
  const {data: ownerAddressSeedPretimelock} = usePreTimelockFetchOwner(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressSeedPretimelock} = usePreTimelockToken(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusSeedTimelock} = useTimestampStatus(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusSeedTimelock} = useTimestampInitialStatus(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timePeriodValue} = useTimeperiodValue(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusSPT} = useIncomingDepositsFinalised(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  
  //SEED ROUND _ PRETIMELOCK WRITE CALLS
  const setPreTimelockTimestamp = useSetTimestampPreTimelock(seedPreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number),timePeriod);
  const setTransferOwnershipTimelock = useTransferOwnershipTimelock(seedPreTimelockAddress, newOwner, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const transferLockedTokensSeedTimelock = useTransferAccidentallyLockedTokens(seedPreTimelockAddress, tokenAddress, tokenAmt, chainId == undefined ? desiredChain.chainId : (chainId as number));
  
  //SEED ROUND _ READ CALLS: PREVESTING
  const {data: ownerAddressSeedPrevesting} = usePreVestingFetchOwner(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressSeedPrevesting} = usePreVestingToken(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusSeedVesting} = useTimestampStatusVesting(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusVesting} = useTimestampInitialStatusVesting(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: startTime}  = useStartPreVesting(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingTotalAmount} = useVestingScheduleTotalAmt(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingTotalCount} = useVestingScheduleTotalCount(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingWithdrawableAmt} = useWithdrawableAmt(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusSPV} = useIncomingDepositsFinalised(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //SEED ROUND _ PREVESTING WRITE CALLS 
  const setPreVestingSeedTimestamp = useSetTimestampPreVesting(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number),timePeriod);
  const setTransferOwnershipSeedVesting = useTransferOwnershipVesting(seedTokenPreVesting, newOwner, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setVestingSeedWithdraw = useVestingWithdraw(seedTokenPreVesting, withdrawAmt, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setRevokeSeedParams = useRevoke(seedTokenPreVesting, withdrawAmt, chainId == undefined ? desiredChain.chainId : (chainId as number));
  
  //PRIVATE ROUND _ READ CALLS: PRETIMELOCK
  const {data: ownerAddressPrivatePretimelock} = usePreTimelockFetchOwner(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressPrivatePretimelock} = usePreTimelockToken(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusPrivateTimelock} = useTimestampStatus(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusPrivateTimelock} = useTimestampInitialStatus(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timePeriodPrivateValue} = useTimeperiodValue(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusPPT} = useIncomingDepositsFinalised(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //PRIVATE ROUND _ PRETIMELOCK WRITE CALLS
  const setPreTimelockPrivateTimestamp = useSetTimestampPreTimelock(privatePreTimelockAddress, chainId == undefined ? desiredChain.chainId : (chainId as number),timePeriod);
  const setTransferOwnershipPrivateTimelock = useTransferOwnershipTimelock(privatePreTimelockAddress, newOwner, chainId == undefined ? desiredChain.chainId : (chainId as number));
  
  //PRIVATE ROUND _ READ CALLS: PREVESTING
  const {data: ownerAddressPrivatePrevesting} = usePreVestingFetchOwner(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressPrivatePrevesting} = usePreVestingToken(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusPrivateVesting} = useTimestampStatusVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusPrivateVesting} = useTimestampInitialStatusVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: startTimePrivate}  = useStartPreVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingPrivateTotalAmount} = useVestingScheduleTotalAmt(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingPrivateTotalCount} = useVestingScheduleTotalCount(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingPrivateWithdrawableAmt} = useWithdrawableAmt(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusPPV} = useIncomingDepositsFinalised(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //PRIVATE ROUND _ PREVESTING WRITE CALLS
  const setPreVestingPrivateTimestamp = useSetTimestampPreVesting(seedTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number),timePeriod);
  const setTransferOwnershipPrivateVesting = useTransferOwnershipVesting(seedTokenPreVesting, newOwner, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setVestingPrivateWithdraw = useVestingWithdraw(seedTokenPreVesting, withdrawAmt, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setRevokePrivateParams = useRevoke(seedTokenPreVesting, withdrawAmt, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //IDO ROUND _ READ CALLS: PRESALE
  const {data: ownerAddressIDOPreSale} = usePreSaleFetchOwner(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressIDOPreSale} = useTokenPreSaleAddress(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressIDOPreVesting} = useVestingContractAddress(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressIDOPretimelock} = useTimeLockContractAddress(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenUSDT} = useUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenBUSD} = useBUSD(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: coinsSold} = usePreSaleCoinsSoldInfo(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: valueExchangePriceUsdt} = useExchangePriceUsdt(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: valueExchangePriceBusd} = useExchangePriceBusd(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: getPreSaleDuration} = useDuration(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: getPreSaleCliff} = useCliff(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: minUsdt} = useMinBuyAmountUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: maxUsdt} = useMaxBuyAmountUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: minBusd} = useMinBuyAmountBusd(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: maxBusd} = useMaxBuyAmountBusd(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: availableAtTGE} = useAvailableAtTGE(chainId == undefined ? desiredChain.chainId : (chainId as number));
  
  //IDO ROUND _ WRITE CALLS: PRESALE
  const setExchangePriceUsdt = useSetExchangePriceUsdt(priceUsdt, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setExchangePriceBusd= useSetExchangePriceBusd(priceBusd, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setPresaleDuration = useSetDuration(chainId == undefined ? desiredChain.chainId : (chainId as number), preSaleDuration);
  const setPresaleCliff = useSetCliffPeriod(chainId == undefined ? desiredChain.chainId : (chainId as number), preSaleCliff);
  const availableAtTGEVal = useSetAvailableAtTGE(chainId == undefined ? desiredChain.chainId : (chainId as number), tgeValue * 100);
  const startSale = useStartSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const endSale = useEndSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setBuyAmountBUSD = useSetBuyAmountRangeBUSD(minBusdValue, maxBusdValue, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const setBuyAmountUSDT = useSetBuyAmountRangeUSDT(minUsdtValue, maxUsdtValue, chainId == undefined ? desiredChain.chainId : (chainId as number))
  const withdrawUSDT = useWithdrawUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const withdrawBUSD = useWithdrawBUSD(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const withdrawFromVesting = useWithdrawFromVesting(tokenAmtWithdraw != undefined ? tokenAmtWithdraw : 0, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const revokePresale = useRevokePreSale(scheduleID != undefined ? scheduleID : 0, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //IDO ROUND _ READ CALLS: PRETIMELOCK
  const {data: ownerAddressIDOPretimelock} = usePreTimelockFetchOwner(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusIDOTimelock} = useTimestampStatus(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusIDOTimelock} = useTimestampInitialStatus(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timePeriodIDOTimelockValue} = useTimeperiodValue(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusIPT} = useIncomingDepositsFinalised(idoTokenPreSaleAddress, chainId == undefined ? desiredChain.chainId : (chainId as number));

  //IDO ROUND _ READ CALLS: PREVESTING
  const {data: ownerAddressIDOPrevesting} = usePreVestingFetchOwner(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: tokenAddressIDOPrevesting} = usePreVestingToken(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampStatusIDOVesting} = useTimestampStatusVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: timestampInitialStatusIDOVesting} = useTimestampInitialStatusVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: startTimeIDO}  = useStartPreVesting(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingIDOTotalAmount} = useVestingScheduleTotalAmt(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingIDOTotalCount} = useVestingScheduleTotalCount(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: prevestingIDOWithdrawableAmt} = useWithdrawableAmt(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));
  const {data: incomingDepositStatusIPV} = useIncomingDepositsFinalised(privateTokenPreVesting, chainId == undefined ? desiredChain.chainId : (chainId as number));

 
  const setPreVestingPrivateTimestampHandler = async(e) => {
    if(timePeriod != undefined || timePeriod != "") {
      const txTimestamp =  await setPreVestingPrivateTimestamp();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimePeriod(0);
    }
  };
  
  const setPreSaleCliffHandler = async(e) => {
    if(preSaleCliff != undefined) {
      const txCliffPeriod =  await setPresaleCliff();
      await notifySetTimestamp(txCliffPeriod.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const setTransferOwnershipPrivateVestingHandler = async(e) => {
    if(newOwner != undefined || newOwner != "") {
      const txTransfer =  await setTransferOwnershipPrivateVesting();
      await notifySetTimestamp(txTransfer.wait(1));
    } else {
      setNewOwner('0x');
    }
  };

  const setVestingPrivateWithdrawHandler = async(e) => {
    if(withdrawAmt != undefined || withdrawAmt != "") {
      const txWithdraw =  await setVestingPrivateWithdraw();
      await notifySetTimestamp(txWithdraw.wait(1));
    } else {
      setWithdrawAmt(0);
    }
  };

  const setRevokePrivateParamsHandler = async(e) => {
    if(scheduleID != undefined || scheduleID != "") {
      const txRevoke =  await setRevokePrivateParams();
      await notifySetTimestamp(txRevoke.wait(1));
    } else {
      setScheduleID(0);
    }
  };

  const setExchangePriceUsdtHandler = async(e) => {
    if(priceUsdt != undefined || priceUsdt != "") {
      const txExchange =  await setExchangePriceUsdt();
      await notifySetExchangePrice(txExchange.wait(1));
    } else {
      setPriceUsdt(0);
    }
  };

  const setExchangePriceBusdHandler = async(e) => {
    if(priceBusd != undefined || priceBusd != "") {
      const txExchange =  await setExchangePriceBusd();
      await notifySetExchangePrice(txExchange.wait(1));
    } else {
      setPriceBusd(0);
    }
  };

  const setTimestampHandlerTimelock = async(e) => {
    if(timePeriod != undefined || timePeriod != "") {
      const txTimestamp =  await setPreTimelockTimestamp();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const setTimestampHandlerPrivateTimelock = async(e) => {
    if(timePeriod != undefined || timePeriod != "") {
      const txTimestamp =  await setPreTimelockPrivateTimestamp();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const setRevokeParam = async(e) => {
    if(scheduleID != undefined || scheduleID != "") {
      const txRevoke =  await setRevokeSeedParams();
      await notifySetTimestamp(txRevoke.wait(1));
    } else {
      setScheduleID(0);
    }
  };

  const setRevokeParamPresale = async(e) => {
    if(scheduleID != undefined || scheduleID != "") {
      const txRevoke =  await revokePresale();
      await notifySetTimestamp(txRevoke.wait(1));
    } else {
      setScheduleID(0);
    }
  };

  const setTimestampHandlerVesting = async(e) => {
    if(timePeriod != undefined || timePeriod != "") {
      const txTimestamp =  await setPreVestingSeedTimestamp();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const setPresaleDurationHandler = async(e) => {
    if(preSaleDuration != undefined || preSaleDuration != "") {
      const txDuration =  await setPresaleDuration();
      await notifySetTimestamp(txDuration.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const setWithdrawVesting = async(e) => {
    if(withdrawAmt != undefined || withdrawAmt != "") {
      const txWithdraw =  await setVestingSeedWithdraw();
      await notifySetTimestamp(txWithdraw.wait(1));
    } else {
      setTimePeriod(0);
    }
  };

  const transferOwnershipHandlerTimelock = async(e) => {
    if(newOwner != "" || newOwner != undefined) {
      const txTransferOwnership = await setTransferOwnershipTimelock();
      await notifyTransferOwnership(txTransferOwnership.wait(1));
    } else { 
      setNewOwner("0x");
    }
  };

  const transferOwnershipHandlerVesting = async(e) => {
    if(newOwner != "" || newOwner != undefined) {
      const txTransferOwnership = await setTransferOwnershipSeedVesting();
      await notifyTransferOwnership(txTransferOwnership.wait(1));
    } else { 
      setNewOwner("0x");
    }
  };

  const transferOwnershipHandlerPrivateVesting = async(e) => {
    if(newOwner != "" || newOwner != undefined) {
      const txTransferOwnership = await setTransferOwnershipPrivateTimelock();
      await notifyTransferOwnership(txTransferOwnership.wait(1));
    } else { 
      setNewOwner("0x");
    }
  };

  
  const setSaleStatusHandler = async(e) => {
    if(saleStatus != "" || saleStatus != undefined) {
      if(saleStatus == "start") {
        const txSaleStatus = await startSale();
        await notifySaleStatus(txSaleStatus.wait(1));
      } else {
        if(saleStatus == "pause" || saleStatus == "end") {
          const txSaleStatus = await endSale();
          await notifySaleStatus(txSaleStatus.wait(1));
        }
      }
    } else { 
      setSaleStatus("0");
    }
  };


  const setAvailableTgeHandler = async(e) => {
    if(tgeValue != undefined) {
      const txTge = await availableAtTGEVal();
      await notifySetAvailableAtTge(txTge.wait(1));
    } else { 
      setNewOwner("0x");
    }
  };

  const setBuyAmountBusdRangeHandler = async(e) => {
    if(minBusdValue != "" || minBusdValue != undefined && maxBusdValue != "" || maxBusdValue != undefined) {
      const txBuyAmt = await setBuyAmountBUSD();
      await notifySetBuyAmountBusd(txBuyAmt.wait(1));
    } else {
      setMinBusdValue(0);
      setMaxBusdValue(0);
    }
  };

  const setBuyAmountUsdtRangeHandler = async(e) => {
    if(minUsdtValue != "" || minUsdtValue != undefined && maxUsdtValue != "" || maxUsdtValue != undefined) {
      const txBuyAmt = await setBuyAmountUSDT();
      await notifySetBuyAmountUsdt(txBuyAmt.wait(1));
    } else {
      setMinUsdtValue(0);
      setMaxUsdtValue(0);
    } 
  };

  const setWithdrawBUSDHandler = async(e) => {
    const txWithdraw = await withdrawBUSD();
    await notifyWhenWithdraw(txWithdraw.wait(1));
  };

  const setWithdrawUSDTHandler = async(e) => {
    const txWithdraw = await withdrawUSDT();
    await notifyWhenWithdraw(txWithdraw.wait(1));
  };

  const setEndSaleHandler = async(e) => {
    const txEndSale = await endSale();
    await notifySetEndSale(txEndSale.wait(1));
  };
  
  const setAccidentalTokensReleaseHandler = async(e) => {
    if(tokenAmt != undefined || tokenAmt != "" && tokenAddress != undefined || tokenAddress != "") {  
      const txRelease = await transferLockedTokensSeedTimelock();
      await notifySetEndSale(txRelease.wait(1));
    } else {
      setTokenAmt(0);
      setTokenAddress(0);
    }
  };

  const setWithdrawFromVesting = async(e) => {
    if(tokenAmtWithdraw != undefined || tokenAmtWithdraw != ""){
      const txWithdraw = await withdrawFromVesting();
      await notifyWhenWithdraw(txWithdraw.wait(1));
    } else {
      setTokenAmtWithdraw(0);
    }
  }

  const handleSeedRound = async () => {
    if (BigNumber.from(totalNonVestingAmt).gt("0")) {
      // transfer tokens to pre time lock
      const sendTokenToPreTimeLockForSeedTx = await sendTokenToPreTimeLockForSeed();
      await notifyTransfer(sendTokenToPreTimeLockForSeedTx.wait(1), "Seed TokenPreTimeLock");

      // create bulk deposit transaction
      const bulkDepositForSeedTx = await createBulkDepositForSeed();
      await notifyBulkDepositTokens(bulkDepositForSeedTx.wait(1), "Seed");
    }

    if (BigNumber.from(totalVestingAmt).gt("0")) {
      // transfer tokens to pre vesting
      const sendTokenToPreVestingForSeedTX = await sendTokenToPreVestingForSeed();
      await notifyTransfer(sendTokenToPreVestingForSeedTX.wait(1), "Seed TokenPreVesting");

      // create bulk vesting schedule
      const vestingScheduleForSeedTx = await createBulkVestingScheduleForSeed();
      await notifyBulkVestingSchedule(vestingScheduleForSeedTx.wait(1), "Seed");
    }
  };

  
  const handlePrivateRound = async () => {
    if (BigNumber.from(totalNonVestingAmt).gt("0")) {
      // transfer tokens to pre time lock
      const sendTokenToPreTimeLockForPrivateSaleTx = await sendTokenToPreTimeLockForPrivateSale();
      await notifyTransfer(sendTokenToPreTimeLockForPrivateSaleTx.wait(1), "PrivateSale TokenPreTimeLock");

      // create bulk deposit transaction
      const bulkDepositForPrivateSaleTx = await createBulkDepositForPrivateSale();
      await notifyBulkDepositTokens(bulkDepositForPrivateSaleTx.wait(1), "PrivateSale");
    }
    
    if (BigNumber.from(totalVestingAmt).gt("0")) {
      // transfer tokens to pre vesting
      const sendTokenToPreVestingForPrivateSaleTX = await sendTokenToPreVestingForPrivateSale();
      await notifyTransfer(sendTokenToPreVestingForPrivateSaleTX.wait(1), "PrivateSale TokenPreVesting");

      // create bulk vesting schedule
      const vestingScheduleForPrivateSaleTx = await createBulkVestingScheduleForPrivateSale();
      await notifyBulkVestingSchedule(vestingScheduleForPrivateSaleTx.wait(1), "PrivateSale");
    }
  };

  const handleChange = e => {
    setRound(e.target.value);
  };

  const parseCSV = (data: any) => {
    const amountsArr = Object.values(data.map(d => BigNumber.from(d.amount).mul(BigNumber.from("10").pow("18"))));
    let totalAmount = BigNumber.from("0");
    for (let i = 0; i < amountsArr.length; i++) {
      totalAmount = totalAmount.add(BigNumber.from(amountsArr[i]));
    }
    setEnoughTokenBalance(BigNumber.from(tokenBalance?.raw.toString()).gte(totalAmount));
    const beneficiariesArr = data.map(d => d.beneficiary);
    setBeneficiaries(beneficiariesArr);
    const cliffsArr = new Array(beneficiariesArr.length).fill(cliff);
    setCliffs(cliffsArr);
    const tges = new Array(beneficiariesArr.length).fill(
      BigNumber.from(new BN(availableTge).multipliedBy("100").toString()),
      0,
    );
    setTges(tges);
    const nonVestingAmountsArr = Object.values(
      amountsArr.map(x =>
        BigNumber.from(x)
          .mul(BigNumber.from(new BN(availableTge.toString()).multipliedBy("100").toString()))
          .div("10000"),
      ),
    );
    setNonVestingAmt(nonVestingAmountsArr);
    const vestingAmountsArr = Object.values(amountsArr.map((x, i) => BigNumber.from(x).sub(nonVestingAmountsArr[i])));
    setVestingAmt(vestingAmountsArr);
    let nonVestingAmountTotal: BigNumber = BigNumber.from(0);
    let vestingAmountTotal: BigNumber = BigNumber.from(0);
    for (let i = 0; i < vestingAmountsArr.length; i++) {
      nonVestingAmountTotal = nonVestingAmountTotal.add(nonVestingAmountsArr[i]);
      vestingAmountTotal = vestingAmountTotal.add(vestingAmountsArr[i]);
    }
    setTotalNonVestingAmt(nonVestingAmountTotal.toString());
    setTotalVestingAmt(vestingAmountTotal.toString());
    const durationArr = new Array(amountsArr.length).fill(BigNumber.from(duration), 0);
    setDurations(durationArr);
    const slicesPerSecondsArr = new Array(amountsArr.length).fill(BigNumber.from("1"), 0);
    setSlice(slicesPerSecondsArr);
    const revocablesArr = new Array(amountsArr.length).fill(false, 0);
    setRevocables(revocablesArr);
  };

  const onFileUpload = () => {
    const input = inputRef ? inputRef.current : 0;
    const reader = new FileReader();
    const [file]: any = input && input.files;
    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target?.result, { header: true });
      if (chainId !== undefined) {
        console.log(csv?.data);
        if (chainId !== undefined) {
          if (csv && csv.data) {
            parseCSV(csv.data);
          }
        }
      } else {
        console.log("Please connect to web3");
      }
    };
    reader.readAsText(file);
  };

  const onChangePresaleCliff = e => {
    e.preventDefault();
    setPreSaleCliff(e.target.value);
    setIsValidCliff(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangePresaleDuration= e => {
    e.preventDefault();
    setPresaleDuration(e.target.value);
    setIsValidDuration(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangePreSaleWithdraw = e => {
    e.preventDefault();
    setTokenAmtWithdraw(e.target.value);
    setIsValidAmount(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  }
  const onChangeMinBusdValue= e => {
    e.preventDefault();
    setMinBusdValue(e.target.value);
  };

  const onChangeMaxBusdValue= e => {
    e.preventDefault();
    setMaxBusdValue(e.target.value);
  };

  const onChangeMinUsdtValue= e => {
    e.preventDefault();
    setMinUsdtValue(e.target.value);
  };

  const onChangeMaxUsdtValue= e => {
    e.preventDefault();
    setMaxUsdtValue(e.target.value);
  };

  const onChangeCliff = e => {
    e.preventDefault();
    setCliff(e.target.value);
    setIsValidCliff(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeDuration = e => {
    e.preventDefault();
    setDuration(e.target.value);
    setIsValidDuration(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeTGE = e => {
    e.preventDefault();
    setAvailableTge(e.target.value);
    setIsValidTGE(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeSetTGE = e => {
    e.preventDefault();
    setTgeValue(e.target.value);
    setIsValidTGE(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeTime = e => {
    e.preventDefault();
    setTimePeriod(e.target.value);
  };

  const onChangeNewAddress = e => {
    e.preventDefault();
    setNewOwner(e.target.value);
  };

  const onChangeRevoke = e => {
    e.preventDefault();
    setScheduleID(e.target.value);
  };

  const onChangeNewAmt = e => {
    e.preventDefault();
    setTokenAmt(e.target.value);
    setIsValidAmt(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeTokenAddress = e => {
    e.preventDefault();
    setTokenAddress(e.target.value);
  };

  const onChangeWithdraw = e => {
    e.preventDefault();
    setWithdrawAmt(e.target.value);
    setIsValidAmt(typeof parseInt(e.target.value) == "number" && parseInt(e.target.value) >= 0);
  };

  const onChangeExchangePriceUsdt = e => {
    e.preventDefault();
    setPriceUsdt(e.target.value);
  };

  const onChangeExchangePriceBusd = e => {
    e.preventDefault();
    setPriceBusd(e.target.value);
  };

  const onChangeSaleStatus = e => {
    e.preventDefault();
    setSaleStatus(e.target.value);
  };
  // const onChange = e => {
  //   e.preventDefault();
  //   setNewOwner(e.target.value);
  // };

  return (
    <div>
      {/* <!-- Section --> */}
      <div id="about-page" className="page">
        <div className="container">
          <div className="row">
            <div className="text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="container card-0 justify-content-center ">
                <div className="card-body px-sm-4 px-0">
                  <div className="row justify-content-center mb-5">
                    <div className="col-md-10 col">
                      <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> PreSale Dashboard</h3>
                      <p className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left">
                        {" "}
                        Send Sera PreSale Setting.
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center round">
                    <div className="col-lg-10 col-md-12 ">
                      <form
                        className="sign-up-form form-1 fadeInUp wow"
                        id="myForm"
                        method="post"
                        action="#"
                        encType="multipart/form-data"
                        data-wow-duration="2s"
                      >
                        <div className="card shadow-lg card-1">
                          {/* <div className="row justify-content-end mb-5"> */}
                            {/* <div className="col-lg-12 col-auto "> */}
                              {/* <button
                                type="button"
                                className="btn btn-primary btn-block"
                                disabled={!active}
                                onClick={handleStartSale}
                              >
                                <small className="font-weight-bold">Start</small>
                              </button> */}
                              {/* <button
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={handleEndSale}
                                disabled={!active}
                              >
                                <small className="font-weight-bold">Stop</small>
                              </button> */}
                              {/* <button type="button" className="btn btn-success btn-block">
                                <small className="font-weight-bold">Transfer Ownership</small>
                              </button>
                              <button type="button" className="btn btn-primary btn-block" onClick={dispCsvData}>
                                <small className="font-weight-bold">Display CSV data</small>
                              </button> */}
                            {/* </div> */}
                          {/* </div> */}
                          <div className="card-body inner-card border">
                            <div className="row justify-content-between text-left">
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Available on tge
                                  <span className="text-danger"> *(in %)</span>
                                </label>{" "}
                                <input
                                  type="number"
                                  id="availableontge"
                                  name="availableontge"
                                  placeholder="Available on tge"
                                  value={availableTge}
                                  onChange={e => onChangeTGE(e)}
                                />{" "}
                              </div>
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Duration<span className="text-danger"> *(in seconds)</span>
                                </label>
                                <input
                                  type="number"
                                  id="Duration"
                                  name="Duration"
                                  placeholder="Duration"
                                  value={duration}
                                  min={0}
                                  step={1}
                                  onChange={e => onChangeDuration(e) /*setDuration(e.target.value)*/}
                                />{" "}
                              </div>
                              {/* <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Cliff period<span className="text-danger"> *</span>
                                </label>
                                <input
                                  type="number"
                                  id="Cliffperiod"
                                  name="Cliffperiod"
                                  placeholder="Cliff period"
                                  value={cliffPeriod}
                                  onChange={e => setCliffPeriod(e.target.value)}
                                />{" "}
                              </div> */}
                            </div>
                            <div className="row justify-content-center text-left">
                              <div className="form-group col-sm-6 flex-column d-flex">
                                {" "}
                                <label className="form-control-label px-3">
                                  Cliff<span className="text-danger"> *(in seconds)</span>
                                </label>
                                <input
                                  type="number"
                                  id="cliff"
                                  name="cliff"
                                  placeholder="cliff"
                                  value={cliff}
                                  min={0}
                                  step={1}
                                  onChange={e => onChangeCliff(e) /*setCliff(e.target.value)*/}
                                />{" "}
                              </div>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files">
                                  <label className="my-auto">Upload private sale or seed round csv file </label>{" "}
                                  <div>
                                    <input
                                      ref={inputRef}
                                      type="file"
                                      disabled={!isValidTGE || !isValidDuration || !isValidCliff}
                                      className="form-control"
                                      onChange={() => onFileUpload()}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="seed"
                                value="seed"
                                checked={round === "seed"}
                                onChange={e => handleChange(e)}
                              />
                              <label className="form-check-label ms-3" htmlFor="seed">
                                SEED Round
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="private"
                                value="private"
                                checked={round === "private"}
                                onChange={e => handleChange(e)}
                              />
                              <label className="form-check-label  ms-3" htmlFor="private">
                                Private Round
                              </label>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-12 col-lg-10 col-12">
                                <div className="row justify-content-end mb-5">
                                  <div className="col-lg-4 col-auto ">
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-block"
                                      onClick={e => handleSendTGETokensNow(e)}
                                      disabled={
                                        !active ||
                                        !enoughTokenBalance ||
                                        !isValidCliff ||
                                        !isValidDuration ||
                                        !isValidTGE
                                      }
                                    >
                                      <small className="font-weight-bold">Send tge tokens now</small>
                                    </button>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">SeedRoundTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusSPT != undefined && incomingDepositStatusSPT == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusSPT != undefined && incomingDepositStatusSPT == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {seedPreTimelockAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressSeedPretimelock}</li>
                            <li className="list-group-item">token : {tokenAddressSeedPretimelock}</li>
                            <li className="list-group-item">timestampset : {timestampStatusSeedTimelock != undefined ? timestampStatusSeedTimelock.toString(): false}</li>
                            <li className="list-group-item">initial timestamp : {timestampInitialStatusSeedTimelock}</li>
                            <li className="list-group-item">timeperiod : {timePeriodValue}</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTimestampHandlerTimelock} disabled={!active || (ownerAddressSeedPretimelock != undefined ? ownerAddressSeedPretimelock != account : false)}>
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                  value={newOwner}
                                  onChange={e => onChangeNewAddress(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={transferOwnershipHandlerTimelock} disabled={!active || (ownerAddressSeedPretimelock != undefined ? ownerAddressSeedPretimelock != account : false)}>
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                              <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                  value={tokenAddress}
                                  onChange={e => onChangeTokenAddress(e)}
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                  value={tokenAmt}
                                  onChange={e => onChangeNewAmt(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setAccidentalTokensReleaseHandler} disabled={!active || (ownerAddressSeedPretimelock != undefined ? ownerAddressSeedPretimelock != account : false)}>
                                    transfer Accidentally Locked Tokens
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">SeedRoundTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusSPV != undefined && incomingDepositStatusSPV == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusSPV != undefined && incomingDepositStatusSPV == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {seedTokenPreVesting}</li>
                            <li className="list-group-item">owner : {ownerAddressSeedPrevesting}</li>
                            <li className="list-group-item">token : {tokenAddressSeedPrevesting}</li>
                            <li className="list-group-item">timestampset : {timestampStatusSeedVesting != undefined? timestampStatusSeedVesting.toString() : false}</li>
                            <li className="list-group-item">initial timestamp : {timestampInitialStatusVesting}</li>
                            <li className="list-group-item">start : {startTime}</li>
                            <li className="list-group-item">vesting schedules total amount : {prevestingTotalAmount} SERA</li>
                            <li className="list-group-item">vesting schedule count : {prevestingTotalCount}</li>
                            <li className="list-group-item">withdrawable amount : {prevestingWithdrawableAmt}</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTimestampHandlerVesting} disabled={!active || (ownerAddressSeedPrevesting != undefined ? ownerAddressSeedPrevesting != account : false)}>
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                  value={newOwner}
                                  onChange={e => onChangeNewAddress(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={transferOwnershipHandlerVesting} disabled={!active || (ownerAddressSeedPrevesting != undefined ? ownerAddressSeedPrevesting != account : false)}>
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                  value={withdrawAmt}
                                  onChange={e => onChangeWithdraw(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setWithdrawVesting} disabled={!active || (ownerAddressSeedPrevesting != undefined ? ownerAddressSeedPrevesting != account : false)}>
                                    Withdraw
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                  value={scheduleID}
                                  onChange={e => onChangeRevoke(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setRevokeParam} disabled={!active || (ownerAddressSeedPrevesting != undefined ? ownerAddressSeedPrevesting != account : false)}>
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">PrivateRoundTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusPPT != undefined && incomingDepositStatusPPT == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusPPT != undefined && incomingDepositStatusPPT == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {privatePreTimelockAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressPrivatePretimelock}</li>
                            <li className="list-group-item">token : {tokenAddressPrivatePretimelock}</li>
                            <li className="list-group-item">timestampset : {timestampStatusPrivateTimelock != undefined ? timestampStatusPrivateTimelock.toString() : false}</li>
                            <li className="list-group-item">initialtimestamp : {timestampInitialStatusPrivateTimelock}</li>
                            <li className="list-group-item">timeperiod : {timePeriodPrivateValue}</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTimestampHandlerPrivateTimelock} disabled={!active || (ownerAddressPrivatePretimelock != undefined ? ownerAddressPrivatePretimelock != account : false)}>
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                  value={newOwner}
                                  onChange={e => onChangeNewAddress(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={transferOwnershipHandlerPrivateVesting} disabled={!active || (ownerAddressPrivatePretimelock != undefined ? ownerAddressPrivatePretimelock != account : false)}>
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" disabled={!active || (ownerAddressPrivatePretimelock != undefined ? ownerAddressPrivatePretimelock != account : false)}>
                                    transfer Accidentally Locked Tokens
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">PrivateRoundTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusPPV != undefined && incomingDepositStatusPPV == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusPPV != undefined && incomingDepositStatusPPV == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {privateTokenPreVesting}</li>
                            <li className="list-group-item">owner : {ownerAddressPrivatePrevesting}</li>
                            <li className="list-group-item">token : {tokenAddressPrivatePrevesting}</li>
                            <li className="list-group-item">timestampset : {timestampStatusPrivateVesting != undefined ? timestampStatusPrivateVesting.toString() : false}</li>
                            <li className="list-group-item">initialtimestamp : {timestampInitialStatusPrivateVesting}</li>
                            <li className="list-group-item">start : {startTimePrivate}</li>
                            <li className="list-group-item">vestingschedulestotalamount : {prevestingPrivateTotalAmount} SERA</li>
                            <li className="list-group-item">vesting schedule count : {prevestingPrivateTotalCount}</li>
                            <li className="list-group-item">withdrawable amount : {prevestingPrivateWithdrawableAmt} SERA</li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="timestamp in seconds"
                                  aria-label="timestamp in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setPreVestingPrivateTimestampHandler} disabled={!active || (ownerAddressPrivatePrevesting != undefined ? ownerAddressPrivatePrevesting != account : false)}>
                                    set Time Stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="new owner"
                                  aria-label="new owner"
                                  aria-describedby="basic-addon2"
                                  value={newOwner}
                                  onChange={e => onChangeNewAddress(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTransferOwnershipPrivateVestingHandler} disabled={!active || (ownerAddressPrivatePrevesting != undefined ? ownerAddressPrivatePrevesting != account : false)}>
                                    transfer Ownership
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                  value={withdrawAmt}
                                  onChange={e => onChangeWithdraw(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setVestingPrivateWithdrawHandler} disabled={!active || (ownerAddressPrivatePrevesting != undefined ? ownerAddressPrivatePrevesting != account : false)}>
                                    Withdraw
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                  value={scheduleID}
                                  onChange={e => onChangeRevoke(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setRevokePrivateParamsHandler} disabled={!active || (ownerAddressPrivatePrevesting != undefined ? ownerAddressPrivatePrevesting != account : false)}>
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>


                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreSale</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              SaleStatus : <span style={{ color: "green" }}>LIVE</span>
                            </li>
                            <li className="list-group-item">Contract Address : {idoTokenPreSaleAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressIDOPreSale}</li>
                            <li className="list-group-item">token : {tokenAddressIDOPreSale}</li>
                            <li className="list-group-item">Vesting : {tokenAddressIDOPreVesting}</li>
                            <li className="list-group-item">TimeLock : {tokenAddressIDOPretimelock}</li>
                            <li className="list-group-item">USDT : {tokenUSDT}</li>
                            <li className="list-group-item">BUSD : {tokenBUSD}</li>
                            <li className="list-group-item">coinsSold : {coinsSold}</li>
                            <li className="list-group-item">exchangePriceUSDT : {valueExchangePriceUsdt !== undefined ? valueExchangePriceUsdt : 0}</li>
                            <li className="list-group-item">exchangePriceBUSD : {valueExchangePriceBusd !== undefined ? valueExchangePriceBusd : 0}</li>
                            <li className="list-group-item">duration : {getPreSaleDuration}</li>
                            <li className="list-group-item">cliff : {getPreSaleCliff}</li>
                            <li className="list-group-item">minBuyAmountUSDT : {minUsdt !== undefined ? minUsdt : 0} USDT</li>
                            <li className="list-group-item">maxBuyAmountUSDT : {maxUsdt !== undefined ? maxUsdt : 0} USDT</li>
                            <li className="list-group-item">minBuyAmountBUSD : {minBusd !== undefined ? minBusd : 0} BUSD</li>
                            <li className="list-group-item">maxBuyAmountBUSD : {maxBusd !== undefined ? maxBusd : 0} BUSD</li>
                            <li className="list-group-item">availableAtTGE : {availableAtTGE !== undefined ? availableAtTGE / 100 : 0}% </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="usdt exchange price"
                                  aria-label="usdt exchange price"
                                  aria-describedby="basic-addon2"
                                  value={priceUsdt}
                                  onChange={e => onChangeExchangePriceUsdt(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setExchangePriceUsdtHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET EXCHANGE PRICE USDT
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="busd exchange price"
                                  aria-label="busd exchange price"
                                  aria-describedby="basic-addon2"
                                  value={priceBusd}
                                  onChange={e => onChangeExchangePriceBusd(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setExchangePriceBusdHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    set Exchange Price BUSD
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="duration in seconds"
                                  aria-label="duration in seconds"
                                  aria-describedby="basic-addon2"
                                  value={preSaleDuration}
                                  onClick={e => onChangePresaleDuration(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setPresaleDurationHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET DURATION
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="cliff in seconds"
                                  aria-label="cliff in seconds"
                                  aria-describedby="basic-addon2"
                                  value={preSaleCliff}
                                  onClick={e => onChangePresaleCliff(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setPreSaleCliffHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET CLIFF
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="time period in seconds"
                                  aria-label="time period in seconds"
                                  aria-describedby="basic-addon2"
                                  value={timePeriod}
                                  onChange={e => onChangeTime(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setTimestampHandlerTimelock} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET time stamp
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="start or pause"
                                  aria-label="start or pause"
                                  aria-describedby="basic-addon2"
                                  value={saleStatus}
                                  onChange={e => onChangeSaleStatus(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setSaleStatusHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET SALE STATUS
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="pct available at TGE"
                                  aria-label="pct available at TGE"
                                  aria-describedby="basic-addon2"
                                  value={tgeValue}
                                  onChange={e => onChangeSetTGE(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setAvailableTgeHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    SET AVAILABLE AT TGE
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    transfer Accidentally Locked Tokens In TimeLock
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="min busd"
                                  aria-label="min busd"
                                  aria-describedby="basic-addon2"
                                  value={minBusdValue}
                                  onChange={e => onChangeMinBusdValue(e)}
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="max busd"
                                  aria-label="max busd"
                                  aria-describedby="basic-addon2"
                                  value={maxBusdValue}
                                  onChange={e => onChangeMaxBusdValue(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setBuyAmountBusdRangeHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    set Buy Amount Range BUSD
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="min usdt"
                                  aria-label="min usdt"
                                  aria-describedby="basic-addon2"
                                  value={minUsdtValue}
                                  onChange={e => onChangeMinUsdtValue(e)}
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="max usdt"
                                  aria-label="max usdt"
                                  aria-describedby="basic-addon2"
                                  value={maxUsdtValue}
                                  onChange={e => onChangeMaxUsdtValue(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setBuyAmountUsdtRangeHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    set Buy Amount Range USDT
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block me-5" type="button" onClick={setWithdrawBUSDHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    withdraw busd
                                  </button>
                                  <button className="btn btn-primary btn-block me-5" type="button" onClick={setWithdrawUSDTHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    withdraw usdt
                                  </button>
                                  <button className="btn btn-primary btn-block me-5" type="button" onClick={setEndSaleHandler} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    end sale
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="token amount"
                                  aria-label="token amount"
                                  aria-describedby="basic-addon2"
                                  value={tokenAmtWithdraw}
                                  onChange={e => onChangePreSaleWithdraw(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setWithdrawFromVesting} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    withdraw From Vesting
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="vesting schedule id"
                                  aria-label="vesting schedule id"
                                  aria-describedby="basic-addon2"
                                  value={scheduleID}
                                  onChange={e => onChangeRevoke(e)}
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-primary btn-block" type="button" onClick={setRevokeParamPresale} disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}>
                                    REVOKE
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreTimeLock</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusIPT != undefined && incomingDepositStatusIPT == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusIPT != undefined && incomingDepositStatusIPT == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {idoTokenPreSaleAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressIDOPretimelock}</li>
                            <li className="list-group-item">token : {tokenAddressIDOPretimelock}</li>
                            <li className="list-group-item">timestampset : {timestampStatusIDOTimelock !== undefined ? timestampStatusIDOTimelock.toString() : 0}</li>
                            <li className="list-group-item">initialtimestamp : {timestampInitialStatusIDOTimelock !== undefined ? timestampInitialStatusIDOTimelock : 0}</li>
                            <li className="list-group-item">timeperiod : {timePeriodIDOTimelockValue !== undefined ? timePeriodIDOTimelockValue : 0}</li>
                          </ul>
                          </div>

                          <div className="mt-5 border">
                          <div className="mt-4 font-weight-bold mx-auto text-center">IDOTokenPreVesting</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                            Incoming Deposits Allowed : 
                              { incomingDepositStatusIPV != undefined && incomingDepositStatusIPV == true && (
                                <span style={{ color: "green" }}>LIVE</span>
                              )}
                              { incomingDepositStatusIPV != undefined && incomingDepositStatusIPV == false && (
                                <span style={{ color: "red" }}>STOPPED</span>
                              )}
                            </li>
                            <li className="list-group-item">Contract Address : {idoTokenPreSaleAddress}</li>
                            <li className="list-group-item">owner : {ownerAddressIDOPrevesting}</li>
                            <li className="list-group-item">token : {tokenAddressIDOPrevesting}</li>
                            <li className="list-group-item">timestampset : {timestampStatusIDOVesting !== undefined ? timestampStatusIDOVesting.toString() : 0}</li>
                            <li className="list-group-item">initialtimestamp : {timestampInitialStatusIDOVesting}</li>
                            <li className="list-group-item">start : {startTimeIDO}</li>
                            <li className="list-group-item">vestingschedulestotalamount : {prevestingIDOTotalAmount} SERA</li>
                            <li className="list-group-item">vesting schedule count : {prevestingIDOTotalCount}</li>
                            <li className="list-group-item">withdrawable amount : {prevestingIDOWithdrawableAmt} SERA</li>
                          </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
