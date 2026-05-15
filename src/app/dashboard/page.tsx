"use client";
import { useState } from "react";

const biens = [
  { id: 1, nom: "Appartement Paris 11e", type: "Appartement", ville: "Paris", superficie: 38, statut: "actif", concierge: "Excellence Conciergerie", score: 9.4, occupation: 88, revenuMois: 3200, revenuTotal: 19200, tendance: "+12%" },
  { id: 2, nom: "Studio Lyon Presqu'ile", type: "Studio", ville: "Lyon", superficie: 25, statut: "actif", concierge: "Lyon Premium Stay", score: 8.7, occupation: 79, revenuMois: 1800, revenuTotal: 10800, tendance: "+5%" },
  { id: 3, nom: "Villa Cote d'Azur", type: "Villa", ville: "Nice", superficie: 120, statut: "alerte", concierge: "Riviera Hosting", score: 6.2, occupation: 54, revenuMois: 2100, revenuTotal: 12600, tendance: "-8%" },
];

const transactions = [
  { date: "08 Mai 2025", bien: "Paris 11e", montant: 3200 },
  { date: "08 Mai 2025", bien: "Lyon Presquile", montant: 1800 },
  { date: "01 Mai 2025", bien: "Cote d'Azur", montant: 2100 },
  { date: "01 Avr 2025", bien: "Paris 11e", montant: 3050 },
];

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedBien, setSelectedBien] = useState(null as number | null);
  const totalMois = biens.reduce((a, b) => a + b.revenuMois, 0);
  const totalAnnee = biens.reduce((a, b) => a + b.revenuTotal, 0);
  const occupationMoy = Math.round(biens.reduce((a, b) => a + b.occupation, 0) / biens.length);
  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "biens", icon: "🏠", label: "Mes biens" },
    { id: "concierges", icon: "🤝", label: "Concierges" },
    { id: "paiements", icon: "💳", label: "Paiements" },
    { id: "matching", icon: "🧠", label: "Matching IA" },
  ];
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}`}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: 240, background: "white", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", padding: "1.5rem 0", position: "fixed", top: 0, bottom: 0, left: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0 1.5rem", marginBottom: "2rem" }}>
            <div style={{ width: 32, height: 32, background: "#0866FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontWeight: 800, fontSize: "0.9rem" }}>H</span></div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "#111827" }}>HostLink</span>
          </div>
          <nav style={{ flex: 1, padding: "0 0.75rem" }}>
            {navItems.map(item => (
              <div key={item.id} onClick={() => setActivePage(item.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.75rem", borderRadius: 8, cursor: "pointer", marginBottom: "0.25rem", background: activePage===item.id?"#EBF2FF":"transparent", color: activePage===item.id?"#0866FF":"#6B7280", fontWeight: activePage===item.id?600:400, fontSize: "0.875rem" }}>
                <span>{item.icon}</span>{item.label}
                {item.id==="biens" && biens.some(b=>b.statut==="alerte") && <span style={{ marginLeft: "auto", background: "#FEF2F2", color: "#EF4444", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100 }}>!</span>}
              </div>
            ))}
          </nav>
          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, background: "#0866FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>A</div>
            <div><div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827" }}>Anas</div><div style={{ fontSize: "0.72rem", color: "#6B7280" }}>3 biens actifs</div></div>
          </div>
        </div>
        <div style={{ marginLeft: 240, flex: 1, padding: "2rem 2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>Bonjour Anas 👋</h1>
              <p style={{ color: "#6B7280", fontSize: "0.875rem", marginTop: "0.2rem" }}>Voici un resume de vos biens ce mois-ci.</p>
            </div>
            <button style={{ padding: "0.65rem 1.25rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>+ Ajouter un bien</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
            {[
              { label: "Revenus ce mois", value: totalMois.toLocaleString()+" €", sub: "+8% vs mois dernier", color: "#0866FF", bg: "#EBF2FF", icon: "💰" },
              { label: "Revenus annuels", value: totalAnnee.toLocaleString()+" €", sub: "Depuis janvier 2025", color: "#059669", bg: "#ECFDF5", icon: "📈" },
              { label: "Taux occupation", value: occupationMoy+"%", sub: "Moyenne tous biens", color: "#7C3AED", bg: "#F5F3FF", icon: "📊" },
              { label: "Biens actifs", value: String(biens.length), sub: biens.filter(b=>b.statut==="alerte").length+" alerte(s)", color: "#DC2626", bg: "#FEF2F2", icon: "🏠" },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 500 }}>{kpi.label}</span>
                  <div style={{ width: 32, height: 32, background: kpi.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{kpi.icon}</div>
                </div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>{kpi.value}</div>
                <div style={{ fontSize: "0.75rem", color: kpi.color, fontWeight: 500 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Mes biens</h2>
                <a href="#" style={{ fontSize: "0.78rem", color: "#0866FF", textDecoration: "none" }}>Voir tout</a>
              </div>
              {biens.map(bien => (
                <div key={bien.id} onClick={() => setSelectedBien(selectedBien===bien.id?null:bien.id)} style={{ padding: "1rem", borderRadius: 10, border: "1px solid "+(selectedBien===bien.id?"#0866FF":"#F3F4F6"), marginBottom: "0.75rem", cursor: "pointer", background: selectedBien===bien.id?"#F8FBFF":"white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{bien.nom}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{bien.concierge}</div>
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: bien.statut==="alerte"?"#EF4444":"#059669", background: bien.statut==="alerte"?"#FEF2F2":"#ECFDF5", padding: "0.2rem 0.6rem", borderRadius: 100 }}>{bien.statut==="alerte"?"Alerte":"Actif"}</span>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.5rem" }}>
                    <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Revenu/mois</div><div style={{ fontSize: "0.875rem", fontWeight: 700 }}>{bien.revenuMois.toLocaleString()} €</div></div>
                    <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Occupation</div><div style={{ fontSize: "0.875rem", fontWeight: 700 }}>{bien.occupation}%</div></div>
                    <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Score</div><div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0866FF" }}>{bien.score}/10</div></div>
                    <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Tendance</div><div style={{ fontSize: "0.875rem", fontWeight: 700, color: bien.tendance.startsWith("+")?"#059669":"#EF4444" }}>{bien.tendance}</div></div>
                  </div>
                  <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2 }}><div style={{ height: "100%", width: bien.occupation+"%", background: bien.occupation>75?"#0866FF":bien.occupation>60?"#F59E0B":"#EF4444", borderRadius: 2 }} /></div>
                  {selectedBien===bien.id && (
                    <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                      <button style={{ flex: 1, padding: "0.5rem", background: "#EBF2FF", color: "#0866FF", border: "none", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Voir details</button>
                      <button style={{ flex: 1, padding: "0.5rem", background: "#FEF2F2", color: "#EF4444", border: "none", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Switch concierge</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {biens.some(b=>b.statut==="alerte") && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, padding: "1.25rem" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#991B1B", marginBottom: "0.4rem" }}>Alerte performance</div>
                  <div style={{ fontSize: "0.8rem", color: "#B91C1C", lineHeight: 1.5 }}>Villa Cote d'Azur — Taux 54% (-8%). Un meilleur operateur est disponible.</div>
                  <button style={{ marginTop: "0.75rem", padding: "0.5rem 1rem", background: "#EF4444", color: "white", border: "none", borderRadius: 6, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Voir les concierges disponibles</button>
                </div>
              )}
              <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Derniers versements</h2>
                  <a href="#" style={{ fontSize: "0.78rem", color: "#0866FF", textDecoration: "none" }}>Voir tout</a>
                </div>
                {transactions.map((t,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: i<transactions.length-1?"1px solid #F9FAFB":"none" }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, background: "#ECFDF5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>💰</div>
                      <div><div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827" }}>{t.bien}</div><div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{t.date}</div></div>
                    </div>
                    <div style={{ textAlign: "right" }}><div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#059669" }}>+{t.montant.toLocaleString()} €</div></div>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Prochain versement</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0866FF" }}>7 100 €</div><div style={{ fontSize: "0.75rem", color: "#6B7280" }}>Prevu le 1er juin 2025</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: "0.75rem", color: "#6B7280" }}>Dans</div><div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>24 jours</div></div>
                </div>
                <div style={{ marginTop: "1rem", height: 6, background: "#F3F4F6", borderRadius: 3 }}><div style={{ height: "100%", width: "20%", background: "#0866FF", borderRadius: 3 }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
