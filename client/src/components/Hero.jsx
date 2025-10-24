import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Hero({ onLaunch }) {
  const handleLaunch = () => {
    toast.info("🚀 Initializing wallet...");
    onLaunch();
  };

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .orbit-container {
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        animation: orbit 40s linear infinite;
        pointer-events: none;
        z-index: 0;
      }

      .wallet-icon {
        position: absolute;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(0,255,200,0.3);
        transition: transform 0.3s ease;
      }

      .wallet-icon:hover {
        transform: scale(1.15);
        box-shadow: 0 0 25px rgba(0,255,255,0.6);
      }

      /* 🔹 Mobile Responsiveness */
      @media (max-width: 768px) {
        .orbit-container {
          width: 180px;
          height: 180px;
        }
        .wallet-icon {
          width: 35px;
          height: 35px;
        }
        .hero-title {
          font-size: 1.8rem !important;
        }
        .hero-text {
          font-size: 1rem !important;
          max-width: 90% !important;
          margin: 0 auto !important;
        }
        nav ul {
          display: none !important;
        }
        nav {
          padding: 10px 20px !important;
        }
        .hero-buttons {
          flex-direction: column !important;
          gap: 15px !important;
        }
        footer {
          font-size: 0.8rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh, 1vh) * 100)",
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
            style={{ borderRadius: "50px", width: "40px", height: "40px" }}
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
            background: "linear-gradient(90deg, #00e676, #00b0ff)",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            color: "#111",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Launch
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
          padding: "0 15px",
        }}
      >
        <div
          className="orbit-container"
          style={{
            top: "25%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            zIndex: -2222,
          }}
        >
          <img
            src="/metamask.webp"
            alt="MetaMask"
            className="wallet-icon"
            style={{ top: "0%", left: "50%" }}
          />
          <img
            src="/walletconnect.jpg"
            alt="WalletConnect"
            className="wallet-icon"
            style={{ top: "50%", left: "100%" }}
          />
          <img
            src="/hashpack.png"
            alt="HashPack"
            className="wallet-icon"
            style={{ top: "100%", left: "50%" }}
          />
          <img
            src="/coinbase.png"
            alt="Coinbase"
            className="wallet-icon"
            style={{ top: "50%", left: "0%" }}
          />
        </div>

        <h1
          className="hero-title"
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
          className="hero-text"
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

        <div
          className="hero-buttons"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
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
          >
            View Docs
          </button>

          <button
            onClick={handleLaunch}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 36px",
              color: "#111",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Launch App 🚀
          </button>
        </div>
      </div>

      {/* ❤️ Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#b0b8c3",
          fontSize: "0.9rem",
          fontWeight: "400",
          letterSpacing: "0.5px",
          zIndex: 1,
        }}
      >
        Made with <span style={{ color: "#00e676" }}>💚</span> by{" "}
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
