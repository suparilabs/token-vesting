import { Navbar, Container, Nav } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SERA</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tokensale">Token Sale</Nav.Link>
              <Nav.Link href="/vesting">Vesting</Nav.Link>
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
