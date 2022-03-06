import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
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
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  colors: [
    "#BFBFF3",
    "#C0D0F2",
    "#A1C6FA",
    "#65ADFF",
    "#2C8EF9",
    "#0179F3",
    "#0A03FF",
    "#3522F8",
    "#5651E9",
    "#0A03FF",
    "#A19FF3",
    "#65ADFF",
  ],
  plotOptions: {
    pie: {
      innerSize: 210,
      depth: 45,
    },
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
  credits: {
    enabled: false,
  },
};

function PresaleModal(props) {
  const [checked] = React.useState<boolean>(false);
  const [checkoutShow] = React.useState<boolean>(false);
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
            <Modal.Title id="contained-modal-title-vcenter">
              <h4>Purchase SERA Token</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="form_one">
                <Form.Label className="amtLabel">BUSD Amount</Form.Label>
                <Form.Control
                  type="number"
                  className="amtTextbox"
                  placeholder="Enter BUSD amount"
                  value={busdAmount}
                  onChange={e => setBusdAmount(e.target.value)}
                  disabled={mining || !props.enoughBusd}
                />
                <Button
                  className="amtButton"
                  onClick={() => handleBuyTokenUsingBusd(busdAmount)}
                  disabled={mining || !props.enoughBusd}
                >
                  Buy Tokens with BUSD
                </Button>
                <span className="buylink">
                  Available Balance: {props && props.busdBalance && props.busdBalance.toFixed(2)} BUSD
                </span>
              </Form.Group>
              <Form.Group controlId="form_two">
                <Form.Label className="amtLabel">USDT Amount</Form.Label>
                <Form.Control
                  type="number"
                  className="amtTextbox"
                  placeholder="Enter USDT amount"
                  value={usdtAmount}
                  onChange={e => setUsdtAmount(e.target.value)}
                  disabled={mining || !props.enoughUsdt}
                />
                <Button
                  className="amtButton"
                  onClick={() => handleBuyTokensUsingUsdt(usdtAmount)}
                  disabled={mining || !props.enoughUsdt}
                >
                  Buy Tokens with USDT
                </Button>
                <span className="buylink">
                  Available Balance: {props && props.usdtBalance && props.usdtBalance.toFixed(2)} USDT
                </span>
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

function Presale(): JSX.Element {
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
    console.log(checkoutShow);
    if (checked) {
      setCheckoutShow(true);
    }
  }

  return (
    <div>
      {/* <!-- Start Page --> */}
      <div id="about-page" className="page">
        <div id="about-page" className="page">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="heading heading2">
                  <h2 className="title">Private Sale Round One</h2>
                  <div className="about-image Privatepage">Private Sale Price: $0.12</div>

                  <h2 className="title">Just One simple step to buy!</h2>
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 Presale_side">
                <div className="heading heading2">
                  <h2 className="titlenew">
                    Participate Now in <span className="titlespan">Presale</span>
                  </h2>
                </div>

                <div className="text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <p>Participate in one of the best chances, Just one round at the cheapest price!</p>
                </div>
                <div className="about-image buycontainer">
                  <h2 className="titlenew2">Please check to Agreement before you proceed.</h2>
                  <div className="buylinkSection">
                    <input
                      id="terms"
                      type="checkbox"
                      name="terms"
                      value="on"
                      onChange={e => setChecked(!!e.target.checked)}
                    />
                    <a href="presale.pdf" className="buylink" target="_blank">
                      {" "}
                      I Agree to Sera Terms And Conditions{" "}
                    </a>
                  </div>
                  {/*  */}

                  <p className="titlespanbuynot">You Must Agree to Sera Terms And Conditions</p>

                  <div className="wrap">
                    <button
                      type="button"
                      id="trem_check"
                      className="btn btn-light trem_check"
                      onClick={e => handleClick(e)}
                      disabled={!checked || !enoughEth || !(enoughBusd || enoughUsdt)}
                    >
                      {" "}
                      Buy SERA Now{" "}
                    </button>
                    {/* SHOW PRESALE MODAL */}
                    <PresaleModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      chainId={chainId}
                      account={account}
                      busd={busd}
                      usdt={usdt}
                      busdBalance={busdBalance}
                      usdtBalance={usdtBalance}
                      enoughBusd={enoughBusd}
                      enoughUsdt={enoughUsdt}
                    />
                  </div>
                </div>
                <div className="heading">
                  <h2 className="titlenew">We will be live in</h2>
                  <h2 className="titlespanbuynot2"> We are live Now !</h2>
                  <div className="titleCountDown">
                    <Countdown date={Date.now() + 5000000000} className="countdown" />
                  </div>
                </div>
                {/* TIMER */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Section --> */}
        <section id="about-page" className="page">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-112 col-sm-12 col-xs-12">
                <div className="heading">
                  <h2 className="title">Token Distribution</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-xs-12">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </div>
        </section>
      </div>
      {account == undefined && (
        <section id="about-page" className="page">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-112 col-sm-12 col-xs-12">
                <div className="heading">
                  <h2 className="title"> Please Install and Connect to Metamask Wallet </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <!-- Footer --> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Presale;
