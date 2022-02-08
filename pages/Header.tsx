/* eslint-disable @next/next/no-img-element */
import { Navbar, Container, Nav } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";
// import Image, { ImageLoader } from "next/image";

// const myLoader = ({ src, width, quality }) => {
//   return `https://seraproject.org/views/front//images/${src}?w=${width}&q=${quality || 75}`;
// };

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-blue-700">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://seraproject.org/views/front//images/logo.png" width="60px" height="70px" alt="Logo" />
            {/* <Image loader={myLoader as ImageLoader} src="logo.png" alt="SERA" width={60} height={70} /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tokensale" className="text-white text-2xl">
                Token Sale
              </Nav.Link>
              <Nav.Link href="/vesting" className="text-white text-2xl">
                Vesting
              </Nav.Link>
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
