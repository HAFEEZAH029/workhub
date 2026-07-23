const wall = "#173F31";
const floor = "#FBFCF8";
const detail = "#6F7F78";
const glass = "#DCE8E2";

const PhoneBoothSvg = () => {
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
        <g id="pb-window" fill={glass} stroke={wall} strokeWidth="3">
          <rect x="0" y="0" width="130" height="18" />
          <path d="M8 5 H122 M8 12 H122" />
        </g>
        <g id="pb-chair" fill="#F8FAF7" stroke={wall} strokeWidth="3">
          <rect x="-18" y="-20" width="36" height="40" rx="6" />
          <path d="M-15 -25 Q0 -34 15 -25 M-21 -12 Q-26 0 -21 12 M21 -12 Q26 0 21 12" fill="none" />
        </g>
      </defs>

      <g stroke={wall} strokeWidth="5" fill="#FEFFFC">
        <rect x="58" y="58" width="218" height="208" />
        <rect x="286" y="58" width="218" height="208" />
        <rect x="514" y="58" width="218" height="208" />
        <rect x="742" y="58" width="200" height="208" />
      </g>

      <g stroke={wall} strokeWidth="5" fill="none">
        <path d="M58 276 H180 M256 276 H276 V190" />
        <path d="M286 276 H400 M484 276 H504 V190" />
        <path d="M514 276 H628 M712 276 H732 V190" />
        <path d="M742 276 H760 M840 276 H942" />
        <path d="M180 276 A86 86 0 0 1 266 190" />
        <path d="M400 276 A86 86 0 0 1 486 190" />
        <path d="M628 276 A86 86 0 0 1 714 190" />
        <path d="M842 276 A86 86 0 0 0 756 190" />
        <path d="M58 276 H942 V620 H760" />
        <path d="M58 620 V940 H420" />
        <path d="M650 620 V940 H590" />
        <path d="M760 620 V690 A82 82 0 0 1 678 772 H660" />
        <path d="M760 620 H942 V940 H650" />
        <path d="M420 872 A84 84 0 0 1 504 956" />
        <path d="M588 872 A84 84 0 0 0 504 956" />
      </g>

      <use href="#pb-window" x="98" y="38" />
      <use href="#pb-window" x="330" y="38" />
      <use href="#pb-window" x="560" y="38" />
      <use href="#pb-window" x="790" y="38" />
      <use href="#pb-window" x="140" y="942" />
      <use href="#pb-window" x="732" y="942" />

      <g fill="#F8FAF7" stroke={wall} strokeWidth="3">
        <path d="M335 415 Q500 330 665 415 L635 475 Q500 550 365 475 Z" fill="none" />
        <path d="M378 390 Q500 450 622 390" fill="none" />
        <rect x="178" y="708" width="64" height="110" rx="3" />
        <rect x="66" y="670" width="72" height="190" rx="5" />
        <rect x="150" y="870" width="120" height="62" rx="6" />
        <rect x="68" y="884" width="48" height="48" />
        <rect x="660" y="790" width="82" height="82" />
        <rect x="906" y="712" width="36" height="120" />
        <rect x="904" y="858" width="38" height="82" />
      </g>

      <use href="#pb-chair" x="456" y="418" transform="rotate(10 456 418)" />
      <use href="#pb-chair" x="548" y="418" transform="rotate(-10 548 418)" />
      <use href="#pb-chair" x="690" y="750" />
      <use href="#pb-chair" x="690" y="884" transform="rotate(180 690 884)" />
      <use href="#pb-chair" x="770" y="828" transform="rotate(90 770 828)" />
      <use href="#pb-chair" x="318" y="696" transform="rotate(-30 318 696)" />
      <use href="#pb-chair" x="325" y="842" transform="rotate(30 325 842)" />

      <g fill={wall} fontFamily="Arial, sans-serif" fontSize="28" textAnchor="middle">
        <text x="500" y="355">Lobby</text>
        <text x="500" y="548">Reception Desk</text>
        <text x="340" y="772">Lounge Area</text>
        <text x="815" y="772">Breakroom</text>
      </g>

      <g stroke={detail} strokeWidth="2" fill="none" opacity="0.85">
        <path d="M58 674 H135 M58 736 H135 M58 798 H135" />
        <path d="M150 908 H270" />
        <path d="M908 744 H940 V804 H908 Z" />
        <circle cx="930" cy="774" r="4" fill={detail} />
      </g>
    </svg>
  );
};

export default PhoneBoothSvg;
