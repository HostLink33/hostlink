"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

interface Wallet {
  id: string;
  iban: string;
  solde: number;
  frequence: string;
  bien?: { nom: string; ville: string };
}

interface Transaction {
  id: string;
  montantBrut: number;
  montantNet: number;
  commissionConcierge: number;
  commissionHostlink: number;
  statut: string;
  createdAt: string;
  bien?: { nom: string };
}

export default function Paiements() {
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, walletsRes, transactionsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/wallets"),
          fetch("/api/transactions"),
        ]);
        if (!userRes.ok) { router.push("/connexion"); return; }
        const userData = await userRes.json();
        const walletsData = await walletsRes.json();
        const transactionsData = await transactionsRes.json();
        setUser(userData.user);
        setWallets(walletsData.wallets || []);
        setTransactions(transactionsData.transactions || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const totalSolde = wallets.reduce((acc, w) => acc + (w.solde || 0), 0);

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
            { label: "Paiements", icon: "💳", href: "/paiements", active: true },
            { label: "Matching IA", icon: "🧠", href: "/matching" },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, marginBottom: "0.25rem", background: item.active ? "#EBF2FF" : "transparent", color: item.active ? "#0866FF" : "#6B7280", textDecoration: "none", fontWeight: item.active ? 600 : 400, fontSize: "0.875rem" }}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0866FF" }}>{user?.prenom?.[0]}</div>
              <div><div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>{user?.prenom} {user?.nom}</div></div>
            </div>
            <button onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); }} style={{ width: "100%", padding: "0.6rem", background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8rem" }}>
              Déconnexion
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>💳 Paiements</h1>
            <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Vos wallets et historique des versements.</p>
          </div>

          {/* SOLDE TOTAL */}
          <div className="card" style={{ marginBottom: "2rem", background: "linear-gradient(135deg, #0550CC, #0866FF)", border: "none" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Solde total</p>
            <p style={{ color: "white", fontSize: "2.5rem", fontWeight: 800 }}>{totalSolde.toLocaleString("fr-FR")} €</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{wallets.length} wallet(s) actif(s)</p>
          </div>

          {/* WALLETS */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Mes wallets</h2>
            {wallets.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💳</div>
                <p style={{ fontWeight: 600 }}>Aucun wallet pour le moment</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Ajoutez un bien pour créer un wallet automatiquement.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {wallets.map(wallet => (
                  <div key={wallet.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div style={{ width: 40, height: 40, background: "#EBF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>💰</div>
                      <span style={{ fontSize: "0.75rem", background: "#ECFDF5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: 20, fontWeight: 600 }}>Actif</span>
                    </div>
                    <p style={{ fontWeight: 700, color: "#111827", fontSize: "1.25rem", marginBottom: "0.25rem" }}>{wallet.solde.toLocaleString("fr-FR")} €</p>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.75rem", fontFamily: "monospace" }}>{wallet.iban}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6B7280" }}>
                      <span>Fréquence : {wallet.frequence}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TRANSACTIONS */}
          <div>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Historique des transactions</h2>
            {transactions.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "3rem", color: "#6B7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
                <p style={{ fontWeight: 600 }}>Aucune transaction</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Les transactions apparaîtront ici après vos premiers versements.</p>
              </div>
            ) : (
              <div className="card">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                      {["Bien", "Montant brut", "Commission", "Montant net", "Statut", "Date"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(t => (
                      <tr key={t.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#111827" }}>{t.bien?.nom || "—"}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#111827" }}>{t.montantBrut} €</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#DC2626" }}>-{t.commissionConcierge + t.commissionHostlink} €</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", fontWeight: 600, color: "#059669" }}>+{t.montantNet} €</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ fontSize: "0.75rem", background: "#ECFDF5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: 20, fontWeight: 600 }}>{t.statut}</span>
                        </td>
                        <td style={{ padding: "0.75rem", fontSize: "0.8rem", color: "#6B7280" }}>{new Date(t.createdAt).toLocaleDateString("fr-FR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
