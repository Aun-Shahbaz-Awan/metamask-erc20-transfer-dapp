import { useConnect, useAccount } from "wagmi";

export function ConnectWallet() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected, address } = useAccount();

  return (
    <div className="flex items-center gap-3">
      {isConnected && (
        <div className="bg-green-100 px-6 py-2 rounded-lg shadow-sm shadow-slate-300">
          Connected to {address.slice(0, 5) + " ... " + address.slice(-4)}
        </div>
      )}
      {!isConnected &&
        connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            className="bg-white px-6 py-2 rounded-lg shadow-sm shadow-slate-300"
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </button>
        ))}

      {error && <div className="text-red-800">⚠️ {error.message}</div>}
    </div>
  );
}
