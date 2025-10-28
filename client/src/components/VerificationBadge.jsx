import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";
import { toast } from "react-toastify";

export default function VerificationBadge({
  walletAddress,
  proof,
  walletType,
}) {
  const handleDownloadProof = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            walletAddress,
            proof,
            walletType,
            timestamp: new Date().toISOString(),
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "VerifyMyWallet_Proof.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("📥 Proof downloaded successfully!");
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/verify/${walletAddress}`;
    navigator.clipboard.writeText(link);
    toast.info("🔗 Verification link copied to clipboard!");
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }

        .verify-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(to bottom right, #0f172a, #111827, #0a0a0a);
          color: white;
          padding: 1rem;
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          max-width: 28rem;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 1rem;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 2.5rem 1rem;
        }

        /* --- Badge (larger shield area) --- */
        .shield-group {
          position: relative;
          display: inline-block;
          width: 4rem;
          height: 4rem;
          margin-bottom: 0.5rem;
        }

        .shield-aura {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(to top right, #3b82f6, #10b981, #06b6d4);
          filter: blur(6px);
          opacity: 0.25;
          transition: opacity 0.3s ease;
        }

        .shield-group:hover .shield-aura {
          opacity: 0.5;
        }

        .shield-core {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: linear-gradient(to bottom right, #0d1117, #111827);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(0, 255, 200, 0.15);
        }

        .shield-icon {
          width: 2rem;
          height: 2rem;
          filter: drop-shadow(0 0 3px rgba(16, 185, 129, 0.7));
        }

        .verify-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #10b981;
          margin-top: 0.5rem;
        }

        .verify-text {
          color: #9ca3af;
          font-size: 0.9rem;
          max-width: 24rem;
        }

        .wallet-info {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #cbd5e1;
          width: 100%;
          word-break: break-word;
        }

        .wallet-address {
          color: #3b82f6;
        }

        .card-footer {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 0 1.5rem 1.5rem;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(to right, #3b82f6, #10b981);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .btn-primary:hover {
          transform: scale(1.05);
        }

        .btn-outline {
          width: 100%;
          background: transparent;
          border: 1px solid #60a5fa;
          color: #93c5fd;
          border-radius: 0.5rem;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: rgba(23, 37, 84, 0.4);
          color: white;
        }

        /* Prevent page overflow and center cleanly on smaller screens */
        @media (max-height: 700px) {
          .verify-container {
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
            padding: 2rem 1rem;
          }
        }
      `}</style>

      <div className="verify-container">
        <div className="card">
          <div className="card-content">
            <div className="shield-group">
              <div className="shield-aura"></div>
              <div className="shield-core">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#shieldGradient)"
                  strokeWidth="1"
                  className="shield-icon"
                >
                  <defs>
                    <linearGradient
                      id="shieldGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l8 4v6c0 5.25-3.25 10-8 10s-8-4.75-8-10V6l8-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.5l2 2 3.5-3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h2 className="verify-title">Wallet Verified Successfully!</h2>

            <p className="verify-text">
              Your {walletType?.toUpperCase()} wallet ownership has been
              verified anonymously. You can now download or share your
              verification proof.
            </p>

            <div className="wallet-info">
              <strong>Wallet:</strong>{" "}
              <span className="wallet-address">
                {walletAddress
                  ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : "Unknown"}
              </span>
              <br />
              <strong>Chain:</strong> {walletType?.toUpperCase()}
            </div>
          </div>

          <div className="card-footer">
            <button onClick={handleDownloadProof} className="btn-primary">
              📥 Download Proof JSON
            </button>

            <button onClick={handleCopyLink} className="btn-outline">
              🔗 Copy Verification Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
