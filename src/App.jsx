import { useState, useEffect, useRef } from "react";

const T = {
  white: "#ffffff", snow: "#fafafa", ghost: "#f3f3f5", mist: "#eaeaee",
  ink: "#0a1628", slate: "#27293a", mid: "#52525b", pale: "#6b7280", faint: "#d4d4d8",
  glass: "rgba(255,255,255,.9)",
  blue: "#003c71", blueGlow: "rgba(0,60,113,.12)", blueSoft: "#e8eef5", blueDark: "#001a3a", blueAccent: "#0066b3",
  teal: "#0d9488", tealSoft: "#ccfbf1", tealGlow: "rgba(13,148,136,.12)",
  amber: "#b45309", amberSoft: "#fef3c7", amberGlow: "rgba(180,83,9,.12)",
  purple: "#581c87", purpleSoft: "#f3e8ff", purpleGlow: "rgba(88,28,135,.12)",
  green: "#1e8e3e", greenSoft: "#e6f4ea",
  red: "#d4202c", redSoft: "#fef2f2",
  orange: "#e8710a", orangeSoft: "#fff3e0",
  gold: "#c9a84c", cream: "#fdf6e3",
};

const DOMAIN = {
  bank: { label: "53rd App", color: T.blue, bg: T.blueSoft, icon: "🏦" },
  signals: { label: "Signal Layer", color: T.teal, bg: T.tealSoft, icon: "📡" },
  rules: { label: "Rules Engine", color: T.orange, bg: T.orangeSoft, icon: "⚙️" },
  ai: { label: "LLM", color: T.purple, bg: T.purpleSoft, icon: "🧠" },
  aem: { label: "Component Lib", color: T.blueAccent, bg: T.blueSoft, icon: "🧩" },
  audit: { label: "Audit Log", color: T.amber, bg: T.amberSoft, icon: "📋" },
};

const PERSONAS = {
  marcus: {
    id: "marcus", name: "Marcus Chen", age: 28, title: "The Career Builder", avatar: "👨🏻‍💻",
    accent: T.teal, accentSoft: T.tealSoft, accentGlow: T.tealGlow,
    snapshot: "Software engineer, recently relocated to Cincinnati for P&G. Single, urban renter.",
    income: "$115K · 720 credit", products: ["Momentum Checking (4 mo)", "Debit only"],
    signals: [
      { label: 'Searched "credit card" in-app', t: "2d ago" },
      { label: "Visited card product pages 2×", t: "this week" },
      { label: "Mobile-only · evenings/weekends", t: "ongoing" },
      { label: "Direct deposit on 15th/30th", t: "monthly" },
    ],
    goals: ["Build credit", "Down payment fund", "Refi student loans"],
    tone: "Energetic · growth-oriented · peer-to-peer · second-person · short sentences",
    greeting: "Morning, Marcus. Quick check-in.",
    heroEyebrow: "BUILD CREDIT WHILE YOU SPEND",
    heroTitle: "Your card. Your credit. Your move.",
    heroSub: "53rd Cash/Back · $200 welcome bonus · No annual fee · Pre-qualify in 60 seconds without dinging your score.",
    heroCTA: "See if I'm pre-approved",
    nba: { title: "Open a high-yield savings goal — your future down payment thanks you.", sub: "Auto-rule $200/mo. Start a Dobot goal in 60 seconds." },
    nbaAlt: { title: "$200 a month → $40K closer to a Cincinnati down payment.", sub: "Set a Dobot rule. We'll route it before you can spend it." },
    rail: [
      { type: "Article", title: "The 5-minute credit-building checklist", icon: "📚" },
      { type: "Calculator", title: "Cincinnati down payment calculator", icon: "🏠" },
      { type: "Tool", title: "Set a Dobot savings rule", icon: "🤖" },
    ],
    cta: "Refi your student loans — see your rate in 2 minutes",
    balances: [
      { name: "Momentum Checking", amount: "$3,247.18", trend: "+ $2,100 this month" },
      { name: "Debit · ••6741", amount: "Active", trend: "5 transactions this week" },
    ],
  },
  sarah: {
    id: "sarah", name: "Sarah Rodriguez", age: 42, title: "The Growth-Mode Owner", avatar: "👩🏽‍💼",
    accent: T.amber, accentSoft: T.amberSoft, accentGlow: T.amberGlow,
    snapshot: "Owner, 6-person digital agency in Columbus, OH. Married, 2 kids (10, 13). Suburban homeowner.",
    income: "$280K HHI · $1.4M biz rev", products: ["Biz Checking (3y)", "Preferred Black", "30y Mortgage"],
    signals: [
      { label: 'Searched "business line of credit"', t: "3d ago" },
      { label: "3 wires > $15K", t: "last week" },
      { label: "Biz ↔ personal switching 4×", t: "this month" },
      { label: "Desktop · weekday mornings", t: "ongoing" },
    ],
    goals: ["Hire 2 more", "Second office", "Smooth cash flow"],
    tone: "Pragmatic · time-respecting · business peer · numbers + proof points · no slogans",
    greeting: "Welcome back, Sarah. Two quick things for you and your business.",
    heroEyebrow: "PRE-QUALIFIED · UP TO $250,000",
    heroTitle: "Capital that grows with you.",
    heroSub: "Business Line of Credit · Draw on demand · No prepayment penalty · Funds in 48 hours.",
    heroCTA: "Review my offer",
    nba: { title: "Streamline payroll — switch to 53rd Express Business Payroll and save ~6 hrs a month.", sub: "Direct deposit, tax filing, QuickBooks sync. Schedule a call." },
    nbaAlt: { title: "Six hours a month back. That's payroll, off your plate.", sub: "Express Business Payroll handles tax filing and direct deposit. We'll set it up." },
    rail: [
      { type: "Case study", title: "How an Ohio agency 2×'d headcount with smart cash management", icon: "📈" },
      { type: "Tool", title: "Cash flow forecaster", icon: "💰" },
      { type: "Article", title: "SBA 7(a) vs. line of credit — which fits your stage?", icon: "📄" },
    ],
    cta: "Book 30 minutes with your dedicated 53rd business banker",
    balances: [
      { name: "Business Operating", amount: "$87,442.91", trend: "− $31,200 (payroll cycle)" },
      { name: "Personal · Preferred Black", amount: "$24,108.55", trend: "+ $8,200 this month" },
    ],
  },
  david: {
    id: "david", name: "David Patterson", age: 58, title: "The Wealth Steward", avatar: "👨🏼‍⚕️",
    accent: T.purple, accentSoft: T.purpleSoft, accentGlow: T.purpleGlow,
    snapshot: "Senior exec at a Cincinnati healthcare company. Married 30y. Two adult children. Aging parents in Indianapolis.",
    income: "$1.2M HHI · $2.5M investable", products: ["Private Bank (5y)", "Preferred Black", "Mortgage", "2 Trusts"],
    signals: [
      { label: 'Searched "estate planning"', t: "5d ago" },
      { label: "Downloaded retirement readiness guide", t: "last month" },
      { label: "Desktop · weekend mornings", t: "ongoing" },
      { label: "No mobile app in 60 days", t: "—" },
    ],
    goals: ["Retire at 65", "Wealth transfer", "Fund 529s"],
    tone: "Considered · advisory · sophisticated · no exclamation points · peer-to-peer with a successful executive",
    greeting: "Good morning, David. A few items worth your attention.",
    heroEyebrow: "TRUST & WEALTH",
    heroTitle: "Your legacy, intentionally planned.",
    heroSub: "A complimentary 60-minute estate planning review with your 53rd advisor and an estate attorney from our partner network.",
    heroCTA: "Schedule a review",
    nba: { title: "Markets weekly: a 90-second read from your advisor on Q2 positioning.", sub: "Read now, or schedule a portfolio call with your dedicated team." },
    nbaAlt: { title: "Your advisor's Q2 read is ready — 90 seconds, no jargon.", sub: "Or schedule a full portfolio review at your convenience." },
    rail: [
      { type: "Tool", title: "Retirement readiness check", icon: "🎯" },
      { type: "Article", title: "529 funding strategies for grandchildren", icon: "🎓" },
      { type: "Article", title: "Refi math: when does it pay below 6%?", icon: "🏘️" },
    ],
    cta: "Schedule your quarterly review with your wealth advisor",
    balances: [
      { name: "Preferred Black", amount: "$112,847.22", trend: "+ $14,000 this month" },
      { name: "Wealth · Portfolio", amount: "$2,548,193", trend: "+ 1.8% YTD" },
    ],
  },
};

