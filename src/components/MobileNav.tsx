"use client";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="hamburger" style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}>
        <div style={{ width: 22, height: 2, background: "#111827", marginBottom: 5 }} />
        <div style={{ width: 22, height: 2, background: "#111827", marginBottom: 5 }} />
        <div style={{ width: 22, height: 2, background: "#111827" }} />
      </button>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "white", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {[["Comment ça marche","#section0"],["Profils","#section1"],["Fonctionnalités","#section2"],["Paiements","#section3"]].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{ color: "#111827", textDecoration: "none", fontSize: "1.5rem", fontFamily: "Inter, sans-serif" }}>{label}</a>
          ))}
          <a href="#waitlist" onClick={() => setOpen(false)} style={{ padding: "0.8rem 2rem", background: "#0866FF", color: "white", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Rejoindre la liste</a>
        </div>
      )}
    </>
  );
}
