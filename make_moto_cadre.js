const fs = require('fs');

let content = fs.readFileSync('moto.svg', 'utf8');

const filterDefs = `
<defs>
  <filter id="cadre-noir" x="-25%" y="-25%" width="150%" height="150%">
    <feDropShadow dx="0" dy="0" stdDeviation="1.8" flood-color="#111" flood-opacity="1" result="shadow1"/>
    <feDropShadow dx="0" dy="0" stdDeviation="1.8" flood-color="#111" flood-opacity="1" result="shadow2"/>
    <feDropShadow dx="0" dy="0" stdDeviation="1.8" flood-color="#111" flood-opacity="1" result="shadow3"/>
    <feMerge>
      <feMergeNode in="shadow3"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<g filter="url(#cadre-noir)">
`;

// Insert after the <svg ...> tag
content = content.replace(/<svg\b[^>]*>/i, (match) => {
    // Expand the viewBox
    let newMatch = match.replace(/viewBox="([-\d\.]+) ([-\d\.]+) ([-\d\.]+) ([-\d\.]+)"/, (m, x, y, w, h) => {
        return `viewBox="${parseFloat(x) - 10} ${parseFloat(y) - 10} ${parseFloat(w) + 20} ${parseFloat(h) + 20}"`;
    });
    return newMatch + '\n' + filterDefs;
});

// Close the <g> tag before </svg>
content = content.replace(/<\/svg>/i, '</g>\n</svg>');

fs.writeFileSync('moto_cadre.svg', content);
console.log('moto_cadre.svg created with enhanced frame');
