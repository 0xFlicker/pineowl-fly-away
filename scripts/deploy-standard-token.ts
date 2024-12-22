import { ethers } from "hardhat";
import * as dotenv from "dotenv";

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
  // Pull config from environment variables or hard-code as needed
  const l1TokenAddress = "0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876";
  const l2BridgeAddress =
    process.env.L2_BRIDGE_ADDRESS ||
    "0x4200000000000000000000000000000000000010";
  const tokenName = "Pineapple Owl";
  const tokenSymbol = "PINEOWL";
  const tokenDecimals = 18;

  // 1. Deploy the L2StandardERC20 contract
  // If you have a compiled local artifact:
  //    const L2StandardERC20Factory = await ethers.getContractFactory("L2StandardERC20");
  //
  // Some projects use a separate "L2StandardERC20Factory" to create new tokens on L2.
  // We'll deploy directly via the factory approach here.
  const L2StandardERC20Factory = await ethers.getContractFactory(
    "L2StandardERC20"
  );

  console.log(`Deploying L2StandardERC20 with constructor args:
    _l2Bridge: ${l2BridgeAddress}
    _l1Token:  ${l1TokenAddress}
    _name:     ${tokenName}
    _symbol:   ${tokenSymbol}
    _decimals: ${tokenDecimals}
  `);

  const l2Token = await L2StandardERC20Factory.deploy(
    l2BridgeAddress,
    l1TokenAddress,
    tokenName,
    tokenSymbol,
    tokenDecimals
  );
  await l2Token.deployed();

  console.log(`L2 token deployed at: ${l2Token.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
