export class VerifyMyWallet {
  constructor({ apiBaseUrl = "https://verify-my-wallet.onrender.com" } = {}) {
    this.apiBaseUrl = apiBaseUrl;
  }

  // ✅ Verify wallet ownership
  async verify(walletAddress, walletType) {
    try {
      const res = await fetch(`${this.apiBaseUrl}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, walletType }),
      });

      if (!res.ok) throw new Error("Verification failed");
      return await res.json();
    } catch (err) {
      console.error("Verification error:", err);
      return { success: false, error: err.message };
    }
  }

  // ✅ Get proof for a verified wallet
  async getProof(walletAddress) {
    try {
      const res = await fetch(`${this.apiBaseUrl}/proof/${walletAddress}`);
      if (!res.ok) throw new Error("Failed to fetch proof");
      return await res.json();
    } catch (err) {
      console.error("Proof fetch error:", err);
      return { success: false, error: err.message };
    }
  }
}