/* ═══ SHARED UI ═══ */
function Glass({ children, style: s = {}, highlight, borderColor }) { return (<div style={{ background: highlight ? "rgba(255,255,255,.95)" : T.glass, backdropFilter: "blur(20px)", borderRadius: 16, border: `1px solid ${borderColor || (highlight ? T.blue + "30" : T.mist)}`, boxShadow: highlight ? `0 4px 24px ${T.blueGlow}` : "0 1px 8px rgba(0,0,0,.04)", ...s }}>{children}</div>); }
function DBadge({ domain }) { const d = DOMAIN[domain]; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: d.bg, border: `1px solid ${d.color}30`, borderRadius: 20, padding: "3px 10px", fontSize: 13.5, fontFamily: "JBM", fontWeight: 700, color: d.color }}>{d.icon} {d.label}</span>; }
function TZone({ domain, children, active = true }) { const d = DOMAIN[domain]; return (<div style={{ border: `1.5px dashed ${active ? d.color + "50" : T.mist}`, borderRadius: 14, padding: "14px 14px 10px", position: "relative", background: active ? `${d.bg}40` : "transparent", opacity: active ? 1 : .4 }}><div style={{ position: "absolute", top: -9, left: 14 }}><DBadge domain={domain} /></div><div style={{ marginTop: 6 }}>{children}</div></div>); }
function Phone({ children, accent = T.blue }) { return (<div style={{ width: 360, margin: "0 auto", background: T.ink, borderRadius: 36, padding: 8, boxShadow: `0 12px 40px ${accent}25, 0 4px 12px rgba(0,0,0,.15)` }}><div style={{ background: "#fff", borderRadius: 28, overflow: "hidden", height: 760, position: "relative" }}><div style={{ background: T.ink, height: 28, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", color: "#fff", fontSize: 13.5, fontFamily: "JBM", fontWeight: 600 }}><span>9:41</span><span>● ●</span><span>100%</span></div><div style={{ height: "calc(100% - 28px)", overflowY: "auto" }}>{children}</div></div></div>); }
function Btn({ onClick, children, color = T.blue, outline, full, style: s = {} }) { return <button onClick={onClick} style={{ border: outline ? `1.5px solid ${color}` : "none", background: outline ? "transparent" : color, color: outline ? color : "#fff", padding: "9px 24px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 16, fontFamily: "Outfit", width: full ? "100%" : "auto", boxShadow: !outline ? `0 3px 12px ${color}25` : "none", transition: "all .2s", ...s }}>{children}</button>; }
function Tag({ children, color = T.blue }) { return <span style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 20, padding: "2px 10px", fontSize: 13.5, color, fontWeight: 600, fontFamily: "JBM" }}>{children}</span>; }
function StepBanner({ step, desc, color = T.blue, eyebrow }) { return (<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: "12px 18px", background: `${color}08`, border: `1.5px solid ${color}25`, borderRadius: 12 }}><div style={{ background: color, color: "#fff", padding: "5px 14px", borderRadius: 8, fontWeight: 700, fontSize: 17, fontFamily: "Outfit", whiteSpace: "nowrap" }}>{step}</div><div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{eyebrow && <div style={{ fontSize: 12, fontFamily: "JBM", color: color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{eyebrow}</div>}<div style={{ fontSize: 16, color: T.slate, fontFamily: "Outfit", lineHeight: 1.4 }}>{desc}</div></div></div>); }

/* Dashboard rendered for any persona (or generic baseline) */
function Dashboard({ persona, generic, highlightAI, mini }) {
  const p = persona ? PERSONAS[persona] : null;
  const accent = p?.accent || T.blue;
  const greeting = generic ? "Welcome back" : p.greeting;
  const heroTitle = generic ? "Make every dollar count." : p.heroTitle;
  const heroSub = generic ? "Explore products, tools, and offers from Fifth Third." : p.heroSub;
  const heroEyebrow = generic ? "FOR YOU" : p.heroEyebrow;
  const heroCTA = generic ? "Explore" : p.heroCTA;
  const nbaTitle = generic ? "Set up account alerts to stay on top of your money." : p.nba.title;
  const nbaSub = generic ? "Two-minute setup in your security center." : p.nba.sub;
  const rail = generic ? [{ type: "Article", title: "5 ways to save more in 2026", icon: "📚" }, { type: "Tool", title: "Budgeting basics", icon: "💰" }, { type: "Article", title: "How to build credit", icon: "📈" }] : p.rail;
  const balances = generic ? [{ name: "Checking", amount: "$X,XXX.XX", trend: "—" }, { name: "Savings", amount: "$X,XXX.XX", trend: "—" }] : p.balances;
  const cta = generic ? "Open a new account" : p.cta;
  return (
    <Phone accent={accent}>
      <div style={{ padding: "14px 16px", background: `linear-gradient(180deg, ${accent}12, transparent)` }}>
        {/* Greeting */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12.5, fontFamily: "JBM", color: accent, letterSpacing: 1.5, fontWeight: 700, textTransform: "uppercase" }}>53RD · {generic ? "GUEST" : p.title.toUpperCase()}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginTop: 2 }}>{greeting}</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `1.5px solid ${accent}30` }}>{generic ? "👤" : p.avatar}</div>
        </div>

        {/* Balances */}
        <div style={{ display: "grid", gridTemplateColumns: balances.length === 2 ? "1fr 1fr" : "1fr", gap: 6, marginBottom: 12 }}>
          {balances.map((b, i) => (<div key={i} style={{ background: "#fff", border: `1px solid ${T.mist}`, borderRadius: 10, padding: "8px 10px" }}><div style={{ fontSize: 13, fontFamily: "JBM", color: T.pale, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{b.name}</div><div style={{ fontSize: 17, fontWeight: 700, color: T.ink, marginTop: 2, fontFamily: "Outfit" }}>{b.amount}</div><div style={{ fontSize: 13, color: T.mid, marginTop: 1 }}>{b.trend}</div></div>))}
        </div>

        {/* Hero "For You" */}
        <div style={{ background: `linear-gradient(135deg, ${accent}, ${accent}d0)`, borderRadius: 12, padding: "14px 14px", color: "#fff", marginBottom: 10, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
          <div style={{ fontSize: 12.5, fontFamily: "JBM", letterSpacing: 1.5, fontWeight: 700, color: "rgba(255,255,255,.88)", marginBottom: 6 }}>{heroEyebrow}</div>
          <div style={{ fontSize: 19, fontWeight: 700, fontFamily: "Outfit", lineHeight: 1.2, marginBottom: 4, position: "relative" }}>{heroTitle}</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.9)", lineHeight: 1.4, marginBottom: 9, position: "relative" }}>{heroSub}</div>
          <div style={{ background: "#fff", color: accent, padding: "6px 14px", borderRadius: 7, fontWeight: 700, fontSize: 14, display: "inline-block", fontFamily: "Outfit" }}>{heroCTA} →</div>
        </div>

        {/* NBA card */}
        <div style={{ background: "#fff", border: `1.5px solid ${highlightAI ? T.purple : accent}40`, borderRadius: 12, padding: "10px 12px", marginBottom: 10, position: "relative", boxShadow: highlightAI ? `0 0 0 3px ${T.purple}15, 0 4px 16px ${T.purpleGlow}` : "none", transition: "all .4s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <span style={{ fontSize: 12.5, fontFamily: "JBM", color: highlightAI ? T.purple : accent, letterSpacing: 1.5, fontWeight: 700 }}>{highlightAI ? "🧠 AI · NEXT BEST ACTION" : "NEXT BEST ACTION"}</span>
            <span style={{ fontSize: 15, color: T.pale, cursor: "pointer" }}>ⓘ</span>
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, fontFamily: "Outfit", lineHeight: 1.3, marginBottom: 3 }}>{nbaTitle}</div>
          <div style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.4 }}>{nbaSub}</div>
        </div>

        {/* Content rail */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>For your goals</div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
            {rail.map((r, i) => (<div key={i} style={{ flexShrink: 0, width: 110, background: "#fff", border: `1px solid ${T.mist}`, borderRadius: 10, padding: "8px 9px" }}><div style={{ fontSize: 18, marginBottom: 4 }}>{r.icon}</div><div style={{ fontSize: 12.5, fontFamily: "JBM", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{r.type}</div><div style={{ fontSize: 13.5, color: T.ink, lineHeight: 1.25, fontWeight: 600 }}>{r.title}</div></div>))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, marginBottom: 10 }}>
          {[["Transfer", "↗"], ["Deposit", "📥"], ["Pay", "💳"], ["Zelle", "💸"]].map(([l, ic]) => (<div key={l} style={{ background: "#fff", border: `1px solid ${T.mist}`, borderRadius: 9, padding: "8px 4px", textAlign: "center" }}><div style={{ fontSize: 18 }}>{ic}</div><div style={{ fontSize: 13, color: T.slate, marginTop: 2, fontWeight: 600 }}>{l}</div></div>))}
        </div>

        {/* CTA strip */}
        <div style={{ background: T.ink, color: "#fff", borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "Outfit", lineHeight: 1.3, paddingRight: 8 }}>{cta}</div>
          <span style={{ fontSize: 18, color: accent === T.blue ? "#fff" : accent }}>→</span>
        </div>
      </div>
    </Phone>
  );
}

/* Event stream sidebar */
function EventPanel({ events }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }); }, [events]);
  return (<Glass highlight style={{ padding: 14, maxHeight: 620, display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue, boxShadow: `0 0 8px ${T.blue}80`, animation: "blink2 2s ease infinite" }} /><span style={{ fontFamily: "JBM", fontSize: 13.5, color: T.blue, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>Event Stream</span></div>
    <div ref={ref} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
      {events.map((e, i) => (<div key={i} style={{ padding: "5px 9px", borderRadius: 9, background: T.snow, border: `1px solid ${T.mist}`, borderLeft: `3px solid ${e.color || T.blue}`, animation: "slideUp .35s cubic-bezier(.16,1,.3,1) both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}><span style={{ fontSize: 13, fontFamily: "JBM", fontWeight: 700, color: e.color || T.blue, textTransform: "uppercase" }}>{e.type}</span>{e.domain && <span style={{ fontSize: 12.5, fontFamily: "JBM", color: DOMAIN[e.domain]?.color, background: DOMAIN[e.domain]?.bg, padding: "0px 4px", borderRadius: 5, fontWeight: 600 }}>{DOMAIN[e.domain]?.icon}</span>}</div>
        <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.3 }}>{e.detail}</div>
        <div style={{ fontSize: 12.5, color: T.pale, fontFamily: "JBM" }}>{e.time}</div>
      </div>))}
      {events.length === 0 && <div style={{ color: T.pale, fontSize: 15, fontStyle: "italic", padding: 14, textAlign: "center" }}>Awaiting activity…</div>}
    </div>
  </Glass>);
}

const STEPS = [
  { label: "The Problem", n: "01" }, { label: "Generic Today", n: "02" }, { label: "Three Customers", n: "03" },
  { label: "Signals", n: "04" }, { label: "Marcus · 28", n: "05" }, { label: "Sarah · 42", n: "06" },
  { label: "David · 58", n: "07" }, { label: "AI Module", n: "08" }, { label: "Brand Control", n: "09" },
  { label: "Compliance Control", n: "10" }, { label: "Business Impact", n: "11" }, { label: "Summary", n: "12" },
];

/* ═══ S1: THE PROBLEM ═══ */
function S1({ onNext, add }) {
  useEffect(() => { add({ type: "BASELINE", detail: "1.2M customers · 1 dashboard · 0 personalization", color: T.red, domain: "bank", time: "Today" }); }, []);
  return (<div><StepBanner step="The Problem" desc="Every customer sees the same dashboard. We have rich signals. We just don't use them on the page." color={T.red} />
    <Glass style={{ padding: 28, textAlign: "center", marginBottom: 14 }}>
      <div style={{ fontSize: 15, fontFamily: "JBM", color: T.red, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>53rd Mobile Banking · Today</div>
      <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "Outfit", color: T.ink, marginBottom: 6 }}>One screen. Every customer.</div>
      <div style={{ fontSize: 17, color: T.mid, maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>The 28-year-old building credit, the 42-year-old running an agency, and the 58-year-old planning estate transfer all see the same generic offers, the same generic copy, the same generic content rail.</div>
    </Glass>

    {/* Converging visual: 3 personas → 1 generic dashboard */}
    <Glass style={{ padding: "26px 22px 22px", marginBottom: 14, position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 0, position: "relative", zIndex: 2 }}>
        {Object.values(PERSONAS).map(p => (<div key={p.id} style={{ background: "#fff", border: `1.5px solid ${p.accent}30`, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 42, marginBottom: 4, lineHeight: 1 }}>{p.avatar}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: "Outfit" }}>{p.name}, {p.age}</div>
          <div style={{ fontSize: 13, color: p.accent, fontFamily: "JBM", fontWeight: 700, marginTop: 2, letterSpacing: 0.5 }}>{p.title.toUpperCase()}</div>
        </div>))}
      </div>

      {/* SVG converging lines */}
      <div style={{ position: "relative", height: 70, margin: "0 0 4px" }}>
        <svg width="100%" height="70" viewBox="0 0 600 70" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <line x1="100" y1="0" x2="300" y2="60" stroke={T.red} strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
          <line x1="300" y1="0" x2="300" y2="60" stroke={T.red} strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
          <line x1="500" y1="0" x2="300" y2="60" stroke={T.red} strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
          <circle cx="300" cy="62" r="5" fill={T.red} />
        </svg>
      </div>

      {/* Single shared destination */}
      <div style={{ background: T.snow, border: `2px solid ${T.red}30`, borderRadius: 12, padding: "16px 22px", maxWidth: 380, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontFamily: "JBM", color: T.red, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>What all three see</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginBottom: 4 }}>"Welcome back."</div>
        <div style={{ fontSize: 13, color: T.mid, fontStyle: "italic" }}>Same hero. Same NBA. Same rail. Same CTA.</div>
      </div>
    </Glass>

    <Glass style={{ padding: "16px 22px", background: T.redSoft, borderColor: T.red + "30" }}>
      <div style={{ fontSize: 17, color: T.red, fontWeight: 700, fontFamily: "Outfit", marginBottom: 4 }}>The opportunity</div>
      <div style={{ fontSize: 16, color: T.slate, lineHeight: 1.6 }}>53rd already has the signals — products held, recent searches, transaction patterns, life-stage indicators, channel behavior — sitting in AEM, Adobe Analytics, and the CDP. The page just isn't reading them. Today we'll show what happens when it does.</div>
    </Glass>
    <Btn onClick={onNext} style={{ marginTop: 14 }}>Show me today's dashboard →</Btn>
  </div>);
}

/* ═══ S2: GENERIC TODAY ═══ */
function S2({ onNext, add }) {
  useEffect(() => { add({ type: "RENDER", detail: "Generic dashboard rendered — same content for all customers", color: T.mid, domain: "bank", time: "Day 0" }); }, []);
  return (<div><StepBanner step="Generic Today" desc="The current logged-in dashboard. Identical for Marcus, Sarah, and David." color={T.mid} />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "stretch" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <Dashboard generic />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Block 1: What every customer sees */}
        <Glass style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontFamily: "JBM", color: T.mid, letterSpacing: 1.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>What every customer sees</div>
          {[
            ["Greeting", "\"Welcome back\" — name only, no context"],
            ["Hero", "\"Make every dollar count\" — generic value prop"],
            ["Next Best Action", "Set up alerts — same for everyone"],
            ["Content rail", "Top-funnel articles · same 3 cards"],
            ["CTA", "\"Open a new account\" — no relevance signal"],
          ].map(([k, v], i, arr) => (<div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.ghost}` : "none" }}>
            <div style={{ minWidth: 100, fontSize: 13.5, fontFamily: "JBM", fontWeight: 700, color: T.slate, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</div>
            <div style={{ fontSize: 14.5, color: T.mid, lineHeight: 1.5 }}>{v}</div>
          </div>))}
        </Glass>

        {/* Block 2: The cost — quantified */}
        <Glass style={{ padding: 18, background: T.amberSoft, borderColor: T.amber + "30" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.amber }} />
            <div style={{ fontSize: 14, fontFamily: "JBM", fontWeight: 700, color: T.amber, letterSpacing: 1.5, textTransform: "uppercase" }}>The cost, quantified</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              ["~140M", "irrelevant impressions / yr"],
              ["~7%", "of NBA actions wasted on misfit offers"],
              ["~$0", "marginal cost to personalize"],
            ].map(([n, l]) => (<div key={n} style={{ background: "#fff", border: `1px solid ${T.amber}30`, borderRadius: 9, padding: "10px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: T.amber, fontFamily: "Outfit", lineHeight: 1.1 }}>{n}</div>
              <div style={{ fontSize: 12, color: T.slate, marginTop: 4, lineHeight: 1.4 }}>{l}</div>
            </div>))}
          </div>
        </Glass>

        {/* Block 3: The reframe / lead-in */}
        <Glass style={{ padding: 18, background: T.snow, flex: 1 }}>
          <div style={{ fontSize: 14, fontFamily: "JBM", color: T.mid, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>The bigger problem</div>
          <div style={{ fontSize: 15, color: T.slate, lineHeight: 1.6 }}>This screen is probably the most-viewed surface 53rd owns. Every irrelevant module is wasted attention. Every wrong CTA is a missed conversion. Every "Welcome back" without context is a relationship not deepened — repeated millions of times a month.</div>
        </Glass>
      </div>
    </div>
    <Btn onClick={onNext} style={{ marginTop: 16 }}>Meet the three customers →</Btn>
  </div>);
}

/* ═══ S3: THREE CUSTOMERS ═══ */
function S3({ onNext, add }) {
  useEffect(() => { add({ type: "PERSONAS", detail: "3 personas defined — Career Builder, Growth Owner, Wealth Steward", color: T.blue, domain: "rules", time: "Day 0" }); }, []);
  return (<div><StepBanner step="Three Customers" desc="53rd-grounded personas. Real segments, real product holdings, realistic signals." />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      {Object.values(PERSONAS).map(p => (<Glass key={p.id} style={{ padding: 16, borderColor: p.accent + "40" }} highlight>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, border: `2px solid ${p.accent}30` }}>{p.avatar}</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "Outfit" }}>{p.name}, {p.age}</div>
            <div style={{ fontSize: 14, color: p.accent, fontFamily: "JBM", fontWeight: 700 }}>{p.title.toUpperCase()}</div>
          </div>
        </div>
        <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.5, marginBottom: 10 }}>{p.snapshot}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div><div style={{ fontSize: 13, fontFamily: "JBM", color: T.pale, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Financial</div><div style={{ fontSize: 14.5, color: T.ink, fontWeight: 600 }}>{p.income}</div></div>
          <div><div style={{ fontSize: 13, fontFamily: "JBM", color: T.pale, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>53rd Relationship</div><div style={{ fontSize: 14, color: T.slate, lineHeight: 1.4 }}>{p.products.join(" · ")}</div></div>
          <div><div style={{ fontSize: 13, fontFamily: "JBM", color: T.pale, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Goals (24 mo)</div><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{p.goals.map((g, i) => <Tag key={i} color={p.accent}>{g}</Tag>)}</div></div>
        </div>
      </Glass>))}
    </div>
    <Glass style={{ padding: "14px 18px", marginTop: 14, background: T.blueSoft, borderColor: T.blue + "30" }}>
      <div style={{ fontSize: 16, color: T.slate, lineHeight: 1.6 }}><strong style={{ color: T.blue }}>These are not stock archetypes.</strong> Each maps to a real 53rd customer segment — Consumer / Small Business / Wealth — with realistic product holdings and behavioral signals 53rd already collects. This is the starting point. Now let's look at what the system actually sees.</div>
    </Glass>
    <Btn onClick={onNext} style={{ marginTop: 12 }}>Show me the signals →</Btn>
  </div>);
}

/* ═══ S4: SIGNALS ═══ */
function S4({ onNext, add }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    add({ type: "INGEST", detail: "AEM + Adobe Analytics + CDP signals streaming in", color: T.teal, domain: "signals", time: "Day 0" });
    const timers = [setTimeout(() => setShown(1), 600), setTimeout(() => setShown(2), 1400), setTimeout(() => setShown(3), 2200)];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (<div><StepBanner step="Signal Layer" desc="Behavioral, product, and lifecycle signals 53rd already has — sitting unused on the page." color={T.teal} />

    {/* Unified data-flow container */}
    <Glass style={{ padding: "20px 20px 22px", marginBottom: 14, position: "relative" }}>
      <div style={{ fontSize: 12, fontFamily: "JBM", color: T.teal, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Data sources 53rd already collects</div>

      {/* Source row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 6 }}>
        {[
          { d: "signals", label: "Adobe Analytics", desc: "Clickstream · in-app search · page views" },
          { d: "rules", label: "CDP", desc: "Products held · lifecycle stage · segment" },
          { d: "aem", label: "AEM", desc: "Content metadata · persona tags" },
        ].map(s => (<div key={s.d} style={{ background: "#fff", border: `1.5px solid ${DOMAIN[s.d].color}30`, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{DOMAIN[s.d].icon}</span>
            <span style={{ fontSize: 13.5, fontFamily: "JBM", fontWeight: 700, color: DOMAIN[s.d].color, letterSpacing: 0.5 }}>{s.label}</span>
          </div>
          <div style={{ fontSize: 13, color: T.slate, lineHeight: 1.4 }}>{s.desc}</div>
        </div>))}
      </div>

      {/* Flow visual: 3 sources merge into a "signal layer" bus, then split into 3 personas */}
      <div style={{ position: "relative", height: 56, margin: "0 0 8px" }}>
        <svg width="100%" height="56" viewBox="0 0 600 56" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          {/* Down from sources */}
          <line x1="100" y1="0" x2="100" y2="20" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          <line x1="300" y1="0" x2="300" y2="20" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          <line x1="500" y1="0" x2="500" y2="20" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          {/* Bus */}
          <line x1="60" y1="20" x2="540" y2="20" stroke={T.teal} strokeWidth="2" />
          {/* Down from bus to personas */}
          <line x1="100" y1="20" x2="100" y2="56" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          <line x1="300" y1="20" x2="300" y2="56" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          <line x1="500" y1="20" x2="500" y2="56" stroke={T.teal} strokeWidth="1.5" opacity=".5" />
          {/* Bus label */}
          <rect x="240" y="10" width="120" height="20" rx="10" fill={T.teal} />
          <text x="300" y="24" fontFamily="JetBrains Mono" fontWeight="700" fontSize="10" fill="#fff" textAnchor="middle" letterSpacing="1.5">SIGNAL LAYER</text>
        </svg>
      </div>

      {/* Persona row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {Object.values(PERSONAS).map((p, idx) => (<div key={p.id} style={{ background: "#fff", border: `1.5px solid ${shown > idx ? p.accent + "50" : T.mist}`, borderRadius: 10, padding: 14, opacity: shown > idx ? 1 : .25, transition: "all .5s", boxShadow: shown > idx ? `0 4px 16px ${p.accent}15` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{p.avatar}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "Outfit" }}>{p.name.split(" ")[0]}</div>
              <div style={{ fontSize: 12, color: p.accent, fontFamily: "JBM", fontWeight: 700, letterSpacing: 0.5 }}>{p.id.toUpperCase()}_PROFILE</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {p.signals.map((s, i) => (<div key={i} style={{ fontSize: 13, color: T.slate, padding: "5px 9px", background: p.accentSoft, borderRadius: 6, borderLeft: `2px solid ${p.accent}`, display: "flex", justifyContent: "space-between", alignItems: "center", animation: shown > idx ? "slideUp .3s ease both" : "none", animationDelay: `${i * 0.08}s`, fontFamily: "JBM" }}>
              <span>{s.label}</span>
              <span style={{ fontSize: 11.5, color: T.pale }}>{s.t}</span>
            </div>))}
          </div>
          <div style={{ marginTop: 10, padding: "7px 10px", background: T.snow, border: `1px solid ${T.mist}`, borderRadius: 7, fontSize: 12.5, color: T.mid, fontFamily: "JBM" }}>→ <strong style={{ color: p.accent }}>{p.id === "marcus" ? "ns_consumer_credit_builder" : p.id === "sarah" ? "smb_growth_capital" : "wealth_legacy_planning"}</strong></div>
        </div>))}
      </div>
    </Glass>

    <Glass style={{ padding: "16px 22px", background: T.tealSoft, borderColor: T.teal + "30" }}>
      <div style={{ fontSize: 16, color: T.slate, lineHeight: 1.6 }}><strong style={{ color: T.teal }}>Same data 53rd has today.</strong> No new tracking, no new consent flows. We're just routing existing signals into a rules layer that selects content per persona — and into the AI module for dynamic copy.</div>
    </Glass>
    <Btn onClick={onNext} color={T.teal} style={{ marginTop: 14 }}>Switch to Marcus →</Btn>
  </div>);
}

/* ═══ S5–S7: PERSONA DASHBOARDS ═══ */
function PersonaStep({ personaId, onNext, add, isLast }) {
  const p = PERSONAS[personaId];
  useEffect(() => {
    add({ type: "PERSONA_SWITCH", detail: `Rendered for ${p.name} — ${p.title}`, color: p.accent, domain: "rules", time: "Live" });
    setTimeout(() => add({ type: "RULES_EVAL", detail: `${p.id}_signals matched → content variant ${p.id}_v1 selected`, color: T.orange, domain: "rules", time: "+0.1s" }), 400);
  }, [personaId]);
  return (<div><StepBanner step={`${p.name} · ${p.age}`} eyebrow={p.title} desc={`Same components, same brand. Watch what happens to the content when we know who's looking.`} color={p.accent} />

    {/* Side-by-side phones */}
    <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "stretch", marginBottom: 22, flexWrap: "wrap" }}>
      {/* BEFORE — generic */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 12, padding: "6px 16px", background: T.snow, border: `1.5px solid ${T.mist}`, borderRadius: 22, fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Before · Generic</div>
        <Dashboard generic />
        <div style={{ marginTop: 10, fontSize: 13, color: T.mid, maxWidth: 320, textAlign: "center" }}>What every customer sees today</div>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: p.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, boxShadow: `0 6px 20px ${p.accent}50`, fontFamily: "Outfit" }}>→</div>
        <div style={{ marginTop: 10, fontSize: 12, fontFamily: "JBM", color: p.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, textAlign: "center", maxWidth: 90, lineHeight: 1.3 }}>Same<br />system</div>
      </div>

      {/* AFTER — personalized */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 12, padding: "6px 16px", background: p.accentSoft, border: `1.5px solid ${p.accent}50`, borderRadius: 22, fontSize: 13, fontFamily: "JBM", color: p.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>After · Personalized for {p.name.split(" ")[0]}</div>
        <Dashboard persona={personaId} />
        <div style={{ marginTop: 10, fontSize: 13, color: p.accent, fontWeight: 600, maxWidth: 320, textAlign: "center" }}>{p.title}</div>
      </div>
    </div>

    {/* Annotations row */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gap: 12, marginBottom: 14 }}>
      <Glass style={{ padding: 16, borderColor: p.accent + "40" }} highlight>
        <div style={{ fontSize: 13, fontFamily: "JBM", color: p.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Tone of voice</div>
        <div style={{ fontSize: 14, color: T.slate, fontStyle: "italic", lineHeight: 1.55 }}>{p.tone}</div>
      </Glass>
      <Glass style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What changed</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["Greeting", `"${p.greeting}"`],
            ["Hero", p.heroTitle],
            ["NBA", p.nba.title.length > 65 ? p.nba.title.slice(0, 65) + "…" : p.nba.title],
            ["CTA", p.cta.length > 55 ? p.cta.slice(0, 55) + "…" : p.cta],
          ].map(([k, v]) => (<div key={k} style={{ padding: "8px 10px", background: p.accentSoft, borderRadius: 7, borderLeft: `3px solid ${p.accent}` }}>
            <div style={{ fontSize: 12, fontFamily: "JBM", color: p.accent, fontWeight: 700, marginBottom: 3, letterSpacing: 1 }}>{k.toUpperCase()}</div>
            <div style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.4 }}>{v}</div>
          </div>))}
        </div>
      </Glass>
      <Glass style={{ padding: 16, borderColor: T.green + "30" }} highlight>
        <div style={{ fontSize: 13, fontFamily: "JBM", color: T.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Held constant</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Brand tokens", "Component library", "Page layout", "Compliance rules"].map(t => (<div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: T.greenSoft, border: `1px solid ${T.green}25`, borderRadius: 7 }}>
            <span style={{ color: T.green, fontSize: 14, fontWeight: 700, fontFamily: "JBM" }}>✓</span>
            <span style={{ fontSize: 13.5, color: T.slate, fontWeight: 600 }}>{t}</span>
          </div>))}
        </div>
      </Glass>
    </div>

    <Btn onClick={onNext} color={p.accent} style={{ marginTop: 4 }}>{isLast ? "Now show me the AI module →" : `Switch to ${personaId === "marcus" ? "Sarah" : "David"} →`}</Btn>
  </div>);
}

