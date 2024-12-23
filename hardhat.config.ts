import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import * as dotenv from "dotenv";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    base: {
      url: process.env.BASE_RPC_URL || "",
      accounts: process.env.BASE_DEPLOYER_PRIVATE_KEY
        ? [process.env.BASE_DEPLOYER_PRIVATE_KEY]
        : [],
      // chainId: 8543,
    },
    ["base-sepolia"]: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "",
      accounts: process.env.BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
        ? [process.env.BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY]
        : [],
      chainId: 84532,
    },

    localhost: {
      url: "http://localhost:8545",
      // chainId: 8543,
      accounts: process.env.BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
        ? [process.env.BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY]
        : [],
    },
  },
};

export default config;
