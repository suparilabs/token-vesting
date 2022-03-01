/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import Account from "../components/Account";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";
import Image from "next/image";
import Link from 'next/link';

const Header = () => {
  const triedToEagerConnect = useEagerConnect();
  const { account, chainId } = useWeb3React();
  const { data: balance } = useTokenBalance(chainId !== undefined ? (chainId as number) : 56, account as string, null);

  return (
    <div className="navigation">
    <nav className="navbar navbar-light fixed-top">
         <div className="container">
           <a className="navbar-brand" href="<?= $url;?>">
            <Image src="https://seraproject.org/views/front//images/logo.png" width="50px" height="60px" alt="Logo"></Image> 
           </a>
           <ul className="navbar-nav custom d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
             <li className="nav-item">
               <Link href="/vesting">
                 <a className="nav-link">Home</a>
               </Link>
               <Link href="/presale">
                 <a className="nav-link">Presale</a>
               </Link>
               <Link href="/dashboard">
                 <a className="nav-link">Dashboard</a>
               </Link>
              </li>
             <li className="nav-item"><a href="https://seraproject.org/presale" className="nav-link aboutmenu">WhitePaper </a></li>
             </ul>
             <div>
             <Account triedToEagerConnect={triedToEagerConnect} />
             </div>
             {account && chainId && balance && (
            <div className="tokenAmt">
              | {(balance as TokenAmount).toSignificant(4, { groupSeparator: "," })} SERA
            </div>
          )}
    </div>          
    </nav>
    </div>
  );
};

export default Header;
