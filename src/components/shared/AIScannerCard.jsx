// ─── AIScannerCard.jsx ───────────────────────────────────────────────────────
// Animated AI face scanner visual — used in HeroSection + StartAttendance page
// Usage:
//   <AIScannerCard />                        — default hero size
//   <AIScannerCard size="sm" live={false} /> — compact, no live feed

import { motion } from "framer-motion";

// ── Corner bracket ────────────────────────────────────────────────────────────
const CornerBracket = ({ position = "tl" }) => {
  const posMap = {
    tl: "top-4 left-4",
    tr: "top-4 right-4 scale-x-[-1]",
    bl: "bottom-4 left-4 scale-y-[-1]",
    br: "bottom-4 right-4 scale-[-1]",
  };
  return (
    <div className={`absolute ${posMap[position]} w-4 h-4 pointer-events-none`}>
      <div className="w-full h-[2px] bg-cyan-400" />
      <div className="w-[2px] h-full bg-cyan-400 mt-[-2px]" />
    </div>
  );
};

// ── Floating badge ────────────────────────────────────────────────────────────
const FloatBadge = ({ text, color, style, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute px-3 py-1.5 rounded-xl font-mono text-[11px]
               font-semibold whitespace-nowrap z-20"
    style={{
      background: "#07070f",
      border:     `0.5px solid ${color}50`,
      color,
      ...style,
    }}
  >
    {text}
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function AIScannerCard({
  size        = "md",   // "sm" | "md" | "lg"
  showBadges  = true,
  showConfBar = true,
}) {
  const dims = {
    sm: { w: "w-[200px]", h: "h-[240px]" },
    md: { w: "w-[260px]", h: "h-[300px]" },
    lg: { w: "w-[320px]", h: "h-[380px]" },
  }[size] || { w: "w-[260px]", h: "h-[300px]" };

  return (
    <div className={`relative ${dims.w} ${dims.h}`}>

      {/* ── rotating rings ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-[40px] border border-dashed
                   border-cyan-500/[0.12] pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-8 rounded-[50px] border border-dashed
                   border-purple-500/[0.07] pointer-events-none"
      />

      {/* ── main card ──────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          border:     "0.5px solid rgba(0,245,255,0.2)",
          background: "rgba(0,245,255,0.02)",
        }}
      >
        {/* corner brackets */}
        {["tl","tr","bl","br"].map((pos) => (
          <CornerBracket key={pos} position={pos} />
        ))}

        {/* animated scan line */}
        <motion.div
          aria-hidden="true"
          className="absolute left-5 right-5 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg,transparent,#00f5ff,transparent)",
            boxShadow:  "0 0 10px rgba(0,245,255,0.6)",
          }}
          animate={{ top: ["15%","82%","15%"], opacity: [0,1,1,0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* face SVG */}
        <svg
          viewBox="0 0 260 300"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* detection bounding box */}
          <rect
            x="55" y="40" width="150" height="185" rx="4"
            stroke="#00f5ff" strokeWidth="1"
            strokeDasharray="7 4" opacity="0.5"
          />

          {/* face silhouette */}
          <motion.ellipse
            cx="130" cy="120" rx="48" ry="58"
            stroke="#a855f7" strokeWidth="0.8"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* left eye */}
          <motion.circle cx="108" cy="108" r="7" fill="#00f5ff"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {/* left eye ring */}
          <motion.circle cx="108" cy="108"
            stroke="#00f5ff" strokeWidth="0.8" fill="none"
            strokeDasharray="3 2"
            animate={{ r: [10, 16, 10], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* right eye */}
          <motion.circle cx="152" cy="108" r="7" fill="#00f5ff"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />
          {/* right eye ring */}
          <motion.circle cx="152" cy="108"
            stroke="#00f5ff" strokeWidth="0.8" fill="none"
            strokeDasharray="3 2"
            animate={{ r: [10, 16, 10], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />

          {/* nose */}
          <path
            d="M130 118 L124 135 L136 135"
            stroke="#a855f7" strokeWidth="0.8" opacity="0.4"
          />

          {/* mouth */}
          <path
            d="M116 148 Q130 158 144 148"
            stroke="#00f5ff" strokeWidth="1" opacity="0.4"
          />

          {/* landmark dots */}
          {[
            { cx: 108, cy: 108, fill: "#00f5ff" },
            { cx: 152, cy: 108, fill: "#00f5ff" },
            { cx: 130, cy: 148, fill: "#a855f7" },
            { cx: 100, cy: 95,  fill: "#a855f7" },
            { cx: 160, cy: 95,  fill: "#a855f7" },
          ].map((dot, i) => (
            <motion.circle key={i} {...dot} r="2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          {/* confirmed label */}
          <motion.text
            x="130" y="252" textAnchor="middle"
            fill="#00f5ff" fontSize="9" fontFamily="monospace"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            IDENTITY CONFIRMED ✓
          </motion.text>
        </svg>

        {/* ── confidence bar ──────────────────────────────────────────── */}
        {showConfBar && (
          <div className="absolute bottom-7 left-7 right-7">
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg,#00f5ff,#a855f7)",
                }}
                animate={{ width: ["0%","98%","98%","0%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.55, 0.88, 1],
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5 font-mono text-[10px] text-white/25">
              <span>Confidence</span>
              <motion.span
                className="text-purple-400"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0.1, 0.5, 0.85, 1],
                }}
              >
                98.7%
              </motion.span>
            </div>
          </div>
        )}
      </div>

      {/* ── floating badges ─────────────────────────────────────────────── */}
      {showBadges && (
        <>
          <FloatBadge
            text="YOLOv8 ● ACTIVE"
            color="#00f5ff"
            style={{ top: -18, right: -36 }}
            delay={0}
          />
          <FloatBadge
            text="FaceNet ● 128D"
            color="#a855f7"
            style={{ bottom: -14, left: -32 }}
            delay={0.5}
          />
          <FloatBadge
            text="✓ PRESENT"
            color="#10b981"
            style={{ top: "50%", right: -44, transform: "translateY(-50%)" }}
            delay={1}
          />
        </>
      )}
    </div>
  );
}
