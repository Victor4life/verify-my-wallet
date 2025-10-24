import { useState, useEffect } from "react";
import axios from "axios";
import { HashConnect } from "hashconnect";
import { ethers } from "ethers";
import WalletActions from "./WalletActions";
import { toast } from "react-toastify";
import VerificationBadge from "./VerificationBadge";

const API_URL = import.meta.env.VITE_API_URL;

function MainApp() {
  const [walletType, setWalletType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [nonce, setNonce] = useState("");
  const [proof, setProof] = useState("");
  const [verified, setVerified] = useState(false);
  const [hashconnect, setHashconnect] = useState(null);
  const [topic, setTopic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟢 Detect MetaMask on load
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("✅ MetaMask detected");
    } else {
      console.warn("⚠️ MetaMask not found. Please install it.");
      toast.warn("⚠️ MetaMask not detected — install or enable it.");
    }
  }, []);

  // 🟣 Initialize HashConnect when Hedera wallet is selected
  useEffect(() => {
    if (walletType !== "hedera") return;

    const initHashconnect = async () => {
      try {
        const hc = new HashConnect();
        setHashconnect(hc);

        const appMetadata = {
          name: "VerifyMyWallet",
          description: "Anonymous wallet proof",
          icon: "https://avatars.githubusercontent.com/u/63359727?s=200&v=4",
        };

        // Initialize HashConnect
        const initData = await hc.init(appMetadata);
        console.log("✅ HashConnect initialized:", initData);

        hc.pairingEvent.once((pairingData) => {
          console.log("🔗 Pairing data:", pairingData);
          setWalletAddress(pairingData.accountIds?.[0] || "");
          setTopic(pairingData.topic);
          setPublicKey(pairingData.metadata?.publicKey || "");
        });

        await hc.connectToLocalWallet();
      } catch (err) {
        console.error("❌ HashConnect init error:", err);
        toast.error("❌ HashConnect initialization failed");
      }
    };

    initHashconnect();
  }, [walletType]);

  // 🟢 Connect wallet
  const connectWallet = async () => {
    if (walletType === "evm") {
      if (typeof window.ethereum === "undefined") {
        toast.error("MetaMask not found! Please install or enable it.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        toast.success("✅ MetaMask connected successfully!");
      } catch (err) {
        console.error("❌ MetaMask connection failed:", err);
        toast.error("Failed to connect MetaMask!");
      }
    } else if (walletType === "hedera") {
      toast.info("Open HashPack and approve connection (modal should open)");
    }
  };

  // 🟡 Generate nonce
  const generateNonce = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/generate-nonce`);
      setNonce(res.data.nonce);
      toast.info("🌀 Nonce generated — please sign it next!");
    } catch (err) {
      console.error("❌ Nonce generation failed:", err);
      toast.error("Error generating nonce");
    }
    setLoading(false);
  };

  // 🔵 Sign nonce
  const signNonce = async () => {
    if (!nonce) return toast.warn("Generate a nonce first!");
    setLoading(true);

    try {
      if (walletType === "evm") {
        if (typeof window.ethereum === "undefined") {
          toast.error("MetaMask not found!");
          setLoading(false);
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const sig = await signer.signMessage(nonce);
        setProof(sig);
        toast.success("✍️ Nonce signed successfully!");
      } else if (walletType === "hedera") {
        if (!hashconnect || !topic || !walletAddress) {
          toast.error("HashConnect not ready yet!");
          setLoading(false);
          return;
        }

        const sigData = await hashconnect.sendTransaction(topic, {
          topic,
          byteArray: new TextEncoder().encode(nonce),
          metadata: {
            accountToSign: walletAddress,
            returnTransaction: false,
          },
        });

        setProof(
          Buffer.from(sigData.userSignature.signature).toString("base64")
        );
        toast.success("✍️ Nonce signed successfully with HashPack!");
      }
    } catch (err) {
      console.error("Signing error:", err);
      toast.error("Signing failed!");
    }

    setLoading(false);
  };

  // 🧩 Verify wallet
  const verifyWallet = async () => {
    if (!proof || !walletAddress) {
      toast.warn("Sign nonce first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/verify-proof`, {
        nonce,
        proof,
        accountId: walletAddress,
        chain: walletType,
        publicKey: walletType === "hedera" ? publicKey : null,
      });

      if (res.data.success) {
        setVerified(true);
        toast.success("🎉 Wallet verified successfully!");
      } else {
        toast.error("Verification failed!");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("❌ Verification failed!");
    }
    setLoading(false);
  };

  if (verified) {
    return (
      <VerificationBadge
        walletAddress={walletAddress}
        proof={proof}
        walletType={walletType}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/vmw-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.92)",
          backdropFilter: "blur(4px)",
          zIndex: 0,
        }}
      />

      {/* Main Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(22, 27, 34, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "40px 30px",
          width: "90%",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
        className="card"
      >
        <h2
          style={{
            fontWeight: 600,
            fontSize: "1.8rem",
            color: "#ddd",
            marginBottom: "20px",
          }}
        >
          Verify My Wallet
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#aaa",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Securely connect and verify your wallet on{" "}
          <span style={{ color: "#9be7ff" }}>Hedera</span> or{" "}
          <span style={{ color: "#f6851b" }}>EVM</span> networks.
        </p>

        <WalletActions
          walletType={walletType}
          setWalletType={setWalletType}
          walletAddress={walletAddress}
          nonce={nonce}
          proof={proof}
          verified={verified}
          loading={loading}
          connectWallet={connectWallet}
          generateNonce={generateNonce}
          signNonce={signNonce}
          verifyWallet={verifyWallet}
        />
      </div>
    </div>
  );
}

export default MainApp;
