"use client";
import { useState } from "react";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"connexion" | "reset">("connexion");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = () => {
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    if (!email.includes("@")) { setError("Email invalide."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1800);
  };

  const handleReset = () => {
    if (!email.includes("@")) { setError("Email invalide."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setResetSent(true); }, 1500);
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem",
    border: "1.5px solid #E5E7EB", borderRadius: 10,
    fontFamily: "Inter, sans-serif", fontSize: "0.9rem",
    color: "#111827", outline: "none", background: "white",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .spin{animation:spin 0.8s linear infinite}
        .fade{animation:fadeIn 0.4s ease both}
        input:focus{border-color:#0866FF !important; box-shadow:0 0 0 3px rgba(8,102,255,0.1);}
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex" }}>

        {/* LEFT */}
        <div style={{ width: "45%", background: "linear-gradient(135deg, #0550CC 0%, #0866FF 55%, #3B82F6 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", position: "relative", zIndex: 1 }}>
            <div style={{ width: 36, height: 36, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#0866FF", fontWeight: 800, fontSize: "1rem" }}>H</span>
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "1.2rem" }}>HostLink</span>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "white", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              Bienvenue sur<br />HostLink.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Gerez vos biens, pilotez vos revenus et trouvez les meilleurs concierges depuis un seul endroit.
            </p>

            {/* Testimonial */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "1.25rem", border: "1px solid rgba(255,255,255,0.15)" }}>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem", fontStyle: "italic" }}>
                "Depuis HostLink, mes 3 biens generent 38% de plus. Le switch concierge m'a sauve quand mon operateur sous-performait."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white" }}>S</div>
                <div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}>Sophie M.</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>Proprietaire · 3 biens · Paris</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>© 2025 HostLink · Tous droits reserves</div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 4rem" }}>

          {mode === "connexion" && (
            <div style={{ width: "100%", maxWidth: 420 }} className="fade">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>Connexion</h1>
              <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "2rem" }}>Bon retour 👋 Entrez vos identifiants.</p>

              {/* Boutons sociaux */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <button style={{ padding: "0.75rem", background: "white", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.875rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#374151" }}>
                  <span>🔵</span> Google
                </button>
                <button style={{ padding: "0.75rem", background: "white", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.875rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#374151" }}>
                  <span>🍎</span> Apple
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>ou avec votre email</span>
                <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
              </div>

              {error && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#DC2626" }}>
                  ⚠ {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jean@email.com" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor="#0866FF"}
                    onBlur={e => e.currentTarget.style.borderColor="#E5E7EB"}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151" }}>Mot de passe</label>
                    <button onClick={() => setMode("reset")} style={{ fontSize: "0.78rem", color: "#0866FF", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Mot de passe oublie ?</button>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor="#0866FF"}
                    onBlur={e => e.currentTarget.style.borderColor="#E5E7EB"}
                    onKeyDown={e => e.key==="Enter" && handleLogin()}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <input type="checkbox" id="remember" style={{ width: 16, height: 16, accentColor: "#0866FF" }} />
                <label htmlFor="remember" style={{ fontSize: "0.82rem", color: "#6B7280", cursor: "pointer" }}>Se souvenir de moi</label>
              </div>

              <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: loading?"not-allowed":"pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", opacity: loading?0.8:1 }}>
                {loading ? (
                  <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%" }} className="spin" /> Connexion...</>
                ) : "Se connecter →"}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.82rem", color: "#6B7280", marginTop: "1.5rem" }}>
                Pas encore de compte ?{" "}
                <a href="/inscription" style={{ color: "#0866FF", fontWeight: 600, textDecoration: "none" }}>Creer un compte</a>
              </p>

              {/* Trust badges */}
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F3F4F6" }}>
                {["SSL securise", "RGPD conforme", "Donnees protegees"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ color: "#059669", fontSize: "0.7rem" }}>✓</span>
                    <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === "reset" && (
            <div style={{ width: "100%", maxWidth: 420 }} className="fade">
              {!resetSent ? (
                <>
                  <button onClick={() => setMode("connexion")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "0.875rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "Inter, sans-serif" }}>← Retour</button>
                  <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.4rem" }}>Mot de passe oublie</h1>
                  <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "2rem" }}>Entrez votre email et on vous envoie un lien de reinitialisation.</p>
                  {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#DC2626" }}>⚠ {error}</div>}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jean@email.com" style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor="#0866FF"}
                      onBlur={e => e.currentTarget.style.borderColor="#E5E7EB"}
                    />
                  </div>
                  <button onClick={handleReset} disabled={loading} style={{ width: "100%", padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                    {loading ? <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%" }} className="spin" />Envoi...</> : "Envoyer le lien →"}
                  </button>
                </>
              ) : (
                <div style={{ textAlign: "center" }} className="fade">
                  <div style={{ width: 72, height: 72, background: "#ECFDF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>✉️</div>
                  <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Email envoye !</h1>
                  <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem" }}>Un lien de reinitialisation a ete envoye a <strong style={{ color: "#111827" }}>{email}</strong>. Verifiez vos spams si besoin.</p>
                  <button onClick={() => { setMode("connexion"); setResetSent(false); }} style={{ width: "100%", padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontFamily: "Inter, sans-serif", fontWeight: 700, cursor: "pointer" }}>Retour a la connexion</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
