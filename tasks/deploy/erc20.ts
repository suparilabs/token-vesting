import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Token } from "../../src/types/Token";
import { Token__factory } from "../../src/types/factories/Token__factory";

task("deploy:erc20")
  .addParam("name", "name of the token")
  .addParam("symbol", "symbol of the token")
  .addParam("totalSupply", "total supply of the token")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const tokenFactory: Token__factory = <Token__factory>await ethers.getContractFactory("Token");
    const token: Token = <Token>(
      await tokenFactory.deploy(taskArguments.name, taskArguments.symbol, taskArguments.totalSupply)
    );
    await token.deployed();
    console.log("Token deployed to: ", token.address);
  });
