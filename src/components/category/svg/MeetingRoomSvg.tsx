const wall = "#173F31";
const floor = "#FBFCF8";
const detail = "#6F7F78";
const glass = "#DCE8E2";

const MeetingRoomSvg = () => {
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
        <g id="mr-window" fill={glass} stroke={wall} strokeWidth="3">
          <rect x="0" y="0" width="130" height="18" />
          <path d="M8 5 H122 M8 12 H122" />
        </g>
        <g id="mr-chair" fill="#F8FAF7" stroke={wall} strokeWidth="3">
          <rect x="-18" y="-20" width="36" height="40" rx="6" />
          <path d="M-15 -25 Q0 -34 15 -25 M-21 -12 Q-26 0 -21 12 M21 -12 Q26 0 21 12" fill="none" />
        </g>
      </defs>

      <g stroke={wall} strokeWidth="5" fill="#FEFFFC">
        <rect x="58" y="58" width="350" height="240" />
        <rect x="58" y="310" width="350" height="290" />
        <rect x="570" y="58" width="372" height="450" />
        <rect x="58" y="612" width="372" height="328" />
        <rect x="520" y="625" width="200" height="315" />
        <rect x="720" y="635" width="222" height="305" />
      </g>

      <g stroke={wall} strokeWidth="5" fill="none">
        <path d="M408 58 H560 V340 H630 M560 58 V340" />
        <path d="M408 280 A86 86 0 0 0 322 366" />
        <path d="M408 400 A86 86 0 0 1 322 314" />
        <path d="M632 340 A86 86 0 0 1 546 426" />
        <path d="M650 492 A86 86 0 0 0 564 406" />
        <path d="M724 508 A72 72 0 0 1 796 580" />
        <path d="M868 508 A72 72 0 0 0 796 580" />
        <path d="M720 718 A78 78 0 0 0 798 640" />
        <path d="M430 872 A84 84 0 0 1 514 956" />
        <path d="M598 872 A84 84 0 0 0 514 956" />
        <path d="M720 635 H800 V600 H942" />
      </g>

      <use href="#mr-window" x="150" y="38" />
      <use href="#mr-window" x="420" y="38" />
      <use href="#mr-window" x="725" y="38" />
      <use href="#mr-window" x="140" y="942" />
      <use href="#mr-window" x="732" y="942" />
      <use href="#mr-window" x="38" y="380" transform="rotate(90 38 380)" />
      <use href="#mr-window" x="942" y="520" transform="rotate(90 942 520)" />

      <g fill="#F8FAF7" stroke={wall} strokeWidth="3">
        <rect x="145" y="132" width="140" height="75" />
        <rect x="118" y="415" width="190" height="100" />
        <rect x="732" y="132" width="120" height="265" />
        <rect x="178" y="720" width="64" height="110" rx="3" />
        <rect x="66" y="668" width="72" height="190" rx="5" />
        <rect x="150" y="870" width="120" height="62" rx="6" />
        <rect x="68" y="884" width="48" height="48" />
        <rect x="578" y="640" width="130" height="125" />
        <rect x="908" y="708" width="34" height="135" />
        <rect x="904" y="858" width="38" height="82" />
      </g>

      <g>
        <use href="#mr-chair" x="172" y="110" />
        <use href="#mr-chair" x="232" y="110" />
        <use href="#mr-chair" x="172" y="228" transform="rotate(180 172 228)" />
        <use href="#mr-chair" x="232" y="228" transform="rotate(180 232 228)" />
        <use href="#mr-chair" x="120" y="166" transform="rotate(-90 120 166)" />
        <use href="#mr-chair" x="302" y="166" transform="rotate(90 302 166)" />

        <use href="#mr-chair" x="150" y="395" />
        <use href="#mr-chair" x="210" y="395" />
        <use href="#mr-chair" x="270" y="395" />
        <use href="#mr-chair" x="150" y="535" transform="rotate(180 150 535)" />
        <use href="#mr-chair" x="210" y="535" transform="rotate(180 210 535)" />
        <use href="#mr-chair" x="270" y="535" transform="rotate(180 270 535)" />
        <use href="#mr-chair" x="95" y="465" transform="rotate(-90 95 465)" />
        <use href="#mr-chair" x="330" y="465" transform="rotate(90 330 465)" />

        <use href="#mr-chair" x="762" y="108" />
        <use href="#mr-chair" x="815" y="108" />
        <use href="#mr-chair" x="762" y="418" transform="rotate(180 762 418)" />
        <use href="#mr-chair" x="815" y="418" transform="rotate(180 815 418)" />
        <use href="#mr-chair" x="705" y="158" transform="rotate(-90 705 158)" />
        <use href="#mr-chair" x="705" y="218" transform="rotate(-90 705 218)" />
        <use href="#mr-chair" x="705" y="278" transform="rotate(-90 705 278)" />
        <use href="#mr-chair" x="705" y="338" transform="rotate(-90 705 338)" />
        <use href="#mr-chair" x="880" y="158" transform="rotate(90 880 158)" />
        <use href="#mr-chair" x="880" y="218" transform="rotate(90 880 218)" />
        <use href="#mr-chair" x="880" y="278" transform="rotate(90 880 278)" />
        <use href="#mr-chair" x="880" y="338" transform="rotate(90 880 338)" />

        <use href="#mr-chair" x="318" y="708" transform="rotate(-30 318 708)" />
        <use href="#mr-chair" x="325" y="852" transform="rotate(30 325 852)" />
        <use href="#mr-chair" x="610" y="690" transform="rotate(90 610 690)" />
      </g>

      <g fill={wall} fontFamily="Arial, sans-serif" fontSize="28" textAnchor="middle">
        <text x="320" y="780">Lounge</text>
        <text x="620" y="835">Reception</text>
        <text x="810" y="782">Refreshments</text>
      </g>

      <g stroke={detail} strokeWidth="2" fill="none" opacity="0.85">
        <path d="M58 674 H135 M58 736 H135 M58 798 H135" />
        <path d="M150 908 H270" />
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

export default MeetingRoomSvg;
