import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts: { [name: string]: string } = await hre.getNamedAccounts();

  Object.values(accounts).forEach(account => console.log(account));
});
