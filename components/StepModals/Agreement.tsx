import React, { useEffect } from "react";
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
} from "../../hooks/useTokenSale";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useETHBalance } from "../../hooks/useETHBalance";

function AgreementModal(props) {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [checkoutShow, setCheckoutShow] = React.useState<boolean>(false);
  const [mining, setMining] = React.useState<boolean>(false);
  const [txStatusMessage, setTxStatusMessage] = React.useState<string>("");

  function handleClick(e) {
    e.preventDefault();
    if (checked) {
      setCheckoutShow(true);
    }
  }

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
            <Modal.Title id="contained-modal-title-vcenter">SIMPLE AGREEMENT FOR FUTURE TOKENS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Issued By BETA GROUP FZE For &quot;SERA TOKEN&quot; THIS SIMPLE AGREEMENT FOR FUTURE TOKENS &quot; SAFT
            &quot;, certifies that in exchange for the &quot;Purchase Amount&quot; by the &quot;Investor&quot;, BETA
            GROUP FZE Limited Liability Establishment &quot;Company&quot;, shall issue to the Investor &quot; SERA
            Tokens &quot; in line with the vesting schedule and, subject to the terms set forth below. 1. Events
            a)Investor Deliveries: Concurrently with the execution of this SAFT, the Investor provides the Company the
            Purchase Amount by digital transfer in accordance with the transfer instructions agreed. If the Company
            satisfies the Milestone, the Company will deliver the Tokens to the Investor&apos;s digital wallet in line
            with the vesting schedule. For the avoidance of doubt, the digital wallet must be under the direct or
            indirect control of the Investor and shall not be under the direct or indirect control of a third-party.
            b)Vesting : 5% at TGE, 3-month cliff then linear vesting for 18 months. c)Purchase Price Per Token : USD
            0.12 2. Definitions &quot; The Company &quot; means the parent company BETA GROUP FZE and their respective
            affiliates. &quot; Milestone &quot; means the Network is operational with Token functionality as determined
            by the Company in its sole discretion. &quot; TGE &quot; means the token generation event. &quot; SAFT
            &quot; is a contract containing a right to receive Tokens in the future, similar in form and content to this
            contract, purchased by Investors prior to the Company completing the Milestone for the purpose of funding
            the Company &apos;s organizational expenses for five years after the date of this contract. By checking this
            box and clicking the &quot; I Agree &quot; button, I agree to comply with and be bound by the Agreement and
            the Purchase Agreement. I acknowledge and accept that all purchases of interests in Tokens from the Company
            during the SAFT Offering are final, and there are no refunds or cancellations except as may be required by
            applicable law or regulation. I further acknowledge and accept that the Company reserves the right to reject
            or accept any SAFT and Purchase Agreement in its sole discretion prior to the closing Date; provided that if
            the Company rejects my SAFT and Purchase Agreement, it shall return or cause the return of the Purchase
            Amount to me.
            <Form>
              <Form.Check type="checkbox" id="agree" label="I Agree" onChange={e => setChecked(!!e.target.checked)} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => handleClick(e)} disabled={!checked}>
              Continue
            </Button>
            {/* <Checkout/> */}
            <Button variant="primary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      )}{" "}
      {checked && checkoutShow && (
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

function Agreement() {
  const { account, chainId } = useWeb3React();
  const { data: busd } = useBUSD(chainId == undefined ? 56 : (chainId as number));
  const { data: usdt } = useUSDT(chainId == undefined ? 56 : (chainId as number));
  const [modalShow, setModalShow] = React.useState(false);
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

  return (
    <>
      <Button
        className="inline-block px-10 py-3.5 bg-gray-200 text-gray-700 font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => setModalShow(true)}
        disabled={!enoughEth || !(enoughBusd || enoughUsdt)}
      >
        Buy Sera Tokens
      </Button>

      <AgreementModal
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
    </>
  );
}

export default Agreement;
