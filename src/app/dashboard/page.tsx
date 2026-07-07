"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

interface User {
  prenom: string;
  nom: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBien, setShowAddBien] = useState(false);
  const [newBien, setNewBien] = useState({ nom: "", type: "Appartement", ville: "", superficie: "" });
  const [adding, setAdding] = useState(false);

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

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

  const totalRevenu = biens.reduce((acc, b) => acc + (b.wallet?.solde || 0), 0);
  const biensActifs = biens.filter(b => b.statut === "ACTIF").length;

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #EBF2FF", borderTop: "3px solid #0866FF", borderRadius: "50%", margin: "0 auto 1rem", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#6B7280" }}>Chargement...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .card{background:white;border-radius:16px;border:1px solid #E5E7EB;padding:1.5rem;}
        .btn-primary{background:#0866FF;color:white;border:none;border-radius:10px;padding:0.7rem 1.5rem;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;font-size:0.875rem;}
        .btn-secondary{background:white;color:#374151;border:1px solid #E5E7EB;border-radius:10px;padding:0.7rem 1.5rem;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;font-size:0.875rem;}
        input,select{width:100%;padding:0.75rem 1rem;border:1px solid #E5E7EB;border-radius:8px;font-family:Inter,sans-serif;font-size:0.875rem;outline:none;}
        input:focus,select:focus{border-color:#0866FF;}
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <div style={{ width: 240, background: "white", borderRight: "1px solid #E5E7EB", padding: "1.5rem", display: "flex", flexDirection: "column", position: "fixed", height: "100vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ width: 36, height: 36, background: "#0866FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800 }}>H</div>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>HostLink</span>
          </div>
          {[
            { label: "Dashboard", icon: "📊", href: "/dashboard", active: true },
            { label: "Mes biens", icon: "🏠", href: "/dashboard" },
            { label: "Concierges", icon: "🤝", href: "/concierge" },
            { label: "Paiements", icon: "💳", href: "/paiements" },
            { label: "Matching IA", icon: "🧠", href: "/matching" },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, marginBottom: "0.25rem", background: item.active ? "#EBF2FF" : "transparent", color: item.active ? "#0866FF" : "#6B7280", textDecoration: "none", fontWeight: item.active ? 600 : 400, fontSize: "0.875rem" }}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0866FF" }}>{user?.prenom?.[0]}</div>
              <div><div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>{user?.prenom} {user?.nom}</div><div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{biens.length} bien(s)</div></div>
            </div>
            <button onClick={handleLogout} style={{ width: "100%", padding: "0.6rem", background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8rem" }}>
              Déconnexion
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>Bonjour {user?.prenom} 👋</h1>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Voici un résumé de vos biens.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowAddBien(true)}>+ Ajouter un bien</button>
          </div>

          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Solde total wallets", value: `${totalRevenu.toLocaleString("fr-FR")} €`, icon: "💰", color: "#059669" },
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

          {/* BIENS */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, color: "#111827" }}>Mes biens</h2>
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>{biens.length} bien(s)</span>
            </div>
            {biens.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏠</div>
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Aucun bien pour le moment</p>
                <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem" }}>Ajoutez votre premier bien pour commencer.</p>
                <button className="btn-primary" onClick={() => setShowAddBien(true)}>+ Ajouter un bien</button>
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
                    <div style={{ textAlign: "right" }}>
                      <span style={{ padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: bien.statut === "ACTIF" ? "#ECFDF5" : "#FEF2F2", color: bien.statut === "ACTIF" ? "#059669" : "#DC2626" }}>
                        {bien.statut}
                      </span>
                      {bien.wallet && <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#059669", marginTop: "0.5rem" }}>{bien.wallet.solde.toLocaleString("fr-FR")} €</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL AJOUTER BIEN */}
      {showAddBien && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 480 }}>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Ajouter un bien</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Nom du bien</label><input value={newBien.nom} onChange={e => setNewBien(b => ({...b, nom: e.target.value}))} placeholder="Appartement Paris 11e" /></div>
              <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Type</label><select value={newBien.type} onChange={e => setNewBien(b => ({...b, type: e.target.value}))}>{["Appartement","Maison","Villa","Studio","Loft","Chalet"].map(t => <option key={t}>{t}</option>)}</select></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Ville</label><input value={newBien.ville} onChange={e => setNewBien(b => ({...b, ville: e.target.value}))} placeholder="Paris" /></div>
                <div><label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Superficie (m²)</label><input value={newBien.superficie} onChange={e => setNewBien(b => ({...b, superficie: e.target.value}))} placeholder="45" type="number" /></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn-secondary" onClick={() => setShowAddBien(false)} style={{ flex: 1 }}>Annuler</button>
              <button className="btn-primary" onClick={handleAddBien} disabled={adding} style={{ flex: 2 }}>
                {adding ? "Ajout..." : "Ajouter →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
