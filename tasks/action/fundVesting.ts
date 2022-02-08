import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Token } from "../../src/types/Token";

task("action:fundVesting")
  .addParam("token", "token address")
  .addParam("vesting", "Vesting contract address")
  .addParam("amount", "amount in tokens")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const erc20Instance = <Token>await ethers.getContractAt("Token", taskArguments.token);
    await erc20Instance.transfer(taskArguments.privateSaleContract, taskArguments.amount);
    console.log("Balance of vesting contract is ", await erc20Instance.balanceOf(taskArguments.vesting));
  });

10000000;
