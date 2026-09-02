type FloralPosition = 'top-right' | 'bottom-left'

const sharedDefs = (
  <defs>
    <radialGradient id="rose-pink" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#E8C8C8" />
      <stop offset="45%" stopColor="#D4A5A5" />
      <stop offset="100%" stopColor="#B88888" />
    </radialGradient>
    <radialGradient id="rose-pink-light" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#F0D4D4" />
      <stop offset="50%" stopColor="#DDBABA" />
      <stop offset="100%" stopColor="#C4A0A0" />
    </radialGradient>
    <radialGradient id="succulent" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stopColor="#C8D4BC" />
      <stop offset="50%" stopColor="#A8B89C" />
      <stop offset="100%" stopColor="#8FA088" />
    </radialGradient>
    <radialGradient id="succulent-inner" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#D4E0C8" />
      <stop offset="100%" stopColor="#9AAD90" />
    </radialGradient>
    <linearGradient id="euc-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#B5C8B0" />
      <stop offset="100%" stopColor="#7A9480" />
    </linearGradient>
    <linearGradient id="sage-leaf" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stopColor="#8FA888" />
      <stop offset="100%" stopColor="#6B8068" />
    </linearGradient>
    <filter id="soft-blur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
    </filter>
  </defs>
)

function Rose({
  cx,
  cy,
  scale = 1,
  gradient = 'rose-pink',
  opacity = 1,
}: {
  cx: number
  cy: number
  scale?: number
  gradient?: string
  opacity?: number
}) {
  const petals = [
    'M0,-18 C8,-22 14,-14 10,-4 C16,-8 22,0 14,8 C18,14 8,20 0,14 C-8,20 -18,14 -14,8 C-22,0 -16,-8 -10,-4 C-14,-14 -8,-22 0,-18',
    'M0,-14 C6,-16 10,-10 8,-2 C12,-6 16,0 10,6 C14,10 6,14 0,10 C-6,14 -14,10 -10,6 C-16,0 -12,-6 -8,-2 C-10,-10 -6,-16 0,-14',
  ]
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((rot, i) => (
        <path
          key={rot}
          d={petals[i % 2]}
          fill={`url(#${gradient})`}
          transform={`rotate(${rot})`}
          opacity={0.92 - i * 0.04}
        />
      ))}
      <circle cx="0" cy="0" r="5" fill="#C99898" opacity="0.7" />
    </g>
  )
}

function SucculentRosette({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const leaves = 8
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {Array.from({ length: leaves }).map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-12"
          rx="7"
          ry="14"
          fill={i % 2 === 0 ? 'url(#succulent)' : 'url(#succulent-inner)'}
          transform={`rotate(${(360 / leaves) * i})`}
          opacity={0.9}
        />
      ))}
      <circle cx="0" cy="0" r="4" fill="#B0C4A4" />
    </g>
  )
}

function EucalyptusBranch({
  transform,
  opacity = 0.85,
}: {
  transform: string
  opacity?: number
}) {
  return (
    <g transform={transform} opacity={opacity}>
      <path
        d="M0,0 Q4,20 2,45 Q0,70 -3,95"
        stroke="#8FA888"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <ellipse cx="-8" cy="18" rx="9" ry="5" fill="url(#euc-leaf)" transform="rotate(-25 -8 18)" />
      <ellipse cx="10" cy="28" rx="10" ry="5.5" fill="url(#euc-leaf)" transform="rotate(30 10 28)" />
      <ellipse cx="-6" cy="42" rx="9" ry="5" fill="url(#euc-leaf)" transform="rotate(-15 -6 42)" />
      <ellipse cx="8" cy="55" rx="10" ry="5" fill="url(#euc-leaf)" transform="rotate(25 8 55)" />
      <ellipse cx="-5" cy="68" rx="8" ry="4.5" fill="url(#euc-leaf)" transform="rotate(-20 -5 68)" />
      <ellipse cx="7" cy="82" rx="9" ry="5" fill="url(#euc-leaf)" transform="rotate(20 7 82)" />
    </g>
  )
}

