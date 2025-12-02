import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Optional S3 integration using AWS SDK v3. When USE_S3=true the route will
// upload the incoming file to the configured S3 bucket (useful when running
// against LocalStack). Otherwise it will continue saving the file to
// public/uploads/ as before.
let S3Client: any = null;
let PutObjectCommand: any = null;
let CreateBucketCommand: any = null;
try {
  // Lazy require so local dev without the SDK still works unless USE_S3 is set
  // Note: we don't import at top-level to avoid crashing if the package is not installed
  // (we'll instruct to run `npm i @aws-sdk/client-s3 uuid` when enabling S3)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const s3 = require('@aws-sdk/client-s3');
  S3Client = s3.S3Client;
  PutObjectCommand = s3.PutObjectCommand;
  CreateBucketCommand = s3.CreateBucketCommand;
} catch (e) {
  // ignore if package not installed; route will still work with local filesystem
}

// Define the POST handler for the file upload
export async function POST(request: NextRequest) {
  try {
    // 1. Get the FormData object from the request
    const formData = await request.formData();

    // 2. Extract the file. We expect a File object, but it could be null or a string.
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ message: 'Invalid or no file uploaded.' }, { status: 400 });
    }

    // TS Safety: The file variable is now guaranteed to be a File object
    const fileData = file as File; 

    // 3. Convert the file data into a buffer for saving or uploading
    const buffer = Buffer.from(await fileData.arrayBuffer());

    // Clean the filename (replace spaces) and add a unique identifier to prevent collisions
    const fileExtension = path.extname(fileData.name);
    const baseName = path.basename(fileData.name, fileExtension).replaceAll(' ', '_');
    const uniqueFileName = `${baseName}-${Date.now()}${fileExtension}`;

    // If USE_S3 is enabled, upload to S3 (LocalStack) instead of writing to disk
    const useS3 = process.env.USE_S3 === 'true' || process.env.NEXT_PUBLIC_USE_S3 === 'true';
    if (useS3 && S3Client) {
      const bucket = process.env.UPLOAD_BUCKET || 'linkyourbrand-uploads';
      // Create S3 client pointed to LocalStack by default
      const s3 = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
        },
        endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
        forcePathStyle: true,
      });

      // Ensure bucket exists (LocalStack is permissive, but create for clarity)
      try {
        await s3.send(new CreateBucketCommand({ Bucket: bucket }));
      } catch (err) {
        // ignore errors - bucket may already exist
      }

      // Upload object
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: uniqueFileName, Body: buffer, ContentType: fileData.type || 'application/octet-stream' }));

      const publicUrl = `${process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT || 'http://localhost:4566'}/${bucket}/${uniqueFileName}`;
      return NextResponse.json({ message: 'File uploaded to S3 successfully!', filePath: publicUrl }, { status: 201 });
    }

    // Fallback: save to disk under public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueFileName);
    await writeFile(filePath, buffer);

    // Return a successful response with the public URL
    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({ message: 'File uploaded successfully!', filePath: publicUrl }, { status: 201 });

  } catch (error) {
    console.error('Error during file upload:', error);
    // You should never expose the internal error to the client
    return NextResponse.json({ message: 'Internal server error during processing.' }, { status: 500 });
  }
}