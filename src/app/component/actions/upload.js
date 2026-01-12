// app/actions/upload.js
'use server'

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../../lib/utils/r2-client-s3";
import { compressImage } from "../../lib/utils/image-compressor";

export async function uploadToR2(formData) {
  try {
    const file = formData.get("file");
    if (!file) throw new Error("No file provided");
     const compressedBuffer = await compressImage(file);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    

    // Define the dynamic path (folder/filename)
    const fileName = `${Date.now()}-${file.name}`;
    const folder = "blog-images";
    const key = `${folder}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: compressedBuffer,
      ContentType: 'jpeg',
    });

    await r2.send(command);

    // Construct the public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/blockartblogs/${key}`;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("R2 Upload Error:", error);
    return { success: false, message: error.message };
  }
}