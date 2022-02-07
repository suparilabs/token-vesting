import { Navbar, Container, Nav } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";
import Image from "next/image";

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-blue-700">
        <Container>
          <Navbar.Brand href="#home"><Image src="https://seraproject.org/views/front//images/logo.png" width="60px" height="70px" alt="Logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tokensale" className="text-white text-2xl">Token Sale</Nav.Link>
              <Nav.Link href="/vesting" className="text-white text-2xl">Vesting</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="text-white">
            <Account triedToEagerConnect={triedToEagerConnect} />
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
