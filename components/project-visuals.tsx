/**
 * Abstract, technology-inspired SVG illustrations for the project cards.
 * All three share the same stroke weight and palette so the row reads as a set.
 */

const stroke = "var(--primary)"

export function OrionVisual() {
  const nodes = [
    { x: 60, y: 90 },
    { x: 150, y: 50 },
    { x: 160, y: 140 },
    { x: 250, y: 80 },
    { x: 260, y: 160 },
    { x: 340, y: 120 },
  ]
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ]
  return (
    <svg viewBox="0 0 400 210" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="orion-edge" x1="0" x2="1">
          <stop offset="0" stopColor="var(--indigo)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--violet)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#orion-edge)"
          strokeWidth="1.25"
          strokeDasharray="4 5"
          className="transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:-18]"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="var(--card)" stroke={stroke} strokeOpacity="0.25" />
          <circle cx={n.x} cy={n.y} r={i === 3 ? 5 : 3.5} fill={stroke} fillOpacity={i === 3 ? 0.9 : 0.55} />
        </g>
      ))}
      {/* Sequence ticks along the bottom: append-only history */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={i}
          x={58 + i * 21}
          y={182}
          width="12"
          height={i % 3 === 0 ? 10 : 6}
          rx="1.5"
          fill={stroke}
          fillOpacity={i < 9 ? 0.35 : 0.12}
        />
      ))}
    </svg>
  )
}

export function RagVisual() {
  return (
    <svg viewBox="0 0 400 210" className="h-full w-full" aria-hidden="true">
      {/* Stacked documents */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 14} ${58 - i * 10})`} className="transition-transform duration-500 group-hover:-translate-y-1">
          <rect width="96" height="118" rx="10" fill="var(--card)" stroke={stroke} strokeOpacity={0.3 - i * 0.06} />
          {i === 0 &&
            [0, 1, 2, 3, 4].map((l) => (
              <rect
                key={l}
                x="16"
                y={22 + l * 16}
                width={l === 4 ? 36 : 64 - (l % 2) * 14}
                height="4"
                rx="2"
                fill={stroke}
                fillOpacity={l === 1 ? 0.7 : 0.22}
              />
            ))}
        </g>
      ))}
      {/* Vector / embedding dots */}
      {[
        [230, 62],
        [262, 44],
        [292, 74],
        [252, 96],
        [318, 108],
        [280, 130],
        [244, 148],
        [306, 154],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} fill={stroke} fillOpacity={i % 3 === 0 ? 0.7 : 0.3} />
      ))}
      <line x1="166" y1="110" x2="228" y2="98" stroke={stroke} strokeOpacity="0.35" strokeDasharray="3 4" />
      {/* Magnifier */}
      <g transform="translate(300 60)">
        <circle cx="0" cy="0" r="20" fill="var(--card)" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="15" y1="15" x2="30" y2="30" stroke={stroke} strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Query line */}
      <rect x="70" y="184" width="260" height="1.5" rx="1" fill={stroke} fillOpacity="0.15" />
      <rect x="70" y="184" width="150" height="1.5" rx="1" fill={stroke} fillOpacity="0.6" />
    </svg>
  )
}

export function AslVisual() {
  // Simplified hand-landmark skeleton (21 points) in an open-palm pose
  const wrist: [number, number] = [200, 178]
  const fingers: [number, number][][] = [
    [
      [150, 152],
      [126, 128],
      [110, 108],
    ], // thumb
    [
      [176, 118],
      [170, 88],
      [166, 62],
    ], // index
    [
      [200, 112],
      [200, 78],
      [200, 48],
    ], // middle
    [
      [224, 118],
      [230, 88],
      [234, 62],
    ], // ring
    [
      [246, 130],
      [258, 106],
      [266, 84],
    ], // pinky
  ]
  return (
    <svg viewBox="0 0 400 210" className="h-full w-full" aria-hidden="true">
      {/* Bounding box, camera-style */}
      <rect x="88" y="26" width="224" height="168" rx="14" fill="none" stroke={stroke} strokeOpacity="0.18" strokeDasharray="6 6" />
      {[
        [88, 26, 1, 1],
        [312, 26, -1, 1],
        [88, 194, 1, -1],
        [312, 194, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M${x} ${y + 14 * sy} v${-14 * sy} h${14 * sx}`}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      {/* Palm */}
      <polygon
        points={`${wrist.join(",")} ${fingers[0][0].join(",")} ${fingers[1][0].join(",")} ${fingers[2][0].join(",")} ${fingers[3][0].join(",")} ${fingers[4][0].join(",")}`}
        fill={stroke}
        fillOpacity="0.06"
        stroke={stroke}
        strokeOpacity="0.35"
      />
      {fingers.map((pts, fi) => {
        const chain = [wrist, ...pts]
        return (
          <g key={fi}>
            <polyline
              points={chain.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke={stroke}
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {pts.map((p, pi) => (
              <circle key={pi} cx={p[0]} cy={p[1]} r={pi === 2 ? 4 : 3} fill="var(--card)" stroke={stroke} strokeOpacity="0.8" strokeWidth="1.5" />
            ))}
          </g>
        )
      })}
      <circle cx={wrist[0]} cy={wrist[1]} r="5" fill={stroke} fillOpacity="0.85" />
      {/* Confidence readout */}
      <text x="300" y="56" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill={stroke} fillOpacity="0.7">
        0.92
      </text>
    </svg>
  )
}