/* ═══ S8: AI MODULE ═══ */
function S8({ onNext, add }) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const target = "Open a high-yield savings goal — your future down payment thanks you.";
  useEffect(() => {
    add({ type: "AI_CALL", detail: "LLM · NBA generation request for Marcus", color: T.purple, domain: "ai", time: "Live" });
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => { setPhase(3); add({ type: "AI_RESPONSE", detail: "Generated · 12 words · within voice + compliance", color: T.purple, domain: "ai", time: "+1.2s" }); }, 3400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);
  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const iv = setInterval(() => { i++; setTyped(target.slice(0, i)); if (i >= target.length) clearInterval(iv); }, 22);
    return () => clearInterval(iv);
  }, [phase]);
  return (<div><StepBanner step="AI Module" desc="The Next Best Action card calls the LLM with persona signals + brand voice prompt. Copy generated at render time, governed by guardrails." color={T.purple} />
    <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 18, alignItems: "start" }}>
      <Dashboard persona="marcus" highlightAI />
      <div>
        {/* Step 1: Inputs */}
        <Glass style={{ padding: 14, marginBottom: 10, opacity: phase >= 0 ? 1 : .3 }} highlight={phase === 0} borderColor={T.teal + "40"}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ background: T.teal, color: "#fff", borderRadius: 5, padding: "2px 8px", fontSize: 13.5, fontFamily: "JBM", fontWeight: 700 }}>1</span><span style={{ fontSize: 14, fontFamily: "JBM", color: T.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>Inputs from Signal Layer</span></div>
          <div style={{ background: T.snow, padding: 10, borderRadius: 8, fontFamily: "JBM", fontSize: 13.5, color: T.slate, lineHeight: 1.6 }}>
            <span style={{ color: T.teal }}>persona_id</span>: <span style={{ color: T.ink }}>"marcus"</span><br />
            <span style={{ color: T.teal }}>goal</span>: <span style={{ color: T.ink }}>"build_credit_save_down_payment"</span><br />
            <span style={{ color: T.teal }}>signals</span>: <span style={{ color: T.ink }}>["searched_credit_card", "mobile_only", "biweekly_dd"]</span><br />
            <span style={{ color: T.teal }}>products_held</span>: <span style={{ color: T.ink }}>["momentum_checking"]</span><br />
            <span style={{ color: T.teal }}>tone</span>: <span style={{ color: T.ink }}>"energetic, peer, second-person"</span>
          </div>
        </Glass>
        {/* Step 2: Prompt */}
        <Glass style={{ padding: 14, marginBottom: 10, opacity: phase >= 1 ? 1 : .3, transition: "opacity .4s" }} highlight={phase === 1} borderColor={T.purple + "40"}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ background: T.purple, color: "#fff", borderRadius: 5, padding: "2px 8px", fontSize: 13.5, fontFamily: "JBM", fontWeight: 700 }}>2</span><span style={{ fontSize: 14, fontFamily: "JBM", color: T.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>Prompt to LLM</span></div>
          <div style={{ background: T.ink, color: "#e2e8f0", padding: 10, borderRadius: 8, fontFamily: "JBM", fontSize: 13.5, lineHeight: 1.6 }}>
            <span style={{ color: "#94a3b8" }}>// system</span><br />
            You are a Fifth Third brand voice writer.<br />
            Tone: <span style={{ color: T.teal }}>{`{tone}`}</span>. Banned: hype, "amazing", exclamation.<br />
            Output JSON: <span style={{ color: T.amber }}>{`{title (≤10w), sub (≤20w)}`}</span>.<br />
            <br />
            <span style={{ color: "#94a3b8" }}>// user</span><br />
            Persona: <span style={{ color: T.teal }}>{`{persona_id}`}</span>, signals: <span style={{ color: T.teal }}>{`{signals}`}</span><br />
            Generate Next Best Action for goal: <span style={{ color: T.teal }}>{`{goal}`}</span>.
          </div>
        </Glass>
        {/* Step 3: Response */}
        <Glass style={{ padding: 14, opacity: phase >= 2 ? 1 : .3, transition: "opacity .4s" }} highlight={phase >= 2} borderColor={T.purple + "40"}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ background: T.purple, color: "#fff", borderRadius: 5, padding: "2px 8px", fontSize: 13.5, fontFamily: "JBM", fontWeight: 700 }}>3</span><span style={{ fontSize: 14, fontFamily: "JBM", color: T.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>Generated Output</span>{phase >= 3 && <Tag color={T.green}>✓ Compliance OK</Tag>}</div>
          {phase === 2 && <div style={{ padding: 14, textAlign: "center", color: T.purple, animation: "blink2 .8s ease infinite", fontSize: 15, fontFamily: "JBM" }}>🧠 Generating…</div>}
          {phase >= 3 && <div style={{ background: T.purpleSoft, padding: 12, borderRadius: 8, border: `1px solid ${T.purple}30` }}>
            <div style={{ fontSize: 16.5, fontWeight: 700, color: T.ink, fontFamily: "Outfit", lineHeight: 1.35 }}>{typed}<span style={{ animation: "blink2 1s step-end infinite", color: T.purple }}>|</span></div>
            {typed.length === target.length && <div style={{ fontSize: 14, color: T.mid, marginTop: 6 }}>Auto-rule $200/mo. Start a Dobot goal in 60 seconds.</div>}
          </div>}
        </Glass>
      </div>
    </div>
    <Glass style={{ padding: "14px 18px", marginTop: 14, background: T.purpleSoft, borderColor: T.purple + "30" }}>
      <div style={{ fontSize: 16, color: T.slate, lineHeight: 1.6 }}><strong style={{ color: T.purple }}>Not a chatbot.</strong> Dynamic copy generation, governed by a brand voice prompt + banned-phrase list + JSON schema. One brief from a marketer, infinite on-brand variants for customers.</div>
    </Glass>
    <Btn onClick={onNext} color={T.purple} style={{ marginTop: 14 }}>How marketers stay in control →</Btn>
  </div>);
}

