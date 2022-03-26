import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { toast } from "react-toastify";
import { desiredChain } from "../constants";
import {
  useAvailableAtTGE,
  useBUSD,
  useCliff,
  useDuration,
  useEndSale,
  useExchangePriceBusd,
  useExchangePriceUsdt,
  useGetSaleStatus,
  useMaxBuyAmountBusd,
  useMaxBuyAmountUSDT,
  useMinBuyAmountBusd,
  useMinBuyAmountUSDT,
  usePreSaleCoinsSoldInfo,
  usePreSaleFetchOwner,
  useRevokePreSale,
  useSetAvailableAtTGE,
  useSetBuyAmountRangeBUSD,
  useSetBuyAmountRangeUSDT,
  useSetCliffPeriod,
  useSetDuration,
  useSetExchangePriceBusd,
  useSetExchangePriceUsdt,
  useSetTimestampTokenPresale,
  useStartSale,
  useTimeLockContractAddress,
  useTokenPreSaleAddress,
  useTransferAccidentallyLockedTokensFromTimelock,
  useUSDT,
  useVestingContractAddress,
  useWithdrawBUSD,
  useWithdrawFromVesting,
  useWithdrawUSDT,
} from "../hooks/useTokenPreSale";
import { secondsToDhms } from "../utils";

