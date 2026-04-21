const fs = require('fs');
let s = fs.readFileSync('trax.svg', 'utf8');

// strip out the incorrectly added wrappers and resets strings
s = s.replace(/<!-- Rotate horizontal drawing to vertical top-view -->\n<g transform="rotate\(-90, 275, 225\)">\n/g, '');
s = s.replace(/<g transform="rotate\(-90, 275, 225\)">\n/g, '');
s = s.replace(/<\/g>\n<\/g>\n<\/g>\n<\/svg>/g, '</g>\n</g>\n</svg>'); // I might have broken the closing tags
s = s.replace(/<\/g>\n<\/svg>/g, '</svg>');

// set viewbox back to normal
s = s.replace(/viewBox="[^"]+"/, 'viewBox="0 0 550 450"');

fs.writeFileSync('trax.svg', s);
