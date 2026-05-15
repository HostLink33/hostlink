"use client";

const pages = [
  { url: "/", icon: "🏠", titre: "Landing Page", desc: "Page d'accueil publique HostLink" },
  { url: "/inscription", icon: "📝", titre: "Inscription", desc: "Creation de compte proprietaire ou concierge" },
  { url: "/connexion", icon: "🔐", titre: "Connexion", desc: "Page de login avec reset mot de passe" },
  { url: "/dashboard", icon: "▦", titre: "Dashboard", desc: "Tableau de bord proprietaire avec KPIs" },
  { url: "/concierge", icon: "🏆", titre: "Profil Concierge", desc: "Fiche concierge avec scoring et avis" },
  { url: "/matching", icon: "🧠", titre: "Matching IA", desc: "Moteur de matching intelligent" },
  { url: "/paiements", icon: "💳", titre: "Paiements", desc: "Wallets, transactions et versements" },
];

export default function Nav() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        .card:hover{border-color:#0866FF!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(8,102,255,0.12)!important;}
        .card{transition:all 0.2s ease;}
      `}</style>

      <div style={{ minHeight: "100vh", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 44, height: 44, background: "#0866FF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 800, fontSize: "1.2rem" }}>H</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#111827" }}>HostLink</span>
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Navigation du projet</h1>
            <p style={{ color: "#6B7280", fontSize: "0.95rem", marginBottom: "1rem" }}>Toutes les pages codees — Frontend Etape 1</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 100, padding: "0.35rem 1rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669", display: "inline-block" }} />
              <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 600 }}>{pages.length} pages completees</span>
            </div>
          </div>

          {/* Pages grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            {pages.map((p, i) => (
              <a key={i} href={p.url} style={{ textDecoration: "none" }}>
                <div className="card" style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ width: 44, height: 44, background: "#EBF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>{p.titre}</span>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#059669", background: "#ECFDF5", padding: "0.2rem 0.5rem", borderRadius: 100 }}>✓ Done</span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.5 }}>{p.desc}</div>
                      <div style={{ fontSize: "0.75rem", color: "#0866FF", marginTop: "0.5rem", fontWeight: 500 }}>localhost:3000{p.url} →</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div style={{ background: "linear-gradient(135deg, #0550CC, #0866FF)", borderRadius: 16, padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem" }}>Etape 1 — Frontend</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>7 pages completees · Prochaine etape : Backend</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "0.6rem 1.25rem" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "1.5rem" }}>7/12</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", display: "block", textAlign: "center" }}>etapes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
