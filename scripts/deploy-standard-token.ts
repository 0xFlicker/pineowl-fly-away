import hre from "hardhat";
import { createWalletClient } from "viem";
import * as dotenv from "dotenv";
import { optimismMintableErc20FactoryAbi } from "../generated";

dotenv.config();

/**
 * Example: Deploying an L2 Standard ERC20 token using the
 * "L2StandardERC20Factory" approach or direct constructor calls.
 *
 * This script:
 *   1. Connects to the L2 network (Base, in your case).
 *   2. Deploys an L2StandardERC20 token contract, pointing
 *      to your L1 token (0x42069) and the L2 Standard Bridge.
 */

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  // Pull config from environment variables or hard-code as needed
  const l1TokenAddress = "0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876";
  const OptimismMintableERC20FactoryAddress =
    (process.env.OPTIMISM_MINTABLE_ERC20_FACTORY_ADDRESS as `0x${string}`) ||
    "0xF10122D428B4bc8A9d050D06a2037259b4c4B83B";
  const tokenName = "Pineapple Owl";
  const tokenSymbol = "PINEOWL";

  // 1. Deploy the OptimismMintableERC20
  const tx = await deployer.writeContract({
    abi: optimismMintableErc20FactoryAbi,
    address: OptimismMintableERC20FactoryAddress,
    functionName: "createOptimismMintableERC20WithDecimals",
    args: [l1TokenAddress, tokenName, tokenSymbol, 9],
  });

  console.log(`Transaction hash: ${tx}`);
  const publicClient = await hre.viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });

  console.log(`Transaction receipt: ${receipt}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
