import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useTokenAllowance,
  useBuyTokensWithBusd,
  useTxApprove,
  useBuyTokensWithUsdt,
  useBUSD,
  useUSDT,
} from "../../hooks/useTokenSale";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";

function CheckoutModal(props): JSX.Element {
  const [busdAmount, setBusdAmount] = React.useState<string>("");
  const [usdtAmount, setUsdtAmount] = React.useState<string>("");
  const { account } = useWeb3React();
  const { data: busd } = useBUSD();
  const { data: usdt } = useUSDT();
  const { data: busdAllowance } = useTokenAllowance(account as string, busd); //check allowance
  const { data: usdtAllowance } = useTokenAllowance(account as string, usdt); //check allowance
  const approveBusdToken = useTxApprove(busd, busdAmount == "" ? BigNumber.from("0") : BigNumber.from(busdAmount).mul(BigNumber.from("10").pow("18"))); // send amount from user
  const approveUsdtToken = useTxApprove(usdt, usdtAmount == "" ? BigNumber.from("0") : BigNumber.from(usdtAmount).mul(BigNumber.from("10").pow("18"))); // send amount from user
  const buyTokensWithBusd = useBuyTokensWithBusd(busdAmount == "" ? BigNumber.from("0") : BigNumber.from(busdAmount).mul(BigNumber.from("10").pow("18")));
  const buyTokensWithUsdt = useBuyTokensWithUsdt(usdtAmount == "" ? BigNumber.from("0") : BigNumber.from(usdtAmount).mul(BigNumber.from("10").pow("18")));
  
  const handleBuyTokenUsingBusd = async amount => {
    if (BigNumber.from(busdAllowance).gte(BigNumber.from(amount).mul(BigNumber.from("10").pow("18")))) {
      console.log("hello ", BigNumber.from(busdAllowance).toString())
      await buyTokensWithBusd();
    } else {
      await approveBusdToken();
      await buyTokensWithBusd();
    }
  };

  const handleBuyTokensUsingUsdt = async amount => {
    if (BigNumber.from(usdtAllowance).gte(BigNumber.from(amount).mul(BigNumber.from("10").pow("18")))) {
      await buyTokensWithUsdt();
    } else {
      await approveUsdtToken();
      await buyTokensWithUsdt();
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
            />
            <Button onClick={() => handleBuyTokenUsingBusd(busdAmount)}>Buy Tokens with BUSD</Button>
          </Form.Group>
          <Form.Group controlId="form_two">
            <Form.Label>USDT Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter USDT amount"
              value={usdtAmount}
              onChange={e => setUsdtAmount(e.target.value)}
            />
            <Button onClick={() => handleBuyTokensUsingUsdt(usdtAmount)}>Buy Tokens with USDT</Button>
          </Form.Group>
        </Form>
        <hr />

        {/* <Button>Buy Tokens with BUSD</Button> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Checkout() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalShow(true)}>Continue</Button>
      <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Checkout;