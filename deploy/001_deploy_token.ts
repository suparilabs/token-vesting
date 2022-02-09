import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "@ethersproject/units";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = await hre.getChainId();
  const env = process.env.ENV;
  if (chainId == "56" && env != "prod") {
    await deploy("Token", {
      from: deployer,
      args: ["Test SERA", "TSERA", parseEther("500000000")],
      log: true,
      autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
    });
    // if (contractTx.newlyDeployed) {
    //   await waitforme(20000);
    //   await hre.run("verify:verify", {
    //     address: token.address,
    //     contract: "contracts/Token.sol:Token",
    //     constructorArguments: ["Test SERA", "TSERA", parseEther("500000000")],
    //   });
    // }
    //  else {
    //   tokenAddress = "0x31640330cd2337e57c9591a2a183ac4e8a754e87";
    // }
  } else {
    await deploy("Token", {
      from: deployer,
      args: ["SERA", "SERA", parseEther("500000000")],
      log: true,
      autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
    });
    // if (contractTx.newlyDeployed) {
    //   if (!["31337", "1337"].includes(chainId)) {
    //     const token = await ethers.getContract("Token");
    //     await waitforme(20000);
    //     await hre.run("verify:verify", {
    //       address: token.address,
    //       contract: "contracts/Token.sol:Token",
    //       constructorArguments: ["SERA", "SERA", parseEther("500000000")],
    //     });
    //   }
    // }
  }
};
export default func;
func.tags = ["Token"];
