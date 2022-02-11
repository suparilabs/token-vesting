import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTokenAllowance, useBuyTokensWithBusd, useTxApprove, useBuyTokensWithUsdt } from "../../hooks/useTokenSale";
import { useWeb3React } from "@web3-react/core";

function CheckoutModal(props): JSX.Element {
  const [amount, setAmount] = React.useState();
  const { account } = useWeb3React();
  const {data: data1} = useTokenAllowance(account as string); //check allowance
  const approveToken = useTxApprove(account as string, amount as any); // send amount from user
  const buyTokensWithBusd = useBuyTokensWithBusd(amount as any);
  const buyTokensWithUsdt = useBuyTokensWithUsdt(amount as any);
  
  console.log('allowance:', data1);
  console.log('approve:', approveToken);

  const handleBuyTokenUsingBusd = async (amount) => {
    if(data1 > amount) {   
      await buyTokensWithBusd(); 
    } else { 
      await approveToken(); 
      await buyTokensWithBusd();
    };
  }

  const handleBuyTokensUsingUsdt = async (amount) => {
    if(data1 > amount) {   
      await buyTokensWithUsdt(); 
    } else { 
      await approveToken(); 
      await buyTokensWithUsdt();
    };
  }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Checkout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="form_one">
              <Form.Label>BUSD Amount</Form.Label>
              <Form.Control 
              type="amount"
              placeholder="Enter BUSD amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={handleBuyTokenUsingBusd({amount})}>Buy Tokens with BUSD</Button>
            </Form.Group>
            <Form.Group controlId="form_two">
              <Form.Label>USDT Amount</Form.Label>
              <Form.Control 
              type="amount"
              placeholder="Enter USDT amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={handleBuyTokensUsingUsdt({amount})}>Buy Tokens with USDT</Button>
            </Form.Group>
            </Form> 
          <hr/>
          
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
        <Button onClick={() => setModalShow(true)}>
          Continue
        </Button>
  
        <CheckoutModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default Checkout;