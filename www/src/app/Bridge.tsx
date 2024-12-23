"use client";

import { baseL1StandardBridgeAbi } from "@/generated";
import Connect from "./Connect";
import { useCallback, useState } from "react";
import { erc20Abi, parseUnits } from "viem";
import { mainnet } from "viem/chains";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const pineOwlTokenL1Address = "0x79C6Ffe2ccBca761e9E289A69432bFfB0b744876";
const pineOwlTokenL2Address = "0x69EAC44Bf0f8653D1D78B86A544a134293E840FC";
const baseL1StandardBridgeAddress =
  "0x3154Cf16ccdb4C6d922629664174b904d80F2C35";

function useBridge(amount: bigint) {
  const { address } = useAccount();
  const { data: allowance, promise } = useReadContract({
    address: pineOwlTokenL1Address,
    chainId: mainnet.id,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, baseL1StandardBridgeAddress] : undefined,
    query: {
      experimental_prefetchInRender: true,
    }
  });

  console.log(address, allowance);

  const { writeContractAsync } = useWriteContract();

  const doBridge = useCallback(() => {
    return writeContractAsync({
      abi: baseL1StandardBridgeAbi,
      address: baseL1StandardBridgeAddress,
      functionName: "bridgeERC20",
      args: [
        pineOwlTokenL1Address,
        pineOwlTokenL2Address,
        parseUnits(amount.toString(), 9),
        200000,
        "0x",
      ],
    })
  }, [amount, writeContractAsync]);

  const doApprove = useCallback(() => {
    return writeContractAsync({
      abi: erc20Abi,
      address: pineOwlTokenL1Address,
      functionName: "approve",
      args: [baseL1StandardBridgeAddress, parseUnits(amount.toString(), 9)],
    });
  }, [amount, writeContractAsync]);

  const doApproveOrBridge = useCallback(async () => {
    if (!allowance || allowance < amount) {
      doBridge();
    } else {
      await doApprove();
      await doBridge();
    }
  }, [allowance, amount, doBridge, doApprove]);

  return {
    doBridge,
    doApprove,
    doApproveOrBridge
  };
}



export default function Bridge() {
  const [amount, setAmount] = useState<bigint>(0n);
  const { doApproveOrBridge } = useBridge(amount);



  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96">
      <Connect />
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-gray-900"
            placeholder="Enter amount"
            value={amount === 0n ? '' : amount.toString()}
            onChange={(e) => {
              if (e.target.value === '') {
                setAmount(0n);
                return;
              }
              try {
                setAmount(BigInt(e.target.value));
              } catch (err) {
                // Invalid number input, ignore
                console.error(err);
              }
            }}
          />
        </div>
        <button
          onClick={doApproveOrBridge}
          className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Bridge
        </button>
      </div>
    </div>
  );
}
