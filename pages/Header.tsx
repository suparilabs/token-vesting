/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import { Navbar, Container, Nav } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";
// import Image, { ImageLoader } from "next/image";

// const myLoader = ({ src, width, quality }) => {
//   return `https://seraproject.org/views/front//images/${src}?w=${width}&q=${quality || 75}`;
// };

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  const { account, chainId } = useWeb3React();
  const { data: balance } = useTokenBalance(chainId !== undefined ? (chainId as number) : 56, account as string, null);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-blue-700">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://seraproject.org/views/front//images/logo.png" width="50px" height="60px" alt="Logo" />
            {/* <Image loader={myLoader as ImageLoader} src="logo.png" alt="SERA" width={60} height={70} /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tokensale" className="text-white text-2xl hover:text-lime-600">
                Token Sale
              </Nav.Link>
              <Nav.Link href="/vesting" className="text-white text-2xl hover:text-lime-600">
                Vesting
              </Nav.Link>
              <Nav.Link href="/presale" className="text-white text-2xl hover:text-lime-600">
                Pre Sale
              </Nav.Link>
              <Nav.Link href="/dashboard" className="text-white text-2xl hover:text-lime-600">
                Dashboard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="bg-yellow-500 px-2 py-1 text-xl">
            <Account triedToEagerConnect={triedToEagerConnect} />
          </div>
          {account && chainId && balance && (
            <div className="ml-2 text-white text-xl">
              | {(balance as TokenAmount).toSignificant(4, { groupSeparator: "," })} SERA
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
