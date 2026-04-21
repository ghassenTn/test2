const fs = require('fs');

let content = fs.readFileSync('trax.svg', 'utf8');

// Clean up any old broken attempts first
content = content.replace(/<!-- Rotate horizontal drawing to vertical top-view -->\n/g, '');
content = content.replace(/<g transform="rotate\(-90, 275, 225\)">\n/g, '');
content = content.replace(/<\/g>\n<\/g>\n<\/g>\n<\/svg>/g, '</g>\n</g>\n');
content = content.replace(/<\/g>\n<\/svg>/g, '</g>\n');
if(!content.trim().endsWith('</svg>')) {
  // If we don't have svg closing, we already appended one with echo or it's messed up
  // Let's just extract the raw <g> blocks between svg opening and closing
}

// Safer approach: use regex to isolate the <svg> block and the inner content
let match = content.match(/(<svg\b[^>]*>)([\s\S]*?)(<\/svg>)/i);
if(match) {
   let svgOpening = match[1];
   let inner = match[2];
   let svgClosing = match[3];

   // clear out any inner trailing <g> mismatches if they got added
   
   // Set the new vertical bounding box
   svgOpening = svgOpening.replace(/viewBox="[^"]+"/, 'viewBox="50 -50 450 550"');

   let newContent = svgOpening + '\n  <g transform="rotate(-90, 275, 225)">\n' + inner + '\n  </g>\n' + svgClosing;
   fs.writeFileSync('trax_vertical.svg', newContent);
   console.log('Successfully created trax_vertical.svg!');
} else {
   console.log('Failed to parse trax.svg');
}
