"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface Concierge {
  id: string;
  nom: string;
  zone: string;
  score: number;
  occupation: number;
  experience: string;
  siret?: string;
  reponse?: string;
  nbBiens: number;
  verifie: boolean;
  user: { email: string; prenom: string; nom: string };
  avis: { note: number; commentaire: string; auteur: string; createdAt: string }[];
  biens: { id: string; nom: string }[];
}

export default function ConciergesPage() {
  const router = useRouter();
  const [concierges, setConcierges] = useState<Concierge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Concierge | null>(null);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, conciergesRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/concierges"),
        ]);
        if (!userRes.ok) { router.push("/connexion"); return; }
        const userData = await userRes.json();
        const conciergesData = await conciergesRes.json();
        setUser(userData.user);
        setConcierges(conciergesData.concierges || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const filtered = concierges.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.zone.toLowerCase().includes(search.toLowerCase())
  );

  const getScoreColor = (score: number) => score >= 9 ? "#059669" : score >= 7 ? "#0866FF" : score >= 5 ? "#D97706" : "#DC2626";
  const getScoreBg = (score: number) => score >= 9 ? "#ECFDF5" : score >= 7 ? "#EBF2FF" : score >= 5 ? "#FFFBEB" : "#FEF2F2";

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #EBF2FF", borderTop: "3px solid #0866FF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        .card{background:white;border-radius:16px;border:1px solid #E5E7EB;padding:1.5rem;}
        input{width:100%;padding:0.75rem 1rem;border:1px solid #E5E7EB;border-radius:8px;font-family:Inter,sans-serif;font-size:0.875rem;outline:none;}
        input:focus{border-color:#0866FF;}
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>🤝 Concierges</h1>
            <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Tous les concierges disponibles sur HostLink.</p>
          </div>

          {/* SEARCH */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Rechercher par nom ou zone..." />
          </div>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Total concierges", value: concierges.length, icon: "🤝", color: "#0866FF" },
              { label: "Vérifiés HostLink", value: concierges.filter(c => c.verifie).length, icon: "✓", color: "#059669" },
              { label: "Score moyen", value: concierges.length > 0 ? (concierges.reduce((a,c) => a + c.score, 0) / concierges.length).toFixed(1) + "/10" : "—", icon: "⭐", color: "#D97706" },
            ].map(kpi => (
              <div key={kpi.label} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.5rem" }}>{kpi.label}</p>
                    <p style={{ fontSize: "1.75rem", fontWeight: 700, color: kpi.color }}>{kpi.value}</p>
                  </div>
                  <span style={{ fontSize: "1.5rem" }}>{kpi.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* LISTE */}
          {filtered.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤝</div>
              <p style={{ fontWeight: 600 }}>Aucun concierge trouvé</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Les concierges inscrits apparaîtront ici.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {filtered.map(c => (
                <div key={c.id} className="card" style={{ cursor: "pointer", border: selected?.id === c.id ? "2px solid #0866FF" : "1px solid #E5E7EB", transition: "all 0.2s" }} onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0866FF", fontSize: "1.1rem" }}>
                        {c.nom[0]}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <p style={{ fontWeight: 700, color: "#111827" }}>{c.nom}</p>
                          {c.verifie && <span style={{ fontSize: "0.65rem", background: "#ECFDF5", color: "#059669", padding: "0.15rem 0.4rem", borderRadius: 20, fontWeight: 600 }}>✓ Vérifié</span>}
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{c.zone} · {c.experience}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", background: getScoreBg(c.score), padding: "0.4rem 0.75rem", borderRadius: 10 }}>
                      <p style={{ fontSize: "1.1rem", fontWeight: 800, color: getScoreColor(c.score) }}>{c.score}</p>
                      <p style={{ fontSize: "0.65rem", color: "#6B7280" }}>/10</p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", padding: "0.75rem", background: "#F9FAFB", borderRadius: 8, marginBottom: "0.75rem" }}>
                    {[
                      { label: "Occupation", value: `${c.occupation}%` },
                      { label: "Biens gérés", value: c.nbBiens },
                      { label: "Avis", value: c.avis.length },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.7rem", color: "#6B7280" }}>{s.label}</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {c.reponse && <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>⏱ Répond en {c.reponse}</p>}

                  {selected?.id === c.id && (
                    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
                      <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.75rem", fontSize: "0.875rem" }}>Avis clients :</p>
                      {c.avis.length === 0 ? (
                        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>Aucun avis pour le moment.</p>
                      ) : (
                        c.avis.map((a, i) => (
                          <div key={i} style={{ padding: "0.75rem", background: "#F9FAFB", borderRadius: 8, marginBottom: "0.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                              <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "#111827" }}>{a.auteur}</span>
                              <span style={{ fontSize: "0.8rem", color: "#D97706", fontWeight: 600" }}>{"⭐".repeat(a.note)}</span>
                            </div>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{a.commentaire}</p>
                          </div>
                        ))
                      )}
                      <button onClick={() => router.push("/matching")} style={{ marginTop: "0.75rem", width: "100%", padding: "0.75rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>
                        🧠 Voir la compatibilité avec mes biens
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
