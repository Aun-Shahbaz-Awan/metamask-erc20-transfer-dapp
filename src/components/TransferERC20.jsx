import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { ERC20ABI } from "../contract/abi";

function TransferERC20() {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [receiver, setReceiver] = useState("");
  const [status, setStatus] = useState("");

  const { data: signer } = useSigner();

  const transferToken = async () => {
    // Load ERC20 Token contract
    const contract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

    // Transfer tokens
    try {
      const tx = await contract.transfer(
        receiver,
        ethers.utils.parseEther(amount)
      );
      setStatus(`Transaction sent: ${tx.hash}`);
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };
  console.log("Status:", status);

  return (
    <div className="p-4">
      <h2>Transfer ERC20 Token</h2>
      <label className="bg-red-400 pl-6 py-3">
        Token Address:
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-1/4 text-md font-bold outline-none bg-lime-400 p-2 my-4 ml-6"
          placeholder="ERC20 Token Address"
        />
      </label>
      <br />
      <label className="bg-red-400 pl-6 py-3">
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-1/4 text-md font-bold outline-none bg-lime-400 p-2 my-4 ml-6"
          placeholder="Amount"
        />
      </label>
      <br />
      <label className="bg-red-400 pl-6 py-3">
        Receiver:
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-1/4 text-md font-bold outline-none bg-lime-400 p-2 my-4 ml-6"
          placeholder="Wallet Address"
        />
      </label>
      <br />
      <button
        onClick={transferToken}
        className="bg-cyan-600 text-lg font-bold px-6 py-2 rounded-lg"
      >
        Transfer
      </button>
      <p className="text-red-900 pt-4">{status}</p>
    </div>
  );
}

export default TransferERC20;
