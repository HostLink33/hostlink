"use client";
import { useState } from "react";

const transactions = [
  { id: "TXN-2025-0892", date: "08 Mai 2025", bien: "Appartement Paris 11e", concierge: "Excellence Conciergerie", brut: 3800, commission_concierge: 836, commission_hl: 190, net: 2774, statut: "verse" },
  { id: "TXN-2025-0891", date: "08 Mai 2025", bien: "Studio Lyon Presquile", concierge: "Lyon Premium Stay", brut: 2100, commission_concierge: 420, commission_hl: 105, net: 1575, statut: "verse" },
  { id: "TXN-2025-0890", date: "01 Mai 2025", bien: "Villa Cote d'Azur", concierge: "Riviera Hosting", brut: 2500, commission_concierge: 500, commission_hl: 125, net: 1875, statut: "verse" },
  { id: "TXN-2025-0889", date: "01 Avr 2025", bien: "Appartement Paris 11e", concierge: "Excellence Conciergerie", brut: 3600, commission_concierge: 792, commission_hl: 180, net: 2628, statut: "verse" },
  { id: "TXN-2025-0888", date: "01 Avr 2025", bien: "Studio Lyon Presquile", concierge: "Lyon Premium Stay", brut: 1950, commission_concierge: 390, commission_hl: 97, net: 1463, statut: "verse" },
  { id: "TXN-2025-0887", date: "01 Mar 2025", bien: "Appartement Paris 11e", concierge: "Excellence Conciergerie", brut: 3200, commission_concierge: 704, commission_hl: 160, net: 2336, statut: "verse" },
];

const wallets = [
  { bien: "Appartement Paris 11e", iban: "FR76 3000 4000 0300 0001 2345 678", solde: 2774, prochain: "01 Juin 2025", frequence: "Mensuel" },
  { bien: "Studio Lyon Presquile", iban: "FR76 3000 4000 0300 0001 2345 679", solde: 1575, prochain: "01 Juin 2025", frequence: "Mensuel" },
  { bien: "Villa Cote d'Azur", iban: "FR76 3000 4000 0300 0001 2345 680", solde: 1875, prochain: "01 Juin 2025", frequence: "Mensuel" },
];

