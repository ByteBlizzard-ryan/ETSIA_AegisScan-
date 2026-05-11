// Script Node.js pour générer les icônes PNG
// Nécessite: npm install canvas

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Fonction pour créer une icône
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fond bleu avec coins arrondis
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, size, size);
  
  // Bouclier blanc
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  
  const centerX = size / 2;
  const centerY = size / 2;
  const shieldWidth = size * 0.4;
  const shieldHeight = size * 0.5;
  
  // Forme de bouclier simplifiée
  ctx.moveTo(centerX, centerY - shieldHeight/2);
  ctx.lineTo(centerX + shieldWidth/2, centerY - shieldHeight/3);
  ctx.lineTo(centerX + shieldWidth/2, centerY + shieldHeight/4);
  ctx.lineTo(centerX, centerY + shieldHeight/2);
  ctx.lineTo(centerX - shieldWidth/2, centerY + shieldHeight/4);
  ctx.lineTo(centerX - shieldWidth/2, centerY - shieldHeight/3);
  ctx.closePath();
  ctx.fill();
  
  // Coche verte
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = Math.max(2, size / 20);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.beginPath();
  ctx.moveTo(centerX - shieldWidth/3, centerY);
  ctx.lineTo(centerX - shieldWidth/6, centerY + shieldHeight/6);
  ctx.lineTo(centerX + shieldWidth/3, centerY - shieldHeight/6);
  ctx.stroke();
  
  return canvas;
}

// Générer les icônes
const sizes = [16, 48, 128];

sizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`link-guard/icons/icon${size}.png`, buffer);
  console.log(`Icône ${size}x${size} générée`);
});

console.log('Toutes les icônes ont été générées !');