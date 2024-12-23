# Fly Pineapple Owl, Fly!

![Pineapple Owl](./assets/pineowl.webp)

Repository for the **$PINEOWL** (`0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876` on Ethereum Mainnet) to be bridgeable on **Base L2** using the [L2StandardERC20](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) pattern.

## Overview

- **L1 Token Address:** `0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876` (already deployed on Ethereum Mainnet)
- **L2 Chain:** Base (chain ID `8543`)

## Repository Structure

```
.
├── scripts
│ ├── deploy-standard-token.ts // Deploys the L2 token
│ ├── bridge-eth-to-base.ts // Bridges PINEOWL to Base directly
├── hardhat.config.ts // Hardhat config (TS version)
├── package.json // Project metadata and scripts
├── tsconfig.json // TypeScript configuration
└── README.md // This file
```

## Quick Start

1. **Clone & Navigate**

   ```bash
   git clone https://github.com/0xFlicker/pineowl-fly-away.git
   cd pineowl-fly-away
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Deploy the L2 Token**

   ```bash
   pnpm hardhat run --network base scripts/deploy-standard-token.ts
   ```

4. **Bridge PINEOWL to Base**

   ```bash
   pnpm bridge:eth-to-base
   ```
