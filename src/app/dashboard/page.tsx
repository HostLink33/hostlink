"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface Bien {
  id: string;
  nom: string;
  type: string;
  ville: string;
  superficie: number;
  statut: string;
  wallet?: { solde: number; iban: string };
  concierge?: { nom: string; score: number; occupation: number };
}

export default function Dashboard() {
  const router = useRouter();
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBien, setShowAddBien] = useState(false);
  const [newBien, setNewBien] = useState({ nom: "", type: "Appartement", ville: "", superficie: "" });
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, biensRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/biens"),
        ]);
        if (!userRes.ok) { router.push("/connexion"); return; }
        const userData = await userRes.json();
        const biensData = await biensRes.json();
        setUser(userData.user);
        setBiens(biensData.biens || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleAddBien = async () => {
    if (!newBien.nom || !newBien.ville || !newBien.superficie) return;
    setAdding(true);
    try {
      const res = await fetch("/api/biens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBien),
      });
      if (res.ok) {
        const biensRes = await fetch("/api/biens");
        const biensData = await biensRes.json();
        setBiens(biensData.biens || []);
        setShowAddBien(false);
        setNewBien({ nom: "", type: "Appartement", ville: "", superficie: "" });
      }
    } finally {
      setAdding(false);
    }
  };

  const totalSolde = biens.reduce((acc, b) => acc + (b.wallet?.solde || 0), 0);
  const biensActifs = biens.filter(b => b.statut === "ACTIF").length;

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
        input,select{width:100%;padding:0.75rem 1rem;border:1px solid #E5E7EB;border-radius:8px;font-family:Inter,sans-serif;font-size:0.875rem;outline:none;}
        input:focus,select:focus{border-color:#0866FF;}
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>Bonjour {user?.prenom} 👋</h1>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Voici un résumé de vos biens.</p>
            </div>
            <button onClick={() => setShowAddBien(true)} style={{ padding: "0.75rem 1.5rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>+ Ajouter un bien</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Solde total", value: `${totalSolde.toLocaleString("fr-FR")} €`, icon: "💰", color: "#059669" },
              { label: "Biens actifs", value: biensActifs, icon: "🏠", color: "#0866FF" },
              { label: "Total biens", value: biens.length, icon: "📊", color: "#7C3AED" },
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

          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, color: "#111827" }}>Mes biens</h2>
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>{biens.length} bien(s)</span>
            </div>
            {biens.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏠</div>
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Aucun bien pour le moment</p>
                <button onClick={() => setShowAddBien(true)} style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>+ Ajouter un bien</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {biens.map(bien => (
                  <div key={bien.id} style={{ padding: "1.25rem", border: "1px solid #E5E7EB", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <div style={{ width: 48, height: 48, background: "#EBF2FF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🏠</div>
                      <div>
                        <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.2rem" }}>{bien.nom}</p>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{bien.type} · {bien.ville} · {bien.superficie}m²</p>
                        {bien.concierge && <p style={{ fontSize: "0.8rem", color: "#0866FF", marginTop: "0.2rem" }}>Concierge: {bien.concierge.nom}</p>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      {bien.wallet && <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#059669" }}>{bien.wallet.solde.toLocaleString("fr-FR")} €</p>}
                      <span style={{ padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: bien.statut === "ACTIF" ? "#ECFDF5" : "#FEF2F2", color: bien.statut === "ACTIF" ? "#059669" : "#DC2626" }}>{bien.statut}</span>
                      <button onClick={() => router.push("/matching")} style={{ padding: "0.5rem 1rem", background: "#EBF2FF", color: "#0866FF", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8rem" }}>🧠 Matching</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="card" style={{ cursor: "pointer" }} onClick={() => router.push("/matching")}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🧠</div>
              <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>Matching IA</h3>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>Trouvez le meilleur concierge pour vos biens.</p>
            </div>
            <div className="card" style={{ cursor: "pointer" }} onClick={() => router.push("/paiements")}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💳</div>
              <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>Paiements</h3>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>Gérez vos wallets et vos versements.</p>
            </div>
          </div>
        </div>
      </div>

      {showAddBien && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 480 }}>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Ajouter un bien</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Nom</label><input value={newBien.nom} onChange={e => setNewBien(b => ({...b, nom: e.target.value}))} placeholder="Appartement Paris 11e" /></div>
              <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Type</label><select value={newBien.type} onChange={e => setNewBien(b => ({...b, type: e.target.value}))}>{["Appartement","Maison","Villa","Studio","Loft","Chalet"].map(t => <option key={t}>{t}</option>)}</select></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Ville</label><input value={newBien.ville} onChange={e => setNewBien(b => ({...b, ville: e.target.value}))} placeholder="Paris" /></div>
                <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Superficie (m²)</label><input value={newBien.superficie} onChange={e => setNewBien(b => ({...b, superficie: e.target.value}))} placeholder="45" type="number" /></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setShowAddBien(false)} style={{ flex: 1, padding: "0.9rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Annuler</button>
              <button onClick={handleAddBien} disabled={adding} style={{ flex: 2, padding: "0.9rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                {adding ? "Ajout..." : "Ajouter →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