/* ═══ S9: BRAND CONTROL (marketer's view) ═══ */
function S9({ onNext, add }) {
  const [variant, setVariant] = useState(0);
  const variants = [
    PERSONAS.marcus.nba,
    PERSONAS.marcus.nbaAlt,
    { title: "Building credit and a down payment? Same playbook.", sub: "Card pays you 1.5%. Dobot rule routes $200/mo. We'll show the math." },
  ];
  const variantScores = [0.94, 0.91, 0.89];
  const regen = () => {
    const next = (variant + 1) % variants.length;
    setVariant(next);
    add({ type: "REGENERATE", detail: `Variant ${next + 1} generated · brand-voice score ${variantScores[next]}`, color: T.purple, domain: "ai", time: "Live" });
  };
  useEffect(() => { add({ type: "MARKETER_VIEW", detail: "One brief, multiple on-brand variants — marketer in control", color: T.purple, domain: "ai", time: "Live" }); }, []);

  return (<div><StepBanner step="Brand Control" desc="Marketers iterate. The system stays on brand. Every regeneration is governed." color={T.purple} />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start", marginBottom: 16 }}>

      {/* LEFT: The brief + the generated variant */}
      <div>
        <Glass style={{ padding: 18, marginBottom: 12, background: T.snow }}>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>The brief from marketing</div>
          <div style={{ background: "#fff", border: `1px solid ${T.mist}`, borderRadius: 8, padding: "12px 14px", fontSize: 15, color: T.ink, fontFamily: "Outfit", lineHeight: 1.5, fontStyle: "italic" }}>"Promote the savings auto-rule to credit-builders. Tone: peer, energetic. Anchor on the down-payment goal."</div>
          <div style={{ fontSize: 13, color: T.mid, marginTop: 10 }}>One brief, written once. Now click regenerate →</div>
        </Glass>

        <Glass style={{ padding: 18, borderColor: T.purple + "50" }} highlight>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontFamily: "JBM", color: T.purple, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>🧠 Generated · Variant {variant + 1} of {variants.length}</span>
            <button onClick={regen} style={{ background: T.purple, color: "#fff", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 13.5, fontFamily: "JBM", fontWeight: 700, cursor: "pointer", boxShadow: `0 3px 10px ${T.purple}40` }}>↻ Regenerate</button>
          </div>
          <div style={{ background: T.purpleSoft, border: `1px solid ${T.purple}25`, borderRadius: 10, padding: "16px 16px" }}>
            <div style={{ fontSize: 13, fontFamily: "JBM", color: T.purple, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Next Best Action</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "Outfit", lineHeight: 1.3, marginBottom: 6 }}>{variants[variant].title}</div>
            <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.5 }}>{variants[variant].sub}</div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <Tag color={T.green}>✓ On voice</Tag>
            <Tag color={T.green}>✓ Within length</Tag>
            <Tag color={T.green}>✓ No banned phrases</Tag>
            <Tag color={T.purple}>Brand-voice score: {variantScores[variant]}</Tag>
          </div>
        </Glass>
      </div>

      {/* RIGHT: The guardrails — what's enforced */}
      <Glass style={{ padding: 20 }} highlight borderColor={T.purple + "40"}>
        <div style={{ fontSize: 13, fontFamily: "JBM", color: T.purple, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>The guardrails (always on)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Brand voice prompt", desc: "Tone, banned phrases, output schema baked into every call. Marketers can't bypass it." },
            { label: "Length & format checks", desc: "Title ≤ 10 words. Sub ≤ 20 words. JSON schema enforced." },
            { label: "Banned phrase list", desc: '"Amazing", "you deserve", "limited time" — auto-rejected.' },
            { label: "Brand-voice scoring", desc: "Each output scored 0–1. Sub-0.85 outputs flagged for human review." },
          ].map((g, i) => (<div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: i > 0 ? `1px solid ${T.ghost}` : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: T.purpleSoft, color: T.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "JBM", flexShrink: 0, border: `1.5px solid ${T.purple}25` }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginBottom: 2 }}>{g.label}</div>
              <div style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.5 }}>{g.desc}</div>
            </div>
          </div>))}
        </div>
      </Glass>
    </div>

    <Glass style={{ padding: "16px 22px", background: T.purpleSoft, borderColor: T.purple + "30" }}>
      <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.6 }}><strong style={{ color: T.purple }}>What this kills:</strong> the 50-variant copy deck, the brand-team review queue, the "wait two weeks for a banner update" cycle. <strong style={{ color: T.purple }}>What it preserves:</strong> the brand. Every variant. Every time.</div>
    </Glass>

    <Btn onClick={onNext} color={T.purple} style={{ marginTop: 16 }}>Now show how compliance signs off →</Btn>
  </div>);
}

