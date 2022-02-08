import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const token = await hre.deployments.get("Token");
  //prices are calculated on the basis of ( 1 SERA token = 1 CAD)
  const exPriceUSDT = 1.25;
  const exPriceBUSD = 1.27;
  const tokenPrice = 1;
  await deploy("TokenSale", {
    from: deployer,
    args: [token.address, exPriceUSDT, exPriceBUSD, tokenPrice],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;
func.tags = ["TokenSale"];
