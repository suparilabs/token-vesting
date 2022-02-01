import { task } from "hardhat/config";

task("action:timestamp").setAction(async function (_, { ethers }) {
  console.log("Current time stamp ", await (await ethers.providers.getDefaultProvider().getBlock("latest")).timestamp);
});