/* ═══ S10: COMPLIANCE CONTROL (auditor's view) ═══ */
function S10({ onNext, add }) {
  useEffect(() => {
    add({ type: "AUDIT_OPEN", detail: "Compliance officer view: full lineage for every AI output", color: T.amber, domain: "audit", time: "Live" });
    setTimeout(() => add({ type: "AUDIT_QUERY", detail: "Last 24h · 47,392 AI strings · 100% logged · 0 manual interventions", color: T.amber, domain: "audit", time: "+0.2s" }), 500);
  }, []);

  return (<div><StepBanner step="Compliance Control" desc="Every AI-generated string is logged with full lineage. Auditable, reproducible, defensible." color={T.amber} />

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "start" }}>

      {/* LEFT: The audit log entry */}
      <Glass style={{ padding: 20, borderColor: T.amber + "40" }} highlight>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${T.mist}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DBadge domain="audit" />
            <span style={{ fontSize: 13, fontFamily: "JBM", color: T.amber, fontWeight: 700 }}>ENTRY #1241 · MARCUS_NBA_GEN</span>
          </div>
          <span style={{ fontSize: 12.5, fontFamily: "JBM", color: T.green, fontWeight: 700, padding: "3px 10px", background: T.greenSoft, borderRadius: 12 }}>✓ AUTO-APPROVED · 1 ADVISORY</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {/* Inputs column */}
          <div>
            <div style={{ fontSize: 12, fontFamily: "JBM", color: T.teal, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Inputs</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Timestamp", "2026-05-06 14:32:18 UTC"],
                ["Persona ID", "marcus"],
                ["Segment", "ns_consumer_credit_builder"],
                ["Signals", "searched_credit_card, mobile_only, biweekly_dd"],
                ["Prompt hash", "sha256:9f3a…b21c"],
                ["Model", "enterprise-llm-v1"],
              ].map(([k, v]) => (<div key={k} style={{ fontSize: 12.5, fontFamily: "JBM" }}>
                <div style={{ color: T.mid, marginBottom: 1 }}>{k}</div>
                <div style={{ color: T.ink, fontWeight: 600 }}>{v}</div>
              </div>))}
            </div>
          </div>

          {/* Output + checks column */}
          <div>
            <div style={{ fontSize: 12, fontFamily: "JBM", color: T.purple, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Output & checks</div>
            <div style={{ background: T.snow, border: `1px solid ${T.mist}`, borderRadius: 7, padding: "8px 10px", fontSize: 12.5, color: T.ink, fontFamily: "JBM", marginBottom: 8, lineHeight: 1.4 }}>"Open a high-yield savings goal — your future down payment thanks you."</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                ["Length", "12 words", T.amber, "⚠", "approaching 15w cap"],
                ["Banned phrases", "Clean", T.green, "✓", null],
                ["Brand voice score", "0.94", T.green, "✓", null],
                ["PII leakage", "None detected", T.green, "✓", null],
                ["Reading level", "Grade 7", T.green, "✓", null],
              ].map(([k, v, c, ic, note]) => (<div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 12.5, padding: "3px 0", fontFamily: "JBM", gap: 8 }}>
                <span style={{ color: T.mid, flexShrink: 0 }}>{k}</span>
                <span style={{ color: c, fontWeight: 700, textAlign: "right" }}>{ic} {v}{note && <span style={{ color: T.mid, fontWeight: 400, fontSize: 11, marginLeft: 6 }}>· {note}</span>}</span>
              </div>))}
            </div>
          </div>
        </div>

        <div style={{ padding: "10px 12px", background: T.amberSoft, borderRadius: 8, fontSize: 13, color: T.slate, lineHeight: 1.5 }}><strong style={{ color: T.amber }}>Reproducible.</strong> Given the same prompt hash and inputs, this exact output can be regenerated and verified. Full chain of custody from signal to screen.</div>
      </Glass>

      {/* RIGHT: What compliance gets */}
      <div>
        <Glass style={{ padding: 18, marginBottom: 12 }} highlight borderColor={T.amber + "40"}>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.amber, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The compliance posture</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["Coverage", "100% of AI outputs", "Every string. No sampling, no gaps."],
              ["Retention", "7 years", "Meets CFPB / OCC retention requirements."],
              ["Reviewability", "Searchable by persona, signal, model, score", "Pull every variant a customer saw in 90 days."],
              ["Reproducibility", "Deterministic with prompt hash", "Regenerate any historical output for verification."],
            ].map(([k, v, desc]) => (<div key={k}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{k}</span>
                <span style={{ fontSize: 13.5, color: T.amber, fontWeight: 700, fontFamily: "JBM" }}>{v}</span>
              </div>
              <div style={{ fontSize: 13, color: T.slate, lineHeight: 1.5 }}>{desc}</div>
            </div>))}
          </div>
        </Glass>

        <Glass style={{ padding: 16, background: T.snow }}>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>The CXO sentence</div>
          <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.55, fontStyle: "italic" }}>"For every customer-facing AI string we've ever shown, I can tell you what we said, why we said it, and prove it stayed on brand."</div>
        </Glass>
      </div>
    </div>

    <Btn onClick={onNext} color={T.amber} style={{ marginTop: 16 }}>What's this worth to the business? →</Btn>
  </div>);
}

