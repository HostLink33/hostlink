"use client";
import { useState } from "react";

const avis = [
  { nom: "Sophie M.", note: 5, date: "Mai 2025", commentaire: "Gestion impeccable, revenus en hausse de 15% en 2 mois. Je recommande vivement !" },
  { nom: "Thomas R.", note: 5, date: "Avr 2025", commentaire: "Tres reactif, transparent sur les comptes. Mon bien n'a jamais ete aussi bien gere." },
  { nom: "Camille D.", note: 4, date: "Mar 2025", commentaire: "Excellent service, quelques petits retards de communication mais globalement parfait." },
  { nom: "Marc L.", note: 5, date: "Fev 2025", commentaire: "95% de taux d'occupation en janvier. Impressionnant pour la saison basse." },
];

const biens = [
  { adresse: "Appartement Paris 11e", type: "Appartement", occupation: 94, revenu: 3400 },
  { adresse: "Studio Marais", type: "Studio", occupation: 91, revenu: 2100 },
  { adresse: "Loft Bastille", type: "Loft", occupation: 88, revenu: 4200 },
  { adresse: "Appart Montmartre", type: "Appartement", occupation: 86, revenu: 2800 },
];

export default function ProfilConcierge() {
  const [activeTab, setActiveTab] = useState("apercu");
  const [contactOpen, setContactOpen] = useState(false);

  const tabs = ["apercu", "biens", "avis", "tarifs"];
  const tabLabels: Record<string, string> = { apercu: "Apercu", biens: "Biens geres", avis: "Avis", tarifs: "Tarifs" };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'Inter',sans-serif;background:#F9FAFB;}`}</style>

      {/* NAV */}
      <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: "#0866FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontWeight: 800 }}>H</span></div>
          <span style={{ fontWeight: 700, color: "#111827" }}>HostLink</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/dashboard" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none", padding: "0.5rem 1rem" }}>← Dashboard</a>
          <button onClick={() => setContactOpen(true)} style={{ padding: "0.5rem 1.25rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Contacter</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>

        {/* HEADER CARD */}
        <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", marginBottom: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ height: 120, background: "linear-gradient(135deg, #0550CC, #0866FF, #3B82F6)", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>
          <div style={{ padding: "0 2rem 2rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-end" }}>
                <div style={{ width: 80, height: 80, background: "white", border: "4px solid white", borderRadius: 16, marginTop: -40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <span style={{ fontSize: "2rem" }}>🏆</span>
                </div>
                <div style={{ paddingBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                    <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>Excellence Conciergerie Paris</h1>
                    <span style={{ background: "#ECFDF5", color: "#059669", fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 100, border: "1px solid #A7F3D0" }}>Verifie HostLink</span>
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6B7280" }}>Paris & Ile-de-France · Membre depuis 2021 · 47 biens geres</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", paddingBottom: "0.5rem" }}>
                <button style={{ padding: "0.6rem 1.25rem", background: "white", color: "#0866FF", border: "1px solid #0866FF", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Comparer</button>
                <button onClick={() => setContactOpen(true)} style={{ padding: "0.6rem 1.25rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Selectionner ce concierge</button>
              </div>
            </div>
          </div>
        </div>

        {/* SCORE CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Score global", value: "9.4", unit: "/10", color: "#0866FF", bg: "#EBF2FF" },
            { label: "Taux occupation", value: "94", unit: "%", color: "#059669", bg: "#ECFDF5" },
            { label: "Revenu moyen", value: "3 400", unit: "€/mois", color: "#7C3AED", bg: "#F5F3FF" },
            { label: "Delai reponse", value: "< 2", unit: "heures", color: "#D97706", bg: "#FFFBEB" },
            { label: "Litiges", value: "0", unit: "en 4 ans", color: "#059669", bg: "#ECFDF5" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 12, padding: "1.25rem", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "0.72rem", color: "#6B7280", marginBottom: "0.5rem", fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: s.color, marginTop: "0.2rem", background: s.bg, padding: "0.15rem 0.5rem", borderRadius: 100, display: "inline-block" }}>{s.unit}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", padding: "0 1.5rem" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "1rem 1.25rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: activeTab===tab?600:400, color: activeTab===tab?"#0866FF":"#6B7280", borderBottom: activeTab===tab?"2px solid #0866FF":"2px solid transparent", marginBottom: -1 }}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div style={{ padding: "1.5rem" }}>

            {/* APERCU */}
            {activeTab === "apercu" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>A propos</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Excellence Conciergerie Paris est specialisee dans la gestion de biens en location courte duree depuis 2021. Notre equipe de 8 personnes gere actuellement 47 biens sur Paris et l'Ile-de-France avec un taux d'occupation moyen de 94%.
                  </p>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Plateformes geres</h3>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {["Airbnb", "Booking.com", "Vrbo", "Direct"].map(p => (
                      <span key={p} style={{ padding: "0.3rem 0.75rem", background: "#F3F4F6", color: "#374151", borderRadius: 100, fontSize: "0.78rem", fontWeight: 500 }}>{p}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Services inclus</h3>
                  {["Check-in / Check-out flexibles", "Menage professionnel", "Linge de maison fourni", "Gestion des avis voyageurs", "Maintenance et petites reparations", "Dynamic pricing optimise", "Reporting mensuel detaille"].map(s => (
                    <div key={s} style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.4rem" }}>
                      <span style={{ color: "#0866FF", fontWeight: 700, fontSize: "0.8rem" }}>✓</span>
                      <span style={{ fontSize: "0.85rem", color: "#374151" }}>{s}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Performance mensuelle</h3>
                  {[["Jan","82%"],["Fev","85%"],["Mar","89%"],["Avr","91%"],["Mai","94%"]].map(([mois, val]) => (
                    <div key={mois} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>{mois} 2025</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#111827" }}>{val}</span>
                      </div>
                      <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3 }}>
                        <div style={{ height: "100%", width: val, background: "#0866FF", borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: "1.5rem", background: "#F8FBFF", border: "1px solid #DBEAFE", borderRadius: 12, padding: "1.25rem" }}>
                    <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: "0.5rem" }}>Simulation pour votre bien</div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0866FF" }}>2 800 — 3 400 €</div>
                    <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.2rem" }}>Estimation mensuelle avec ce concierge</div>
                  </div>
                </div>
              </div>
            )}

            {/* BIENS */}
            {activeTab === "biens" && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.25rem" }}>47 biens actuellement geres par Excellence Conciergerie Paris.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {biens.map((b,i) => (
                    <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{b.adresse}</div>
                          <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{b.type}</div>
                        </div>
                        <span style={{ fontSize: "0.72rem", background: "#ECFDF5", color: "#059669", padding: "0.2rem 0.6rem", borderRadius: 100, fontWeight: 600 }}>Actif</span>
                      </div>
                      <div style={{ display: "flex", gap: "1.5rem" }}>
                        <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Occupation</div><div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>{b.occupation}%</div></div>
                        <div><div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>Revenu/mois</div><div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#059669" }}>{b.revenu.toLocaleString()} €</div></div>
                      </div>
                      <div style={{ marginTop: "0.75rem", height: 4, background: "#F3F4F6", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: b.occupation+"%", background: "#0866FF", borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AVIS */}
            {activeTab === "avis" && (
              <div>
                <div style={{ display: "flex", gap: "2rem", alignItems: "center", marginBottom: "1.5rem", padding: "1.25rem", background: "#F8FBFF", borderRadius: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", fontWeight: 700, color: "#0866FF", lineHeight: 1 }}>9.4</div>
                    <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.3rem" }}>sur 10</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[5,4,3,2,1].map(n => (
                      <div key={n} style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "#6B7280", width: 20 }}>{n}★</span>
                        <div style={{ flex: 1, height: 6, background: "#E5E7EB", borderRadius: 3 }}>
                          <div style={{ height: "100%", width: n===5?"85%":n===4?"12%":"3%", background: "#0866FF", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#6B7280", width: 30 }}>{n===5?"85%":n===4?"12%":"3%"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {avis.map((a,i) => (
                  <div key={i} style={{ padding: "1.25rem", border: "1px solid #F3F4F6", borderRadius: 12, marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <div style={{ width: 36, height: 36, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0866FF", fontSize: "0.875rem" }}>{a.nom[0]}</div>
                        <div><div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{a.nom}</div><div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{a.date}</div></div>
                      </div>
                      <div style={{ color: "#F59E0B", fontSize: "0.875rem" }}>{"★".repeat(a.note)}</div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6 }}>{a.commentaire}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TARIFS */}
            {activeTab === "tarifs" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
                {[
                  { nom: "Essentiel", prix: "18%", desc: "du CA généré", features: ["Gestion Airbnb & Booking", "Check-in / Check-out", "Menage standard", "Reporting mensuel"], color: "#6B7280", bg: "white" },
                  { nom: "Premium", prix: "22%", desc: "du CA généré", features: ["Tout Essentiel inclus", "Dynamic pricing", "Linge de maison premium", "Support 7j/7", "Photos professionnelles"], color: "#0866FF", bg: "#EBF2FF", badge: "Recommande" },
                  { nom: "Excellence", prix: "26%", desc: "du CA généré", features: ["Tout Premium inclus", "Conciergerie 24h/24", "Garantie occupation 80%", "Comptable dedie", "Assurance incluse"], color: "#7C3AED", bg: "white" },
                ].map(plan => (
                  <div key={plan.nom} style={{ border: "1px solid "+(plan.nom==="Premium"?"#0866FF":"#E5E7EB"), borderRadius: 14, padding: "1.5rem", background: plan.nom==="Premium"?"#F8FBFF":"white", position: "relative" }}>
                    {plan.badge && <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#0866FF", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.75rem", borderRadius: 100 }}>{plan.badge}</span>}
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>{plan.nom}</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, color: plan.color, lineHeight: 1 }}>{plan.prix}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "1.25rem" }}>{plan.desc}</div>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: plan.color, fontWeight: 700, fontSize: "0.8rem" }}>✓</span>
                        <span style={{ fontSize: "0.82rem", color: "#374151" }}>{f}</span>
                      </div>
                    ))}
                    <button style={{ width: "100%", marginTop: "1.25rem", padding: "0.7rem", background: plan.nom==="Premium"?"#0866FF":"white", color: plan.nom==="Premium"?"white":"#0866FF", border: "1px solid #0866FF", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
                      Choisir ce plan
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL CONTACT */}
      {contactOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }} onClick={() => setContactOpen(false)}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Selectionner ce concierge</h2>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.5rem" }}>Excellence Conciergerie Paris va recevoir une demande de collaboration pour votre bien.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <select style={{ padding: "0.8rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.875rem", color: "#111827", outline: "none" }}>
                <option>Appartement Paris 11e</option>
                <option>Studio Lyon</option>
                <option>Villa Cote d'Azur</option>
              </select>
              <select style={{ padding: "0.8rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.875rem", color: "#111827", outline: "none" }}>
                <option>Plan Premium — 22%</option>
                <option>Plan Essentiel — 18%</option>
                <option>Plan Excellence — 26%</option>
              </select>
              <textarea placeholder="Message (optionnel)" rows={3} style={{ padding: "0.8rem", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: "0.875rem", color: "#111827", outline: "none", resize: "none", fontFamily: "Inter, sans-serif" }} />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setContactOpen(false)} style={{ flex: 1, padding: "0.8rem", background: "white", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={() => setContactOpen(false)} style={{ flex: 2, padding: "0.8rem", background: "#0866FF", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Envoyer la demande</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
