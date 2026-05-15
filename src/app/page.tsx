"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observerRef.current?.observe(el));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlist = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --ink: #FFFFFF; --ink2: #1A1A1F; --surface: #F9FAFB; --card: #FFFFFF;
          --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
          --gold: #0866FF; --gold2: #1877F2; --gold-glow: rgba(201,168,76,0.15);
          --text: #111827; --muted: #6B7280;
          --ff-display: 'Cormorant Garamond', serif; --ff-body: 'DM Sans', sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--ink); color: var(--text); font-family: var(--ff-body); font-weight: 300; overflow-x: hidden; }
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fillBar { from { width:0; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.4rem 4rem",
        background: "rgba(13,13,15,0.9)", backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.07)",
        animation: "fadeDown 0.8s ease both", transition: "border-color 0.3s",
        fontFamily: "var(--ff-body)"
      }}>
        <span style={{ fontFamily: "var(--ff-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--gold2)", letterSpacing: "0.04em" }}>HostLink</span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {["Comment ça marche", "Profils", "Fonctionnalités", "Paiements"].map((l, i) => (
            <a key={i} href={`#section${i}`} style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#waitlist" style={{
          fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "0.6rem 1.6rem", border: "1px solid var(--gold)",
          color: "var(--gold)", textDecoration: "none", fontFamily: "var(--ff-body)"
        }}>Rejoindre la liste</a>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "8rem 2rem 4rem", position: "relative", overflow: "hidden",
        background: "var(--ink)"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)"
        }} />

        <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.8rem", display: "flex", alignItems: "center", gap: "1rem", animation: "fadeUp 0.8s ease 0.2s both", position: "relative", zIndex: 1 }}>
          <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          La location courte durée, réinventée
          <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
        </div>

        <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(3.5rem, 8vw, 7.5rem)", fontWeight: 300, lineHeight: 1.0, animation: "fadeUp 0.9s ease 0.35s both", position: "relative", zIndex: 1 }}>
          Gérez votre bien,<br />
          <em style={{ fontStyle: "italic", color: "var(--gold2)", display: "block" }}>librement.</em>
        </h1>

        <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "var(--muted)", fontWeight: 300, maxWidth: 560, margin: "1.8rem auto 3rem", lineHeight: 1.7, animation: "fadeUp 1s ease 0.5s both", position: "relative", zIndex: 1 }}>
          HostLink est l&apos;infrastructure complète de délégation locative. Matching IA, scoring concierges, paiements centralisés — aussi simple que confier un portefeuille à un gestionnaire financier.
        </p>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s ease 0.65s both", position: "relative", zIndex: 1 }}>
          <a href="#waitlist" style={{ padding: "1rem 2.5rem", background: "var(--gold)", color: "var(--ink)", fontFamily: "var(--ff-body)", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
            Rejoindre la liste d&apos;attente
          </a>
          <a href="#section0" style={{ padding: "1rem 2.5rem", border: "1px solid rgba(255,255,255,0.12)", color: "var(--text)", fontFamily: "var(--ff-body)", fontWeight: 300, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
            Découvrir →
          </a>
        </div>

        <div style={{ display: "flex", gap: "4rem", marginTop: "5rem", justifyContent: "center", animation: "fadeUp 1s ease 0.8s both", position: "relative", zIndex: 1 }}>
          {[["+ 38%", "de revenus en moyenne"], ["1 clic", "pour changer de concierge"], ["100%", "visibilité en temps réel"]].map(([num, label], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold2)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.4rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section id="section0" style={{ padding: "7rem 2rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal">
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Le problème</div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "1.2rem" }}>
              Vous méritez mieux<br />qu&apos;un <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>annuaire de concierges.</em>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 520, fontWeight: 300, lineHeight: 1.8, fontSize: "1rem" }}>Des centaines de conciergeries, aucun moyen de savoir laquelle va vraiment performer sur votre bien. HostLink change la donne.</p>
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", marginTop: "4rem", border: "1px solid rgba(255,255,255,0.07)", transitionDelay: "0.15s" }}>
            {[
              ["01", "Comment choisir parmi des centaines de concierges ?", "Sans données objectives, vous choisissez à l'aveugle. HostLink vous donne un scoring transparent basé sur les vraies performances."],
              ["02", "Mon bien est-il rentable en courte durée ?", "Avant même de signer, HostLink simule votre CA potentiel via Airbnb, AirDNA et ses données internes."],
              ["03", "Je suis à l'étranger, comment gérer à distance ?", "Tableau de bord temps réel, alertes automatiques, versements programmés. Vous êtes aux commandes depuis n'importe où."],
              ["04", "Mon concierge sous-performe, que faire ?", "Changez de concierge en 1 clic. Transfert automatisé des accès, contrats standardisés, zéro friction."],
            ].map(([num, q, a]) => (
              <div key={num} style={{ background: "var(--card)", padding: "2.5rem" }}>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: "3rem", fontWeight: 300, color: "rgba(255,255,255,0.12)", lineHeight: 1, marginBottom: "1rem" }}>{num}</div>
                <div style={{ fontSize: "1rem", color: "var(--text)", marginBottom: "0.6rem", fontWeight: 400 }}>{q}</div>
                <div style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILES */}
      <section id="section1" style={{ padding: "7rem 2rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Qui utilise HostLink</div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.15 }}>
              Fait pour <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>vous,</em><br />quel que soit votre profil.
            </h2>
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.07)", marginTop: "4rem", border: "1px solid rgba(255,255,255,0.07)", transitionDelay: "0.15s" }}>
            {[
              ["🏠", "Propriétaire", "Vous avez un bien, vous voulez des revenus.", "Plus de temps perdu à chercher une conciergerie fiable. HostLink vous trouve le meilleur opérateur et gère tout.", ["Matching IA selon votre bien", "Simulation de revenus instantanée", "Switch concierge en 1 clic", "Versements automatiques"]],
              ["✈️", "Investisseur / Expatrié", "Vous investissez à distance, sans friction.", "Gérez un ou plusieurs biens depuis l'autre bout du monde. Tableau de bord temps réel, alertes intelligentes.", ["Dashboard multi-biens", "Alertes KPI personnalisées", "Revenus sur IBAN ou wallet", "Rapport mensuel automatique"]],
              ["🌴", "Propriétaire occasionnel", "Monétisez votre résidence pendant votre absence.", "Vous partez en vacances ? Activez HostLink et générez des revenus sans rien faire, en toute sécurité.", ["Onboarding en 10 minutes", "Checklist conformité incluse", "Concierge clé en main", "Assurance intégrée"]],
            ].map(([icon, type, title, desc, features]) => (
              <div key={type as string} style={{ background: "var(--card)", padding: "3rem 2.5rem" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "1.2rem" }}>{icon}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.8rem" }}>{type}</div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: "1.5rem", fontWeight: 300, marginBottom: "1rem", lineHeight: 1.2 }}>{title}</div>
                <div style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{desc}</div>
                <ul style={{ listStyle: "none" }}>
                  {(features as string[]).map((f) => (
                    <li key={f} style={{ fontSize: "0.8rem", color: "var(--muted)", paddingLeft: "1rem", position: "relative", marginBottom: "0.5rem" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>—</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="section2" style={{ padding: "7rem 2rem", background: "var(--ink)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal">
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Fonctionnalités</div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "1.2rem" }}>
              L&apos;infrastructure complète<br />de la <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>délégation locative.</em>
            </h2>
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginTop: "4rem", transitionDelay: "0.15s" }}>
            {[
              ["01", "Matching IA", "Un vrai moteur algorithmique basé sur le type de bien, localisation, standing et historique de performance. Pas une liste.", "Intelligence artificielle"],
              ["02", "Scoring concierges", "Taux d'occupation, revenu généré, note voyageurs, délai de réponse, litiges. Transparent comme Bloomberg.", "Trustpilot + Bloomberg"],
              ["03", "Benchmark rentabilité", "Simulation de CA avant même de choisir un concierge, basée sur Airbnb, AirDNA et les données internes HostLink.", "Aide à la décision"],
              ["04", "Switch concierge", "Changez d'opérateur en 1 clic. Contrats standardisés, transfert automatisé des accès, protocole de transition.", "USP principal"],
              ["05", "Paiements centralisés", "IBAN virtuel dédié par bien. HostLink collecte, splitte et reverse selon vos règles — hebdo, mensuel, trimestriel.", "Fintech layer"],
              ["06", "Assurance & garanties", "Garantie de remplacement concierge, assurance dommages intégrée, médiation et résolution de litiges incluses.", "Confiance & sécurité"],
            ].map(([num, title, desc, tag]) => (
              <div key={num} style={{ border: "1px solid rgba(255,255,255,0.07)", padding: "2rem", background: "var(--ink)" }}>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: "2.5rem", fontWeight: 300, color: "rgba(255,255,255,0.1)", lineHeight: 1, marginBottom: "1rem" }}>{num}</div>
                <div style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.6rem" }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.2rem" }}>{desc}</div>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.3rem 0.8rem", display: "inline-block" }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT FLOW */}
      <section id="section3" style={{ padding: "7rem 2rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Paiements centralisés</div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "1.2rem" }}>
              Vos revenus arrivent<br /><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>automatiquement.</em>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>Chaque bien dispose d&apos;un IBAN virtuel dédié. HostLink collecte, applique le split et vous verse selon la fréquence que vous choisissez.</p>
          </div>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", marginTop: "4rem", background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)", padding: "3rem", transitionDelay: "0.2s" }}>
            {[
              ["🏠", "Plateforme", "Airbnb / Booking"],
              ["→", "", ""],
              ["🔗", "IBAN virtuel", "HostLink Wallet", true],
              ["→", "", ""],
              ["⚙️", "Split auto", "Règles configurées"],
              ["→", "", ""],
              ["💰", "Versement", "Propriétaire"],
            ].map(([icon, label, name, isCenter], i) => (
              icon === "→" ? (
                <div key={i} style={{ color: "var(--gold)", fontSize: "1.2rem", padding: "0 0.5rem" }}>→</div>
              ) : (
                <div key={i} style={{ background: isCenter ? "var(--gold)" : "var(--surface)", border: isCenter ? "none" : "1px solid rgba(255,255,255,0.12)", padding: "1.5rem 1.8rem", textAlign: "center", minWidth: 130 }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{icon}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: isCenter ? "rgba(13,13,15,0.6)" : "var(--muted)", marginBottom: "0.3rem" }}>{label}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: isCenter ? 600 : 500, color: isCenter ? "var(--ink)" : "var(--text)" }}>{name}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding: "7rem 2rem", background: "var(--ink)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="reveal">
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Accès anticipé</div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, margin: "1rem 0" }}>
              Soyez parmi<br />les <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>premiers.</em>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto 2.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
              HostLink est en cours de développement. Rejoignez la liste d&apos;attente et bénéficiez d&apos;un accès prioritaire + 3 mois offerts.
            </p>
            {!submitted ? (
              <>
                <div style={{ display: "flex", maxWidth: 480, margin: "0 auto" }}>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    style={{ flex: 1, padding: "1rem 1.5rem", background: "var(--card)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", color: "var(--text)", fontFamily: "var(--ff-body)", fontSize: "0.9rem", outline: "none" }}
                  />
                  <button onClick={handleWaitlist} style={{ padding: "1rem 2rem", background: "var(--gold)", border: "none", color: "var(--ink)", fontFamily: "var(--ff-body)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    Rejoindre →
                  </button>
                </div>
                <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "1rem", letterSpacing: "0.05em" }}>Aucun spam · Désabonnement en 1 clic · Lancement prévu Q3 2025</p>
              </>
            ) : (
              <div style={{ padding: "1rem 2rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold2)", fontSize: "0.9rem", maxWidth: 480, margin: "0 auto" }}>
                ✓ Parfait ! Vous êtes sur la liste. On vous contacte en priorité au lancement.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "3rem 4rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--ink)", fontFamily: "var(--ff-body)" }}>
        <span style={{ fontFamily: "var(--ff-display)", fontSize: "1.2rem", color: "var(--gold2)", fontWeight: 600 }}>HostLink</span>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.05em" }}>© 2025 HostLink. Tous droits réservés.</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Mentions légales", "Confidentialité", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontSize: "0.75rem", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.08em" }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
