import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
import Header from "./Header";
import Footer from "./Footer";
import { Modal, Button, Form } from "react-bootstrap";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {
  useTokenAllowance,
  useBuyTokensWithBusd,
  useTxApprove,
  useBuyTokensWithUsdt,
  useBUSD,
  useUSDT,
} from "../hooks/useTokenSale";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useETHBalance } from "../hooks/useETHBalance";

const options: Highcharts.Options = {
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 160,
            depth: 45
        }
    },
   series: [
    {
      name: "Tokenomics",
      colorByPoint: true,
      type: "pie",
      data: [
        {
          name: "Liquidity",
          y: 2,
        },
        {
          name: "SEED ROUND",
          y: 10,
        },
        {
          name: "Private Sale",
          y: 10,
        },
        {
          name: "Public Sale",
          y: 1.5,
        },
        {
          name: "Team",
          y: 18,
        },
        {
          name: "Marketing",
          y: 7.5,
        },
        {
          name: "Ecosystem",
          y: 25,
        },
        {
          name: "Advisors",
          y: 10,
        },
        {
          name: "Treasury and Reserve",
          y: 6,
        },
        {
          name: "Staking",
          y: 10,
        },
      ],
    },
  ],
};

// "rgb(10, 3, 255)",
// "rgb(191, 191, 243)",
// "rgb(192, 208, 242)",
// "rgb(161, 198, 250)",
// "rgb(101, 173, 255)",
// "rgb(44, 142, 249)",
// "rgb(69, 167, 255)",
// "rgb(1,121,243)",
// "rgb(26,146,255)",
// "rgb(1,121,243)",
// "rgba(1,121,243,0.1)",
// "rgba(1,121,243,0.2)",

