"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { label: "Dashboard", icon: "📊", href: "/dashboard" },
  { label: "Mes biens", icon: "🏠", href: "/dashboard" },
  { label: "Concierges", icon: "🤝", href: "/concierge" },
  { label: "Paiements", icon: "💳", href: "/paiements" },
  { label: "Matching IA", icon: "🧠", href: "/matching" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div style={{ width: 240, background: "white", borderRight: "1px solid #E5E7EB", padding: "1.5rem", display: "flex", flexDirection: "column", position: "fixed", height: "100vh", zIndex: 10 }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", textDecoration: "none" }}>
        <div style={{ width: 36, height: 36, background: "#0866FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800 }}>H</div>
        <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>HostLink</span>
      </a>

      {navItems.map(item => (
        <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, marginBottom: "0.25rem", background: pathname === item.href ? "#EBF2FF" : "transparent", color: pathname === item.href ? "#0866FF" : "#6B7280", textDecoration: "none", fontWeight: pathname === item.href ? 600 : 400, fontSize: "0.875rem", transition: "all 0.15s" }}>
          <span>{item.icon}</span>{item.label}
        </a>
      ))}

      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
        {user && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, background: "#EBF2FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#0866FF", fontSize: "1rem" }}>
                {user.prenom?.[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>{user.prenom} {user.nom}</div>
                <div style={{ fontSize: "0.7rem", color: "#6B7280" }}>{user.role === "PROPRIETAIRE" ? "Propriétaire" : "Concierge"}</div>
              </div>
            </div>
            <button onClick={logout} style={{ width: "100%", padding: "0.6rem", background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8rem" }}>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
