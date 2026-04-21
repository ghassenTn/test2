const fs = require('fs');

let content = fs.readFileSync('taxi.svg', 'utf8');

const filterDefs = `
<defs>
  <filter id="cadre-noir" x="-25%" y="-25%" width="150%" height="150%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
    <feComponentTransfer in="blur" result="sharpened">
      <feFuncA type="linear" slope="30" intercept="-5"/>
    </feComponentTransfer>
    <feFlood flood-color="#000000" flood-opacity="1" result="pureBlack"/>
    <feComposite in="pureBlack" in2="sharpened" operator="in" result="outline"/>
    <feMerge>
      <feMergeNode in="outline"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<g filter="url(#cadre-noir)">
`;

// Expand viewBox to ensure border is not clipped.
content = content.replace(/<svg\b[^>]*>/i, (match) => {
    let newMatch = match.replace(/viewBox="([-\d\.]+) ([-\d\.]+) ([-\d\.]+) ([-\d\.]+)"/, (m, x, y, w, h) => {
        return `viewBox="${parseFloat(x) - 15} ${parseFloat(y) - 15} ${parseFloat(w) + 30} ${parseFloat(h) + 30}"`;
    });
    return newMatch + '\n' + filterDefs;
});

// Close the <g> right before </svg>
content = content.replace(/<\/svg>/i, '</g>\n</svg>');

fs.writeFileSync('taxi_cadre.svg', content);
console.log('taxi_cadre.svg created with pure black frame');
