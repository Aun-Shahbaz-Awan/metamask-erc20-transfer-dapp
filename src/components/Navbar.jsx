import React from "react";
import { ConnectWallet } from "./ConnectWallet";

function Navbar() {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center px-6 py-3 bg-green-400 rounded-xl p-4 shadow-inner shadow-green-700">
        <h2 className="text-xs font-bold text-green-900 ">LOGO</h2>
        <ConnectWallet />
      </div>
    </div>
  );
}

export default Navbar;
