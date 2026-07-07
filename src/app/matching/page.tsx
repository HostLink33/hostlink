"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

interface Bien {
  id: string;
  nom: string;
  type: string;
  ville: string;
  superficie: number;
}

interface MatchResult {
  concierge: {
    id: string;
    nom: string;
    zone: string;
    score: number;
    occupation: number;
    revenuMoy: number;
    reponse: string;
    nbBiens: number;
    verifie: boolean;
    experience: string;
  };
  compatibilite: number;
  estimationRevenu: { min: number; max: number };
  recommandation: string;
  details: { critere: string; score: number; poids: number; note: string }[];
}

export default function Matching() {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [selectedBien, setSelectedBien] = useState<string>("");
  const [standing, setStanding] = useState("Premium");
  const [budget, setBudget] = useState("20-25%");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [simulation, setSimulation] = useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    fetch("/api/biens").then(r => r.json()).then(d => setBiens(d.biens || []));
  }, []);

  const handleMatch = async () => {
    const bien = biens.find(b => b.id === selectedBien);
    if (!bien) return;
    setLoading(true);
    try {
      const res = await fetch("/api/matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: bien.type, ville: bien.ville,
          superficie: bien.superficie, standing,
          revenuCible: 3000, budgetCommission: budget,
        }),
      });
      const data = await res.json();
      setResults(data.resultats || []);
      setSimulation(data.simulation || null);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (score: number) => score >= 85 ? "#059669" : score >= 70 ? "#0866FF" : score >= 55 ? "#D97706" : "#DC2626";
  const getBg = (score: number) => score >= 85 ? "#ECFDF5" : score >= 70 ? "#EBF2FF" : score >= 55 ? "#FFFBEB" : "#FEF2F2";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .card{background:white;border-radius:16px;border:1px solid #E5E7EB;padding:1.5rem;}
        select,input{width:100%;padding:0.75rem 1rem;border:1px solid #E5E7EB;border-radius:8px;font-family:Inter,sans-serif;font-size:0.875rem;outline:none;background:white;}
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <div style={{ width: 240, background: "white", borderRight: "1px solid #E5E7EB", padding: "1.5rem", display: "flex", flexDirection: "column", position: "fixed", height: "100vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ width: 36, height: 36, background: "#0866FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800 }}>H</div>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>HostLink</span>
          </div>
          {[
            { label: "Dashboard", icon: "📊", href: "/dashboard" },
            { label: "Mes biens", icon: "🏠", href: "/dashboard" },
            { label: "Concierges", icon: "🤝", href: "/concierge" },
            { label: "Paiements", icon: "💳", href: "/paiements" },
            { label: "Matching IA", icon: "🧠", href: "/matching", active: true },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, marginBottom: "0.25rem", background: item.active ? "#EBF2FF" : "transparent", color: item.active ? "#0866FF" : "#6B7280", textDecoration: "none", fontWeight: item.active ? 600 : 400, fontSize: "0.875rem" }}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{ marginTop: "auto" }}>
            <a href="/dashboard" style={{ display: "block", textAlign: "center", padding: "0.6rem", background: "#F3F4F6", color: "#374151", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.8rem" }}>← Dashboard</a>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>🧠 Matching IA</h1>
            <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Trouvez le meilleur concierge pour votre bien.</p>
          </div>

          {/* FORMULAIRE */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Configurer le matching</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Votre bien</label>
                <select value={selectedBien} onChange={e => setSelectedBien(e.target.value)}>
                  <option value="">Sélectionner un bien...</option>
                  {biens.map(b => <option key={b.id} value={b.id}>{b.nom} — {b.ville}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Standing</label>
                <select value={standing} onChange={e => setStanding(e.target.value)}>
                  {["Econome", "Standard", "Premium", "Luxe"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Budget commission</label>
                <select value={budget} onChange={e => setBudget(e.target.value)}>
                  {["15-20%", "20-25%", "25-30%", "30%+"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleMatch} disabled={!selectedBien || loading} style={{ padding: "0.9rem 2rem", background: selectedBien ? "#0866FF" : "#D1D5DB", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: selectedBien ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {loading ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Analyse en cours...</> : "🧠 Lancer le matching"}
            </button>
          </div>

          {/* SIMULATION */}
          {simulation && (
            <div className="card" style={{ marginBottom: "2rem", background: "linear-gradient(135deg, #EBF2FF, #F0F9FF)" }}>
              <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>📊 Simulation de revenus</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                {[
                  { label: "Revenu min.", value: `${simulation.fourchette.min.toLocaleString("fr-FR")} €/mois`, color: "#6B7280" },
                  { label: "Revenu max.", value: `${simulation.fourchette.max.toLocaleString("fr-FR")} €/mois`, color: "#059669" },
                  { label: "Taux occupation", value: `${simulation.tauxOccupation}%`, color: "#0866FF" },
                  { label: "Prix/nuit estimé", value: `${simulation.prixNuit} €`, color: "#7C3AED" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.3rem" }}>{s.label}</p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RÉSULTATS */}
          {results.length > 0 && (
            <div>
              <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>🏆 {results.length} concierges compatibles</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {results.map((r, i) => (
                  <div key={r.concierge.id} className="card" style={{ cursor: "pointer", border: selectedResult?.concierge.id === r.concierge.id ? "2px solid #0866FF" : "1px solid #E5E7EB" }} onClick={() => setSelectedResult(selectedResult?.concierge.id === r.concierge.id ? null : r)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, background: getBg(r.compatibilite), borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: getColor(r.compatibilite), fontSize: "1rem" }}>#{i+1}</div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <p style={{ fontWeight: 700, color: "#111827" }}>{r.concierge.nom}</p>
                            {r.concierge.verifie && <span style={{ fontSize: "0.7rem", background: "#ECFDF5", color: "#059669", padding: "0.2rem 0.5rem", borderRadius: 20, fontWeight: 600 }}>✓ Vérifié</span>}
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{r.concierge.zone} · {r.concierge.experience} · {r.concierge.nbBiens} biens</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: getColor(r.compatibilite) }}>{r.compatibilite}%</div>
                        <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>compatibilité</div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginTop: "1rem", padding: "0.75rem", background: "#F9FAFB", borderRadius: 8 }}>
                      {[
                        { label: "Score", value: `${r.concierge.score}/10` },
                        { label: "Occupation", value: `${r.concierge.occupation}%` },
                        { label: "Revenu moy.", value: `${r.concierge.revenuMoy.toLocaleString("fr-FR")} €` },
                        { label: "Réponse", value: r.concierge.reponse },
                      ].map(stat => (
                        <div key={stat.label} style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "0.7rem", color: "#6B7280" }}>{stat.label}</p>
                          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>Estimation : </span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#059669" }}>{r.estimationRevenu.min.toLocaleString("fr-FR")} — {r.estimationRevenu.max.toLocaleString("fr-FR")} €/mois</span>
                      </div>
                      <span style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: 20, background: getBg(r.compatibilite), color: getColor(r.compatibilite), fontWeight: 600 }}>{r.recommandation.split("—")[0]}</span>
                    </div>

                    {selectedResult?.concierge.id === r.concierge.id && (
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
                        <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.75rem", fontSize: "0.875rem" }}>Détail des critères :</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                          {r.details.map(d => (
                            <div key={d.critere} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "#F9FAFB", borderRadius: 6 }}>
                              <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{d.critere}</span>
                              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: getColor(d.score) }}>{d.score}%</span>
                            </div>
                          ))}
                        </div>
                        <button style={{ marginTop: "1rem", width: "100%", padding: "0.75rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                          Contacter ce concierge →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
