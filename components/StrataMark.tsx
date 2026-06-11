"use client";
interface Props { size?: number; animate?: boolean; className?: string; style?: React.CSSProperties; }

export function StrataMark({ size = 32, animate = false, className = "", style = {} }: Props) {
  const u = size / 8;       // bar height = 1 unit
  const gap = u * 0.55;     // gap between bars = 0.55 units (from 8-unit grid)

  // PDF spec: 4 strata bars
  // Top stratum = shortest = BLUE (#5B7CFA)
  // Bars increase in width going downward
  // Column direction: first child = top
  const bars = [
    { w: "58%",  blue: true,  cls: "s1" }, // top — shortest — BLUE — animates first
    { w: "74%",  blue: false, cls: "s2" },
    { w: "88%",  blue: false, cls: "s3" },
    { w: "100%", blue: false, cls: "s4" }, // bottom — widest — white
  ];

  return (
    <div
      className={className}
      aria-label="QMULATE"
      style={{
        width: size,
        // Total height: 4 bars + 3 gaps
        height: u * 4 + gap * 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap,
        ...style,
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={animate ? bar.cls : ""}
          style={{
            width: bar.w,
            height: u,
            background: bar.blue ? "#5B7CFA" : "currentColor",
            borderRadius: 0,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
