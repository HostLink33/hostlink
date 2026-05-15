"use client";
import { useState } from "react";

const concierges = [
  { id: 1, nom: "Excellence Conciergerie Paris", zone: "Paris & IDF", score: 9.4, occupation: 94, revenuMoy: 3400, reponse: "< 2h", biens: 47, avis: 128, specialite: ["Appartements", "Studios", "Lofts"], badge: "Top HostLink", compatible: 98 },
  { id: 2, nom: "Paris Premium Stay", zone: "Paris Centre", score: 8.9, occupation: 89, revenuMoy: 3100, reponse: "< 3h", biens: 31, avis: 89, specialite: ["Appartements", "Maisons"], badge: "Verifie", compatible: 91 },
  { id: 3, nom: "Ile-de-France Hosting", zone: "IDF & Banlieue", score: 8.4, occupation: 82, revenuMoy: 2600, reponse: "< 4h", biens: 24, avis: 64, specialite: ["Studios", "Appartements"], badge: null, compatible: 84 },
  { id: 4, nom: "Capital Conciergerie", zone: "Paris Ouest", score: 7.9, occupation: 76, revenuMoy: 2200, reponse: "< 6h", biens: 18, avis: 41, specialite: ["Maisons", "Villas"], badge: null, compatible: 72 },
];

const filters = {
  typeBien: ["Appartement", "Studio", "Maison", "Villa", "Loft", "Chalet"],
  zone: ["Paris", "Lyon", "Bordeaux", "Marseille", "Nice", "Toulouse"],
  standing: ["Econome", "Standard", "Premium", "Luxe"],
  budget: ["< 15%", "15-20%", "20-25%", "> 25%"],
};

