// Generate a circular favicon from iman.png
// Run: node scripts/generate-favicon.js

import { createCanvas, loadImage } from 'canvas';
import { writeFileSync } from 'fs';

async function generateFavicon() {
  const size = 64; // favicon size
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Load the source image
  const img = await loadImage('./public/assets/iman.png');

  // Create circular clip
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Draw image zoomed in on face area
  // Source: crop from top-left area where face is
  // Destination: fill the canvas
  const sourceX = 0;
  const sourceY = 0;
  const sourceSize = Math.min(img.width, img.height) * 0.7; // zoom in

  ctx.drawImage(
    img,
    sourceX, sourceY, sourceSize, sourceSize, // source rectangle
    0, 0, size, size // destination rectangle
  );

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  writeFileSync('./public/favicon.png', buffer);
  console.log('Generated favicon.png');
}

generateFavicon().catch(console.error);
