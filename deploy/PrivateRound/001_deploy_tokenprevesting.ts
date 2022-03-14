import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = await hre.getChainId();
  const token = await hre.deployments.get("Token");
  let tokenAddress = token.address;
  if (chainId == "56") {
    if (process.env.ENV == "prod") {
      tokenAddress = "0x31640330cd2337e57c9591a2a183ac4e8a754e87";
    }
  }

  //prices are calculated on the basis of ( 1 SERA token = 1 CAD)
  // const exPriceUSDT = "120000000000000000"; // 0.12, 18 decimals
  // const exPriceBUSD = "120000000000000000"; // 0.12, 18 decimals
  // const USDT = "0xfd55D5eB19731e79FB600579756dF7f454b2aA08" // bsc testnet
  // const BUSD = "0xa0D61133044ACB8Fb72Bc5a0378Fe13786538Dd0" // bsc testnet

  const coinAddress = {
    USDT: {
      "56": "0x55d398326f99059ff775485246999027b3197955",
      "97": "0xfd55D5eB19731e79FB600579756dF7f454b2aA08",
    },
    BUSD: {
      "56": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      "97": "0xa0D61133044ACB8Fb72Bc5a0378Fe13786538Dd0",
    },
  };
  let usdtAddress;
  let busdAddress;
  if (!["56", "97"].includes(chainId)) {
    const erc20Factory = await hre.ethers.getContractFactory("Token");
    const usdt = await erc20Factory.deploy("Tether", "USDT", "100000000000000000000000");
    await usdt.deployed();
    usdtAddress = usdt.address;
    const busd = await erc20Factory.deploy("Binance Peg USD", "BUSD", "100000000000000000000000");
    await busd.deployed();
    busdAddress = busd.address;
  } else {
    usdtAddress = coinAddress.USDT[chainId];
    busdAddress = coinAddress.BUSD[chainId];
  }
  await deploy("TokenPreVesting", {
    from: deployer,
    args: [tokenAddress, usdtAddress, busdAddress],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
  // if (contractTx.newlyDeployed) {
  //   const tokenSale = await ethers.getContract("TokenSale");
  //   if (!["31337", "1337"].includes(chainId)) {
  //     await waitforme(20000);

  //     await hre.run("verify:verify", {
  //       address: tokenSale.address,
  //       constructorArguments: [
  //         tokenAddress,
  //         coinAddress.USDT[chainId],
  //         coinAddress.BUSD[chainId],
  //         exPriceUSDT,
  //         exPriceBUSD,
  //       ],
  //     });
  //   }
  // }
};
export default func;
func.tags = ["TokenPreSale"];
