require('dotenv').config();
import { List } from 'immutable';
import Web3 from 'web3';
import PrivateSale from '../../artifacts/contracts/PrivateSaleContract.sol/PrivateSaleContract.json';
import Token from '../../artifacts/contracts/Token.sol/Token.json';

export const getWeb3 = async () => {
  let web3: Web3;
  if (window.ethereum) {
    const ethereum = window.ethereum;
    web3 = new Web3(ethereum);

    try {
      await (ethereum as any).enable();
    } catch (error) {
      console.log(error);
    }
  } else if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!');
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  const accounts = List(await web3.eth.getAccounts());

  const networkId = await web3.eth.net.getId();

  const tokenContract = new web3.eth.Contract(
    Token, process.env.TOKEN_ADDRESS, networkId
  );
  const privateSale = new web3.eth.Contract(
    PrivateSale, process.env.PRIVATE_SALE_ADDRESS, networkId
  );
  return {
    accounts,
    networkId,
    tokenContract,
    privateSale,
    web3
  };
};