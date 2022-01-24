import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PrivateSaleContract } from "../../src/types/PrivateSaleContract";
import { PrivateSaleContract__factory } from "../../src/types/factories/PrivateSaleContract__factory";

task("deploy:privateSaleContract")
  .addParam("token", "token address")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const privateSaleContractFactory: PrivateSaleContract__factory = <PrivateSaleContract__factory>(
      await ethers.getContractFactory("PrivateSaleContract")
    );
    const privateSaleContract: PrivateSaleContract = <PrivateSaleContract>(
      await privateSaleContractFactory.deploy(taskArguments.token)
    );
    await privateSaleContract.deployed();
    console.log("PrivateSaleContract deployed to: ", privateSaleContract.address);
  });
