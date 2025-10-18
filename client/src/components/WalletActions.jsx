import { toast } from "react-toastify";

export default function WalletActions({
  walletType,
  setWalletType,
  connectWallet,
  generateNonce,
  signNonce,
  verifyWallet,
  walletAddress,
  nonce,
  proof,
  verified,
  loading,
}) {
  // ✅ Wrapped handlers with toast notifications
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateNonce = async () => {
    try {
      await generateNonce();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignNonce = async () => {
    try {
      await signNonce();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyWallet = async () => {
    try {
      await verifyWallet();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Return UI
  return (
    <div style={{ textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
      {/* Wallet Selection */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "25px",
          alignItems: "center",
        }}
      >
        <select
          value={walletType}
          onChange={(e) => setWalletType(e.target.value)}
          style={{
            padding: "12px 15px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            flex: 1,
            backgroundColor: "#1b1f27",
            color: "#fff",
            outline: "none",
            transition: "0.3s",
          }}
        >
          <option value="">-- Select Wallet --</option>
          <option value="hedera">HashPack (Hedera)</option>
          <option value="evm">MetaMask (EVM)</option>
        </select>

        <button
          onClick={handleConnect}
          disabled={!walletType}
          style={{
            ...buttonStyle,
            backgroundColor: !walletType ? "#444" : "#00a86b",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Connect
        </button>
      </div>

      {/* Wallet Address Display */}
      {walletAddress && (
        <p
          style={{
            fontWeight: "500",
            marginBottom: "20px",
            color: "#9be7ff",
            fontSize: "0.95rem",
            wordBreak: "break-all",
          }}
        >
          Connected: {walletAddress}
        </p>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={handleGenerateNonce}
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Nonce"}
        </button>

        <button
          onClick={handleSignNonce}
          style={buttonStyle}
          disabled={loading || !nonce}
        >
          Sign Nonce
        </button>

        <button
          onClick={handleVerifyWallet}
          style={buttonStyle}
          disabled={loading || !proof}
        >
          Verify Wallet
        </button>
      </div>

      {/* Nonce & Verification */}
      {nonce && (
        <p
          style={{
            fontStyle: "italic",
            color: "#ccc",
            marginBottom: "10px",
            fontSize: "0.9rem",
          }}
        >
          Nonce: {nonce}
        </p>
      )}

      {verified && (
        <h2
          style={{
            color: "#00c853",
            marginTop: "25px",
            fontWeight: "600",
          }}
        >
          ✅ Wallet Verified on {walletType === "hedera" ? "Hedera" : "EVM"}!
        </h2>
      )}
    </div>
  );
}

// ✅ Button style (refined)
const buttonStyle = {
  padding: "10px 18px",
  fontSize: "0.95rem",
  fontWeight: "500",
  cursor: "pointer",
  backgroundColor: "#121111ff",
  color: "#bbb",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "8px",
  transition: "all 0.25s ease",
  minWidth: "130px",
};
