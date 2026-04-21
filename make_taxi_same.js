const fs = require('fs');

let content = fs.readFileSync('taxi_cadre.svg', 'utf8');

// Replace fill colors with CSS variables so it color-cycles like the others
content = content.replace(/fill:#F5B339/g, 'fill:var(--truck-color)');
content = content.replace(/fill:#FFDD3E/g, 'fill:var(--truck-color-light)');

// Optionally, add the CSS variables to the <body>/SVG style so it doesn't break if unset
content = content.replace(/style="([^"]*)"/, 'style="$1 --truck-color: #F5B339; --truck-color-light: #FFDD3E; transition: --truck-color 0.5s ease, --truck-color-light 0.5s ease;"');

// Now, fix the viewBox so it crops perfectly around the car, the same way we did for tourisme!
// Based on coordinates (X:340..420, Y:50..235), let's set a padded viewbox: x=330, y=40, width=100, height=210
content = content.replace(/viewBox="[^"]+"/, 'viewBox="330 40 100 210"');

fs.writeFileSync('taxi_cadre.svg', content);
console.log('taxi_cadre.svg updated to behave exactly like tourisme car');
