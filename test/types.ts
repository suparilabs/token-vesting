import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import type { Fixture } from "ethereum-waffle";
import { TokenVesting, Token } from "../src/types";
import { MockTokenVesting } from "../src/types/MockTokenVesting";

declare module "mocha" {
  export interface Context {
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
    token: Token;
    testToken: Token;
    tokenVesting: TokenVesting;
    mockTokenVesting: MockTokenVesting;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  owner: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  charlie: SignerWithAddress;
  beneficiary: SignerWithAddress;
}
