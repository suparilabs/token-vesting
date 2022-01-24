import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Token } from "../../src/types/Token";

task("action:fundPrivateSaleContract")
  .addParam("token", "token address")
  .addParam("privateSaleContract", "PrivateSaleContract address")
  .addParam("amount", "amount in tokens")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const erc20Instance = <Token>await ethers.getContractAt("Token", taskArguments.token);
    await erc20Instance.transfer(taskArguments.privateSaleContract, taskArguments.amount);
    console.log("Balance of privateSaleContract is ", await erc20Instance.balanceOf(taskArguments.privateSaleContract));
  });
