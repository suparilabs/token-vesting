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
