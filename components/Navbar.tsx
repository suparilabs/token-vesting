import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "../hooks/useEagerConnect";

import Account from "./Account";
import ETHBalance from "./ETHBalance";
import TokenBalance from "./TokenBalance";
const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
const Navbar = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;
  return (
    <header className='flex flex-row bg-black relative justify-items-end shadow-md'>
    
    <a href='#'>
          <h1 className='font-bold py-6 px-6  text-white text-lg'>GALAXY WAR</h1>
    </a>
      <div className="flex flex-wrap flex-row py-6 px-6 ">
        
      
      <div className="text-white">
      <Account triedToEagerConnect={triedToEagerConnect} />

      
      </div>
      {isConnected && (
         <div className="text-white px-10">
            <ETHBalance />
         </div>
          
        )}
      </div>
      
      
    
    
    
  </header>
  );
}

export default Navbar;