/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import { Navbar, Container, Nav } from "react-bootstrap";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";
import Image, { ImageLoader } from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://seraproject.org/views/front//images/${src}?w=${width}&q=${quality || 75}`;
};

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  const { account, chainId } = useWeb3React();
  const { data: balance } = useTokenBalance(chainId !== undefined ? (chainId as number) : 56, account as string, null);

  return (
    <div className="navigation">
    <nav className="navbar navbar-light fixed-top">
         <div className="container">
           <a className="navbar-brand" href="<?= $url;?>">
             {/* <Image src="https://seraproject.org/views/front//images/logo.png" width="50px" height="60px" alt="Logo"></Image> */}
           </a>
           <ul className="navbar-nav custom d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
             <li className="nav-item"><a href="/vesting" className="nav-link">Home</a></li>
             <li className="nav-item"><a href="/tokensale" className="nav-link">Presale</a></li>
             <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
             <li className="nav-item"><a href="https://seraproject.org/presale" className="nav-link aboutmenu">WhitePaper </a></li>
             </ul>
             <div>
             <Account triedToEagerConnect={triedToEagerConnect} />
             </div>
             {account && chainId && balance && (
            <div className="nav-item">
              | {(balance as TokenAmount).toSignificant(4, { groupSeparator: "," })} SERA
            </div>
          )}
    </div>          
    </nav>
    </div>
  );
};

export default Header;
