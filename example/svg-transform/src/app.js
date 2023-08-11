export function getUpLevel() {
  const upLevel = "向上";
  const upLevelLength = getRealLength(upLevel);
  return `
  <g xmlns="http://www.w3.org/2000/svg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(${24 - (60 + upLevelLength) / 2}, 22)">
          <rect class="superior" stroke="#A9AEB8" fill="#F7F9FB" x="0" y="0" width="${60 + upLevelLength}" height="28" rx="14"/>
          <rect fill="#3c6dfc" x="4" y="4" width="20" height="20" rx="10"/>
          <polygon fill="#FFFFFF" transform="translate(28, 0) rotate(90)" points="15.9999593 11.6999466 15.3333333 11 12 14.4999466 15.3333333 18 16 17.2999893 13.3333333 14.4999466"/>
          <text font-size="12" font-weight="400" fill="#6D727E">
              <tspan x="32" y="18">向上一级</tspan>
          </text>
      </g>
  </g>`;
}