function SageLeaves({ transform }: { transform: string }) {
  return (
    <g transform={transform} opacity="0.75">
      <path d="M0,0 C-6,-8 -14,-4 -12,6 C-8,14 0,12 0,0" fill="url(#sage-leaf)" />
      <path d="M5,15 C12,8 20,12 18,22 C14,30 5,28 5,15" fill="url(#sage-leaf)" opacity="0.8" />
      <path d="M-3,30 C-10,24 -16,30 -14,40 C-10,48 -3,44 -3,30" fill="url(#sage-leaf)" opacity="0.7" />
    </g>
  )
}

function Peony({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`} filter="url(#soft-blur)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rot, i) => (
        <ellipse
          key={rot}
          cx="0"
          cy="-16"
          rx={12 - i * 0.3}
          ry={20 - i * 0.5}
          fill={i % 2 === 0 ? 'url(#rose-pink)' : 'url(#rose-pink-light)'}
          transform={`rotate(${rot})`}
          opacity={0.85 - i * 0.03}
        />
      ))}
      <circle cx="0" cy="0" r="7" fill="#C99292" opacity="0.65" />
      <circle cx="0" cy="0" r="4" fill="#B08080" opacity="0.5" />
    </g>
  )
}

function TopRightFloral() {
  return (
    <svg
      viewBox="0 0 260 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="floral floral-top-right"
      aria-hidden="true"
    >
      {sharedDefs}
      <Peony cx={188} cy={62} scale={1.15} />
      <Rose cx={135} cy={98} scale={0.9} gradient="rose-pink-light" opacity={0.92} />
      <SucculentRosette cx={215} cy={118} scale={1.15} />
      <SucculentRosette cx={158} cy={148} scale={0.8} />
      <EucalyptusBranch transform="translate(225, 75) rotate(18)" />
      <EucalyptusBranch transform="translate(115, 55) rotate(-22)" opacity={0.68} />
      <EucalyptusBranch transform="translate(200, 100) rotate(5)" opacity={0.55} />
      <SageLeaves transform="translate(205, 140) rotate(12)" />
      <SageLeaves transform="translate(145, 118) rotate(-28)" />
      <path
        d="M240,10 Q218,75 200,145 Q182,215 168,285"
        stroke="#9AAD98"
        strokeWidth="1"
        fill="none"
        opacity="0.32"
      />
      <path
        d="M205,25 Q188,95 175,165"
        stroke="#8FA088"
        strokeWidth="0.8"
        fill="none"
        opacity="0.28"
      />
      <ellipse cx={238} cy={185} rx="7" ry="3.5" fill="#A8B89C" transform="rotate(42 238 185)" opacity="0.58" />
      <ellipse cx={182} cy={215} rx="8" ry="4" fill="#9AAD90" transform="rotate(-18 182 215)" opacity="0.48" />
      <ellipse cx={220} cy={240} rx="6" ry="3" fill="#B5C4AE" transform="rotate(25 220 240)" opacity="0.4" />
    </svg>
  )
}

function BottomLeftFloral() {
  return (
    <svg
      viewBox="0 0 260 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="floral floral-bottom-left"
      aria-hidden="true"
    >
      {sharedDefs}
      <g transform="scale(-1,1) translate(-260,0)">
        <Peony cx={188} cy={65} scale={1.05} />
        <Rose cx={130} cy={100} scale={0.85} gradient="rose-pink-light" opacity={0.9} />
        <SucculentRosette cx={210} cy={125} scale={1.1} />
        <SucculentRosette cx={152} cy={152} scale={0.72} />
        <EucalyptusBranch transform="translate(220, 80) rotate(15)" />
        <EucalyptusBranch transform="translate(110, 60) rotate(-20)" opacity={0.62} />
        <SageLeaves transform="translate(200, 142) rotate(10)" />
        <SageLeaves transform="translate(138, 120) rotate(-26)" />
        <path
          d="M235,15 Q212,80 195,150 Q178,220 162,265"
          stroke="#9AAD98"
          strokeWidth="1"
          fill="none"
          opacity="0.32"
        />
        <ellipse cx={232} cy={180} rx="7" ry="3.5" fill="#A8B89C" transform="rotate(38 232 180)" opacity="0.55" />
        <ellipse cx={175} cy={218} rx="8" ry="4" fill="#9AAD90" transform="rotate(-14 175 218)" opacity="0.48" />
      </g>
    </svg>
  )
}

export function FloralDecoration({ position }: { position: FloralPosition }) {
  return position === 'top-right' ? <TopRightFloral /> : <BottomLeftFloral />
}
