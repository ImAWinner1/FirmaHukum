import sharp from 'sharp';
import fs from 'fs';

async function compressImage() {
  try {
    console.log("Compressing image...");
    await sharp('./public/images/hero-statue.png')
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile('./app/opengraph-image.jpg');
      
    // Check file size
    const stats = fs.statSync('./app/opengraph-image.jpg');
    console.log(`Success! New file size is: ${Math.round(stats.size / 1024)} KB`);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

compressImage();