export default function Paiements() {
  const [activeTab, setActiveTab] = useState("apercu");
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [frequence, setFrequence] = useState("Mensuel");

  const totalNet = wallets.reduce((a, w) => a + w.solde, 0);
  const totalBrut = transactions.filter(t => t.date.includes("Mai")).reduce((a, t) => a + t.brut, 0);
  const totalCommissions = transactions.filter(t => t.date.includes("Mai")).reduce((a, t) => a + t.commission_concierge + t.commission_hl, 0);

  const tabs = ["apercu", "wallets", "transactions", "parametres"];
  const tabLabels: Record<string, string> = { apercu: "Apercu", wallets: "Wallets", transactions: "Transactions", parametres: "Parametres" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeIn 0.4s ease both;}
      `}</style>

      {/* NAV */}
      <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: "#0866FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontWeight: 800 }}>H</span></div>
          <span style={{ fontWeight: 700, color: "#111827" }}>HostLink</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="/dashboard" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>← Dashboard</a>
          <button style={{ padding: "0.5rem 1.25rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Exporter PDF</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>Paiements & Wallets</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Suivez vos revenus, wallets et historique de versements.</p>
        </div>

        {/* KPI */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
          {[
            { label: "Solde total wallets", value: totalNet.toLocaleString()+" €", sub: "Pret a etre verse", color: "#0866FF", bg: "#EBF2FF", icon: "💰" },
            { label: "CA brut Mai 2025", value: totalBrut.toLocaleString()+" €", sub: "Tous biens confondus", color: "#059669", bg: "#ECFDF5", icon: "📈" },
            { label: "Commissions Mai", value: totalCommissions.toLocaleString()+" €", sub: "Concierges + HostLink", color: "#7C3AED", bg: "#F5F3FF", icon: "📊" },
            { label: "Prochain versement", value: "6 224 €", sub: "01 Juin 2025", color: "#D97706", bg: "#FFFBEB", icon: "📅" },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 500 }}>{kpi.label}</span>
                <div style={{ width: 32, height: 32, background: kpi.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{kpi.icon}</div>
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>{kpi.value}</div>
              <div style={{ fontSize: "0.75rem", color: kpi.color, fontWeight: 500 }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", padding: "0 1.5rem" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "1rem 1.25rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: activeTab===tab?600:400, color: activeTab===tab?"#0866FF":"#6B7280", borderBottom: activeTab===tab?"2px solid #0866FF":"2px solid transparent", marginBottom: -1, fontFamily: "Inter, sans-serif" }}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div style={{ padding: "1.5rem" }}>

            {/* APERCU */}
            {activeTab === "apercu" && (
              <div className="fade">
                {/* Flux paiement */}
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Flux de paiement</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "2rem", background: "#F9FAFB", borderRadius: 14, padding: "1.5rem", flexWrap: "wrap" }}>
                  {[
                    { icon: "🏠", label: "Plateforme", name: "Airbnb / Booking", center: false },
                    { arrow: true },
                    { icon: "🔗", label: "IBAN virtuel", name: "Wallet HostLink", center: true },
                    { arrow: true },
                    { icon: "⚙️", label: "Split auto", name: "Concierge + HostLink", center: false },
                    { arrow: true },
                    { icon: "💳", label: "Versement", name: "Votre compte", center: false },
                  ].map((item, i) => (
                    "arrow" in item ? (
                      <div key={i} style={{ color: "#0866FF", fontSize: "1.2rem", padding: "0 0.75rem" }}>→</div>
                    ) : (
                      <div key={i} style={{ background: item.center?"#0866FF":"white", border: "1px solid "+(item.center?"#0866FF":"#E5E7EB"), borderRadius: 12, padding: "1rem 1.5rem", textAlign: "center", minWidth: 120, boxShadow: item.center?"0 4px 20px rgba(8,102,255,0.25)":"0 1px 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>{item.icon}</div>
                        <div style={{ fontSize: "0.62rem", color: item.center?"rgba(255,255,255,0.7)":"#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{item.label}</div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: item.center?"white":"#111827" }}>{item.name}</div>
                      </div>
                    )
                  ))}
                </div>

                {/* Split detail */}
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Detail du split — Appartement Paris 11e</h3>
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem" }}>
                  {[
                    { label: "CA brut genere", value: "3 800 €", color: "#111827", bg: "white", bold: true },
                    { label: "Commission concierge (22%)", value: "- 836 €", color: "#EF4444", bg: "#FAFAFA" },
                    { label: "Commission HostLink (5%)", value: "- 190 €", color: "#EF4444", bg: "white" },
                    { label: "Net proprietaire", value: "2 774 €", color: "#059669", bg: "#F0FDF4", bold: true },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 1.25rem", background: row.bg, borderBottom: i<3?"1px solid #F3F4F6":"none" }}>
                      <span style={{ fontSize: "0.875rem", color: "#374151", fontWeight: row.bold?600:400 }}>{row.label}</span>
                      <span style={{ fontSize: "0.95rem", fontWeight: 700, color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Repartition visuelle */}
                <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: "0.75rem" }}>
                  <div style={{ width: "73%", background: "#0866FF" }} />
                  <div style={{ width: "22%", background: "#FB923C" }} />
                  <div style={{ width: "5%", background: "#A78BFA" }} />
                </div>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {[["#0866FF","Proprietaire","73%"],["#FB923C","Concierge","22%"],["#A78BFA","HostLink","5%"]].map(([c,l,v]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                      <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>{l} <strong style={{ color: "#111827" }}>{v}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WALLETS */}
            {activeTab === "wallets" && (
              <div className="fade">
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.25rem" }}>Chaque bien dispose d'un IBAN virtuel dedie. Les fonds sont centralises puis verses automatiquement.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {wallets.map((w, i) => (
                    <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 14, padding: "1.5rem", background: "white" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div>
                          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>{w.bien}</div>
                          <div style={{ fontSize: "0.78rem", color: "#9CA3AF", fontFamily: "monospace" }}>{w.iban}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0866FF" }}>{w.solde.toLocaleString()} €</div>
                          <div style={{ fontSize: "0.72rem", color: "#6B7280" }}>Solde disponible</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "2rem", paddingTop: "1rem", borderTop: "1px solid #F3F4F6" }}>
                        <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>Prochain versement</div><div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{w.prochain}</div></div>
                        <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>Frequence</div><div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{w.frequence}</div></div>
                        <div style={{ marginLeft: "auto" }}>
                          <button style={{ padding: "0.5rem 1rem", background: "#EBF2FF", color: "#0866FF", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.78rem", cursor: "pointer" }}>Virement immediat</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRANSACTIONS */}
            {activeTab === "transactions" && (
              <div className="fade">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{transactions.length} transactions · 6 derniers mois</p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <select style={{ padding: "0.5rem 0.75rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.82rem", color: "#374151", outline: "none", background: "white" }}>
                      <option>Tous les biens</option>
                      <option>Paris 11e</option>
                      <option>Lyon</option>
                      <option>Cote d'Azur</option>
                    </select>
                    <select style={{ padding: "0.5rem 0.75rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.82rem", color: "#374151", outline: "none", background: "white" }}>
                      <option>6 derniers mois</option>
                      <option>3 derniers mois</option>
                      <option>Cette annee</option>
                    </select>
                  </div>
                </div>
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr", padding: "0.75rem 1.25rem", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {["ID", "Bien", "CA Brut", "Commissions", "Net", "Statut"].map(h => (
                      <span key={h} style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                  </div>
                  {transactions.map((t, i) => (
                    <div key={t.id}>
                      <div onClick={() => setSelectedTx(selectedTx===t.id?null:t.id)} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr", padding: "1rem 1.25rem", borderBottom: i<transactions.length-1?"1px solid #F9FAFB":"none", cursor: "pointer", background: selectedTx===t.id?"#F8FBFF":"white", transition: "background 0.15s" }}>
                        <span style={{ fontSize: "0.78rem", color: "#9CA3AF", fontFamily: "monospace" }}>{t.id}</span>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827" }}>{t.bien.split(" ").slice(0,2).join(" ")}</div>
                          <div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{t.date}</div>
                        </div>
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{t.brut.toLocaleString()} €</span>
                        <span style={{ fontSize: "0.875rem", color: "#EF4444" }}>-{(t.commission_concierge+t.commission_hl).toLocaleString()} €</span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#059669" }}>{t.net.toLocaleString()} €</span>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#059669", background: "#ECFDF5", padding: "0.2rem 0.6rem", borderRadius: 100, display: "inline-block" }}>Verse</span>
                      </div>
                      {selectedTx===t.id && (
                        <div style={{ background: "#F8FBFF", borderBottom: "1px solid #E5E7EB", padding: "1rem 1.25rem" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
                            {[["Concierge",t.concierge],["Commission concierge",t.commission_concierge.toLocaleString()+" €"],["Commission HostLink",t.commission_hl.toLocaleString()+" €"],["Net proprietaire",t.net.toLocaleString()+" €"]].map(([l,v]) => (
                              <div key={l}>
                                <div style={{ fontSize: "0.65rem", color: "#9CA3AF", textTransform: "uppercase", marginBottom: "0.2rem" }}>{l}</div>
                                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{v}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PARAMETRES */}
            {activeTab === "parametres" && (
              <div className="fade">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Frequence de versement</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {["Hebdomadaire", "Mensuel", "Trimestriel"].map(f => (
                        <div key={f} onClick={() => setFrequence(f)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", border: "1.5px solid "+(frequence===f?"#0866FF":"#E5E7EB"), borderRadius: 10, cursor: "pointer", background: frequence===f?"#EBF2FF":"white" }}>
                          <div>
                            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: frequence===f?"#0866FF":"#111827" }}>{f}</div>
                            <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{f==="Hebdomadaire"?"Chaque lundi":f==="Mensuel"?"Le 1er de chaque mois":"Chaque trimestre"}</div>
                          </div>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid "+(frequence===f?"#0866FF":"#D1D5DB"), display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {frequence===f && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0866FF" }} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Compte bancaire</h3>
                    <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: "1.25rem", background: "#F9FAFB", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: "0.3rem" }}>IBAN de destination</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>FR76 3000 4028 0000 0123 4567 890</div>
                      <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.2rem" }}>Banque Nationale de Paris</div>
                    </div>
                    <button style={{ width: "100%", padding: "0.8rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", marginBottom: "0.75rem", fontFamily: "Inter, sans-serif" }}>Modifier le compte bancaire</button>
                    <button style={{ width: "100%", padding: "0.8rem", background: "#0866FF", color: "white", border: "none", borderRadius: 10, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Sauvegarder les preferences</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