function PresaleModal(props) {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [checkoutShow, setCheckoutShow] = React.useState<boolean>(false);
  const [mining, setMining] = React.useState<boolean>(false);
  const [txStatusMessage, setTxStatusMessage] = React.useState<string>("");

  const [busdAmount, setBusdAmount] = React.useState<string>("");
  const [usdtAmount, setUsdtAmount] = React.useState<string>("");
  const { data: busdAllowance } = useTokenAllowance(props.account as string, props.busd); //check allowance
  const { data: usdtAllowance } = useTokenAllowance(props.account as string, props.usdt); //check allowance
  const approveBusdToken = useTxApprove(
    props.busd,
    busdAmount == "" ? BigNumber.from("0") : BigNumber.from(busdAmount).mul(BigNumber.from("10").pow("18")),
    props.chainId,
  ); // send amount from user
  const approveUsdtToken = useTxApprove(
    props.usdt,
    usdtAmount == "" ? BigNumber.from("0") : BigNumber.from(usdtAmount).mul(BigNumber.from("10").pow("18")),
    props.chainId,
  ); // send amount from user
  const buyTokensWithBusd = useBuyTokensWithBusd(
    busdAmount == "" ? BigNumber.from("0") : BigNumber.from(busdAmount).mul(BigNumber.from("10").pow("18")),
    props.chainId !== undefined ? props.chainId : 56,
  );
  const buyTokensWithUsdt = useBuyTokensWithUsdt(
    usdtAmount == "" ? BigNumber.from("0") : BigNumber.from(usdtAmount).mul(BigNumber.from("10").pow("18")),
    props.chainId !== undefined ? props.chainId : 56,
  );
  const handleBuyTokenUsingBusd = async amount => {
    try {
      if (BigNumber.from(busdAllowance).gte(BigNumber.from(amount).mul(BigNumber.from("10").pow("18")))) {
        setMining(true);
        setTxStatusMessage("Transaction is being processed...");
        await buyTokensWithBusd();
        setMining(false);
        setTxStatusMessage("You got 2% SERA at TGE and rest vested.");
      } else {
        setMining(true);
        setTxStatusMessage("Transaction is being processed...");
        const tx = await approveBusdToken();
        await tx.wait(1);
        await buyTokensWithBusd();
        setMining(false);
        setTxStatusMessage("You got 2% SERA at TGE and rest vested.");
      }
    } catch (e: any) {
      setTxStatusMessage(e?.message as string);
      setMining(false);
    }
  };

  const handleBuyTokensUsingUsdt = async amount => {
    try {
      if (BigNumber.from(usdtAllowance).gte(BigNumber.from(amount).mul(BigNumber.from("10").pow("18")))) {
        setTxStatusMessage("Transaction is being processed...");
        setMining(true);
        await buyTokensWithUsdt();
        setMining(false);
        setTxStatusMessage("You got 2% SERA at TGE and rest vested.");
      } else {
        setTxStatusMessage("Transaction is being processed...");
        setMining(true);
        const tx = await approveUsdtToken();
        await tx.wait(1);
        await buyTokensWithUsdt();
        setMining(false);
        setTxStatusMessage("You got 2% SERA at TGE and rest vested.");
      }
    } catch (e: any) {
      setTxStatusMessage(e?.message);
      setMining(false);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
       {(!checked || !checkoutShow) && (
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="form_one">
                <Form.Label>BUSD Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter BUSD amount"
                  value={busdAmount}
                  onChange={e => setBusdAmount(e.target.value)}
                  disabled={mining || !props.enoughBusd}
                />
                <Button onClick={() => handleBuyTokenUsingBusd(busdAmount)} disabled={mining || !props.enoughBusd}>
                  Buy Tokens with BUSD
                </Button>
                <span>{props && props.busdBalance && props.busdBalance.toFixed(2)} BUSD</span>
              </Form.Group>
              <Form.Group controlId="form_two">
                <Form.Label>USDT Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter USDT amount"
                  value={usdtAmount}
                  onChange={e => setUsdtAmount(e.target.value)}
                  disabled={mining || !props.enoughUsdt}
                />
                <Button onClick={() => handleBuyTokensUsingUsdt(usdtAmount)} disabled={mining || !props.enoughUsdt}>
                  Buy Tokens with USDT
                </Button>
                <span>{props && props.usdtBalance && props.usdtBalance.toFixed(2)} USDT</span>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {mining && <div>{txStatusMessage}</div>}
            <Button variant="primary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </div>
       )}
    </Modal>
  );
}

function StageData(props) {
  return (
    <div className="">
      <div className="w-fit text-sm font-normal bg-slate-300 rounded pr-2 pl-2 pt-2 pb-2">{props.date}</div>
      <div className="rounded  box-border w-64 border-1 border-slate-300 text-left mb-2">
        <div className="font-bold text-xl ml-2  mt-2">{props.round}</div>
        <div>
          <span className="font-medium ml-2">Price:</span> {props.price}
        </div>
        <div>
          <span className="font-medium ml-2">Tokens:</span> {props.tokens}
        </div>
      </div>
    </div>
  );
}

function Presale() {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [checkoutShow, setCheckoutShow] = React.useState<boolean>(false);
  const [modalShow, setModalShow] = React.useState(false);

  const { account, chainId } = useWeb3React();
  const { data: busd } = useBUSD(chainId == undefined ? 56 : (chainId as number));
  const { data: usdt } = useUSDT(chainId == undefined ? 56 : (chainId as number));
  const { data: busdBalance } = useTokenBalance(chainId as number, account, busd as string);
  const { data: usdtBalance } = useTokenBalance(chainId as number, account, usdt as string);
  const { data: ethBalance } = useETHBalance(account);
  const [enoughBusd, setEnoughBusd] = React.useState<boolean>(false);
  const [enoughUsdt, setEnoughUsdt] = React.useState<boolean>(false);
  const [enoughEth, setEnoughEth] = React.useState<boolean>(false);

  useEffect(() => {
    busdBalance !== undefined && setEnoughBusd(busdBalance.equalTo("1000") || busdBalance.greaterThan("1000"));
    usdtBalance !== undefined && setEnoughUsdt(usdtBalance.equalTo("1000") || usdtBalance.greaterThan("1000"));
    ethBalance !== undefined && setEnoughEth(ethBalance.greaterThan("0"));
  }, [busdBalance, usdtBalance, ethBalance, account]);

  function handleClick(e) {
    e.preventDefault();
    setModalShow(true);
    if (checked) {
      setCheckoutShow(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="text-center pt-6">
        <div className="text-3xl pb-10 font-bold">SERA is the first enterprise resource planning application "ERP" that uses public blockchain.</div>
        
        <div className="text-3xl pb-2 font-bold mt-1 text-blue-700">PRIVATE SALE ROUND ONE</div>
        <button className="rounded-lg bg-stone-100 text-black text-lg w-80 h-14 border-1">Private Sale Price: $0.12</button>
        <div className="text-3xl pt-3 font-bold mt-1 text-blue-700">JUST ONE SIMPLE STEP TO BUY!</div>
        {/* box for presale */}
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1 mt-4">
            <div className="col-span-2">
              <div className="box-border bg-stone-100 mb-20 w-90 p-4 rounded-2xl border-1 ...">
                <div className="text-3xl font-sans pt-6 pb-8 font-semibold">
                  {" "}
                  Participate Now in <span className="text-blue-700">Presale</span>
                </div>
                <div className="text-lg"> Participate in one of the best chances, Just one round at the cheapest price!</div>
                <div className="text-lg font-semibold mt-4 mb-4"> Please check to Agreement before you proceed.</div>
                <input type="checkbox" className="checked:bg-blue-500 ..." id="agree" onChange={e => setChecked(!!e.target.checked)} /> I Agree to Sera Terms and Conditions
                <div className="mt-3">
                  {/* <Agreement /> */}
                  {/* onClick={e => handleClick(e)} disabled={!checked} */}
                <button className="rounded-full bg-blue-700 text-white text-lg w-48 h-12 border-1 hover:bg-green-400" 
                onClick={e => handleClick(e)} disabled={!checked || !enoughEth || !(enoughBusd || enoughUsdt)}>Buy Sera Now</button> 
                <PresaleModal show={modalShow} onHide={() => setModalShow(false)} chainId={chainId} account={account} busd={busd} usdt={usdt} busdBalance={busdBalance} usdtBalance={usdtBalance} enoughBusd={enoughBusd} enoughUsdt={enoughUsdt} />
                </div>
                <div className="text-3xl font-bold mt-3 mb-3 text-green-700">We Live Now!</div>
                
                <Countdown className="text-5xl font-semibold text-black" date={Date.now() + 5000000000} />
                <div className="text-zinc-500">
                    <span className="ml-4">days</span>
                    <span className="ml-4">hours</span>
                    <span className="ml-4">minutes</span>
                    <span className="ml-4">seconds</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-blue-700">TOKEN DISTRIBUTION</div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        {/* call footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Presale;
