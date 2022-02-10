import { useState } from "react";
import React from "react";
import { Navbar, Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";

 function MyVerticallyCenteredModal(props) {
  const [agreementShow, setAgreementShow] = React.useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buy SERA Tokens
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h4>Using</h4>
            </Col>
            <Col xs={6} md={4}>
              <Button variant="dark" onClick={() => setAgreementShow(true)}>BUSD</Button>
            </Col>
            <Col xs={6} md={4}>
            <Button variant="dark" onClick={() => setAgreementShow(true)}>USDT</Button> 
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalSample() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Buy SERA Tokens
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}


export default ModalSample;