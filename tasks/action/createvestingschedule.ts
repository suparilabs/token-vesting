import hre from "hardhat";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PrivateSaleContract } from "../../src/types/PrivateSaleContract";

task("action:createVestingSchedule")
  .addParam("beneficiary", "address of the beneficiary to whom vested tokens are transferred")
  .addParam("start", "start time of vesting period")
  .addParam("cliff", "duration in seconds of the cliff in which tokens will begin to vest")
  .addParam("duration", "duration in seconds of the period in which the tokens will vest")
  .addParam("revocable", "whether the vesting is revocable or not")
  .addParam("amount", "total amount of tokens to be released at the end of the vesting")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    // const privateSaleContractDeployment = await hre.deployments.get("PrivateSaleContract");
    const privateSaleContractInstance = <PrivateSaleContract>(
      await ethers.getContractAt("PrivateSaleContract", "0x09557807C515d758ECc5E1D1aCE7D09aA5842F51")
    );
    await privateSaleContractInstance.createVestingSchedule(
      taskArguments.beneficiary,
      taskArguments.start,
      taskArguments.cliff,
      taskArguments.duration,
      "1",
      taskArguments.revocable,
      taskArguments.amount,
    );
  });
