import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "C:/Users/MSI/.gemini/antigravity/brain/c654d25e-5e9a-4aed-8401-0f675ba2b4c1/akb_favicon_1774013330256.png";
const OUT_DIR = "./frontend/public";

async function generateFavicons() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const sizes = [16, 32, 48, 64, 180, 192, 512];

  for (const size of sizes) {
    const outFile = path.join(OUT_DIR, `favicon-${size}x${size}.png`);
    await sharp(SRC).resize(size, size).toFile(outFile);
    console.log(`✅ Created ${outFile}`);
  }

  // Create the main favicon.ico (32x32 PNG renamed — browsers accept PNG favicons)
  await sharp(SRC).resize(32, 32).toFile(path.join(OUT_DIR, "favicon.ico"));
  
  // Create apple-touch-icon (180x180)
  await sharp(SRC).resize(180, 180).toFile(path.join(OUT_DIR, "apple-touch-icon.png"));

  console.log("\n🎉 All favicons generated in frontend/public/");
}

generateFavicons().catch(console.error);