const TokenPreSale = props => {
  const { chainId, account, active } = useWeb3React();

  const [priceUsdt, setPriceUsdt] = React.useState<any>();
  const [priceBusd, setPriceBusd] = React.useState<any>();
  const [preSaleDuration, setPreSaleDuration] = React.useState<any>();
  const [preSaleCliff, setPreSaleCliff] = React.useState<any>();
  const [tgeValue, setTgeValue] = React.useState<any>();
  const [minBusdValue, setMinBusdValue] = React.useState<any>();
  const [maxBusdValue, setMaxBusdValue] = React.useState<any>();
  const [minUsdtValue, setMinUsdtValue] = React.useState<any>();
  const [maxUsdtValue, setMaxUsdtValue] = React.useState<any>();
  const [tokenAmountWithdraw, setTokenAmountWithdraw] = React.useState<any>();
  const [scheduleID, setScheduleID] = React.useState<any>();
  const [tokenAddress, setTokenAddress] = React.useState<any>();
  const [tokenAmount, setTokenAmount] = React.useState<any>();
  const [saleStatus, setSaleStatus] = React.useState<any>();
  const [timestamp, setTimestamp] = React.useState<any>();

  const { data: currentSaleStatus } = useGetSaleStatus(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );

  const { data: ownerAddressIDOPreSale } = usePreSaleFetchOwner(
    props.tokenPreSaleAddress,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: IDOPreSaleTokenAddress } = useTokenPreSaleAddress(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: IDOPreVestingAddress } = useVestingContractAddress(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: IDOPretimelockAddress } = useTimeLockContractAddress(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: tokenUSDT } = useUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: tokenBUSD } = useBUSD(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: coinsSold } = usePreSaleCoinsSoldInfo(
    props.tokenPreSaleAddress,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: valueExchangePriceUsdt } = useExchangePriceUsdt(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: valueExchangePriceBusd } = useExchangePriceBusd(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const { data: getPreSaleDuration } = useDuration(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: getPreSaleCliff } = useCliff(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: minUsdt } = useMinBuyAmountUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: maxUsdt } = useMaxBuyAmountUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: minBusd } = useMinBuyAmountBusd(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: maxBusd } = useMaxBuyAmountBusd(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const { data: availableAtTGE } = useAvailableAtTGE(chainId == undefined ? desiredChain.chainId : (chainId as number));

  //IDO ROUND _ WRITE CALLS: PRESALE
  const exchangePriceUsdtTx = useSetExchangePriceUsdt(
    priceUsdt,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const exchangePriceBusdTx = useSetExchangePriceBusd(
    priceBusd,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const presaleDurationTx = useSetDuration(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    preSaleDuration,
  );
  const setPresaleCliffTx = useSetCliffPeriod(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    preSaleCliff,
  );
  const availableAtTGEValTx = useSetAvailableAtTGE(
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    tgeValue * 100,
  );
  const startSaleTx = useStartSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const endSaleTx = useEndSale(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const buyAmountBUSDTx = useSetBuyAmountRangeBUSD(
    minBusdValue,
    maxBusdValue,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const buyAmountUSDTTx = useSetBuyAmountRangeUSDT(
    minUsdtValue,
    maxUsdtValue,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const withdrawUSDTTx = useWithdrawUSDT(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const withdrawBUSDTx = useWithdrawBUSD(chainId == undefined ? desiredChain.chainId : (chainId as number));
  const withdrawFromVestingTx = useWithdrawFromVesting(
    tokenAmountWithdraw != undefined ? tokenAmountWithdraw : 0,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const revokeTx = useRevokePreSale(
    scheduleID != undefined ? scheduleID : 0,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
  );
  const transferLockedTokensIDOTimelockTx = useTransferAccidentallyLockedTokensFromTimelock(
    props.tokenPreSaleAddress,
    tokenAddress,
    tokenAmount,
  );

  const setTimestampTx = useSetTimestampTokenPresale(
    props.tokenPreSaleAddress,
    chainId == undefined ? desiredChain.chainId : (chainId as number),
    timestamp,
  );

  const handleCliff = async e => {
    e.preventDefault();
    if (preSaleCliff != undefined) {
      const txCliffPeriod = await setPresaleCliffTx();
      await notifySetTimestamp(txCliffPeriod.wait(1));
    } else {
      setPreSaleCliff(0);
    }
  };

  const handleRevoke = async e => {
    e.preventDefault();
    if (scheduleID != undefined || scheduleID != "") {
      const txRevoke = await revokeTx();
      await notifySetTimestamp(txRevoke.wait(1));
    } else {
      setScheduleID(0);
    }
  };

  const handleExchangePriceUsdt = async e => {
    e.preventDefault();
    if (priceUsdt != undefined || priceUsdt != "") {
      const txExchange = await exchangePriceUsdtTx();
      await notifySetExchangePrice(txExchange.wait(1));
    } else {
      setPriceUsdt(0);
    }
  };

  const handleExchangePriceBusd = async e => {
    e.preventDefault();
    if (priceBusd != undefined || priceBusd != "") {
      const txExchange = await exchangePriceBusdTx();
      await notifySetExchangePrice(txExchange.wait(1));
    } else {
      setPriceBusd(0);
    }
  };

  const handlePresaleDuration = async e => {
    e.preventDefault();
    if (preSaleDuration != undefined || preSaleDuration != "") {
      const txDuration = await presaleDurationTx();
      await notifySetTimestamp(txDuration.wait(1));
    } else {
      setPreSaleDuration(0);
    }
  };

  const handleSaleStatus = async e => {
    e.preventDefault();
    if (saleStatus != "" || saleStatus != undefined) {
      if (saleStatus == "start") {
        const txSaleStatus = await startSaleTx();
        await notifySaleStatus(txSaleStatus.wait(1));
      } else {
        if (saleStatus == "pause" || saleStatus == "end") {
          const txSaleStatus = await endSaleTx();
          await notifySaleStatus(txSaleStatus.wait(1));
        }
      }
    } else {
      setSaleStatus("0");
    }
  };

  const handleAvailableAtTge = async e => {
    e.preventDefault();
    if (tgeValue != undefined) {
      const txTge = await availableAtTGEValTx();
      await notifySetAvailableAtTge(txTge.wait(1));
    } else {
      setTgeValue("0");
    }
  };

  const handleBuyAmountBusdRange = async e => {
    e.preventDefault();
    e.preventDefault();
    if (minBusdValue != "" || (minBusdValue != undefined && maxBusdValue != "") || maxBusdValue != undefined) {
      const txBuyAmt = await buyAmountBUSDTx();
      await notifySetBuyAmountBusd(txBuyAmt.wait(1));
    } else {
      setMinBusdValue(0);
      setMaxBusdValue(0);
    }
  };

  const setBuyAmountUsdtRangeHandler = async e => {
    e.preventDefault();
    if (minUsdtValue != "" || (minUsdtValue != undefined && maxUsdtValue != "") || maxUsdtValue != undefined) {
      const txBuyAmt = await buyAmountUSDTTx();
      await notifySetBuyAmountUsdt(txBuyAmt.wait(1));
    } else {
      setMinUsdtValue(0);
      setMaxUsdtValue(0);
    }
  };

  const setWithdrawBUSDHandler = async e => {
    e.preventDefault();
    const txWithdraw = await withdrawBUSDTx();
    await notifyWhenWithdraw(txWithdraw.wait(1));
  };

  const setWithdrawUSDTHandler = async e => {
    e.preventDefault();
    const txWithdraw = await withdrawUSDTTx();
    await notifyWhenWithdraw(txWithdraw.wait(1));
  };

  const setEndSaleHandler = async e => {
    e.preventDefault();
    const txEndSale = await endSaleTx();
    await notifySetEndSale(txEndSale.wait(1));
  };

  const setIDOAccidentalTokensReleaseHandler = async e => {
    e.preventDefault();
    if (tokenAmount != undefined || (tokenAmount != "" && tokenAddress != undefined) || tokenAddress != "") {
      const txRelease = await transferLockedTokensIDOTimelockTx();
      await notifyTokenRelease(txRelease.wait(1));
    } else {
      setTokenAmount(0);
      setTokenAddress(0);
    }
  };

  const handleWithdrawFromVesting = async e => {
    e.preventDefault();
    if (tokenAmountWithdraw != undefined || tokenAmountWithdraw != "") {
      const txWithdraw = await withdrawFromVestingTx();
      await notifyWhenWithdraw(txWithdraw.wait(1));
    } else {
      setTokenAmountWithdraw(0);
    }
  };

  const handleTimeStamp = async e => {
    e.preventDefault();
    if (timestamp != undefined || timestamp != "") {
      const txTimestamp = await setTimestampTx();
      await notifySetTimestamp(txTimestamp.wait(1));
    } else {
      setTimestamp(0);
    }
  };

  const notifySaleStatus = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Sale status getting updated`,
      success: `Sale status updated👌`,
      error: `Failed to update the sale status 🤯"`,
    });
  };

  const notifySetTimestamp = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Setting timestamp...`,
      success: `Timestamp is now SET👌`,
      error: `Failed to set the TIMESTAMP 🤯"`,
    });
  };

  const notifySetExchangePrice = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Setting Exchange Price...`,
      success: `Exchange Price is now SET👌`,
      error: `Failed to set the Exchange Price 🤯"`,
    });
  };

  const notifySetEndSale = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Ending Sale...`,
      success: `Sale has ENDED👌`,
      error: `Failed to end the sale 🤯"`,
    });
  };

  const notifyTokenRelease = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Releasing Tokens...`,
      success: `Tokens has been released👌`,
      error: `Failed to release tokens 🤯"`,
    });
  };

  const notifySetBuyAmountBusd = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Setting Busd`,
      success: `BUSD is successfully SET👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifySetBuyAmountUsdt = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Setting Busd`,
      success: `TGE value is successfully set👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifySetAvailableAtTge = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Setting TGE Value...`,
      success: `TGE value is successfully set👌`,
      error: `Failed to set the value 🤯"`,
    });
  };

  const notifyWhenWithdraw = async promiseObj => {
    await toast.promise(promiseObj, {
      pending: `Withdraw in progress...`,
      success: `Withdraw has successfully being made👌`,
      error: `Failed to withdraw 🤯"`,
    });
  };

  return (
    <div className="mt-5 border">
      <div className="mt-4 font-weight-bold mx-auto text-center">{props.title}</div>
      <ul className="list-group list-group-flush">
        {currentSaleStatus != undefined && currentSaleStatus == "1" && (
          <li className="list-group-item">
            SaleStatus : <span style={{ color: "green" }}>LIVE</span>
          </li>
        )}
        {currentSaleStatus != undefined && currentSaleStatus == "0" && (
          <li className="list-group-item">
            SaleStatus : <span style={{ color: "red" }}>PAUSED</span>
          </li>
        )}
        <li className="list-group-item">Contract Address : {props.tokenPreSaleAddress}</li>
        <li className="list-group-item">owner : {ownerAddressIDOPreSale}</li>
        <li className="list-group-item">token : {IDOPreSaleTokenAddress}</li>
        <li className="list-group-item">Vesting : {IDOPreVestingAddress}</li>
        <li className="list-group-item">TimeLock : {IDOPretimelockAddress}</li>
        <li className="list-group-item">USDT : {tokenUSDT}</li>
        <li className="list-group-item">BUSD : {tokenBUSD}</li>
        <li className="list-group-item">coinsSold : {coinsSold}</li>
        <li className="list-group-item">
          exchangePriceUSDT : {valueExchangePriceUsdt !== undefined ? `${formatEther(valueExchangePriceUsdt)} USDT` : 0}
        </li>
        <li className="list-group-item">
          exchangePriceBUSD : {valueExchangePriceBusd !== undefined ? `${formatEther(valueExchangePriceBusd)} BUSD` : 0}
        </li>
        <li className="list-group-item">duration : {secondsToDhms(getPreSaleDuration)}</li>
        <li className="list-group-item">cliff : {secondsToDhms(getPreSaleCliff)}</li>
        <li className="list-group-item">minBuyAmountUSDT : {minUsdt !== undefined ? formatEther(minUsdt) : 0} USDT</li>
        <li className="list-group-item">maxBuyAmountUSDT : {maxUsdt !== undefined ? formatEther(maxUsdt) : 0} USDT</li>
        <li className="list-group-item">minBuyAmountBUSD : {minBusd !== undefined ? formatEther(minBusd) : 0} BUSD</li>
        <li className="list-group-item">maxBuyAmountBUSD : {maxBusd !== undefined ? formatEther(maxBusd) : 0} BUSD</li>
        <li className="list-group-item">
          availableAtTGE : {availableAtTGE !== undefined ? availableAtTGE / 100 : 0}%{" "}
        </li>
        <li className="list-group-item">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="usdt exchange price"
              aria-label="usdt exchange price"
              aria-describedby="basic-addon2"
              value={priceUsdt}
              onChange={e => setPriceUsdt(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleExchangePriceUsdt(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setPriceBusd(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleExchangePriceBusd(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setPreSaleDuration(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handlePresaleDuration(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setPreSaleCliff(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleCliff(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              value={timestamp}
              onChange={e => setTimestamp(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleTimeStamp(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setSaleStatus(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleSaleStatus(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setTgeValue(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleAvailableAtTge(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              placeholder="token address"
              aria-label="token address"
              aria-describedby="basic-addon2"
              value={tokenAddress}
              onChange={e => setTokenAddress(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="token amount"
              aria-label="token amount"
              aria-describedby="basic-addon2"
              value={tokenAmount}
              onChange={e => setTokenAmount(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={setIDOAccidentalTokensReleaseHandler}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setMinBusdValue(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="max busd"
              aria-label="max busd"
              aria-describedby="basic-addon2"
              value={maxBusdValue}
              onChange={e => setMaxBusdValue(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={handleBuyAmountBusdRange}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setMinUsdtValue(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="max usdt"
              aria-label="max usdt"
              aria-describedby="basic-addon2"
              value={maxUsdtValue}
              onChange={e => setMaxUsdtValue(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={setBuyAmountUsdtRangeHandler}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
                set Buy Amount Range USDT
              </button>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="input-group">
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block me-5"
                type="button"
                onClick={setWithdrawBUSDHandler}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
                withdraw busd
              </button>
              <button
                className="btn btn-primary btn-block me-5"
                type="button"
                onClick={setWithdrawUSDTHandler}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
                withdraw usdt
              </button>
              <button
                className="btn btn-primary btn-block me-5"
                type="button"
                onClick={setEndSaleHandler}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              value={tokenAmountWithdraw}
              onChange={e => setTokenAmountWithdraw(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleWithdrawFromVesting(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
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
              onChange={e => setScheduleID(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={e => handleRevoke(e)}
                disabled={!active || (ownerAddressIDOPreSale != undefined ? ownerAddressIDOPreSale != account : false)}
              >
                REVOKE
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TokenPreSale;
