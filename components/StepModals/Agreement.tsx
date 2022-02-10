import { boolean } from "hardhat/internal/core/params/argumentTypes";
import React from "react";
import  Checkout from "./Checkout";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function AgreementModal(props) {
  const [checked, setChecked] = React.useState();
  
  function handleClick(e) {
    e.preventDefault();
    if(checked) {
      console.log("clickedd...!!!"); 
      props.onHide();
    } else {
      console.log("error"); 
    }
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
          SIMPLE AGREEMENT FOR FUTURE TOKENS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          Issued By
          BETA GROUP FZE
          For “SERA TOKEN”
          
          THIS   SIMPLE   AGREEMENT   FOR   FUTURE   TOKENS “SAFT”,   certifies   that   in 
          exchange for the “Purchase Amount” by the “Investor”,  BETA GROUP FZE  Limited
          Liability Establishment “Company”, shall issue to the Investor “SERA Tokens” in line with
          the vesting schedule and, subject to the terms set forth below.
          
          1. Events
          a)Investor Deliveries:    Concurrently with the execution of this SAFT, the Investor 
          provides the Company the Purchase Amount by digital transfer in accordance with
          the transfer instructions agreed. If the Company satisfies the Milestone, the Company will deliver the Tokens to 
          the Investor’s digital wallet in line with the vesting schedule. For the avoidance of
          doubt, the digital wallet must be under the direct or indirect control of the Investor
          and shall not be under the direct or indirect control of a third-party.  
          
          b)Vesting   : 5% at TGE, 3-month cliff then linear vesting for 18 months. 
          
          c)Purchase Price Per Token   : USD 0.12 
          
          2. Definitions
          
          “The Company” means the parent company BETA GROUP FZE and their respective affiliates.
          
          “Milestone” means the Network is operational with Token functionality as determined by the Company in its sole discretion.
          
          “TGE” means the token generation event. 
          
          "SAFT" is a contract containing a right to receive Tokens in the future, similar in form and content to this contract, purchased by Investors prior to the Company 
          completing the Milestone for the purpose of funding the Company's organizational expenses for five years after the date of this contract.
          
          By checking this box and clicking the “I Agree” button, I agree to comply with and be bound 
          by the Agreement and the Purchase Agreement. I acknowledge and accept that all purchases 
          of interests in Tokens from the Company during the SAFT Offering are final, and there are
          no refunds or cancellations  except as may be required by applicable  law or regulation. I
          further acknowledge and accept that the Company reserves the right to reject or accept any
          SAFT and Purchase Agreement in its sole discretion prior to the closing Date; provided that 
          if the Company rejects my SAFT and Purchase Agreement, it shall return or cause the return 
          of the Purchase Amount to me.
          <Form>
         
          <div key={`agree`} className="mb-3">
              <Form.Check 
              type='checkbox'
              id="agree"
              label="I Agree"
              onChange={() => setChecked(!checked)}
              />
            </div>
          
            </Form>
        </Modal.Body>
        <Modal.Footer>
        {/* <Button onClick={handleClick}>Continue</Button> */}
        <Checkout/>
        <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  
  function Agreement() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
        <Button className="inline-block px-10 py-3.5 bg-gray-200 text-gray-700 font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out" onClick={() => setModalShow(true)}>
          Buy Sera Tokens
        </Button>
  
        <AgreementModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default Agreement;