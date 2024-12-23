import "dotenv/config";
import { defineConfig } from "@wagmi/cli";
import { etherscan } from "@wagmi/cli/plugins";
import optimismMintableERC20FactoryAbi from "@eth-optimism/contracts-bedrock/forge-artifacts/OptimismMintableERC20Factory.sol/OptimismMintableERC20Factory.json" assert { type: "json" };
import l1StandardBridgeAbi from "@eth-optimism/contracts-bedrock/forge-artifacts/L1StandardBridge.sol/L1StandardBridge.json" assert { type: "json" };
import { mainnet } from "viem/chains";
export default defineConfig({
  out: "generated.ts",
  contracts: [
    {
      name: "OptimismMintableERC20Factory",
      abi: optimismMintableERC20FactoryAbi.abi as any,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: 1,
      contracts: [
        {
          name: "BaseL1StandardBridge",
          address: {
            [mainnet.id]: "0x64B5a5Ed26DCb17370Ff4d33a8D503f0fbD06CfF",
          },
        },
      ],
    }),
  ],
});
