"use client";

const inputStyle = {
  width: "100%", padding: "0.8rem 1rem",
  border: "1px solid #E5E7EB", borderRadius: 10,
  fontFamily: "Inter, sans-serif", fontSize: "0.9rem",
  color: "#111827", outline: "none", background: "white",
};

const labelStyle = {
  display: "block" as const, fontSize: "0.82rem",
  fontWeight: 600, color: "#374151", marginBottom: "0.4rem",
};

export function Field({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="">Selectionner...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
