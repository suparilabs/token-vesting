## token-vesting

Token Vesting + Sale Contract & UI

## Installation

- `yarn`
- Create your own `.env` same as `.env.example`

## Deployments

### Option 1

```
yarn deploy:bsctestnet
```

### Option 2

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
yarn hardhat deploy:tokenvesting \
--token <token-address>
--network localhost
```

## Contract Verification

### Verify Token

```
yarn hardhat verify \
--contract contracts/Token.sol:Token \
--network bsctestnet \
0x8bD3317Ac7a8cF2441D4D2121CCed8Cc9D5b8881 SERA SERA 250000000000000000000000000
```

### Verify TokenVesting

```
➜ yarn hardhat verify \
--network bsctestnet \
0x09557807C515d758ECc5E1D1aCE7D09aA5842F51 \
0x8bD3317Ac7a8cF2441D4D2121CCed8Cc9D5b8881
```

## Contract Actions

#### Fund Token Vesting Contract

```
yarn hardhat action:fundTokenVesting \
--token <token-address> \
--token-vesting <token-vesting-contract-address> \
--amount <amount> \
--network localhost
```

#### Create vesting schedule

```
yarn hardhat action:createVestingSchedule \
--token-vesting <token-vesting-contract> \
--beneficiary <beneficiary> \
--start <start time> \
--cliff <cliff time> \
--duration <duration> \
--revocable <true or false> \
--amount <amount> \
--network localhost
```

## Run the UI

- `yarn app:dev`

#### How to get the claim tokens via vesting schedule Id given the account address

- \_beneficiary = MetaMask address
- vesting schedule id = `TokenVesting.computeVestingScheduleIdForAddressAndIndex(_beneficiary,0)`
- `TokenVesting.release(vestingScheduleId)`
