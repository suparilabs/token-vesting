import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const token = await deployments.get("Token");
  const artifact = await deployments.getArtifact("TokenPreTimelock");
  let tokenAddress = token.address;
  if (chainId == "56") {
    if (process.env.ENV == "prod") {
      tokenAddress = "0x31640330cd2337e57c9591a2a183ac4e8a754e87";
    }
  }

  await deploy("SEEDPreTimeLock", {
    from: deployer,
    contract: {
      abi: artifact.abi,
      bytecode: artifact.bytecode,
      deployedBytecode: artifact.deployedBytecode,
    },
    args: [tokenAddress],
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
func.tags = ["SEEDPreTimeLock"];