export default function Matching() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ typeBien: "", zone: "", standing: "", budget: "", superficie: "", revenuCible: "" });
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyse = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setStep(2); }, 2800);
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.875rem", color: "#111827", outline: "none", fontFamily: "Inter, sans-serif", background: "white" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .spin { animation: spin 1s linear infinite; }
        .fade { animation: fadeIn 0.5s ease both; }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: "#0866FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontWeight: 800 }}>H</span></div>
          <span style={{ fontWeight: 700, color: "#111827" }}>HostLink</span>
        </div>
        <a href="/dashboard" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EBF2FF", border: "1px solid #DBEAFE", borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "1rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0866FF", animation: "pulse 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: "0.75rem", color: "#0866FF", fontWeight: 600 }}>Matching IA — Moteur intelligent</span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Trouvez le concierge <span style={{ color: "#0866FF" }}>parfait pour votre bien.</span>
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>Notre IA analyse vos criteres et selectionne les concierges les plus compatibles avec votre profil.</p>
        </div>

        {/* STEP 1 — Formulaire */}
        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "1.5rem" }}>

            {/* Formulaire */}
            <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Votre bien</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Type de bien</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {filters.typeBien.map(t => (
                      <div key={t} onClick={() => update("typeBien", t)} style={{ padding: "0.5rem 0.75rem", border: "1px solid "+(form.typeBien===t?"#0866FF":"#E5E7EB"), borderRadius: 8, cursor: "pointer", background: form.typeBien===t?"#EBF2FF":"white", fontSize: "0.82rem", fontWeight: form.typeBien===t?600:400, color: form.typeBien===t?"#0866FF":"#374151", textAlign: "center", transition: "all 0.15s" }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Ville</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {filters.zone.map(z => (
                      <div key={z} onClick={() => update("zone", z)} style={{ padding: "0.5rem 0.75rem", border: "1px solid "+(form.zone===z?"#0866FF":"#E5E7EB"), borderRadius: 8, cursor: "pointer", background: form.zone===z?"#EBF2FF":"white", fontSize: "0.82rem", fontWeight: form.zone===z?600:400, color: form.zone===z?"#0866FF":"#374151", textAlign: "center", transition: "all 0.15s" }}>
                        {z}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Standing</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {filters.standing.map(s => (
                      <div key={s} onClick={() => update("standing", s)} style={{ padding: "0.5rem 0.75rem", border: "1px solid "+(form.standing===s?"#0866FF":"#E5E7EB"), borderRadius: 8, cursor: "pointer", background: form.standing===s?"#EBF2FF":"white", fontSize: "0.82rem", fontWeight: form.standing===s?600:400, color: form.standing===s?"#0866FF":"#374151", textAlign: "center", transition: "all 0.15s" }}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Commission acceptee</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {filters.budget.map(b => (
                      <div key={b} onClick={() => update("budget", b)} style={{ padding: "0.5rem 0.75rem", border: "1px solid "+(form.budget===b?"#0866FF":"#E5E7EB"), borderRadius: 8, cursor: "pointer", background: form.budget===b?"#EBF2FF":"white", fontSize: "0.82rem", fontWeight: form.budget===b?600:400, color: form.budget===b?"#0866FF":"#374151", textAlign: "center", transition: "all 0.15s" }}>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Superficie (m²)</label>
                    <input value={form.superficie} onChange={e => update("superficie", e.target.value)} placeholder="ex: 45" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Revenu cible (€/mois)</label>
                    <input value={form.revenuCible} onChange={e => update("revenuCible", e.target.value)} placeholder="ex: 2500" style={inputStyle} />
                  </div>
                </div>
                <button onClick={handleAnalyse} disabled={!form.typeBien || !form.zone} style={{ width: "100%", padding: "0.9rem", background: form.typeBien && form.zone ? "#0866FF" : "#D1D5DB", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", cursor: form.typeBien && form.zone ? "pointer" : "not-allowed", marginTop: "0.5rem" }}>
                  🧠 Lancer le matching IA
                </button>
              </div>
            </div>

            {/* Info panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "linear-gradient(135deg, #0550CC, #0866FF)", borderRadius: 16, padding: "1.5rem", color: "white" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem", letterSpacing: "0.06em" }}>COMMENT CA MARCHE</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Notre IA analyse 12 criteres pour vous.</h3>
                {["Type et superficie du bien","Localisation et marche local","Standing et niveau de service","Historique de performance","Taux d'occupation moyen","Avis proprietaires","Delai de reponse","Tarifs et commissions","Specialites du concierge","Nombre de biens geres","Incidents et litiges","Anciennete sur HostLink"].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.4rem" }}>
                    <span style={{ width: 20, height: 20, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>{i+1}</span>
                    <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)" }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", marginBottom: "1rem", letterSpacing: "0.06em" }}>ESTIMATION INSTANTANEE</div>
                <div style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.5rem" }}>Votre bien pourrait generer</div>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0866FF", lineHeight: 1 }}>2 800 — 3 400 €</div>
                <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.3rem", marginBottom: "1rem" }}>par mois en courte duree</div>
                <div style={{ height: 1, background: "#F3F4F6", marginBottom: "1rem" }} />
                {[["Taux d'occupation estime","88%"],["Prix moyen par nuit","112 €"],["Performance vs marche","+21%"]].map(([l,v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>{l}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, padding: "4rem", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ width: 56, height: 56, border: "3px solid #EBF2FF", borderTop: "3px solid #0866FF", borderRadius: "50%", margin: "0 auto 1.5rem" }} className="spin" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Analyse en cours...</h2>
            <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "2rem" }}>Notre IA analyse 12 criteres et compare 200+ concierges dans votre zone.</p>
            <div style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Analyse du marche local...","Scoring des concierges disponibles...","Calcul de compatibilite...","Generation des recommandations..."].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0866FF", animation: `pulse ${1+i*0.3}s infinite` }} />
                  <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Resultats */}
        {done && !loading && (
          <div className="fade">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>4 concierges compatibles trouvés</h2>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "0.2rem" }}>Tries par compatibilite avec votre bien · {form.typeBien} · {form.zone}</p>
              </div>
              <button onClick={() => { setStep(1); setDone(false); setSelected(null); }} style={{ padding: "0.6rem 1.25rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
                Modifier les criteres
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {concierges.map((c, idx) => (
                <div key={c.id} className="fade" style={{ background: "white", border: "1px solid "+(selected===c.id?"#0866FF":"#E5E7EB"), borderRadius: 16, padding: "1.5rem", boxShadow: selected===c.id?"0 4px 20px rgba(8,102,255,0.12)":"0 1px 4px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.2s", animationDelay: idx*0.1+"s" }} onClick={() => setSelected(selected===c.id?null:c.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1 }}>
                      {/* Rang */}
                      <div style={{ width: 40, height: 40, background: idx===0?"#0866FF":idx===1?"#EBF2FF":"#F3F4F6", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", color: idx===0?"white":"#6B7280", flexShrink: 0 }}>
                        {idx===0?"🥇":idx===1?"🥈":"🥉"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                          <span style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{c.nom}</span>
                          {c.badge && <span style={{ fontSize: "0.65rem", fontWeight: 700, color: idx===0?"#0866FF":"#059669", background: idx===0?"#EBF2FF":"#ECFDF5", padding: "0.15rem 0.5rem", borderRadius: 100 }}>{c.badge}</span>}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: "0.75rem" }}>{c.zone} · {c.biens} biens geres · {c.avis} avis</div>
                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                          {[["Score",c.score+"/10","#0866FF"],["Occupation",c.occupation+"%","#059669"],["Revenu moy.",c.revenuMoy.toLocaleString()+" €","#7C3AED"],["Reponse",c.reponse,"#D97706"]].map(([l,v,col]) => (
                            <div key={l as string}>
                              <div style={{ fontSize: "0.65rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: col as string }}>{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Compatibilite */}
                    <div style={{ textAlign: "center", flexShrink: 0, marginLeft: "1rem" }}>
                      <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.compatible>=90?"#EBF2FF":c.compatible>=80?"#ECFDF5":"#F3F4F6", border: "3px solid "+(c.compatible>=90?"#0866FF":c.compatible>=80?"#059669":"#D1D5DB"), display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <span style={{ fontSize: "1rem", fontWeight: 800, color: c.compatible>=90?"#0866FF":c.compatible>=80?"#059669":"#6B7280" }}>{c.compatible}%</span>
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "#6B7280", marginTop: "0.3rem" }}>Compatible</div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {selected===c.id && (
                    <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #F3F4F6" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Specialites</div>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {c.specialite.map(s => <span key={s} style={{ padding: "0.25rem 0.6rem", background: "#F3F4F6", color: "#374151", borderRadius: 100, fontSize: "0.75rem" }}>{s}</span>)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Estimation pour votre bien</div>
                          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0866FF" }}>{(c.revenuMoy - 200).toLocaleString()} — {(c.revenuMoy + 300).toLocaleString()} €/mois</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <a href="/concierge" style={{ flex: 1, padding: "0.7rem", background: "#EBF2FF", color: "#0866FF", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", textAlign: "center", textDecoration: "none" }}>Voir le profil complet</a>
                        <button style={{ flex: 2, padding: "0.7rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Selectionner ce concierge →</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
