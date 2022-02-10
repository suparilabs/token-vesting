import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTokenSaleContract, useVestingContractAddress } from "../../hooks/useTokenSale";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { attempt } from "lodash";

const CheckoutForm = ({ onSubmit }) => {
  const [amount, setAmount] = React.useState("");
 
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>USDT Amount</Form.Label>
        <Form.Control
          type="amount"
          placeholder="Enter USDT amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};

function CheckoutModal(props): JSX.Element {
  const _busdAmount:Number = 10;
  const { account } = useWeb3React();
  const { data:vesting } = useVestingContractAddress();
  const { data: data2 } = useTokenSaleContract(vesting, _busdAmount);
  
  console.log('data:', vesting);
  console.log('data:', data2);

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

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
          <Button>Buy Tokens with USDT</Button>
          {/* <Button>Buy Tokens with BUSD</Button> */}
          
        <CheckoutForm onSubmit={onFormSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Checkout(props) {
  
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