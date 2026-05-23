"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, SelectField } from "@/components/FormField";

type Role = "proprietaire" | "concierge" | null;
type Step = 1 | 2 | 3;

export default function Inscription() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [typeBien, setTypeBien] = useState("");
  const [ville, setVille] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [nbBiens, setNbBiens] = useState("");
  const [zone, setZone] = useState("");
  const [experience, setExperience] = useState("");
  const [nbBiensGeres, setNbBiensGeres] = useState("");
  const [siret, setSiret] = useState("");

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, nom, email, telephone, password, role, typeBien, ville, superficie, nbBiens, zone, experience, nbBiensGeres, siret }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erreur inscription."); setLoading(false); return; }
      setStep(3);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      setError("Erreur serveur. Reessayez.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 0.8s linear infinite}
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex" }}>
        {/* LEFT */}
        <div style={{ width: "42%", background: "linear-gradient(135deg, #0550CC 0%, #0866FF 60%, #3B82F6 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", position: "relative", zIndex: 1 }}>
            <div style={{ width: 36, height: 36, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#0866FF", fontWeight: 800 }}>H</span></div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "1.2rem" }}>HostLink</span>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "white", fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>La delegation locative,<br />reinventee.</h2>
            {[["🧠","Matching IA","Le meilleur concierge pour votre bien"],["🔄","Switch en 1 clic","Changez d operateur sans friction"],["💳","Paiements auto","IBAN virtuel dedie par bien"],["📊","Dashboard","Pilotez vos revenus partout"]].map(([icon,t,d]) => (
              <div key={t as string} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
                <div><div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{t}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>© 2025 HostLink</div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 4rem", overflowY: "auto" }}>
          <div style={{ width: "100%", maxWidth: 480, marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              {["Votre profil","Votre situation","Confirmation"].map((s,i) => (
                <span key={s} style={{ fontSize: "0.75rem", fontWeight: 600, color: i+1<=step?"#0866FF":"#9CA3AF" }}>{s}</span>
              ))}
            </div>
            <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4 }}>
              <div style={{ height: "100%", background: "#0866FF", borderRadius: 4, width: `${(step/3)*100}%`, transition: "width 0.4s" }} />
            </div>
          </div>

          <div style={{ width: "100%", maxWidth: 480 }}>
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#DC2626" }}>{error}</div>}

            {step === 1 && (
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Creer un compte</h1>
                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Vous etes :</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[{id:"proprietaire",icon:"🏠",title:"Proprietaire",desc:"Je veux deleguer la gestion"},{id:"concierge",icon:"🤝",title:"Conciergerie",desc:"Je gere des biens"}].map(r => (
                    <div key={r.id} onClick={() => setRole(r.id as Role)} style={{ border: `2px solid ${role===r.id?"#0866FF":"#E5E7EB"}`, borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: role===r.id?"#EBF2FF":"white", transition: "all 0.2s" }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{r.icon}</div>
                      <div style={{ fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>{r.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <Field label="Prenom" value={prenom} onChange={setPrenom} placeholder="Jean" />
                    <Field label="Nom" value={nom} onChange={setNom} placeholder="Dupont" />
                  </div>
                  <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="jean@email.com" />
                  <Field label="Telephone" value={telephone} onChange={setTelephone} type="tel" placeholder="+33 6 00 00 00 00" />
                  <Field label="Mot de passe" value={password} onChange={setPassword} type="password" placeholder="8 caracteres minimum" />
                </div>
                <button onClick={() => { if(role && prenom && email && password) setStep(2); }} style={{ width: "100%", padding: "0.9rem", background: role?"#0866FF":"#D1D5DB", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: role?"pointer":"not-allowed", fontFamily: "Inter, sans-serif" }}>
                  Continuer →
                </button>
                <p style={{ textAlign: "center", fontSize: "0.82rem", color: "#6B7280", marginTop: "1rem" }}>Deja un compte ? <a href="/connexion" style={{ color: "#0866FF", fontWeight: 600, textDecoration: "none" }}>Se connecter</a></p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{role==="proprietaire"?"Votre bien":"Votre activite"}</h1>
                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{role==="proprietaire"?"Pour vous proposer les meilleurs concierges.":"Pour vous connecter aux bons proprietaires."}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {role==="proprietaire" ? (<>
                    <SelectField label="Type de bien" value={typeBien} onChange={setTypeBien} options={["Appartement","Maison","Villa","Studio","Loft","Chalet"]} />
                    <Field label="Ville" value={ville} onChange={setVille} placeholder="Paris, Lyon..." />
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                      <Field label="Superficie (m2)" value={superficie} onChange={setSuperficie} placeholder="45" />
                      <SelectField label="Nombre de biens" value={nbBiens} onChange={setNbBiens} options={["1","2 a 5","6 a 10","+ 10"]} />
                    </div>
                  </>) : (<>
                    <Field label="Zone d activite" value={zone} onChange={setZone} placeholder="Paris, IDF..." />
                    <SelectField label="Experience" value={experience} onChange={setExperience} options={["Moins d 1 an","1 a 3 ans","3 a 5 ans","+ 5 ans"]} />
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                      <SelectField label="Biens geres" value={nbBiensGeres} onChange={setNbBiensGeres} options={["1 a 5","6 a 15","16 a 30","+ 30"]} />
                      <Field label="SIRET" value={siret} onChange={setSiret} placeholder="123 456 789" />
                    </div>
                  </>)}
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.9rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>← Retour</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    {loading ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%" }} className="spin" />Creation...</> : "Creer mon compte →"}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 72, height: 72, background: "#ECFDF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>✓</div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Compte cree !</h1>
                <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "1rem" }}>Bienvenue sur HostLink, <strong>{prenom}</strong> ! Redirection...</p>
                <div style={{ width: 32, height: 32, border: "3px solid #EBF2FF", borderTop: "3px solid #0866FF", borderRadius: "50%", margin: "0 auto" }} className="spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
