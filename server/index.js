const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { Client } = require("@hashgraph/sdk");

const { PublicKey } = require("@hashgraph/sdk");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

let nonces = {}; // store nonces temporarily

// Hedera client (Testnet)
const { AccountId, PrivateKey } = require("@hashgraph/sdk");

// Hedera client (Testnet)
const client = Client.forTestnet();

// Convert the 0x private key properly
const hederaPrivateKey = PrivateKey.fromString(
  process.env.HEDERA_PRIVATE_KEY.replace(/^0x/, "")
);

client.setOperator(
  AccountId.fromString(process.env.HEDERA_ACCOUNT_ID),
  hederaPrivateKey
);

// Generate a nonce
app.get("/generate-nonce", (req, res) => {
  const nonce = uuidv4();
  nonces[nonce] = false;
  res.json({ nonce });
});

// Verify proof (mocked for MVP)

app.post("/verify-proof", async (req, res) => {
  const { nonce, proof, accountId, chain, publicKey } = req.body;

  try {
    // ✅ EVM wallet verification (MetaMask)
    if (chain === "evm") {
      const recovered = ethers.verifyMessage(nonce, proof);
      if (recovered.toLowerCase() === accountId.toLowerCase()) {
        return res.json({ success: true, message: "EVM wallet verified!" });
      }
    }

    // ✅ Hedera wallet verification (HashPack)
    else if (chain === "hedera") {
      if (!publicKey)
        return res
          .status(400)
          .json({ success: false, message: "Missing Hedera public key" });

      const pubKey = PublicKey.fromString(publicKey);
      const messageBytes = Buffer.from(nonce);
      const signatureBytes = Buffer.from(proof, "base64");

      const isValid = pubKey.verify(messageBytes, signatureBytes);
      if (isValid)
        return res.json({ success: true, message: "Hedera wallet verified!" });
    }

    res.status(400).json({ success: false, message: "Verification failed" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
