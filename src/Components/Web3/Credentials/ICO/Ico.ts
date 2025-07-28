export const ICOcredientials = {
  contractAddress: "0x13e95f7de9c12f7d7d395F670dEB273bEAc5806a",
  abi: [
    {
      type: "constructor",
      inputs: [{ name: "_address", type: "address", internalType: "address" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "_offerCoin",
      inputs: [],
      outputs: [{ name: "success", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "earlyBirds",
      inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "offeringAccount",
      inputs: [{ name: "", type: "address", internalType: "address" }],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "startICO",
      inputs: [],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "status",
      inputs: [],
      outputs: [{ name: "", type: "uint8", internalType: "enum ICO.STATUS" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stopICO",
      inputs: [],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "submitWalletAddress",
      inputs: [],
      outputs: [{ name: "success", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
  ],
};
