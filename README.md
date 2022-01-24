## token-vesting

Vesting Contract + UI

### Development

#### Deploy token

```
yarn hardhat deploy:erc20 \
--name <token-name> \
--symbol <token-symbol> \
--total-supply <total-supply> \
--network localhost
```

#### Deploy Private Sale Contract

```
yarn hardhat deploy:privateSaleContract \
--token <token-address>
--network localhost
```

#### Fund Private Sale Contract

```
yarn hardhat action:fundPrivateSaleContract \
--token <token-address> \
--privateSaleContract <private-sale-contract-address> \
--amount <amount> \
--network localhost
```

#### Create vesting schedule

```
yarn hardhat action:createVestingSchedule \
--private-sale-contract <private-sale-contract> \
--beneficiary <beneficiary> \
--start <start time> \
--cliff <cliff time> \
--duration <duration> \
--revocable <true or false> \
--amount <amount> \
--network localhost
```

#### How to get the claim tokens via vesting schedule Id given the account address

- \_beneficiary = MetaMask address
- vesting schedule id = PrivateSaleContract.computeVestingScheduleIdForAddressAndIndex(\_beneficiary,0)
- PrivateSaleContract.release(vestingScheduleId)
