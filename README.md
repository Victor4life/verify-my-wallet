# 🪪 VerifyMyWallet

**A Zero-Knowledge Proof (ZKP) dApp for Secure Multi-Chain Wallet Verification (Hedera + EVM)**

VerifyMyWallet is a privacy-first dApp that lets users **prove wallet ownership** across **Hedera Hashgraph** and **EVM-compatible chains** (Ethereum, Polygon, BSC, etc.) using cryptographic proofs and SDK integrations. The app is split into a Vite + React frontend (deployed to Vercel) and an Express backend (deployed to Render). The backend exposes SDK features for chain interactions and proof verification.

---

## 🚀 Features

* Privacy-preserving wallet verification using ZKP principles
* Multi-chain support: **Hedera** + **EVM-compatible** networks (via `ethers.js`)
* Backend SDK feature set to interact with Hedera SDK and EVM RPCs
* Frontend built with **Vite + React**, styling via Tailwind (optional)
* `pnpm` package manager support
* Frontend → **Vercel**, Backend → **Render** deployment setup
* Mobile-friendly responsive UI with viewport-safe fullscreen handling

---

## 🗂 Project Structure

```
VerifyMyWallet/
├── client/            # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/            # Backend (Express.js + Hedera/EVM SDKs)
│   ├── controllers/
│   ├── routes/
│   ├── sdk/           # SDK wrapper for Hedera & EVM interactions
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Requirements

* Node.js (>= 18 recommended)
* pnpm
* Git
* A Hedera test/mainnet account + private key (for Hedera verification)
* RPC provider (Alchemy/Infura/QuickNode) for EVM chains (if verifying EVM wallets)

---

## 🧩 Environment Variables

### Frontend (`client/.env` or Vercel env vars)

```
VITE_API_BASE_URL=https://verify-my-wallet.onrender.com
VITE_CHAIN=hedera         # default chain for UI hints (optional)
```

### Backend (`server/.env` or Render env vars)

```
# Hedera
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=<your_hedra_private_key>

# Optional public key to verify against (demo)
USER_PUBLIC_KEY=<hex-or-der-encoded-public-key>

# EVM RPC
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/<YOUR_KEY>

# App
PORT=5000
```

> ⚠️ **Do NOT commit** private keys or .env files to source control. Add them in Render / Vercel dashboards for production.

---

## 🧱 Installation & Local Dev

Clone and run locally with pnpm.

```bash
# clone
git clone https://github.com/yourusername/VerifyMyWallet.git
cd VerifyMyWallet

# frontend
cd client
pnpm install
pnpm run dev
# open http://localhost:5173

# backend (new terminal)
cd ../server
pnpm install
# set local .env with the variables above
pnpm run start
# server runs at http://localhost:5000
```

---

## 🛠 Deployment

### Frontend → Vercel

1. Import repo on Vercel.
2. Set **Root Directory** to `client/`.
3. Set:

   * Install Command: `pnpm install`
   * Build Command: `pnpm run build`
   * Output Directory: `dist`
4. Add Environment Variable on Vercel:

   ```
   VITE_API_BASE_URL=https://verify-my-wallet.onrender.com
   ```
5. Deploy.

### Backend → Render

1. Create a new **Web Service** on Render.
2. Connect repo and choose root directory `server`.
3. Set Install Command: `pnpm install`
4. Set Start Command: `node index.js` (or `pnpm start`)
5. Add the backend environment variables (HEDERA_* , RPC_URL, PORT, etc.)
6. Deploy. The deployed URL will be your `VITE_API_BASE_URL`.

---

## 🧭 How It Works (High-Level Flow)

1. **User** clicks “Verify” in the frontend and chooses a wallet (MetaMask / HashPack / other).
2. Frontend requests a **nonce** from backend (`GET /generate-nonce`).
3. Wallet signs the nonce:

   * EVM: sign message with `ethers.js` (MetaMask)
   * Hedera: sign bytes via HashPack / Hedera SDK
4. Frontend sends signed proof to backend (`POST /verify-proof`) including `nonce`, `proof`, `accountId`, `chain`, `publicKey` (hedera).
5. **Backend SDK** verifies:

   * For EVM: uses `ethers.verifyMessage` or RPC to confirm signer = account
   * For Hedera: uses `@hashgraph/sdk` to validate signature against provided publicKey
6. Backend returns `success: true` or `false`. Optionally produce a ZKP-based proof record (future).
7. Frontend shows a verification badge and optional downloadable proof JSON.

---

## 🧩 Backend SDK Features

The `server/sdk/` folder contains helper modules that abstract chain interactions:

* `sdk/hedera.js`

  * `initClient(accountId, privateKey)` — initialize Hedera client
  * `verifySignature(publicKey, message, signature)` — verify Hedera signatures
  * (Optional) `submitTransaction(...)` — in case of on-chain receipts

* `sdk/evm.js`

  * `verifyEvmSignature(message, signature)` — recover address and match
  * `getAccountFromRpc(address)` — fetch on-chain data via RPC if needed

These wrappers centralize cryptographic verification logic and let the rest of the code call `sdk.verify()` without chain-specific details.

---

## 🔒 Security Notes

* Private keys must remain server-side and never transmitted to the frontend.
* Frontend only receives non-sensitive nonces and sends back signed proofs.
* Use HTTPS and secure environment variables on hosting providers.
* Consider rotating Hedera private keys and RPC keys regularly.
* ZKP circuit code should be audited before production use (if added).

---

## ✅ API Endpoints (Example)

**GET /generate-nonce**

```json
Response:
{ "nonce": "uuid-or-random-string" }
```

**POST /verify-proof**
Request body:

```json
{
  "nonce": "string",
  "proof": "signature or base64",
  "accountId": "0x... or 0.0.xxxx",
  "chain": "evm" | "hedera",
  "publicKey": "optional for hedera"
}
```

Response:

```json
{ "success": true, "message": "Wallet verified!" }
```

---

## 📦 Example Frontend Usage (axios)

```js
const API = import.meta.env.VITE_API_BASE_URL;

// generate nonce
const { data } = await axios.get(`${API}/generate-nonce`);

// sign nonce in wallet, then verify:
const res = await axios.post(`${API}/verify-proof`, {
  nonce,
  proof,
  accountId: walletAddress,
  chain: walletType, // "evm" or "hedera"
  publicKey: walletType === 'hedera' ? publicKey : null,
});
```

---

## 🗺️ Future Roadmap

* Add zk-SNARK / zk-STARK circuits for stronger ZKP guarantees
* Store verification receipts on-chain (optional)
* Add audit logs and analytics dashboard
* Onboard more wallets (WalletConnect, Coinbase Wallet, etc.)
* Add multi-chain discovery & automatic RPC selection

---

## 🧾 Contributing

Contributions are welcome. Please:

1. Fork repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes: `git commit -m "feat: description"`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request with a clear description

---

## 🧑‍💻 Author

**Emeka Donatus** (Victor4life)

* GitHub: [https://github.com/victor4life](https://github.com/victor4life)
* Email: (add if you want)

---

## 📜 License

MIT © 2025 — Emeka Donatus

---

## Appendix — Copy-Paste Ready `.env.example` Files

### `client/.env.example`

```
VITE_API_BASE_URL=https://verify-my-wallet.onrender.com
VITE_CHAIN=hedera
```

### `server/.env.example`

```
HEDERA_ACCOUNT_ID=0.0.6945707
HEDERA_PRIVATE_KEY=<your_hedera_private_key_here>
USER_PUBLIC_KEY=<your_demo_public_key_here>
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/<YOUR_KEY>
PORT=5000
```
