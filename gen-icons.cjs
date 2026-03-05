const sharp = require('sharp');

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#1e40af"/>
  <text 
    x="50" 
    y="50" 
    font-size="72" 
    font-family="Arial, sans-serif"
    font-weight="bold"
    fill="#FFB300"
    text-anchor="middle"
    dominant-baseline="central"
  >&#8364;</text>
</svg>`);

sharp(svg).resize(192, 192).png().toFile('public/icon-192.png', () => console.log('icon-192.png generado'));
sharp(svg).resize(512, 512).png().toFile('public/icon-512.png', () => console.log('icon-512.png generado'));
