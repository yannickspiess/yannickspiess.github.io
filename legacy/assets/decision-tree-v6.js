import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
const RESEARCH = {
  kahneman: { title: "Diminishing Marginal Utility of Income", source: "Kahneman & Deaton (2010), Killingsworth (2023)", insight: "Emotional wellbeing rises with income but flattens dramatically once basic needs are met. Beyond a certain point, more money buys almost no additional happiness \u2014 but we systematically overestimate how much it will." },
  sdt: { title: "Self-Determination Theory", source: "Deci & Ryan (2000)", insight: "Autonomy, competence, and relatedness are the three core psychological needs. Activities satisfying all three produce wellbeing that money cannot replicate. Work that undermines these needs actively damages you." },
  qaly: { title: "Quality-Adjusted Life Years", source: "NICE/IQWiG health economics", insight: "Health economists value a year of life at \u20AC50,000\u2013\u20AC100,000. A single waking hour is worth \u20AC8.50\u2013\u20AC17.00 \u2014 but a high-wellbeing hour may be worth 1.3\u20131.5\xD7 a neutral one. Low-wellbeing hours are discounted." },
  burnout: { title: "Burnout & Recovery", source: "Aron (1996), Maslach & Leiter (2016)", insight: "Burnout isn't just tiredness \u2014 it's a compounding debt. Each hour worked while depleted costs 2\u20134 hours of future capacity. Highly sensitive persons need ~35% more recovery time, and ignoring this accelerates the spiral." },
  flow: { title: "Flow & Creative Compounding", source: "Cs\xEDkszentmih\xE1lyi (1990), Newport (2016)", insight: "Meaningful work in a flow state compounds: skills, taste, reputation, and opportunity grow exponentially. But flow requires autonomy and intrinsic motivation \u2014 coerced or misaligned work rarely produces it." },
  hedonic: { title: "Hedonic Adaptation", source: "Frederick & Loewenstein (1999)", insight: "We adapt to income gains within 3\u20136 months \u2014 the new salary feels normal. But we adapt much more slowly to gains in autonomy, meaning, and relationships. Choosing fulfillment over marginal income has lasting effects." }
};
const INVESTED_WEIGHT = 0.35;
function calcFinancialUrgency(runwayMonths) {
  if (runwayMonths > 48) return 0.05;
  if (runwayMonths > 36) return 0.1;
  if (runwayMonths > 24) return 0.18;
  if (runwayMonths > 12) return 0.35;
  if (runwayMonths > 6) return 0.6;
  return 0.85;
}
function calcRunway(liquid, invested, burn) {
  return Math.round((liquid + invested * INVESTED_WEIGHT) / Math.max(burn, 100));
}
function getBaseline(monthlyBurn, financialUrgency, recurringIncome) {
  const savingsFloor = monthlyBurn * (1 - financialUrgency);
  return Math.max(recurringIncome || 0, savingsFloor);
}
function marginalUtilityOfEuro(baseIncome, additionalEuros) {
  const floor = Math.max(baseIncome, 100);
  return Math.log(floor + additionalEuros) - Math.log(floor);
}
function qalyHourValue(wm = 1) {
  return 65e3 / 5840 * wm;
}
function burnoutProximity(energy, rest, hsp = false) {
  return Math.min(1, (1 - (energy * 0.6 + rest * 0.4) / 10) * (hsp ? 1.35 : 1));
}
function compoundingValue(activityType, lifeStage, buildingNew) {
  const base = { creative: 0.7, learning: 0.5, rest: 0.3, paid_aligned: 0.4, paid_misaligned: 0.05, current_job_good: 0.35, current_job_bad: 0.05 };
  const stageBonus = { considering: 1.15, in_transition: 1.35, established: 1, employed: 0.9 };
  return (base[activityType] || 0.3) * (stageBonus[lifeStage] || 1) * (buildingNew ? 1.3 : 1);
}
function sdtScore(a, c, r) {
  return (a * 0.45 + c * 0.35 + r * 0.2) / 10;
}
const ACTIVITY_PRESETS = {
  rest: { label: "Rest & Restoration", sublabel: "Whatever recharges you", icon: "\u2601", type: "rest", autonomy: 10, competence: 6, relatedness: 5, intrinsicDefault: 8, missionAligned: false, color: "#9aaa8a" },
  creative: { label: "Meaningful Projects", sublabel: "Work that matters to you", icon: "\u25C8", type: "creative", autonomy: 10, competence: 9, relatedness: 4, intrinsicDefault: 9, missionAligned: false, color: "#7a9aaa" },
  learning: { label: "Learning & Growth", sublabel: "Skills, reading, exploration", icon: "\u25B3", type: "learning", autonomy: 8, competence: 9, relatedness: 3, intrinsicDefault: 7, missionAligned: false, color: "#aa9a7a" }
};
const PAID_PROFILES = {
  current_job_good: { label: "Your Job (fulfilling)", type: "current_job_good", autonomy: 5, competence: 7, relatedness: 6, intrinsicDefault: 6, missionAligned: true, color: "#5a8a5a", dash: false, icon: "\u25C8" },
  current_job_bad: { label: "Your Job (draining)", type: "current_job_bad", autonomy: 2, competence: 4, relatedness: 4, intrinsicDefault: 2, missionAligned: false, color: "#c47a5a", dash: false, icon: "\u25A1" },
  paid_aligned: { label: "New Work (aligned)", type: "paid_aligned", autonomy: 6, competence: 8, relatedness: 6, intrinsicDefault: 6, missionAligned: true, color: "#5a7a8a", dash: true, icon: "\u25CF" },
  paid_misaligned: { label: "New Work (just for money)", type: "paid_misaligned", autonomy: 3, competence: 5, relatedness: 3, intrinsicDefault: 3, missionAligned: false, color: "#b07a5a", dash: true, icon: "\u25A1" }
};
function calcEWV(params) {
  const { activityType, dayRate = 0, energyLevel, restQuality, intrinsicMotivation, autonomyScore, competenceScore, relatednessScore, runwayMonths, monthlyBurn, baselineIncome, lifeStage, buildingNew, missionAligned, hsp } = params;
  const financialUrgency = calcFinancialUrgency(runwayMonths);
  const burnout = burnoutProximity(energyLevel, restQuality, hsp);
  const isPaid = activityType.startsWith("paid") || activityType.startsWith("current_job");
  const hourlyRate = isPaid ? dayRate / 5 : 0;
  const margUtility = hourlyRate > 0 ? marginalUtilityOfEuro(baselineIncome, hourlyRate) : 0;
  const financialValue = margUtility * financialUrgency * 100;
  const wellbeingMult = activityType === "rest" ? 1.4 : activityType === "creative" ? 1.3 : activityType === "learning" ? 1.15 : missionAligned ? 1.1 : 0.7;
  const intrinsicValue = qalyHourValue(wellbeingMult) * (intrinsicMotivation / 10) * 0.8;
  const sdtVal = sdtScore(autonomyScore, competenceScore, relatednessScore) * 12;
  const compound = compoundingValue(activityType, lifeStage, buildingNew) * 8;
  const burnoutCost = burnout > 0.6 && isPaid && !missionAligned ? burnout * 15 : burnout > 0.4 && isPaid ? burnout * 6 : 0;
  const restBonus = activityType === "rest" && burnout > 0.3 ? burnout * 12 : 0;
  return {
    total: Math.round((financialValue + intrinsicValue + sdtVal + compound - burnoutCost + restBonus) * 100) / 100,
    meta: { financialUrgency, burnout }
  };
}
function mp(o, b) {
  return { ...b, ...o };
}
function Slider({ label, value, onChange, min = 0, max = 10, step = 1, prefix = "", suffix = "", hint }) {
  const pct = (value - min) / (max - min) * 100;
  const fmt = (v) => {
    if (prefix === "\u20AC" && v >= 1e3) return `\u20AC${(v / 1e3).toFixed(v % 1e3 === 0 ? 0 : 1)}k`;
    return `${prefix}${v}${suffix}`;
  };
  return /* @__PURE__ */ jsxs("div", { style: { marginBottom: 18 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 13, color: "#8a8a7a" }, children: label }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 13, fontFamily: "var(--mono)", color: "#3d3d35" }, children: fmt(value) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min,
          max,
          step,
          value,
          onChange: (e) => onChange(Number(e.target.value)),
          style: { width: "100%", height: 6, appearance: "none", background: "transparent", cursor: "pointer", position: "relative", zIndex: 2 }
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "50%", left: 0, right: 0, height: 3, background: "#e8e6df", borderRadius: 2, transform: "translateY(-50%)", zIndex: 0 }, children: /* @__PURE__ */ jsx("div", { style: { width: `${pct}%`, height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #7a8a6a, #5a6a4a)", transition: "width 0.15s" } }) })
    ] }),
    hint && /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#b0ae9e", marginTop: 4, lineHeight: 1.4 }, children: hint })
  ] });
}
function InfoTip({ text }) {
  const [show, setShow] = useState(false);
  return /* @__PURE__ */ jsxs("span", { style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setShow(!show), style: { width: 15, height: 15, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: show ? "rgba(255,255,255,0.15)" : "transparent", color: "rgba(255,255,255,0.5)", fontSize: 9, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, fontFamily: "var(--mono)", lineHeight: 1, verticalAlign: "middle", marginLeft: 4 }, children: "?" }),
    show && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 240, padding: "10px 14px", background: "#2a2a24", color: "#e8e6df", fontSize: 11, lineHeight: 1.6, borderRadius: 8, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }, children: [
      text,
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "#2a2a24" } })
    ] })
  ] });
}
function InfoTipDark({ text }) {
  const [show, setShow] = useState(false);
  return /* @__PURE__ */ jsxs("span", { style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setShow(!show), style: { width: 15, height: 15, borderRadius: "50%", border: "1px solid #d4d0c4", background: show ? "#f0efe8" : "transparent", color: "#aaa89a", fontSize: 9, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, fontFamily: "var(--mono)", lineHeight: 1, verticalAlign: "middle", marginLeft: 4 }, children: "?" }),
    show && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 260, padding: "10px 14px", background: "#3d3d35", color: "#e8e6df", fontSize: 11, lineHeight: 1.6, borderRadius: 8, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }, children: [
      text,
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "#3d3d35" } })
    ] })
  ] });
}
function HelpToggle({ label, checked, onChange, helpText }) {
  const [show, setShow] = useState(false);
  return /* @__PURE__ */ jsxs("div", { style: { marginBottom: show ? 12 : 4 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked, onChange: (e) => onChange(e.target.checked), style: { accentColor: "#5a6a4a" } }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 13, color: "#8a8a7a", cursor: "pointer" }, onClick: () => onChange(!checked), children: label }),
      /* @__PURE__ */ jsx("button", { onClick: (e) => {
        e.stopPropagation();
        setShow(!show);
      }, style: { width: 18, height: 18, borderRadius: "50%", border: "1px solid #d4d0c4", background: show ? "#f0efe8" : "transparent", color: "#aaa89a", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, fontFamily: "var(--mono)", lineHeight: 1 }, children: "?" })
    ] }),
    show && /* @__PURE__ */ jsx("div", { style: { marginTop: 8, marginLeft: 26, padding: "10px 14px", fontSize: 12, color: "#6a6a5a", lineHeight: 1.6, background: "#f7f6f0", borderRadius: 6, border: "1px solid #e8e6df" }, children: helpText })
  ] });
}
function OptionCard({ selected, onClick, icon, label, sublabel }) {
  return /* @__PURE__ */ jsxs("div", { onClick, style: { padding: "14px 18px", borderRadius: 10, border: `2px solid ${selected ? "#5a6a4a" : "#e8e6df"}`, background: selected ? "#f7f9f4" : "#fff", cursor: "pointer", transition: "all 0.2s", flex: 1, minWidth: 140 }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 18, marginBottom: 6 }, children: icon }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 500, color: "#3d3d35" }, children: label }),
    sublabel && /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#8a8a7a", marginTop: 2, lineHeight: 1.4 }, children: sublabel })
  ] });
}
function DecisionNode({ question, depth = 0, children, answer }) {
  const [expanded, setExpanded] = useState(depth < 1);
  return /* @__PURE__ */ jsxs("div", { style: { marginLeft: depth * 20, marginBottom: 8 }, children: [
    /* @__PURE__ */ jsxs("div", { onClick: () => setExpanded(!expanded), style: { padding: "10px 14px", borderRadius: 8, cursor: "pointer", background: depth === 0 ? "#3d3d35" : depth === 1 ? "#f7f6f0" : "#fafaf6", color: depth === 0 ? "#f7f6f0" : "#3d3d35", border: depth > 0 ? "1px solid #e8e6df" : "none", fontSize: depth === 0 ? 14 : 13, fontWeight: depth < 2 ? 600 : 400, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx("span", { children: question }),
      (children || answer) && /* @__PURE__ */ jsx("span", { style: { fontSize: 10, opacity: 0.6, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }, children: "\u25BC" })
    ] }),
    answer && expanded && /* @__PURE__ */ jsx("div", { style: { marginTop: 4, marginLeft: 14, padding: "8px 14px", fontSize: 12, color: "#5a6a4a", lineHeight: 1.6, borderLeft: "2px solid #c4d0b4", background: "#f7f9f4", borderRadius: "0 6px 6px 0" }, children: answer }),
    expanded && children && /* @__PURE__ */ jsx("div", { style: { marginTop: 6 }, children })
  ] });
}
function ResearchCard({ data, expanded, onToggle }) {
  return /* @__PURE__ */ jsxs("div", { onClick: onToggle, style: { padding: "14px 18px", marginBottom: 8, borderRadius: 8, background: expanded ? "#f7f6f0" : "transparent", border: `1px solid ${expanded ? "#d4d0c4" : "transparent"}`, cursor: "pointer" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 14, fontWeight: 500, color: "#3d3d35" }, children: data.title }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#aaa89a", transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }, children: "\u25BC" })
    ] }),
    expanded && /* @__PURE__ */ jsxs("div", { style: { marginTop: 10 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#5a5a4a", lineHeight: 1.6, margin: "0 0 8px" }, children: data.insight }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#aaa89a", fontStyle: "italic" }, children: data.source })
    ] })
  ] });
}
function OnboardingStep({ number, title, children, isActive, isComplete }) {
  return /* @__PURE__ */ jsxs("div", { style: { marginBottom: 32, opacity: isActive ? 1 : isComplete ? 0.7 : 0.3, transition: "opacity 0.4s", pointerEvents: isActive ? "auto" : "none" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx("div", { style: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "var(--mono)", fontWeight: 500, background: isComplete ? "#5a6a4a" : isActive ? "#3d3d35" : "#e8e6df", color: isComplete || isActive ? "#f7f6f0" : "#aaa89a" }, children: isComplete ? "\u2713" : number }),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 16, fontWeight: 500, color: "#3d3d35" }, children: title })
    ] }),
    isActive && /* @__PURE__ */ jsx("div", { style: { marginLeft: 40 }, children })
  ] });
}
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [lifeStage, setLifeStage] = useState(null);
  const [hsp, setHsp] = useState(false);
  const [energy, setEnergy] = useState(6);
  const [restQuality, setRestQuality] = useState(6);
  const [liquidSavings, setLiquidSavings] = useState(2e4);
  const [investedAssets, setInvestedAssets] = useState(5e4);
  const [monthlyBurn, setMonthlyBurn] = useState(1500);
  const [monthlySalary, setMonthlySalary] = useState(3e3);
  const [recurringIncome, setRecurringIncome] = useState(0);
  const [buildingNew, setBuildingNew] = useState(false);
  const [jobFeeling, setJobFeeling] = useState(null);
  const isEmployed = lifeStage === "employed" || lifeStage === "considering";
  const next = () => setStep((s) => s + 1);
  const finish = () => {
    onComplete({
      lifeStage,
      hsp,
      energy,
      restQuality,
      liquidSavings,
      investedAssets,
      monthlyBurn,
      monthlySalary,
      recurringIncome,
      buildingNew,
      jobFeeling,
      currentDayRate: isEmployed ? Math.round(monthlySalary / 21) : 0
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    step === 0 && /* @__PURE__ */ jsxs("div", { style: { marginBottom: 40 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 16, color: "#5a5a4a", lineHeight: 1.8, margin: "0 0 20px", maxWidth: 540 }, children: [
        "This model calculates the ",
        /* @__PURE__ */ jsx("em", { children: "Expected Wellbeing Value" }),
        " (EWV) of an hour of your life."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { padding: "18px 22px", borderRadius: 10, background: "#f7f6f0", border: "1px solid #e8e6df", marginBottom: 20, maxWidth: 540 }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 600, color: "#3d3d35", marginBottom: 8 }, children: "What is EWV?" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#5a5a4a", lineHeight: 1.7, margin: "0 0 8px" }, children: "EWV combines six research-backed factors into a single score for any activity: how much money it earns you (adjusted for how much that money actually improves your life), how much intrinsic satisfaction it provides, how well it meets your psychological needs, how much it compounds over time, and how it interacts with your current energy level." }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, color: "#5a5a4a", lineHeight: 1.7, margin: 0 }, children: [
          "The key insight: money has ",
          /* @__PURE__ */ jsx("em", { children: "sharply" }),
          " diminishing returns, while rest, meaningful work, and learning have value that most people massively underestimate. The model makes both sides concrete."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { padding: "20px 24px", borderRadius: 12, background: "linear-gradient(135deg, #3d3d35, #4a4a40)", color: "#f7f6f0", marginBottom: 20, maxWidth: 540 }, children: /* @__PURE__ */ jsx("div", { style: { fontSize: 18, fontWeight: 300, fontStyle: "italic", lineHeight: 1.5 }, children: '"At what price does paid work actually become worth my time \u2014 and when am I better off doing something else?"' }) }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#8a8a7a", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 540 }, children: "Setup takes about 2 minutes. Nothing is stored or sent anywhere." }),
      /* @__PURE__ */ jsx("button", { onClick: () => setStep(1), style: { padding: "12px 28px", borderRadius: 8, border: "none", background: "#3d3d35", color: "#f7f6f0", fontSize: 14, fontFamily: "var(--mono)", cursor: "pointer" }, children: "Let's find out \u2192" })
    ] }),
    step >= 1 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(OnboardingStep, { number: 1, title: "Where are you right now?", isActive: step === 1, isComplete: step > 1, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 16px" }, children: "This shapes how the model values your time. Someone exploring a change has different opportunity costs than someone settled." }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsx(OptionCard, { selected: lifeStage === "employed", onClick: () => setLifeStage("employed"), icon: "\u25FB", label: "Employed", sublabel: "Working, not planning to leave" }),
          /* @__PURE__ */ jsx(OptionCard, { selected: lifeStage === "considering", onClick: () => setLifeStage("considering"), icon: "\u25C7", label: "Considering a change", sublabel: "Still working, exploring what's next" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }, children: [
          /* @__PURE__ */ jsx(OptionCard, { selected: lifeStage === "in_transition", onClick: () => setLifeStage("in_transition"), icon: "\u25B3", label: "In transition", sublabel: "Recently left, building something new" }),
          /* @__PURE__ */ jsx(OptionCard, { selected: lifeStage === "established", onClick: () => setLifeStage("established"), icon: "\u25CF", label: "Established independent", sublabel: "Freelance, self-employed, running a business" })
        ] }),
        isEmployed && /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", margin: "0 0 12px" }, children: "How does your current job feel most days?" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx(OptionCard, { selected: jobFeeling === "good", onClick: () => setJobFeeling("good"), icon: "\u25C8", label: "Mostly fulfilling", sublabel: "Meaningful, decent autonomy" }),
            /* @__PURE__ */ jsx(OptionCard, { selected: jobFeeling === "bad", onClick: () => setJobFeeling("bad"), icon: "\u25A1", label: "Mostly draining", sublabel: "Stagnant, misaligned, exhausting" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: next, disabled: !lifeStage || isEmployed && !jobFeeling, style: { padding: "10px 24px", borderRadius: 8, border: "none", background: lifeStage && (!isEmployed || jobFeeling) ? "#3d3d35" : "#e8e6df", color: lifeStage && (!isEmployed || jobFeeling) ? "#f7f6f0" : "#aaa89a", fontSize: 13, fontFamily: "var(--mono)", cursor: lifeStage && (!isEmployed || jobFeeling) ? "pointer" : "default", marginTop: 8 }, children: "Continue \u2192" })
      ] }),
      /* @__PURE__ */ jsxs(OnboardingStep, { number: 2, title: "Your energy right now", isActive: step === 2, isComplete: step > 2, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 16px" }, children: "Energy is one of the most powerful inputs. When depleted, the minimum rate for work to be worthwhile skyrockets \u2014 rest becomes extremely valuable and work costs future capacity." }),
        /* @__PURE__ */ jsx(Slider, { label: "Energy level today", value: energy, onChange: setEnergy, hint: "1 = completely drained \xB7 10 = fully charged" }),
        /* @__PURE__ */ jsx(Slider, { label: "Rest quality recently", value: restQuality, onChange: setRestQuality, hint: "Sleep, real breaks, recovery time" }),
        /* @__PURE__ */ jsx("div", { style: { marginTop: 8, marginBottom: 16 }, children: /* @__PURE__ */ jsx(HelpToggle, { label: "I'm a highly sensitive person (HSP)", checked: hsp, onChange: setHsp, helpText: "HSPs need ~35% more recovery time (Aron, 1996). The model applies a burnout multiplier \u2014 meaning pushing through low energy costs you more. About 15\u201320% of people are HSP." }) }),
        /* @__PURE__ */ jsx("button", { onClick: next, style: { padding: "10px 24px", borderRadius: 8, border: "none", background: "#3d3d35", color: "#f7f6f0", fontSize: 13, fontFamily: "var(--mono)", cursor: "pointer" }, children: "Continue \u2192" })
      ] }),
      /* @__PURE__ */ jsxs(OnboardingStep, { number: 3, title: "Your financial position", isActive: step === 3, isComplete: step > 3, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 6px" }, children: "This is where the model gets its power." }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 16px" }, children: [
          "Your ",
          /* @__PURE__ */ jsx("strong", { children: "runway" }),
          " \u2014 how long you could survive without working \u2014 determines how much each euro actually matters. The longer it is, the more the model favors meaning over money."
        ] }),
        isEmployed && /* @__PURE__ */ jsx(Slider, { label: "Monthly salary (after tax)", value: monthlySalary, onChange: setMonthlySalary, min: 500, max: 1e4, step: 100, prefix: "\u20AC", hint: `Your effective day rate: \u20AC${Math.round(monthlySalary / 21)}/day (salary \xF7 21 working days)` }),
        !isEmployed && /* @__PURE__ */ jsx(Slider, { label: "Recurring monthly income", value: recurringIncome, onChange: setRecurringIncome, min: 0, max: 6e3, step: 100, prefix: "\u20AC", hint: "Any regular income: freelance retainers, benefits, rental, etc." }),
        /* @__PURE__ */ jsx(Slider, { label: "Liquid savings", value: liquidSavings, onChange: setLiquidSavings, min: 0, max: 2e5, step: 1e3, prefix: "\u20AC", hint: "Cash and easily accessible savings" }),
        /* @__PURE__ */ jsx(Slider, { label: "Invested assets", value: investedAssets, onChange: setInvestedAssets, min: 0, max: 5e5, step: 5e3, prefix: "\u20AC", hint: "ETFs, retirement \u2014 counted at 35% since these are long-term" }),
        /* @__PURE__ */ jsx(Slider, { label: "Monthly expenses", value: monthlyBurn, onChange: setMonthlyBurn, min: 500, max: 5e3, step: 50, prefix: "\u20AC", hint: "Everything: rent, food, insurance, subscriptions" }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "12px 16px", background: "#f7f6f0", borderRadius: 8, marginTop: 8, marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, fontFamily: "var(--mono)", color: "#aaa89a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }, children: [
            "Your runway ",
            isEmployed ? "(if you quit)" : ""
          ] }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 20, fontFamily: "var(--mono)", fontWeight: 500, color: "#3d3d35" }, children: calcRunway(liquidSavings, investedAssets, monthlyBurn) }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "#8a8a7a" }, children: " months" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: next, style: { padding: "10px 24px", borderRadius: 8, border: "none", background: "#3d3d35", color: "#f7f6f0", fontSize: 13, fontFamily: "var(--mono)", cursor: "pointer" }, children: "Continue \u2192" })
      ] }),
      /* @__PURE__ */ jsxs(OnboardingStep, { number: 4, title: "One last thing", isActive: step === 4, isComplete: step > 4, children: [
        /* @__PURE__ */ jsx(HelpToggle, { label: "I'm actively building toward something new", checked: buildingNew, onChange: setBuildingNew, helpText: "Applies a 1.3\xD7 bonus to the compounding value of personal projects and learning. When building a new direction, unpaid creative time has extra strategic value \u2014 raising the bar for paid work." }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "12px 0 20px" }, children: "That's everything. Ready to see what your time is worth." }),
        /* @__PURE__ */ jsx("button", { onClick: finish, style: { padding: "12px 28px", borderRadius: 8, border: "none", background: "#5a6a4a", color: "#f7f6f0", fontSize: 14, fontFamily: "var(--mono)", cursor: "pointer" }, children: "Show me the model \u2192" })
      ] })
    ] })
  ] });
}
function ThresholdChart({ baseParams, unpaidResults, showCurrentJob, currentJobResult, currentDayRate }) {
  const W = 620, H = 340;
  const pad = { top: 20, right: 30, bottom: 50, left: 56 };
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom;
  const rateMin = 100, rateMax = 3e3, rateStep = 50;
  const rates = [];
  for (let r = rateMin; r <= rateMax; r += rateStep) rates.push(r);
  const newWork = { paid_aligned: PAID_PROFILES.paid_aligned, paid_misaligned: PAID_PROFILES.paid_misaligned };
  const curves = Object.entries(newWork).map(([key, profile]) => {
    const points = rates.map((rate) => ({ rate, ewv: calcEWV(mp({ activityType: profile.type, dayRate: rate, intrinsicMotivation: profile.intrinsicDefault, autonomyScore: profile.autonomy, competenceScore: profile.competence, relatednessScore: profile.relatedness, missionAligned: profile.missionAligned }, baseParams)).total }));
    return { key, profile, points };
  });
  const allEWVs = [...curves.flatMap((c) => c.points.map((p) => p.ewv)), ...Object.values(unpaidResults).map((r) => r.total)];
  if (showCurrentJob && currentJobResult) allEWVs.push(currentJobResult.total);
  const ewvMin = Math.floor(Math.min(...allEWVs) - 2), ewvMax = Math.ceil(Math.max(...allEWVs) + 2);
  const xScale = (r) => pad.left + (r - rateMin) / (rateMax - rateMin) * cw;
  const yScale = (e) => pad.top + ch - (e - ewvMin) / (ewvMax - ewvMin) * ch;
  const bestUnpaid = Math.max(...Object.values(unpaidResults).map((r) => r.total));
  const thresholds = curves.map((c) => ({ key: c.key, rate: c.points.find((p) => p.ewv >= bestUnpaid)?.rate || null, color: c.profile.color }));
  const path = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.rate).toFixed(1)},${yScale(p.ewv).toFixed(1)}`).join(" ");
  const yTicks = [];
  const ySt = Math.max(1, Math.ceil((ewvMax - ewvMin) / 6));
  for (let v = Math.ceil(ewvMin / ySt) * ySt; v <= ewvMax; v += ySt) yTicks.push(v);
  const xTicks = [200, 500, 1e3, 1500, 2e3, 2500, 3e3].filter((v) => v >= rateMin && v <= rateMax);
  const uc = { rest: "#9aaa8a", creative: "#7a9aaa", learning: "#aa9a7a" };
  const ul = { rest: "Rest", creative: "Meaningful", learning: "Learning" };
  return /* @__PURE__ */ jsxs("div", { style: { overflowX: "auto" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 10, paddingLeft: 56 }, children: [
      curves.map((c) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx("svg", { width: 20, height: 4, children: /* @__PURE__ */ jsx("line", { x1: 0, y1: 2, x2: 20, y2: 2, stroke: c.profile.color, strokeWidth: 2.5, strokeDasharray: c.profile.dash ? "6,3" : "none" }) }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#5a5a4a", fontFamily: "var(--mono)" }, children: c.profile.label })
      ] }, c.key)),
      showCurrentJob && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx("svg", { width: 10, height: 10, children: /* @__PURE__ */ jsx("circle", { cx: 5, cy: 5, r: 4, fill: "#5a8a5a" }) }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#5a5a4a", fontFamily: "var(--mono)" }, children: "Your job" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" }, children: [
      yTicks.map((v) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: pad.left, y1: yScale(v), x2: W - pad.right, y2: yScale(v), stroke: "#e8e6df", strokeWidth: 1 }),
        /* @__PURE__ */ jsx("text", { x: pad.left - 10, y: yScale(v) + 4, textAnchor: "end", fontSize: 10, fill: "#aaa89a", fontFamily: "'DM Mono', monospace", children: v })
      ] }, `y${v}`)),
      xTicks.map((v) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: xScale(v), y1: pad.top, x2: xScale(v), y2: H - pad.bottom, stroke: "#f0efe8", strokeWidth: 1 }),
        /* @__PURE__ */ jsxs("text", { x: xScale(v), y: H - pad.bottom + 20, textAnchor: "middle", fontSize: 10, fill: "#aaa89a", fontFamily: "'DM Mono', monospace", children: [
          "\u20AC",
          v
        ] })
      ] }, `x${v}`)),
      /* @__PURE__ */ jsx("text", { x: W / 2, y: H - 6, textAnchor: "middle", fontSize: 11, fill: "#8a8a7a", fontFamily: "'DM Mono', monospace", children: "Day Rate (\u20AC)" }),
      /* @__PURE__ */ jsx("text", { x: 14, y: H / 2, textAnchor: "middle", fontSize: 11, fill: "#8a8a7a", fontFamily: "'DM Mono', monospace", transform: `rotate(-90, 14, ${H / 2})`, children: "EWV / hour" }),
      Object.entries(unpaidResults).map(([key, result]) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: pad.left, y1: yScale(result.total), x2: W - pad.right, y2: yScale(result.total), stroke: uc[key], strokeWidth: 1.5, strokeDasharray: "6,4", opacity: 0.7 }),
        /* @__PURE__ */ jsx("text", { x: W - pad.right + 4, y: yScale(result.total) + 3, fontSize: 9, fill: uc[key], fontFamily: "'DM Mono', monospace", children: ul[key] })
      ] }, `u${key}`)),
      /* @__PURE__ */ jsx("rect", { x: pad.left, y: yScale(bestUnpaid), width: cw, height: 2, fill: "#5a6a4a", opacity: 0.25 }),
      curves.map((c) => /* @__PURE__ */ jsx("path", { d: path(c.points), fill: "none", stroke: c.profile.color, strokeWidth: 2.5, strokeDasharray: c.profile.dash ? "8,4" : "none" }, c.key)),
      thresholds.map((t) => t.rate && /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("circle", { cx: xScale(t.rate), cy: yScale(bestUnpaid), r: 5, fill: "#fafaf6", stroke: t.color, strokeWidth: 2 }),
        /* @__PURE__ */ jsx("rect", { x: xScale(t.rate) - 28, y: yScale(bestUnpaid) - 24, width: 56, height: 16, rx: 4, fill: t.color }),
        /* @__PURE__ */ jsxs("text", { x: xScale(t.rate), y: yScale(bestUnpaid) - 13, textAnchor: "middle", fontSize: 9, fill: "#fff", fontWeight: 600, fontFamily: "'DM Mono', monospace", children: [
          "\u20AC",
          t.rate,
          "/d"
        ] })
      ] }, `t${t.key}`)),
      showCurrentJob && currentJobResult && currentDayRate >= rateMin && currentDayRate <= rateMax && /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("circle", { cx: xScale(currentDayRate), cy: yScale(currentJobResult.total), r: 7, fill: currentJobResult.total >= bestUnpaid ? "#5a8a5a" : "#c47a5a", stroke: "#fafaf6", strokeWidth: 2 }),
        /* @__PURE__ */ jsx("text", { x: xScale(currentDayRate), y: yScale(currentJobResult.total) - 14, textAnchor: "middle", fontSize: 10, fill: currentJobResult.total >= bestUnpaid ? "#5a8a5a" : "#c47a5a", fontFamily: "'DM Mono', monospace", fontWeight: 600, children: "Your job" })
      ] })
    ] })
  ] });
}
function EnergySensitivityChart({ baseParams }) {
  const W = 620, H = 280;
  const pad = { top: 30, right: 100, bottom: 50, left: 56 };
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom;
  const eLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const profiles = { paid_aligned: PAID_PROFILES.paid_aligned, paid_misaligned: PAID_PROFILES.paid_misaligned };
  const data = Object.entries(profiles).map(([key, prof]) => {
    const points = eLevels.map((e) => {
      const best = Math.max(...Object.entries(ACTIVITY_PRESETS).map(([_, up]) => calcEWV(mp({ activityType: up.type, dayRate: 0, energyLevel: e, restQuality: e, intrinsicMotivation: up.intrinsicDefault, autonomyScore: up.autonomy, competenceScore: up.competence, relatednessScore: up.relatedness, missionAligned: up.missionAligned }, baseParams)).total));
      let t = null;
      for (let r = 100; r <= 5e3; r += 25) {
        if (calcEWV(mp({ activityType: prof.type, dayRate: r, energyLevel: e, restQuality: e, intrinsicMotivation: prof.intrinsicDefault, autonomyScore: prof.autonomy, competenceScore: prof.competence, relatednessScore: prof.relatedness, missionAligned: prof.missionAligned }, baseParams)).total >= best) {
          t = r;
          break;
        }
      }
      return { energy: e, threshold: t || 5e3 };
    });
    return { key, prof, points };
  });
  const tMax = Math.min(5e3, Math.max(...data.flatMap((d) => d.points.map((p) => p.threshold))) + 200);
  const xScale = (e) => pad.left + (e - 1) / 9 * cw;
  const yScale = (t) => pad.top + ch - t / tMax * ch;
  const path = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.energy).toFixed(1)},${yScale(p.threshold).toFixed(1)}`).join(" ");
  const area = (pts) => path(pts) + ` L${xScale(pts[pts.length - 1].energy).toFixed(1)},${yScale(0).toFixed(1)} L${xScale(pts[0].energy).toFixed(1)},${yScale(0).toFixed(1)} Z`;
  const yTicks = [];
  const ySt = Math.max(200, Math.ceil(tMax / 6 / 100) * 100);
  for (let v = 0; v <= tMax; v += ySt) yTicks.push(v);
  return /* @__PURE__ */ jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxs("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" }, children: [
    yTicks.map((v) => /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx("line", { x1: pad.left, y1: yScale(v), x2: W - pad.right, y2: yScale(v), stroke: "#e8e6df", strokeWidth: 1 }),
      /* @__PURE__ */ jsxs("text", { x: pad.left - 10, y: yScale(v) + 4, textAnchor: "end", fontSize: 10, fill: "#aaa89a", fontFamily: "'DM Mono', monospace", children: [
        "\u20AC",
        v
      ] })
    ] }, `y${v}`)),
    eLevels.map((e) => /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx("line", { x1: xScale(e), y1: pad.top, x2: xScale(e), y2: H - pad.bottom, stroke: "#f0efe8", strokeWidth: 1 }),
      /* @__PURE__ */ jsx("text", { x: xScale(e), y: H - pad.bottom + 20, textAnchor: "middle", fontSize: 10, fill: "#aaa89a", fontFamily: "'DM Mono', monospace", children: e })
    ] }, `x${e}`)),
    /* @__PURE__ */ jsx("text", { x: W / 2, y: H - 6, textAnchor: "middle", fontSize: 11, fill: "#8a8a7a", fontFamily: "'DM Mono', monospace", children: "Energy Level" }),
    /* @__PURE__ */ jsx("text", { x: 14, y: H / 2, textAnchor: "middle", fontSize: 11, fill: "#8a8a7a", fontFamily: "'DM Mono', monospace", transform: `rotate(-90, 14, ${H / 2})`, children: "Min. Day Rate (\u20AC)" }),
    data.map((c) => /* @__PURE__ */ jsx("path", { d: area(c.points), fill: c.prof.color, opacity: 0.07 }, `a${c.key}`)),
    data.map((c) => /* @__PURE__ */ jsx("path", { d: path(c.points), fill: "none", stroke: c.prof.color, strokeWidth: 2.5, strokeDasharray: c.prof.dash ? "8,4" : "none" }, c.key)),
    data.map((c) => {
      const lp = c.points[c.points.length - 1];
      return /* @__PURE__ */ jsx("text", { x: xScale(lp.energy) + 8, y: yScale(lp.threshold) + 4, fontSize: 10, fill: c.prof.color, fontFamily: "'DM Mono', monospace", fontWeight: 500, children: c.prof.label }, `lb${c.key}`);
    }),
    /* @__PURE__ */ jsx("text", { x: pad.left + cw / 2, y: yScale(tMax * 0.75), textAnchor: "middle", fontSize: 11, fill: "#c4a484", opacity: 0.6, fontFamily: "'DM Mono', monospace", fontStyle: "italic", children: "\u2191 Below curve = don't take it" })
  ] }) });
}
function Dashboard({ config, onRestart }) {
  const [tab, setTab] = useState("thresholds");
  const [expandedResearch, setExpandedResearch] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [energy, setEnergy] = useState(config.energy);
  const [restQuality, setRestQuality] = useState(config.restQuality);
  const [liquidSavings, setLiquidSavings] = useState(config.liquidSavings);
  const [investedAssets, setInvestedAssets] = useState(config.investedAssets);
  const [monthlyBurn, setMonthlyBurn] = useState(config.monthlyBurn);
  const [buildingNew, setBuildingNew] = useState(config.buildingNew);
  const { lifeStage, hsp, jobFeeling, currentDayRate, monthlySalary, recurringIncome } = config;
  const isEmployed = lifeStage === "employed" || lifeStage === "considering";
  const showCurrentJob = isEmployed && jobFeeling;
  const runwayMonths = useMemo(() => calcRunway(liquidSavings, investedAssets, monthlyBurn), [liquidSavings, investedAssets, monthlyBurn]);
  const financialUrgency = calcFinancialUrgency(runwayMonths);
  const burnoutLevel = burnoutProximity(energy, restQuality, hsp);
  const baselineIncome = useMemo(() => {
    if (isEmployed) {
      return getBaseline(monthlyBurn, financialUrgency, 0);
    }
    return getBaseline(monthlyBurn, financialUrgency, recurringIncome);
  }, [isEmployed, monthlyBurn, financialUrgency, recurringIncome]);
  const baseParams = { energyLevel: energy, restQuality, runwayMonths, monthlyBurn, baselineIncome, lifeStage, buildingNew, hsp };
  const unpaidResults = useMemo(() => {
    const out = {};
    Object.entries(ACTIVITY_PRESETS).forEach(([key, preset]) => {
      out[key] = calcEWV(mp({ activityType: preset.type, dayRate: 0, intrinsicMotivation: preset.intrinsicDefault, autonomyScore: preset.autonomy, competenceScore: preset.competence, relatednessScore: preset.relatedness, missionAligned: preset.missionAligned }, baseParams));
    });
    return out;
  }, [energy, restQuality, runwayMonths, monthlyBurn, baselineIncome, lifeStage, buildingNew, hsp]);
  const bestUnpaid = Math.max(...Object.values(unpaidResults).map((r) => r.total));
  const bestUnpaidKey = Object.entries(unpaidResults).find(([_, r]) => r.total === bestUnpaid)?.[0];
  const currentJobResult = useMemo(() => {
    if (!showCurrentJob) return null;
    const prof = jobFeeling === "good" ? PAID_PROFILES.current_job_good : PAID_PROFILES.current_job_bad;
    return calcEWV(mp({ activityType: prof.type, dayRate: currentDayRate, intrinsicMotivation: prof.intrinsicDefault, autonomyScore: prof.autonomy, competenceScore: prof.competence, relatednessScore: prof.relatedness, missionAligned: prof.missionAligned }, baseParams));
  }, [showCurrentJob, jobFeeling, currentDayRate, energy, restQuality, runwayMonths, monthlyBurn, baselineIncome, lifeStage, buildingNew, hsp]);
  const todayThresholds = useMemo(() => {
    return [PAID_PROFILES.paid_aligned, PAID_PROFILES.paid_misaligned].map((prof) => {
      let t = null;
      for (let r = 100; r <= 5e3; r += 25) {
        if (calcEWV(mp({ activityType: prof.type, dayRate: r, intrinsicMotivation: prof.intrinsicDefault, autonomyScore: prof.autonomy, competenceScore: prof.competence, relatednessScore: prof.relatedness, missionAligned: prof.missionAligned }, baseParams)).total >= bestUnpaid) {
          t = r;
          break;
        }
      }
      return { label: prof.label, threshold: t, color: prof.color };
    });
  }, [energy, restQuality, runwayMonths, monthlyBurn, baselineIncome, lifeStage, buildingNew, hsp, bestUnpaid]);
  const stageLabels = { employed: "Employed", considering: "Considering change", in_transition: "In transition", established: "Established" };
  const allRanked = useMemo(() => {
    const items = Object.entries(unpaidResults).map(([key, result]) => ({
      key,
      label: ACTIVITY_PRESETS[key].label,
      icon: ACTIVITY_PRESETS[key].icon,
      sublabel: ACTIVITY_PRESETS[key].sublabel,
      ewv: result.total,
      color: ACTIVITY_PRESETS[key].color
    }));
    if (showCurrentJob && currentJobResult) {
      const prof = jobFeeling === "good" ? PAID_PROFILES.current_job_good : PAID_PROFILES.current_job_bad;
      items.push({
        key: "current_job",
        label: prof.label,
        icon: prof.icon,
        sublabel: `\u20AC${currentDayRate}/day \xB7 \u20AC${monthlySalary}/mo`,
        ewv: currentJobResult.total,
        color: prof.color
      });
    }
    items.sort((a, b) => b.ewv - a.ewv);
    return items;
  }, [unpaidResults, showCurrentJob, currentJobResult, jobFeeling, currentDayRate, monthlySalary]);
  const maxEWV = allRanked.length > 0 ? allRanked[0].ewv : 1;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontFamily: "var(--mono)", color: "#aaa89a", background: "#f0efe8", padding: "4px 10px", borderRadius: 4 }, children: stageLabels[lifeStage] }),
        hsp && /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontFamily: "var(--mono)", color: "#aaa89a", background: "#f0efe8", padding: "4px 10px", borderRadius: 4 }, children: "HSP" }),
        buildingNew && /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontFamily: "var(--mono)", color: "#aaa89a", background: "#f0efe8", padding: "4px 10px", borderRadius: 4 }, children: "Building new" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowSettings(!showSettings), style: { fontSize: 12, fontFamily: "var(--mono)", color: "#8a8a7a", background: "transparent", border: "1px solid #e8e6df", padding: "6px 14px", borderRadius: 6, cursor: "pointer" }, children: showSettings ? "Hide" : "Adjust" }),
        /* @__PURE__ */ jsx("button", { onClick: onRestart, style: { fontSize: 12, fontFamily: "var(--mono)", color: "#c47a5a", background: "transparent", border: "1px solid #e8e6df", padding: "6px 14px", borderRadius: 6, cursor: "pointer" }, children: "Restart" })
      ] })
    ] }),
    showSettings && /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 12, padding: "20px 22px", marginBottom: 20, border: "1px solid #e8e6df" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }, children: [
        /* @__PURE__ */ jsx(Slider, { label: "Energy Level", value: energy, onChange: setEnergy }),
        /* @__PURE__ */ jsx(Slider, { label: "Rest Quality", value: restQuality, onChange: setRestQuality }),
        /* @__PURE__ */ jsx(Slider, { label: "Liquid Savings", value: liquidSavings, onChange: setLiquidSavings, min: 0, max: 2e5, step: 1e3, prefix: "\u20AC" }),
        /* @__PURE__ */ jsx(Slider, { label: "Invested Assets", value: investedAssets, onChange: setInvestedAssets, min: 0, max: 5e5, step: 5e3, prefix: "\u20AC" }),
        /* @__PURE__ */ jsx(Slider, { label: "Monthly Expenses", value: monthlyBurn, onChange: setMonthlyBurn, min: 500, max: 5e3, step: 50, prefix: "\u20AC" })
      ] }),
      /* @__PURE__ */ jsx(HelpToggle, { label: "Building toward something new", checked: buildingNew, onChange: setBuildingNew, helpText: "Applies a 1.3\xD7 bonus to compounding value of personal projects and learning." }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 10, padding: "10px 14px", background: "#f7f6f0", borderRadius: 8, fontSize: 12, fontFamily: "var(--mono)", color: "#8a8a7a" }, children: [
        "Runway: ",
        runwayMonths,
        " months \xB7 Urgency: ",
        (financialUrgency * 100).toFixed(0),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { padding: "14px 18px", borderRadius: 10, background: "#f7f6f0", border: "1px solid #e8e6df", marginBottom: 16, fontSize: 12, color: "#6a6a5a", lineHeight: 1.6 }, children: [
      /* @__PURE__ */ jsx("strong", { style: { color: "#3d3d35" }, children: "EWV" }),
      " = Expected Wellbeing Value \u2014 a single score combining financial gain (adjusted for diminishing returns), intrinsic satisfaction, psychological need fulfillment (autonomy, competence, relatedness), future compounding potential, and energy costs. Higher = better use of your hour."
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(135deg, #3d3d35, #4a4a40)", color: "#f7f6f0", borderRadius: "12px 12px 0 0", padding: "20px 24px" }, children: [
      showCurrentJob && currentJobResult && /* @__PURE__ */ jsx("div", { style: { marginBottom: 16, padding: "14px 18px", borderRadius: 8, background: currentJobResult.total >= bestUnpaid ? "rgba(90,138,90,0.15)" : "rgba(196,122,90,0.15)" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, opacity: 0.7, fontFamily: "var(--mono)", marginBottom: 4 }, children: [
            "Your job at \u20AC",
            currentDayRate,
            "/day (",
            jobFeeling === "good" ? "fulfilling" : "draining",
            ")"
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 20, fontWeight: 300 }, children: [
            "EWV: ",
            currentJobResult.total.toFixed(1),
            " ",
            /* @__PURE__ */ jsxs("span", { style: { fontSize: 13, opacity: 0.6 }, children: [
              "vs. best unpaid: ",
              bestUnpaid.toFixed(1)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontFamily: "var(--mono)", fontWeight: 500, color: currentJobResult.total >= bestUnpaid ? "#9acea0" : "#e8a090" }, children: currentJobResult.total >= bestUnpaid ? "Clears the bar" : "Below threshold" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 10, letterSpacing: "0.12em", opacity: 0.5, textTransform: "uppercase", marginBottom: 14, fontFamily: "var(--mono)" }, children: "Today's minimum rates for new work" }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }, children: todayThresholds.map((t, i) => /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 140 }, children: [
        /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, opacity: 0.6, marginBottom: 4, fontFamily: "var(--mono)" }, children: [
          t.label,
          /* @__PURE__ */ jsx(InfoTip, { text: i === 0 ? "Work that feels meaningful and uses your skills well. Higher SDT scores (autonomy, competence) lower the bar." : "Work you'd only do for the paycheck. Low intrinsic value means the rate has to compensate for lost wellbeing." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { fontSize: 28, fontWeight: 300, fontFamily: "var(--mono)" }, children: [
          t.threshold ? `\u20AC${t.threshold}` : "\u2014",
          /* @__PURE__ */ jsx("span", { style: { fontSize: 14, opacity: 0.5 }, children: "/day" })
        ] }),
        !t.threshold && /* @__PURE__ */ jsx("div", { style: { fontSize: 10, opacity: 0.4, fontFamily: "var(--mono)" }, children: "no realistic rate justifies this" })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--mono)" }, children: [
            "Financial Urgency",
            /* @__PURE__ */ jsx(InfoTip, { text: "How much each euro matters to your wellbeing, based on your runway. 5% means money barely matters (long runway). 85% means every euro counts (short runway). Derived from Kahneman's diminishing returns research." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 16, fontWeight: 300 }, children: [
            (financialUrgency * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--mono)" }, children: [
            "Burnout Proximity",
            /* @__PURE__ */ jsx(InfoTip, { text: "How close you are to burnout, based on your energy and rest quality. Higher means rest is more valuable and work costs more. HSP adds a 1.35\xD7 multiplier because sensitive people need more recovery." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 16, fontWeight: 300 }, children: [
            (burnoutLevel * 100).toFixed(0),
            "%",
            hsp ? " (HSP)" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--mono)" }, children: [
            "Best Free Activity",
            /* @__PURE__ */ jsx(InfoTip, { text: "The highest-scoring unpaid activity right now. This is your opportunity cost \u2014 any paid work needs to beat this score to be worth your time." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 16, fontWeight: 300 }, children: [
            ACTIVITY_PRESETS[bestUnpaidKey]?.icon,
            " ",
            ACTIVITY_PRESETS[bestUnpaidKey]?.label?.split(" ")[0]
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--mono)" }, children: [
            "Runway",
            /* @__PURE__ */ jsx(InfoTip, { text: "How many months you could cover expenses without any income. Liquid savings count fully. Invested assets count at 35% \u2014 they're retirement and safety net, not spending money." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 16, fontWeight: 300 }, children: [
            runwayMonths,
            " mo"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid #e8e6df", flexWrap: "wrap", background: "#fff", borderRadius: "0 0 8px 8px", paddingLeft: 4 }, children: [{ id: "thresholds", label: "Rate Thresholds" }, { id: "energy", label: "Energy \xD7 Rate" }, { id: "tree", label: "Decision Tree" }, { id: "research", label: "Research" }].map((t) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(t.id), style: { padding: "14px 16px", border: "none", background: "transparent", fontSize: 13, fontFamily: "var(--mono)", cursor: "pointer", color: tab === t.id ? "#3d3d35" : "#aaa89a", fontWeight: tab === t.id ? 500 : 400, borderBottom: tab === t.id ? "2px solid #5a6a4a" : "2px solid transparent", letterSpacing: "0.02em" }, children: t.label }, t.id)) }),
    tab === "thresholds" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 16px" }, children: [
        "The curves show how new work's EWV rises with day rate. Horizontal lines are unpaid activities. Where a curve crosses \u2014 that's the minimum rate.",
        showCurrentJob && " The dot is your current job."
      ] }),
      /* @__PURE__ */ jsx("div", { style: { background: "#fff", borderRadius: 12, padding: "20px 16px", border: "1px solid #e8e6df", marginBottom: 24 }, children: /* @__PURE__ */ jsx(ThresholdChart, { baseParams, unpaidResults, showCurrentJob, currentJobResult, currentDayRate }) }),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, fontFamily: "var(--mono)", color: "#aaa89a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }, children: [
        "Activity Ranking",
        /* @__PURE__ */ jsx(InfoTipDark, { text: "All activities ranked by EWV. This includes your current job if applicable, so you can directly compare it against unpaid alternatives." })
      ] }),
      allRanked.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10, padding: "12px 16px", borderRadius: 8, background: i === 0 ? "#f7f9f4" : "#fff", border: `1px solid ${i === 0 ? "#d4dfc4" : "#e8e6df"}` }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 20, width: 28 }, children: item.icon }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { style: { fontSize: 14, fontWeight: 500 }, children: item.label }),
              item.sublabel && /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#aaa89a", marginLeft: 8 }, children: item.sublabel })
            ] }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 14, fontFamily: "var(--mono)", fontWeight: 600, color: i === 0 ? "#5a6a4a" : "#3d3d35" }, children: item.ewv.toFixed(1) })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { height: 4, background: "#e8e6df", borderRadius: 2, overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { style: { width: `${item.ewv / maxEWV * 100}%`, height: "100%", background: item.color, borderRadius: 2, transition: "width 0.3s" } }) })
        ] })
      ] }, item.key))
    ] }),
    tab === "energy" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#8a8a7a", lineHeight: 1.6, margin: "0 0 16px" }, children: `How your minimum acceptable rate shifts with energy. Below each curve is the "don't take it" zone.` }),
      /* @__PURE__ */ jsx("div", { style: { background: "#fff", borderRadius: 12, padding: "20px 16px", border: "1px solid #e8e6df", marginBottom: 24 }, children: /* @__PURE__ */ jsx(EnergySensitivityChart, { baseParams }) }),
      /* @__PURE__ */ jsxs("div", { style: { background: "#f7f9f4", borderRadius: 12, padding: "20px 22px", border: "1px solid #d4dfc4" }, children: [
        /* @__PURE__ */ jsxs("p", { style: { fontSize: 14, lineHeight: 1.75, color: "#5a6a4a", margin: "0 0 10px" }, children: [
          "The spike below energy 4\u20135 is the burnout multiplier",
          hsp ? " (amplified by HSP)" : "",
          ". At low energy, rest is so valuable and work so costly that no realistic rate justifies it."
        ] }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, fontStyle: "italic", color: "#7a8a6a", margin: 0 }, children: "Below energy 4, the answer is almost always rest." })
      ] })
    ] }),
    tab === "tree" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#6a6a5a", lineHeight: 1.7, marginBottom: 28 }, children: "Walk through this when deciding how to spend your time." }),
      /* @__PURE__ */ jsxs(DecisionNode, { question: "How should I spend this hour?", depth: 0, children: [
        /* @__PURE__ */ jsx(DecisionNode, { question: "1. Is your energy below 4/10?", depth: 1, answer: "\u2192 Rest. Non-negotiable. Pushing through costs 2\u20134\xD7 the hours in recovery. No compensation justifies it." }),
        /* @__PURE__ */ jsxs(DecisionNode, { question: "2. Is paid work on the table?", depth: 1, children: [
          /* @__PURE__ */ jsx(DecisionNode, { question: "2a. Meaningful / aligned?", depth: 2, answer: `\u2192 Threshold: \u20AC${todayThresholds[0]?.threshold || "N/A"}/day. Above: take it. Below: negotiate or pass.` }),
          /* @__PURE__ */ jsx(DecisionNode, { question: "2b. Just for money?", depth: 2, answer: `\u2192 Threshold: \u20AC${todayThresholds[1]?.threshold || "5,000+"}/day. Below this, you're destroying wellbeing.` }),
          showCurrentJob && /* @__PURE__ */ jsx(DecisionNode, { question: "2c. What about my current job?", depth: 2, answer: currentJobResult && currentJobResult.total >= bestUnpaid ? `\u2192 At \u20AC${currentDayRate}/day (${jobFeeling}), your job clears the threshold. Worth your time \u2014 for now.` : `\u2192 At \u20AC${currentDayRate}/day (${jobFeeling}), your job falls below the threshold. Your time is worth more elsewhere.` })
        ] }),
        /* @__PURE__ */ jsxs(DecisionNode, { question: "3. Choosing between personal activities?", depth: 1, children: [
          /* @__PURE__ */ jsx(DecisionNode, { question: "3a. Pull toward a meaningful project?", depth: 2, answer: "\u2192 Follow it. Personal projects compound: skills, taste, opportunities." }),
          /* @__PURE__ */ jsx(DecisionNode, { question: "3b. Curious about learning?", depth: 2, answer: "\u2192 Go for it, if curiosity pulls you \u2014 not anxiety." }),
          /* @__PURE__ */ jsx(DecisionNode, { question: "3c. Nothing feels right?", depth: 2, answer: "\u2192 Rest. At most financial positions, rest is higher-return than people realize." })
        ] }),
        /* @__PURE__ */ jsx(DecisionNode, { question: "4. Feeling guilty about not being productive?", depth: 1, answer: `\u2192 Financial urgency: ${(financialUrgency * 100).toFixed(0)}%. Runway: ${runwayMonths} months. The guilt is a feeling, not a fact.` })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 32, padding: "20px 22px", borderRadius: 12, background: "#f7f6f0", border: "1px solid #e8e6df" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 600, color: "#3d3d35", marginBottom: 10 }, children: "The core insight" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#5a5a4a", lineHeight: 1.75, margin: 0 }, children: 'We overvalue money and undervalue time because money is concrete and time is abstract. This model makes both concrete. For most people with any savings, the price at which paid work becomes "worth it" is surprisingly high.' })
      ] })
    ] }),
    tab === "research" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#6a6a5a", lineHeight: 1.7, marginBottom: 28 }, children: "The model draws from six streams of peer-reviewed research." }),
      Object.entries(RESEARCH).map(([key, data]) => /* @__PURE__ */ jsx(ResearchCard, { data, expanded: expandedResearch === key, onToggle: () => setExpandedResearch(expandedResearch === key ? null : key) }, key)),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 28, padding: "24px 22px", borderRadius: 12, background: "#f7f6f0", border: "1px solid #e8e6df" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 600, color: "#3d3d35", marginBottom: 12 }, children: "The EWV Formula" }),
        /* @__PURE__ */ jsxs("div", { style: { fontFamily: "var(--mono)", fontSize: 12, lineHeight: 2.2, color: "#5a5a4a", padding: "16px 18px", background: "#fff", borderRadius: 8, border: "1px solid #e8e6df" }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#7a8a6a" }, children: "EWV" }),
            " = Financial + Intrinsic + SDT + Compound \u2212 Burnout + RestBonus"
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "Financial" }),
            " = ln(baseline + hourly\u20AC) \xD7 urgency \xD7 100"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#aaa89a", marginLeft: 12 }, children: "\u21B3 baseline = what you'd earn without this work (savings-adjusted)" }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#aaa89a", marginLeft: 12 }, children: "\u21B3 urgency = how much money matters given your runway (5%\u201385%)" }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#aaa89a", marginLeft: 12 }, children: "\u21B3 the log function means the 1000th euro matters far less than the 1st" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "Intrinsic" }),
            " = QALY value \xD7 wellbeing multiplier \xD7 motivation"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "SDT" }),
            " = (autonomy \xD7 .45 + competence \xD7 .35 + relatedness \xD7 .20) \xD7 12"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "Compound" }),
            " = base \xD7 life_stage_bonus \xD7 building_bonus \xD7 8"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "Burnout" }),
            " = proximity \xD7 penalty (if working while depleted)"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "RestBonus" }),
            " = proximity \xD7 12 (if resting while burnout ",
            ">",
            " 30%)"
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "runway" }),
            " = (liquid + invested \xD7 35%) / expenses"
          ] }),
          hsp && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { style: { color: "#8a8a7a" }, children: "HSP" }),
            " = burnout proximity \xD7 1.35"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { marginTop: 20, padding: "18px 22px", borderRadius: 12, border: "1px solid #d4dfc4", background: "#f7f9f4" }, children: /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, color: "#5a6a4a", lineHeight: 1.7, margin: 0 }, children: [
        /* @__PURE__ */ jsx("strong", { children: "On precision:" }),
        " The exact numbers are informed estimates, not measurements. What matters is the structure: for most people with savings, the financial component is much smaller than the intrinsic, psychological, and compounding components. The model makes that invisible truth visible."
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 48, paddingTop: 24, borderTop: "1px solid #e8e6df", fontSize: 11, color: "#bbb8aa", fontFamily: "var(--mono)", lineHeight: 1.8 }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "EWV Model \xB7 ",
        hsp ? "HSP \xB7 " : "",
        "invested at 35% \xB7 savings-adjusted baseline"
      ] }),
      /* @__PURE__ */ jsx("div", { children: "Kahneman & Deaton (2010) \xB7 Killingsworth (2023) \xB7 Deci & Ryan (2000) \xB7 Aron (1996) \xB7 Maslach & Leiter (2016) \xB7 Cs\xEDkszentmih\xE1lyi (1990)" })
    ] })
  ] });
}
function HourValueApp() {
  const [config, setConfig] = useState(null);
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "'Newsreader', 'Georgia', serif", background: "#fafaf6", minHeight: "100vh", color: "#3d3d35", maxWidth: 720, margin: "0 auto", padding: "40px 24px", "--mono": "'DM Mono', monospace" }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=DM+Mono:wght@300;400;500&display=swap');
        input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #5a6a4a; border: 2px solid #f7f6f0; box-shadow: 0 1px 4px rgba(0,0,0,0.15); cursor: pointer; position: relative; z-index: 3; }
        input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: #5a6a4a; border: 2px solid #f7f6f0; box-shadow: 0 1px 4px rgba(0,0,0,0.15); cursor: pointer; }
        * { box-sizing: border-box; }
      ` }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: config ? 24 : 40 }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, letterSpacing: "0.15em", color: "#aaa89a", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--mono)" }, children: "Decision Model" }),
      /* @__PURE__ */ jsx("h1", { style: { fontSize: 32, fontWeight: 300, lineHeight: 1.2, margin: "0 0 12px", fontStyle: "italic" }, children: "What is an hour of your life worth?" }),
      !config && /* @__PURE__ */ jsx("p", { style: { fontSize: 15, color: "#6a6a5a", lineHeight: 1.7, maxWidth: 560, margin: 0 }, children: "A research-backed model for the question you've been avoiding." })
    ] }),
    config ? /* @__PURE__ */ jsx(Dashboard, { config, onRestart: () => setConfig(null) }) : /* @__PURE__ */ jsx(Onboarding, { onComplete: setConfig })
  ] });
}
export {
  HourValueApp as default
};
