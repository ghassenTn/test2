const fs = require('fs');

function fixFile(filePath) {
   let s = fs.readFileSync(filePath, 'utf8');

   s = s.replace(/fill:#00ff41/gi, 'fill:var(--fillColor)');

   // 1) Clear accidental injection if present
   s = s.replace(/style=\"([^\"]*) --fillColor: #00ff41; transition: --fillColor 0.5s ease;\"/g, 'style=\"$1\"');

   // 2) Add standard style to svg tag
   if (!s.includes('style=\"--fillColor: #00ff41; transition: --fillColor 0.5s ease;\"')) {
      s = s.replace(/(<svg\b[^>]*)\s*(?:style=\"[^\"]*\")?([^>]*>)/, '$1 style=\"--fillColor: #00ff41; transition: --fillColor 0.5s ease;\" $2');
   }

   // 3) Re-add rotation to main group
   if (!s.includes('transform=\"rotate(-90, 400, 400)\"')) {
      s = s.replace('<g id=\"group-R5\">', '<g id=\"group-R5\" transform=\"rotate(-90, 400, 400)\">');
   }

   fs.writeFileSync(filePath, s);
}

fixFile('/home/ghassen/Desktop/unidev-icons/test2/trax.svg');
fixFile('/home/ghassen/Desktop/unidev-icons/test2/svg/trax.svg');
