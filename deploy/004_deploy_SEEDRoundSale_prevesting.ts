import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { waitforme } from "../helpers/utils";

const VERIFY_CONTRACT = process.env.VERIFY_CONTRACT;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = await hre.getChainId();
  const token = await hre.deployments.get("Token");
  const artifact = await deployments.getArtifact("TokenPreVesting");
  let tokenAddress = token.address;
  if (chainId == "56") {
    if (process.env.ENV == "prod") {
      tokenAddress = "0x31640330cd2337e57c9591a2a183ac4e8a754e87";
    }
  }

  const contractTx = await deploy("SEEDPreVesting", {
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
  if (VERIFY_CONTRACT === "true") {
    if (contractTx.newlyDeployed) {
      const seedTokenPreVesting = await ethers.getContract("SEEDPreVesting");
      if (!["31337", "1337"].includes(chainId)) {
        await waitforme(20000);
        await hre.run("verify:verify", {
          address: seedTokenPreVesting.address,
          constructorArguments: [tokenAddress],
        });
      }
    }
  }
};
export default func;
func.tags = ["SEEDPreVesting"];
