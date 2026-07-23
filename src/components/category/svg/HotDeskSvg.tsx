const wall = "#173F31";
const floor = "#FBFCF8";
const detail = "#6F7F78";
const glass = "#DCE8E2";

const HotDeskSvg = () => {
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
      <rect x="40" y="40" width="920" height="920" fill={floor} stroke={wall} strokeWidth="5" />

      <defs>
        <g id="hd-window" fill={glass} stroke={wall} strokeWidth="3">
          <rect x="0" y="0" width="130" height="18" />
          <path d="M8 5 H122 M8 12 H122" />
        </g>
        <g id="hd-chair" fill="#F8FAF7" stroke={wall} strokeWidth="3">
          <rect x="-16" y="-18" width="32" height="36" rx="6" />
          <path d="M-13 -23 Q0 -31 13 -23 M-19 -10 Q-24 0 -19 10 M19 -10 Q24 0 19 10" fill="none" />
        </g>
      </defs>

      <g stroke={wall} strokeWidth="5" fill="#FEFFFC">
        <path d="M58 58 H408 V600 H58 Z" />
        <path d="M408 58 H560 V318 H642 V408 H570 V492 H642 V562 H570 V625 H430 V940 H58 V612 H408 Z" />
        <path d="M570 58 H942 V492 H570 Z" />
        <path d="M520 625 H720 V940 H520 Z" />
        <path d="M720 612 H942 V940 H720 Z" />
      </g>

      <g stroke={wall} strokeWidth="5" fill="none">
        <path d="M408 165 A82 82 0 0 0 326 247" strokeDasharray="12 10" />
        <path d="M326 247 H408" />
        <path d="M570 318 A88 88 0 0 1 658 406" strokeDasharray="12 10" />
        <path d="M570 492 A88 88 0 0 0 658 580" strokeDasharray="12 10" />
        <path d="M720 718 A78 78 0 0 0 798 640" />
        <path d="M430 872 A84 84 0 0 1 514 956" />
        <path d="M598 872 A84 84 0 0 0 514 956" />
        <path d="M720 612 H800 V585 H942" />
      </g>

      <use href="#hd-window" x="150" y="38" />
      <use href="#hd-window" x="420" y="38" />
      <use href="#hd-window" x="725" y="38" />
      <use href="#hd-window" x="140" y="942" />
      <use href="#hd-window" x="732" y="942" />
      <use href="#hd-window" x="38" y="380" transform="rotate(90 38 380)" />
      <use href="#hd-window" x="942" y="520" transform="rotate(90 942 520)" />

      <g fill="#F8FAF7" stroke={wall} strokeWidth="3">
        <rect x="96" y="82" width="100" height="70" />
        <rect x="256" y="82" width="108" height="70" />
        <rect x="66" y="258" width="118" height="78" />
        <rect x="266" y="258" width="126" height="78" />
        <rect x="66" y="516" width="122" height="88" />
        <rect x="266" y="516" width="126" height="88" />
        <rect x="70" y="720" width="200" height="170" />
        <rect x="425" y="300" width="155" height="120" />
        <rect x="730" y="108" width="205" height="90" />
        <rect x="730" y="305" width="205" height="90" />
        <rect x="600" y="508" width="140" height="70" />
        <rect x="802" y="790" width="78" height="150" />
      </g>

      <g opacity="0.85">
        <use href="#hd-chair" x="145" y="75" />
        <use href="#hd-chair" x="310" y="75" />
        <use href="#hd-chair" x="118" y="230" />
        <use href="#hd-chair" x="118" y="360" transform="rotate(180 118 360)" />
        <use href="#hd-chair" x="240" y="296" transform="rotate(-90 240 296)" />
        <use href="#hd-chair" x="118" y="492" />
        <use href="#hd-chair" x="330" y="492" />
        <use href="#hd-chair" x="105" y="748" />
        <use href="#hd-chair" x="220" y="748" />
        <use href="#hd-chair" x="105" y="875" transform="rotate(180 105 875)" />
        <use href="#hd-chair" x="220" y="875" transform="rotate(180 220 875)" />
        <use href="#hd-chair" x="462" y="294" />
        <use href="#hd-chair" x="545" y="294" />
        <use href="#hd-chair" x="462" y="426" transform="rotate(180 462 426)" />
        <use href="#hd-chair" x="545" y="426" transform="rotate(180 545 426)" />
        <use href="#hd-chair" x="778" y="92" />
        <use href="#hd-chair" x="846" y="92" />
        <use href="#hd-chair" x="914" y="92" />
        <use href="#hd-chair" x="778" y="214" transform="rotate(180 778 214)" />
        <use href="#hd-chair" x="846" y="214" transform="rotate(180 846 214)" />
        <use href="#hd-chair" x="914" y="214" transform="rotate(180 914 214)" />
        <use href="#hd-chair" x="778" y="288" />
        <use href="#hd-chair" x="846" y="288" />
        <use href="#hd-chair" x="914" y="288" />
        <use href="#hd-chair" x="778" y="412" transform="rotate(180 778 412)" />
        <use href="#hd-chair" x="846" y="412" transform="rotate(180 846 412)" />
        <use href="#hd-chair" x="914" y="412" transform="rotate(180 914 412)" />
        <use href="#hd-chair" x="785" y="840" transform="rotate(-90 785 840)" />
        <use href="#hd-chair" x="895" y="840" transform="rotate(90 895 840)" />
        <use href="#hd-chair" x="785" y="900" transform="rotate(-90 785 900)" />
        <use href="#hd-chair" x="895" y="900" transform="rotate(90 895 900)" />
      </g>

      <g fill="#F8FAF7" stroke={wall} strokeWidth="3">
        <rect x="178" y="630" width="64" height="110" rx="3" />
        <rect x="300" y="668" width="70" height="80" transform="rotate(-30 335 708)" />
        <rect x="306" y="820" width="70" height="80" transform="rotate(30 341 860)" />
        <rect x="578" y="640" width="130" height="125" />
        <rect x="908" y="708" width="34" height="90" />
        <rect x="904" y="858" width="38" height="82" />
      </g>

      <g fill={wall} fontFamily="Arial, sans-serif" fontSize="27" textAnchor="middle">
        <text x="235" y="195">Hot Desks</text>
        <text x="625" y="230">Display</text>
        <text x="625" y="260">Zone</text>
        <text x="525" y="550">Display</text>
        <text x="530" y="585">Zone</text>
        <text x="210" y="665">Display Zone</text>
        <text x="335" y="790">Lounge</text>
        <text x="620" y="835">Reception</text>
        <text x="795" y="638">Breakroom</text>
        <text x="855" y="545">Coffee</text>
        <text x="855" y="575">Station</text>
      </g>

      <g stroke={detail} strokeWidth="2" fill="none" opacity="0.85">
        <path d="M908 744 H940 V804 H908 Z" />
        <circle cx="930" cy="774" r="4" fill={detail} />
        <rect x="910" y="798" width="52" height="62" />
        <circle cx="928" cy="818" r="10" />
        <circle cx="950" cy="818" r="10" />
        <circle cx="928" cy="845" r="10" />
        <circle cx="950" cy="845" r="10" />
      </g>
    </svg>
  );
};

export default HotDeskSvg;