/* ═══ S11: BUSINESS IMPACT ═══ */
function S11({ onNext, add }) {
  useEffect(() => {
    add({ type: "BUSINESS_CASE", detail: "ROI math · grounded in 53rd's existing scale", color: T.green, domain: "rules", time: "Summary" });
  }, []);

  return (<div><StepBanner step="Business Impact" desc="What this is worth, in numbers a CFO can defend on a Tuesday." color={T.green} />

    {/* HERO METRIC: One number to anchor the whole case */}
    <Glass style={{ padding: 0, marginBottom: 18, overflow: "hidden", borderColor: T.green + "40" }} highlight>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", alignItems: "stretch" }}>
        <div style={{ padding: "30px 34px", background: `linear-gradient(135deg, ${T.green}, #0a6b5e)`, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: "rgba(255,255,255,.82)", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>The headline</div>
          <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "Outfit", lineHeight: 1, marginBottom: 10, letterSpacing: -1 }}>$25–45M</div>
          <div style={{ fontSize: 19, fontWeight: 600, fontFamily: "Outfit", marginBottom: 14, lineHeight: 1.3 }}>incremental annual revenue from personalized NBA modules alone</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.88)", lineHeight: 1.55 }}>Math built bottoms-up from 53rd's actual MAU and a conservative +18% lift midpoint. Every input is benchmarked or publicly disclosed.</div>
        </div>

        <div style={{ padding: "24px 28px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 12.5, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>The math, line by line</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { k: "Mobile MAU", v: "1.2M", src: "53rd public disclosure", op: "" },
              { k: "Sessions / customer / month", v: "~12", src: "banking app benchmark", op: "×" },
              { k: "NBA-bearing sessions (share)", v: "~80%", src: "logged-in dashboard sessions", op: "×" },
              { k: "Annual personalizable impressions", v: "~140M", src: "MAU × sessions × share × 12", op: "=", emph: true },
              { k: "Current NBA → action conversion", v: "~1.8%", src: "industry benchmark, financial NBA", op: "×" },
              { k: "Baseline annual actions", v: "~2.5M", src: "before personalization", op: "=", emph: true },
              { k: "Lift from personalization", v: "+18%", src: "McKinsey 2024 (range: +15–25%)", op: "×" },
              { k: "Incremental actions / yr", v: "~450K", src: "the new conversions we capture", op: "=", emph: true },
              { k: "Avg revenue / completed action", v: "$60–110", src: "blended across 53rd product mix", op: "×" },
            ].map((row, i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr auto", gap: 8, alignItems: "baseline", fontSize: 13, padding: "5px 0", borderTop: i > 0 ? `1px solid ${T.ghost}` : "none" }}>
              <div style={{ color: row.emph ? T.green : T.pale, fontFamily: "JBM", fontWeight: 700, fontSize: 12.5 }}>{row.op}</div>
              <div>
                <div style={{ color: row.emph ? T.green : T.ink, fontWeight: row.emph ? 700 : 600, marginBottom: 1, fontSize: row.emph ? 13.5 : 13 }}>{row.k}</div>
                <div style={{ color: T.pale, fontSize: 11.5 }}>{row.src}</div>
              </div>
              <div style={{ color: row.emph ? T.green : T.slate, fontWeight: 700, fontFamily: "JBM", fontSize: row.emph ? 14.5 : 13 }}>{row.v}</div>
            </div>))}
            <div style={{ display: "grid", gridTemplateColumns: "16px 1fr auto", gap: 8, alignItems: "baseline", marginTop: 10, padding: "10px 0 0", borderTop: `2px solid ${T.green}` }}>
              <div style={{ color: T.green, fontFamily: "JBM", fontWeight: 700, fontSize: 13 }}>=</div>
              <div style={{ color: T.green, fontWeight: 700, fontSize: 14, fontFamily: "Outfit" }}>Incremental annual revenue</div>
              <div style={{ color: T.green, fontWeight: 700, fontFamily: "JBM", fontSize: 16 }}>$25–45M</div>
            </div>
          </div>
        </div>
      </div>
    </Glass>

    {/* FINNEXUS ACCELERATOR — the bridge from "what" to "how we deliver it" */}
    <Glass style={{ padding: 0, marginBottom: 18, overflow: "hidden", borderColor: T.purple + "30" }} highlight>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "stretch" }}>
        {/* Left: FinNexus brand panel */}
        <div style={{ padding: "24px 26px", background: `linear-gradient(135deg, ${T.purple}, #3d1268)`, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 12, fontFamily: "JBM", color: "rgba(255,255,255,.75)", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>How we deliver it</div>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "JBM", letterSpacing: 0.5, marginBottom: 8 }}>FinNexus</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.9)", lineHeight: 1.55, marginBottom: 14 }}>Coforge's accelerator for real-time personalization in banking and wealth — pre-built schemas, connectors, and AI propensity models on AEP.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["Pre-built core banking + CRM connectors", "Pre-modeled wealth schemas & micro-segments", "AI propensity + churn models, day one", "Reusable journey playbooks"].map(t => (<div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,.92)" }}>
              <span style={{ color: "#fff", fontWeight: 700 }}>✓</span>
              <span>{t}</span>
            </div>))}
          </div>
        </div>

        {/* Right: FinNexus's outcome benchmarks */}
        <div style={{ padding: "24px 28px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 12.5, fontFamily: "JBM", color: T.mid, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>FinNexus accelerator outcomes</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              { v: "+2–3%", l: "AUM growth", c: T.green },
              { v: "+15–20%", l: "Digital conversion lift", c: T.blue },
              { v: "−25%", l: "Cost to serve", c: T.purple },
              { v: "8–10 wks", l: "First use case live", c: T.amber },
            ].map(m => (<div key={m.l} style={{ background: T.snow, border: `1px solid ${m.c}25`, borderLeft: `3px solid ${m.c}`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: m.c, fontFamily: "Outfit", lineHeight: 1.1, letterSpacing: -0.5 }}>{m.v}</div>
              <div style={{ fontSize: 12.5, color: T.mid, marginTop: 3, fontWeight: 600 }}>{m.l}</div>
            </div>))}
          </div>
          <div style={{ fontSize: 13, color: T.slate, lineHeight: 1.55, padding: "10px 14px", background: T.purpleSoft, borderRadius: 8, borderLeft: `3px solid ${T.purple}` }}>The 53rd personalization story you just walked through is a <strong style={{ color: T.purple }}>direct instantiation</strong> of what FinNexus delivers. The components are already built — we're configuring, not constructing.</div>
        </div>
      </div>
    </Glass>

    {/* THREE SUPPORTING PILLARS — different shape than the hero, no big-numeral repetition */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>

      {/* Pillar 1: Revenue */}
      <Glass style={{ padding: 20 }} highlight borderColor={T.blue + "30"}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: T.blueSoft, color: T.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "JBM", border: `1.5px solid ${T.blue}25` }}>01</div>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.blue, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Revenue</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginBottom: 10, lineHeight: 1.35 }}>Bigger wallet share from existing customers</div>
        <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.55, marginBottom: 14 }}>Card pre-quals to credit-builders. SBLOC offers to growth-mode owners. Estate reviews to wealth clients. Each customer sees the next product they're actually ready for.</div>
        <div style={{ borderTop: `1px solid ${T.ghost}`, paddingTop: 10, fontSize: 13, color: T.blue, fontWeight: 600, fontFamily: "JBM" }}>↑ Cross-sell · Deepening</div>
      </Glass>

      {/* Pillar 2: Cost */}
      <Glass style={{ padding: 20 }} highlight borderColor={T.purple + "30"}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: T.purpleSoft, color: T.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "JBM", border: `1.5px solid ${T.purple}25` }}>02</div>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.purple, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Cost & speed</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginBottom: 10, lineHeight: 1.35 }}>Campaign cycle: weeks → minutes</div>
        <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.55, marginBottom: 14 }}>One brief produces variants for every persona automatically. Brand and compliance review is built into the system, not bolted on after the fact.</div>
        <div style={{ borderTop: `1px solid ${T.ghost}`, paddingTop: 10, fontSize: 13, color: T.purple, fontWeight: 600, fontFamily: "JBM" }}>↓ Time-to-market · Agency spend</div>
      </Glass>

      {/* Pillar 3: Risk */}
      <Glass style={{ padding: 20 }} highlight borderColor={T.amber + "30"}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: T.amberSoft, color: T.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "JBM", border: `1.5px solid ${T.amber}25` }}>03</div>
          <div style={{ fontSize: 13, fontFamily: "JBM", color: T.amber, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Risk</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: "Outfit", marginBottom: 10, lineHeight: 1.35 }}>Same compliance posture. Better evidence trail.</div>
        <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.55, marginBottom: 14 }}>Every AI string logged with full lineage. Brand-voice scoring on every output. Reviewable, reproducible, and ready for the next OCC examination.</div>
        <div style={{ borderTop: `1px solid ${T.ghost}`, paddingTop: 10, fontSize: 13, color: T.amber, fontWeight: 600, fontFamily: "JBM" }}>↓ Brand drift · Audit risk</div>
      </Glass>
    </div>

    {/* THE REALITY CHECK BAR */}
    <Glass style={{ padding: "18px 24px", marginBottom: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center" }}>
        <div style={{ fontSize: 13, fontFamily: "JBM", color: T.green, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap" }}>What this isn't</div>
        <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.6 }}>Not a re-platform. Not a new vendor stack. Not a multi-year transformation. The signals (AEM, Adobe, CDP), the components, and the brand system already exist at 53rd. We're connecting wires that are already in the wall.</div>
      </div>
    </Glass>

    {/* THE CXO SENTENCE */}
    <Glass style={{ padding: 28, textAlign: "center", background: `linear-gradient(135deg, ${T.ink}, #1a2942)`, borderColor: T.ink }}>
      <div style={{ fontSize: 13, fontFamily: "JBM", color: "rgba(255,255,255,.7)", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>The one-sentence pitch</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "Outfit", lineHeight: 1.35, maxWidth: 820, margin: "0 auto" }}>Eight-figure revenue upside, governed by the same compliance posture you already trust — built on the data and components 53rd already owns.</div>
    </Glass>

    <Btn onClick={onNext} style={{ marginTop: 16 }}>Wrap up →</Btn>
  </div>);
}

