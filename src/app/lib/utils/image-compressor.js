import sharp from "sharp";

export async function compressImage(file) {
    // 1. Convert File/Blob to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Process with Sharp
    const compressedBuffer = await sharp(buffer)
    .resize({
        width: 2560,
        withoutEnlargement: true,
        fastShrinkOnLoad: false // Forces Sharp to use a slower, higher-quality shrink
    })
    .sharpen({
        sigma: 0.5, // Subtle sharpening
        m1: 0,
        m2: 10
    })
    .png({ 
        palette: true,      // Key for compression: uses a color palette (quantization)
        quality: 85,        // Compression level
        compressionLevel: 9, // Effort spent on compression (1-9, 9 is best/slowest)
        effort: 6           // Optimization effort for the encoder
    })
    .toBuffer();

    return compressedBuffer;
}
