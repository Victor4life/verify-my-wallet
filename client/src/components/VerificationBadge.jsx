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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0a0a0a] text-white px-4">
      <Card className="w-full max-w-md bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl">
        <CardContent className="flex flex-col items-center text-center space-y-4 py-10">
          <div className="relative group">
            {/* Soft animated aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-emerald-400 to-cyan-300 blur-sm opacity-25 group-hover:opacity-50 animate-pulse-slow transition-all duration-300"></div>

            {/* Shield core (smaller size) */}
            <div className="relative w-4 h-4 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0d1117] to-[#111827] border border-white/10 shadow-[0_0_6px_rgba(0,255,200,0.15)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#shieldGradient)"
                strokeWidth="1"
                className="w-2.5 h-2.5 text-emerald-400 drop-shadow-[0_0_3px_rgba(16,185,129,0.7)] animate-glow"
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

          <h2 className="text-2xl font-bold text-emerald-400">
            Wallet Verified Successfully!
          </h2>

          <p className="text-gray-400 text-sm max-w-sm">
            Your {walletType?.toUpperCase()} wallet ownership has been verified
            anonymously. You can now download or share your verification proof.
          </p>

          <div className="bg-slate-800/60 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 w-full break-words">
            <strong>Wallet:</strong>{" "}
            <span className="text-blue-400">
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Unknown"}
            </span>
            <br />
            <strong>Chain:</strong> {walletType?.toUpperCase()}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6">
          <Button
            onClick={handleDownloadProof}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            📥 Download Proof JSON
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full border border-blue-400 text-blue-300 hover:bg-blue-950/40 hover:text-white transition-colors"
          >
            🔗 Copy Verification Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
