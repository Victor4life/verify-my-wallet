import React from "react";
import { toast } from "react-toastify";

export default function Hero({ onLaunch }) {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(20,25,35,0.85))",
            zIndex: 0,
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            zIndex: 1,
            textAlign: "center",
            maxWidth: "650px",
            padding: "0 20px",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "15px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              color: "#fff",
            }}
          >
            🔐 VerifyMyWallet
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "35px",
              color: "#b0b8c3",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Prove wallet ownership{" "}
            <span style={{ color: "#00e676" }}>anonymously</span> <br />
            using <b>HashPack</b> or <b>MetaMask</b> — secure, seamless, and
            privacy-first.
          </p>

          <button
            onClick={() => {
              toast.info("🚀 Initializing wallet...");
              onLaunch();
            }}
            style={{
              backgroundColor: "#121111ff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px",
              padding: "14px 36px",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 15px rgba(13, 18, 15, 0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#000000ff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#090909ff";
            }}
          >
            Launch App 🚀
          </button>
        </div>
      </div>
    </>
  );
}
