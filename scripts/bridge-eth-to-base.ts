import { base, mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import {
  createWalletClient,
  erc20Abi,
  formatUnits,
  gweiUnits,
  http,
  parseEther,
  parseUnits,
  publicActions,
} from "viem";
import {
  contracts,
  publicActionsL2,
  walletActionsL2,
  supersimL2A,
  supersimL2B,
  createInteropSentL2ToL2Messages,
  sendSupERC20,
  decodeRelayedL2ToL2Messages,
  simulateSendSupERC20,
  estimateSendSupERC20Gas,
} from "@eth-optimism/viem";
import {
  baseL1StandardBridgeAbi,
  baseL1StandardBridgeAddress,
  l1StandardBridgeAbi,
} from "../generated";
async function main() {
  // const [l1Wallet] = await hre.viem.getWalletClients({
  //   chain: mainnet,
  //   account: privateKeyToAccount(process.env.ETH_DEPLOYER_PRIVATE_KEY as `0x${string}`),
  // });
  // const [l2Wallet] = await hre.viem.getWalletClients({
  //   chain: base,
  //   account: privateKeyToAccount(process.env.BASE_DEPLOYER_PRIVATE_KEY as `0x${string}`),
  // })

  const l1WalletExtended = createWalletClient({
    chain: mainnet,
    account: privateKeyToAccount(
      process.env.ETH_DEPLOYER_PRIVATE_KEY as `0x${string}`,
    ),
    transport: http(process.env.ETH_RPC_URL),
  }).extend(publicActions);

  const l2WalletExtended = createWalletClient({
    chain: base,
    account: privateKeyToAccount(
      process.env.BASE_DEPLOYER_PRIVATE_KEY as `0x${string}`,
    ),
    transport: http(process.env.BASE_RPC_URL),
  })
    .extend(walletActionsL2())
    .extend(publicActionsL2())
    .extend(publicActions);
  const pineOwlTokenL1Address = "0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876";
  const pineOwlTokenL2Address = "0x69EAC44Bf0f8653D1D78B86A544a134293E840FC";
  const baseL1StandardBridgeAddress =
    "0x3154Cf16ccdb4C6d922629664174b904d80F2C35";

  const approval = await l1WalletExtended.readContract({
    address: pineOwlTokenL1Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [l1WalletExtended.account.address, baseL1StandardBridgeAddress],
  });
  console.log(`Approval: ${approval}`);

  if (approval < parseEther("50000")) {
    console.log("Approval is less than 50000, approving...");

    const approveTx = await l1WalletExtended.writeContract({
      address: pineOwlTokenL1Address,
      abi: erc20Abi,
      functionName: "approve",
      args: [baseL1StandardBridgeAddress, parseEther("50000")],
      account: l1WalletExtended.account,
    });

    const approveReceipt = await l1WalletExtended.waitForTransactionReceipt({
      hash: approveTx,
    });
  }

  const tx = await l1WalletExtended.writeContract({
    address: baseL1StandardBridgeAddress,
    abi: baseL1StandardBridgeAbi,
    functionName: "depositERC20",
    args: [
      pineOwlTokenL1Address,
      pineOwlTokenL2Address,
      parseUnits("50000", 9),
      200000,
      "0x",
    ],
    account: l1WalletExtended.account,
    gas: 800000n,
  });

  const receipt = await l1WalletExtended.waitForTransactionReceipt({
    hash: tx,
  });

  console.log(receipt);

  // console.log(util.inspect(relayMessageReceipt, { showHidden: true, depth: null, colors: true }));
}

main();
