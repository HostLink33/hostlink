"use client";
import { useState } from "react";

type Role = "proprietaire" | "concierge" | null;
type Step = 1 | 2 | 3;

export default function Inscription() {
  const [role, setRole] = useState<Role>(null);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", password: "",
    typeBien: "", ville: "", superficie: "", nbBiens: "",
    experience: "", zone: "", nbBiensGeres: "", siret: "",
  });
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const inputStyle = { width: "100%", padding: "0.8rem 1rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "#111827", outline: "none", background: "white" };
  const labelStyle = { display: "block" as const, fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" };
  const Field = ({ label, k, type = "text", placeholder = "" }: { label: string; k: string; type?: string; placeholder?: string }) => (
    <div><label style={labelStyle}>{label}</label><input type={type} value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} placeholder={placeholder} style={inputStyle} /></div>
  );
  const Select = ({ label, k, options }: { label: string; k: string; options: string[] }) => (
    <div><label style={labelStyle}>{label}</label><select value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}><option value="">Sélectionner...</option>{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
  );
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}`}</style>
      <div style={{ minHeight: "100vh", display: "flex" }}>
        <div style={{ width: "42%", background: "linear-gradient(135deg, #0550CC 0%, #0866FF 60%, #3B82F6 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", position: "relative", zIndex: 1 }}>
            <div style={{ width: 36, height: 36, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#0866FF", fontWeight: 800 }}>H</span></div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "1.2rem" }}>HostLink</span>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "white", fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>La délégation locative,<br />réinventée.</h2>
            {[["🧠","Matching IA","Le meilleur concierge pour votre bien"],["🔄","Switch en 1 clic","Changez d'opérateur sans friction"],["💳","Paiements automatisés","IBAN virtuel dédié par bien"],["📊","Dashboard temps réel","Pilotez vos revenus où que vous soyez"]].map(([icon,title,desc]) => (
              <div key={title as string} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
                <div><div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{title}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>{desc}</div></div>
              </div>
            ))}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>© 2025 HostLink</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 4rem" }}>
          <div style={{ width: "100%", maxWidth: 480, marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              {["Votre profil","Votre situation","Confirmation"].map((s,i) => (<span key={s} style={{ fontSize: "0.75rem", fontWeight: 600, color: i+1 <= step ? "#0866FF" : "#9CA3AF" }}>{s}</span>))}
            </div>
            <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4 }}><div style={{ height: "100%", background: "#0866FF", borderRadius: 4, width: `${(step/3)*100}%`, transition: "width 0.4s" }} /></div>
          </div>
          <div style={{ width: "100%", maxWidth: 480 }}>
            {step === 1 && (
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Créer un compte</h1>
                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Vous êtes :</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[{id:"proprietaire",icon:"🏠",title:"Propriétaire",desc:"Je veux déléguer la gestion de mon bien"},{id:"concierge",icon:"🤝",title:"Conciergerie",desc:"Je gère des biens pour des propriétaires"}].map(r => (
                    <div key={r.id} onClick={() => setRole(r.id as Role)} style={{ border: `2px solid ${role===r.id?"#0866FF":"#E5E7EB"}`, borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: role===r.id?"#EBF2FF":"white" }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{r.icon}</div>
                      <div style={{ fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>{r.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <Field label="Prénom" k="prenom" placeholder="Jean" />
                    <Field label="Nom" k="nom" placeholder="Dupont" />
                  </div>
                  <Field label="Email" k="email" type="email" placeholder="jean@email.com" />
                  <Field label="Téléphone" k="telephone" type="tel" placeholder="+33 6 00 00 00 00" />
                  <Field label="Mot de passe" k="password" type="password" placeholder="8 caractères minimum" />
                </div>
                <button onClick={() => { if(role && form.prenom && form.email) setStep(2); }} style={{ width: "100%", padding: "0.9rem", background: role?"#0866FF":"#D1D5DB", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Continuer →</button>
                <p style={{ textAlign: "center", fontSize: "0.82rem", color: "#6B7280", marginTop: "1rem" }}>Déjà un compte ? <a href="/connexion" style={{ color: "#0866FF", fontWeight: 600, textDecoration: "none" }}>Se connecter</a></p>
              </div>
            )}
            {step === 2 && (
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{role==="proprietaire"?"Votre bien":"Votre activité"}</h1>
                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{role==="proprietaire"?"Pour vous proposer les meilleurs concierges.":"Pour vous connecter aux bons propriétaires."}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {role==="proprietaire" ? (
                    <><Select label="Type de bien" k="typeBien" options={["Appartement","Maison","Villa","Studio","Loft","Chalet"]} /><Field label="Ville" k="ville" placeholder="Paris, Lyon..." /><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}><Field label="Superficie (m²)" k="superficie" placeholder="45" /><Select label="Nombre de biens" k="nbBiens" options={["1","2 à 5","6 à 10","+ 10"]} /></div></>
                  ) : (
                    <><Field label="Zone d'activité" k="zone" placeholder="Paris, IDF..." /><Select label="Expérience" k="experience" options={["Moins d'1 an","1 à 3 ans","3 à 5 ans","+ 5 ans"]} /><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}><Select label="Biens gérés" k="nbBiensGeres" options={["1 à 5","6 à 15","16 à 30","+ 30"]} /><Field label="SIRET" k="siret" placeholder="123 456 789" /></div></>
                  )}
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.9rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>← Retour</button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Continuer →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 72, height: 72, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>✓</div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Presque là !</h1>
                <p style={{ color: "#6B7280", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 2rem" }}>Un email de confirmation a été envoyé à <strong>{form.email}</strong>.</p>
                <button style={{ width: "100%", padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", marginBottom: "1rem" }}>Accéder à mon espace →</button>
                <button onClick={() => setStep(2)} style={{ width: "100%", padding: "0.9rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>← Modifier</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