/* ═══ S12: SUMMARY ═══ */
function S12({ add }) {
  useEffect(() => { add({ type: "COMPLETE", detail: "3 personas · 1 system · ∞ on-brand variants", color: T.green, domain: "rules", time: "Done" }); }, []);
  return (<div><StepBanner step="Summary" desc="Same components. Same brand. Three customers. Three completely different experiences." color={T.green} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 6 }}>
      {[
        { l: "Personas", v: "3", c: T.blue, size: 30 },
        { l: "Full rollout", v: "16–18 wks", c: T.blueAccent, size: 22, asterisk: true },
        { l: "Upside / yr", v: "$25–45M", c: T.green, size: 24 },
        { l: "Variants", v: "∞", c: T.purple, size: 30 },
      ].map(t => (<Glass key={t.l} style={{ padding: 14, textAlign: "center" }}><div style={{ fontSize: 13, color: T.mid, fontFamily: "JBM", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>{t.l}</div><div style={{ fontSize: t.size, fontWeight: 700, color: t.c, marginTop: 4, fontFamily: "Outfit", letterSpacing: t.size < 30 ? -0.5 : 0 }}>{t.v}{t.asterisk && <span style={{ fontSize: 16, verticalAlign: "super", marginLeft: 2 }}>*</span>}</div></Glass>))}
    </div>
    <div style={{ fontSize: 12, color: T.mid, fontStyle: "italic", marginBottom: 14, paddingLeft: 4 }}>* Indicative range — final timeline depends on discovery findings (system access, data readiness, brand-voice prompt tuning, compliance review cadence).</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
      {Object.values(PERSONAS).map(p => (<div key={p.id} style={{ height: 480, overflow: "hidden", borderRadius: 12, position: "relative", display: "flex", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.62)", transformOrigin: "top center" }}><Dashboard persona={p.id} /></div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${T.snow} 100%)`, pointerEvents: "none" }} />
      </div>))}
    </div>
    <Glass style={{ padding: 16, marginBottom: 14 }}>
      <div style={{ fontFamily: "JBM", fontSize: 13.5, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12, fontWeight: 700, color: T.ink }}>What the room saw</div>
      {[
        { ev: "Generic dashboard — same for 1.2M customers", d: "bank" },
        { ev: "3 personas defined from real 53rd segments", d: "rules" },
        { ev: "Existing AEM + Adobe + CDP signals routed in", d: "signals" },
        { ev: "Marcus's dashboard — credit-builder, mobile-native tone", d: "rules" },
        { ev: "Sarah's dashboard — pragmatic business-peer tone", d: "rules" },
        { ev: "David's dashboard — considered advisory tone", d: "rules" },
        { ev: "LLM generates NBA copy at render time", d: "ai" },
        { ev: "Brand control — marketers iterate, guardrails hold", d: "ai" },
        { ev: "Compliance control — every string logged and scored", d: "audit" },
        { ev: "Business case — $25–45M upside, defensible math", d: "rules" },
      ].map((j, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center", animation: "slideUp .3s cubic-bezier(.16,1,.3,1) both", animationDelay: `${i * .05}s` }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: DOMAIN[j.d].color, flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: 15, color: T.slate }}>{j.ev}</div>
        <span style={{ fontSize: 12.5, fontFamily: "JBM", fontWeight: 600, color: DOMAIN[j.d].color, background: DOMAIN[j.d].bg, padding: "1px 5px", borderRadius: 5 }}>{DOMAIN[j.d].icon} {DOMAIN[j.d].label}</span>
      </div>))}
    </Glass>
  </div>);
}

/* ═══ MAIN ═══ */
export default function App() {
  const [step, setStep] = useState(0);
  const [events, setEvents] = useState([]);
  const add = (e) => setEvents(p => [...p, e]);
  const next = () => setStep(p => Math.min(p + 1, STEPS.length - 1));
  const pages = [
    <S1 onNext={next} add={add} />,
    <S2 onNext={next} add={add} />,
    <S3 onNext={next} add={add} />,
    <S4 onNext={next} add={add} />,
    <PersonaStep personaId="marcus" onNext={next} add={add} />,
    <PersonaStep personaId="sarah" onNext={next} add={add} />,
    <PersonaStep personaId="david" onNext={next} add={add} isLast />,
    <S8 onNext={next} add={add} />,
    <S9 onNext={next} add={add} />,
    <S10 onNext={next} add={add} />,
    <S11 onNext={next} add={add} />,
    <S12 add={add} />,
  ];
  return (<div style={{ fontFamily: "Outfit, sans-serif", background: T.snow, minHeight: "100vh", color: T.ink, position: "relative" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
@keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink2{0%,100%{opacity:1}50%{opacity:.3}}
*{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:${T.faint};border-radius:4px}
button:hover{opacity:.88;transform:translateY(-1px)}button:active{transform:translateY(0)}`}</style>
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 20% 10%, ${T.blueGlow}, transparent 70%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 90% 90%, ${T.purpleGlow}, transparent 70%)` }} />
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: .03 }}><defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke={T.ink} strokeWidth=".5" /></pattern></defs><rect width="100%" height="100%" fill="url(#g)" /></svg>
    </div>
    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: `1px solid ${T.mist}`, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)" }}>
      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Outfit" }}><span style={{ color: T.blue }}>5/3</span> <span style={{ color: T.ink }}>FIFTH THIRD</span> <span style={{ color: T.pale, fontSize: 15, fontWeight: 400 }}>× Personalization, powered by</span> <span style={{ color: T.purple, fontSize: 15, fontWeight: 700, fontFamily: "JBM", letterSpacing: 0.5 }}>FinNexus</span></div>
      <div style={{ display: "flex", gap: 5 }}>
        {step > 0 && <button onClick={() => setStep(p => p - 1)} style={{ background: "transparent", color: T.mid, border: `1px solid ${T.mist}`, padding: "4px 12px", borderRadius: 7, cursor: "pointer", fontSize: 15, fontFamily: "Outfit" }}>←</button>}
        <button onClick={() => { setStep(0); setEvents([]); }} style={{ background: "transparent", color: T.blue, border: `1px solid ${T.blue}30`, padding: "4px 12px", borderRadius: 7, cursor: "pointer", fontSize: 15, fontFamily: "Outfit" }}>↺ Reset</button>
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 0, padding: "8px 18px", overflowX: "auto", background: "rgba(255,255,255,.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.mist}` }}>
      {STEPS.map((s, i) => (<button key={i} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 5, background: "transparent", border: "none", cursor: "pointer", padding: "5px 9px", fontFamily: "Outfit", fontSize: 14.5, color: i === step ? T.blue : i < step ? T.ink : T.pale, fontWeight: i === step ? 700 : 400, whiteSpace: "nowrap", borderBottom: i === step ? `2px solid ${T.blue}` : "2px solid transparent" }}><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 17, height: 17, borderRadius: "50%", fontSize: 13, fontFamily: "JBM", fontWeight: 700, background: i === step ? T.blue : i < step ? T.ink : T.mist, color: i <= step ? "#fff" : T.pale, boxShadow: i === step ? `0 0 10px ${T.blueGlow}` : "none" }}>{s.n}</span>{s.label}</button>))}
    </div>
    <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 230px", gap: 10, padding: "12px 18px 40px", alignItems: "start" }}>
      <div key={step} style={{ animation: "slideUp .45s cubic-bezier(.16,1,.3,1)" }}>{pages[step]}</div>
      <EventPanel events={events} />
    </div>
  </div>);
}
