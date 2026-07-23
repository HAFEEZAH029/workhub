const wall = "#0E4A38";
const glass = "#DCE8E2";
const detail = "#6F7F78";
const floor = "#F6F7F3";

const PrivateOfficeSvg = () => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="1000" height="1000" fill="#FBFAF6" />
      <rect x="45" y="45" width="910" height="910" fill={floor} stroke={wall} strokeWidth="18" />

      <defs>
        <pattern id="private-office-floor-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#D8DDD8" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="285" y="295" width="410" height="660" fill="url(#private-office-floor-grid)" opacity="0.9" />
      <rect x="315" y="320" width="370" height="585" fill="none" stroke="#CFD7D1" strokeWidth="1" />

      <path d="M55 295 H200 Q245 295 285 335 V620 H55 Z" fill="#EEF3EF" stroke={wall} strokeWidth="6" />
      <path d="M55 655 H295 V955 H55 Z" fill="#EEF3EF" stroke={wall} strokeWidth="6" />
      <path d="M685 345 H955 V650 H685 Z" fill="#EEF3EF" stroke={wall} strokeWidth="6" />
      <path d="M700 690 H955 V955 H700 Z" fill="#EEF3EF" stroke={wall} strokeWidth="6" />

      <rect x="55" y="55" width="220" height="240" fill="#F8FAF7" stroke={wall} strokeWidth="6" />
      <rect x="285" y="55" width="225" height="240" fill="#F8FAF7" stroke={wall} strokeWidth="6" />
      <rect x="510" y="55" width="205" height="240" fill="#F8FAF7" stroke={wall} strokeWidth="6" />
      <rect x="715" y="55" width="240" height="240" fill="#F8FAF7" stroke={wall} strokeWidth="6" />

      <rect x="42" y="42" width="916" height="28" fill={wall} />
      <rect x="42" y="930" width="365" height="28" fill={wall} />
      <rect x="585" y="930" width="373" height="28" fill={wall} />
      <rect x="42" y="42" width="28" height="916" fill={wall} />
      <rect x="930" y="42" width="28" height="916" fill={wall} />

      <g stroke={detail} strokeWidth="2" fill="none">
        <path d="M270 295 A70 70 0 0 1 340 225" />
        <path d="M285 295 A70 70 0 0 0 215 225" />
        <path d="M700 295 A70 70 0 0 1 770 225" />
        <path d="M715 295 A70 70 0 0 0 645 225" />
        <path d="M285 620 A70 70 0 0 1 215 690" />
        <path d="M295 655 A70 70 0 0 0 225 585" />
        <path d="M405 930 A75 75 0 0 1 480 855" />
        <path d="M585 930 A75 75 0 0 0 510 855" />
        <path d="M810 690 A40 40 0 0 1 770 650" />
      </g>

      <g fill={glass} stroke={wall} strokeWidth="3">
        <rect x="110" y="50" width="110" height="18" />
        <rect x="350" y="50" width="120" height="18" />
        <rect x="565" y="50" width="105" height="18" />
        <rect x="780" y="50" width="125" height="18" />
        <rect x="780" y="930" width="125" height="18" />
        <rect x="50" y="390" width="18" height="120" />
        <rect x="50" y="740" width="18" height="120" />
      </g>

      <g fill="none" stroke={detail} strokeWidth="3" opacity="0.8">
        <rect x="95" y="705" width="135" height="35" />
        <rect x="230" y="705" width="55" height="35" />
        <rect x="760" y="390" width="150" height="48" />
        <path d="M335 388 H665" />
        <path d="M335 615 H665" />
        <path d="M685 650 V725 H720" />
      </g>

      <g fill={wall}>
        <path d="M390 435 L435 390 H565 L610 435 L590 470 L555 435 H445 L410 470 Z" />
        <rect x="460" y="485" width="80" height="36" fill="#F3F0E8" stroke={detail} strokeWidth="2" />
        <rect x="395" y="560" width="55" height="55" transform="rotate(-45 422.5 587.5)" />
        <rect x="550" y="560" width="55" height="55" transform="rotate(45 577.5 587.5)" />
      </g>

      <g fill="#F8FAF7" stroke={detail} strokeWidth="2">
        <rect x="755" y="525" width="40" height="95" />
        <rect x="795" y="575" width="90" height="45" />
        <rect x="780" y="825" width="140" height="45" />
        <rect x="125" y="470" width="45" height="95" />
      </g>

      <g fill={wall} fontFamily="Arial, sans-serif" fontSize="18" textAnchor="middle">
        <text x="500" y="555">Central Lounge</text>
        <text x="500" y="765">Lobby Floor</text>
        <text x="825" y="485">Coffee &amp;</text>
        <text x="825" y="508">Refreshments</text>
        <text x="815" y="720">Reception</text>
      </g>
    </svg>
  );
};

export default PrivateOfficeSvg;
