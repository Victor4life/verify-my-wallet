import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Hero({ onLaunch }) {
  const handleLaunch = () => {
    toast.info("🚀 Initializing wallet...");
    onLaunch();
  };

  // Animate wallet icons orbiting around the hero
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .orbit-container {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        animation: orbit 40s linear infinite;
        pointer-events: none;
        z-index: 0;
      }
      .wallet-icon {
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(0,255,200,0.3);
        transition: transform 0.3s ease;
      }
      .wallet-icon:hover {
        transform: scale(1.15);
        box-shadow: 0 0 25px rgba(0,255,255,0.6);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(20,25,35,0.85))",
          zIndex: 0,
        }}
      />

      {/* ✅ Navbar */}
      <nav
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 25px",
          zIndex: 2,
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/VerifyMyWallet-Icon.png"
            alt="VerifyMyWallet Logo"
            style={{ borderRadius: "50px", width: "45px", height: "45px" }}
          />
        </div>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "30px",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          {["Home", "Features", "Docs", "Contact"].map((item) => (
            <li
              key={item}
              style={{
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#00e5ff")}
              onMouseOut={(e) => (e.target.style.color = "#fff")}
            >
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={handleLaunch}
          style={{
            background: "#eee",
            border: "none",
            borderRadius: "20px",
            padding: "10px 26px",
            color: "#111",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #00bfa5, #0091ea)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #00e676, #00b0ff)")
          }
        >
          Launch App
        </button>
      </nav>

      {/* ✅ Hero Section */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "10px",
          paddingTop: "10px",
        }}
      >
        {/* Orbiting Wallet Icons */}
        {/*<div
          className="orbit-container"
          style={{
            top: "25%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            zIndex: -2222,
          }}
        >
          <img
            src="/metamask.webp"
            alt="MetaMask"
            className="wallet-icon"
            style={{
              top: "0%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <img
            src="/metamask.webp"
            alt="WalletConnect"
            className="wallet-icon"
            style={{
              top: "50%",
              left: "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <img
            src="/coinbase.png"
            alt="HashPack"
            className="wallet-icon"
            style={{
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <img
            src="/coinbase.png"
            alt="Coinbase"
            className="wallet-icon"
            style={{
              top: "50%",
              left: "0%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>*/}

        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "4px",
            fontWeight: "600",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #00e676, #00b0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VerifyMyWallet
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            marginBottom: "25px",
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

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <button
            onClick={handleLaunch}
            style={{
              backgroundColor: "#121111",
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#000")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#121111")}
          >
            View Docs
          </button>

          <button
            onClick={handleLaunch}
            style={{
              background: "#eee",
              border: "none",
              borderRadius: "10px",
              padding: "14px 36px",
              color: "#111",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 15px rgba(13, 18, 15, 0.3)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#fff")}
            onMouseOut={(e) => (e.target.style.background = "#fff")}
          >
            Launch App 🚀
          </button>
        </div>
      </div>

      {/* ❤️ Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#b0b8c3",
          fontSize: "0.95rem",
          fontWeight: "400",
          letterSpacing: "0.5px",
          zIndex: -1,
        }}
      >
        Made with <span style={{ color: "#00e676" }}>💚</span> love by{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #00e676, #00b0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "600",
          }}
        >
          Donatus
        </span>
      </footer>
    </div>
  );
}
